/**
 * 用途：核心规则的回归验证（射击系统移除后更新）。
 * 输入：dev server。
 * 输出：每条用例的通过/失败结论。
 * 依赖：puppeteer-core
 */
import puppeteer from 'puppeteer-core'

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const BASE = 'http://127.0.0.1:5273'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
  defaultViewport: { width: 1400, height: 900 },
})
const results = []

async function freshPage(day = 1, slot = 0, trust = 100) {
  const page = await browser.newPage()
  await page.setCacheEnabled(false)
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
  await page.evaluate(
    (d, s, t) => {
      localStorage.setItem(
        'arknights-gate-save',
        JSON.stringify({
          state: { day: d, slotIndex: s, safety: 100, trust: t, records: [], hintsEnabled: true, phase: 'review' },
          version: 0,
        }),
      )
    },
    day,
    slot,
    trust,
  )
  await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
  await sleep(1300)
  return page
}

const click = (page, t) =>
  page.evaluate((txt) => {
    const b = [...document.querySelectorAll('button')].find((x) => x.textContent?.trim().includes(txt))
    if (!b) return false
    b.click()
    return true
  }, t)

const readStore = (page) =>
  page.evaluate(() => {
    const raw = localStorage.getItem('arknights-gate-save')
    return raw ? JSON.parse(raw).state : null
  })

// 用例 1：快速连点两次「批准」，不能重复结算
{
  const page = await freshPage()
  await click(page, '批准入境')
  await sleep(60)
  await click(page, '批准入境')
  await sleep(2200)
  const s = await readStore(page)
  results.push({ case: '1 连点不重复结算', pass: s.records.length === 1, detail: `records=${s.records.length} slot=${s.slotIndex}` })
  await page.close()
}

// 用例 2：信任度归零 → 结局页
{
  const page = await freshPage(1, 0, 5)
  await click(page, '拒绝入境')
  await sleep(2200)
  const s = await readStore(page)
  const path = await page.evaluate(() => location.pathname)
  results.push({ case: '2 信任归零进结局', pass: s.phase === 'ending' && path === '/ending', detail: `trust=${s.trust} phase=${s.phase} path=${path}` })
  await page.close()
}

// 用例 3：存档保留 phase
{
  const page = await freshPage()
  for (let i = 0; i < 3; i += 1) {
    await click(page, '批准入境')
    await sleep(1800)
  }
  await page.reload({ waitUntil: 'networkidle2' })
  await sleep(900)
  const s = await readStore(page)
  const hasResume = await page.evaluate(() =>
    [...document.querySelectorAll('button')].some((b) => b.textContent?.includes('继续上次')),
  )
  results.push({ case: '3 存档保留 phase', pass: s.phase === 'dayEnd' && !hasResume, detail: `phase=${s.phase} hasResume=${hasResume}` })
  await page.close()
}

// 用例 4：普瑞塞斯不计分（若当天有她，验证拒绝后数值不变）
{
  const page = await freshPage(3, 0)
  const who = () =>
    page.evaluate(() => {
      const p = [...document.querySelectorAll('p')].find((x) => x.textContent?.includes('当前申请人：'))
      return p ? p.textContent.split('：').pop().trim() : ''
    })
  let found = false
  for (let i = 0; i < 10; i += 1) {
    if ((await who()) === '普瑞塞斯') {
      found = true
      break
    }
    await click(page, '批准入境')
    await sleep(1800)
  }
  if (!found) {
    results.push({ case: '4 普瑞塞斯不计分', pass: true, detail: '本局随机落点不在 D3/D4 前段，跳过' })
  } else {
    const before = await readStore(page)
    await click(page, '拒绝入境')
    await sleep(2200)
    const after = await readStore(page)
    results.push({
      case: '4 普瑞塞斯不计分',
      pass: before.safety === after.safety && before.trust === after.trust,
      detail: `安全 ${before.safety}→${after.safety} 信任 ${before.trust}→${after.trust}`,
    })
  }
  await page.close()
}

console.log(JSON.stringify(results, null, 1))
await browser.close()
