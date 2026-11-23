/**
 * 用途：定位并截图普瑞塞斯（随机落在第 3–5 天）与变形者集群。
 * 输入：dev server。
 * 输出：shots/80-preseth.png、81-shapeshifter.png。
 * 依赖：puppeteer-core
 */
import puppeteer from 'puppeteer-core'

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const BASE = 'http://127.0.0.1:5273'
const OUT = 'D:/DSH工作区/shots'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
  defaultViewport: { width: 1600, height: 1000 },
})
const page = await browser.newPage()
await page.setCacheEnabled(false)

const click = (t) =>
  page.evaluate((txt) => {
    const b = [...document.querySelectorAll('button')].find((x) => x.textContent?.trim().includes(txt))
    if (!b) return false
    b.click()
    return true
  }, t)

const who = () =>
  page.evaluate(() => {
    const p = [...document.querySelectorAll('p')].find((x) => x.textContent?.includes('当前申请人：'))
    return p ? p.textContent.split('：').pop().trim() : null
  })

async function goDay(day, slot = 0) {
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
  await sleep(1300)
}

const found = {}

// day 3–5 逐人推进，遇到目标就截图
for (const day of [3, 4, 5]) {
  await goDay(day, 0)
  for (let i = 0; i < 12; i += 1) {
    const name = await who()
    if (!name) break
    if (name === '普瑞塞斯' && !found.preseth) {
      await click('调取档案')
      await sleep(1100)
      await page.screenshot({ path: `${OUT}/80-preseth.png` })
      found.preseth = true
    }
    if (name === '变形者集群' && !found.shapeshifter) {
      await click('调取档案')
      await sleep(1100)
      await page.screenshot({ path: `${OUT}/81-shapeshifter.png` })
      found.shapeshifter = true
    }
    if (found.preseth && found.shapeshifter) break
    await click('批准入境')
    await sleep(1800)
  }
  if (found.preseth && found.shapeshifter) break
}

console.log(JSON.stringify({ found, path: await page.evaluate(() => location.pathname) }, null, 1))
await browser.close()
