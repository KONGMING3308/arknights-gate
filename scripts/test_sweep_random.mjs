/**
 * 用途：验证突脸随机化——变形者集群必触发、其他入侵者约 35%、正常干员不触发。
 * 输入：dev server。
 * 输出：各类别的触发统计。
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

const click = (page, t) =>
  page.evaluate((txt) => {
    const b = [...document.querySelectorAll('button')].find((x) => x.textContent?.trim().includes(txt))
    if (!b) return false
    b.click()
    return true
  }, t)

const who = (page) =>
  page.evaluate(() => {
    const p = [...document.querySelectorAll('p')].find((x) => x.textContent?.includes('当前申请人：'))
    return p ? p.textContent.split('：').pop().trim() : null
  })

async function runRound(day, slot, verdict) {
  const page = await browser.newPage()
  await page.setCacheEnabled(false)
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
  await page.evaluate(
    (d, s) =>
      localStorage.setItem(
        'arknights-gate-save',
        JSON.stringify({
          state: { day: d, slotIndex: s, safety: 100, trust: 100, records: [], hintsEnabled: true, phase: 'review' },
          version: 0,
        }),
      ),
    day,
    slot,
  )
  await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
  await sleep(1200)

  const name = await who(page)
  await click(page, verdict === 'reject' ? '拒绝入境' : '批准入境')
  await sleep(700)

  const inEvent = await page.evaluate(() => document.body.innerText.includes('呼叫 S.W.E.E.P.'))
  if (inEvent) {
    for (let k = 0; k < 16; k += 1) {
      const still = await page.evaluate(() => document.body.innerText.includes('呼叫 S.W.E.E.P.'))
      if (!still) break
      await click(page, '呼叫 S.W.E.E.P.')
      await sleep(80)
    }
    await sleep(1800)
  }
  await page.close()
  return { name, inEvent }
}

// 找变形者集群：在 D5 逐人推进
async function findInDay(day, targetName, verdictFn) {
  const results = []
  for (let slot = 0; slot < 9; slot += 1) {
    const page = await browser.newPage()
    await page.setCacheEnabled(false)
    await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
    await page.evaluate(
      (d, s) =>
        localStorage.setItem(
          'arknights-gate-save',
          JSON.stringify({
            state: { day: d, slotIndex: s, safety: 100, trust: 100, records: [], hintsEnabled: true, phase: 'review' },
            version: 0,
          }),
        ),
      day,
      slot,
    )
    await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
    await sleep(1100)
    const name = await who(page)
    if (name === targetName) {
      await click(page, '拒绝入境')
      await sleep(700)
      const inEvent = await page.evaluate(() => document.body.innerText.includes('呼叫 S.W.E.E.P.'))
      results.push({ name, inEvent })
      for (let k = 0; k < 16 && inEvent; k += 1) {
        const still = await page.evaluate(() => document.body.innerText.includes('呼叫 S.W.E.E.P.'))
        if (!still) break
        await click(page, '呼叫 S.W.E.E.P.')
        await sleep(80)
      }
      await page.close()
      break
    }
    await page.close()
  }
  return results
}

const out = {}

// 1) 变形者集群：必触发
out.shapeshifter = await findInDay(5, '变形者集群', null)

// 2) 统计多个不同入侵者被拒绝时的触发率（各取一次快照）
const impStats = []
for (const slot of [0, 1, 2, 3, 4, 5, 6, 7]) {
  const page = await browser.newPage()
  await page.setCacheEnabled(false)
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
  await page.evaluate(
    (s) =>
      localStorage.setItem(
        'arknights-gate-save',
        JSON.stringify({
          state: { day: 3, slotIndex: s, safety: 100, trust: 100, records: [], hintsEnabled: true, phase: 'review' },
          version: 0,
        }),
      ),
    slot,
  )
  await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
  await sleep(1100)
  const name = await who(page)
  if (!name) {
    await page.close()
    continue
  }
  // 先调档看破绽数（判断是否入侵者）
  await click(page, '调取档案')
  await sleep(900)
  const hint = await page.evaluate(() => {
    const t = document.body.innerText.match(/已发现\s*(\d+)\s*处破绽/)
    return t ? Number(t[1]) : 0
  })
  await click(page, '拒绝入境')
  await sleep(700)
  const inEvent = await page.evaluate(() => document.body.innerText.includes('呼叫 S.W.E.E.P.'))
  impStats.push({ name, hint, inEvent })
  if (inEvent) {
    for (let k = 0; k < 16; k += 1) {
      const still = await page.evaluate(() => document.body.innerText.includes('呼叫 S.W.E.E.P.'))
      if (!still) break
      await click(page, '呼叫 S.W.E.E.P.')
      await sleep(80)
    }
    await sleep(1600)
  }
  await page.close()
}
out.rejectedSamples = impStats

console.log(JSON.stringify(out, null, 1))
await browser.close()
