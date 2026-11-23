/**
 * 用途：单独截取第 3 位申请人（入侵者）的审查界面，验证印章破绽的呈现。
 * 输入：dev server。输出：shots/12-impostor.png。
 * 依赖：puppeteer-core + 本机 Edge。
 */
import puppeteer from 'puppeteer-core'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
  defaultViewport: { width: 1600, height: 1000 },
})
const page = await browser.newPage()
await page.goto('http://127.0.0.1:5273/review', { waitUntil: 'networkidle2' })
await sleep(1200)

const click = (t) =>
  page.evaluate((txt) => {
    const b = [...document.querySelectorAll('button')].find((x) => x.textContent?.includes(txt))
    b?.click()
  }, t)

for (let i = 0; i < 2; i += 1) {
  await click('批准入境')
  await sleep(1900)
}

// 第三人：问话 + 调档
await page.evaluate(() => {
  ;[...document.querySelectorAll('button')]
    .filter((b) => ['代号', '来意', '推荐人'].some((q) => b.textContent?.trim() === q))
    .forEach((b) => b.click())
})
await click('调取档案')
await sleep(1400)
await page.screenshot({ path: 'D:/DSH工作区/shots/12-impostor.png' })
console.log('impostor shot done')
await browser.close()
