/**
 * 用途：验证「突脸 → 呼叫 S.W.E.E.P. → 阿斯卡纶登场」事件链。
 * 输入：dev server。
 * 输出：截图 + 断言。
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
const errors = []
page.on('pageerror', (e) => errors.push(e.message))

await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
await page.evaluate(() =>
  localStorage.setItem(
    'arknights-gate-save',
    JSON.stringify({
      state: { day: 4, slotIndex: 1, safety: 100, trust: 100, records: [], hintsEnabled: true, phase: 'review' },
      version: 0,
    }),
  ),
)
await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
await sleep(1400)

const click = (t) =>
  page.evaluate((txt) => {
    const b = [...document.querySelectorAll('button')].find((x) => x.textContent?.trim().includes(txt))
    if (!b) return false
    b.click()
    return true
  }, t)

await click('拒绝入境')
await sleep(900)
const hasEvent = await page.evaluate(() => document.body.innerText.includes('呼叫 S.W.E.E.P.'))
await page.screenshot({ path: `${OUT}/70-sweep-event.png` })

// 连点 10 次
for (let i = 0; i < 12; i += 1) {
  await click('呼叫 S.W.E.E.P.')
  await sleep(90)
}
await sleep(600)
await page.screenshot({ path: `${OUT}/71-sweep-success.png` })
const success = await page.evaluate(() => document.body.innerText.includes('非法入侵的变形者已被处决'))

await sleep(2600)
const after = await page.evaluate(() => ({ path: location.pathname, text: document.body.innerText.slice(0, 80) }))

console.log(JSON.stringify({ hasEvent, success, after, errors: errors.slice(0, 4) }, null, 1))
await browser.close()
