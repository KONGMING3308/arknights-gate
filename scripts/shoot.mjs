/**
 * 用途：用真实浏览器跑一遍审查流程并截图，做视觉与交互验收。
 * 输入：本地 dev server（http://127.0.0.1:5273）。
 * 输出：shots/*.png 与步骤日志。
 * 依赖：puppeteer-core + 本机 Edge。
 */
import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const BASE = 'http://127.0.0.1:5273'
const OUT = 'D:/DSH工作区/shots'

mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--window-size=1600,1000'],
  defaultViewport: { width: 1600, height: 1000 },
})

const page = await browser.newPage()
const logs = []
page.on('console', (m) => {
  if (m.type() === 'error') logs.push('CONSOLE ' + m.text())
})
page.on('pageerror', (e) => logs.push('PAGEERROR ' + e.message))

async function shot(name) {
  await page.screenshot({ path: `${OUT}/${name}.png` })
  console.log('shot:', name)
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// 1. 标题页
await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
await sleep(400)
await shot('01-title')

// 2. 进入审查
await page.evaluate(() => {
  const btn = [...document.querySelectorAll('button')].find((b) => b.textContent?.includes('开始值班'))
  btn?.click()
})
await page.waitForFunction(() => location.pathname === '/review', { timeout: 8000 })
await sleep(900)
await shot('02-review-initial')

// 3. 三个问题全问
const asked = await page.evaluate(() => {
  const buttons = [...document.querySelectorAll('button')].filter((b) =>
    ['代号', '来意', '推荐人'].includes(b.textContent?.trim() ?? ''),
  )
  buttons.forEach((b) => b.click())
  return buttons.length
})
await sleep(500)
await shot('03-review-asked')

// 4. 调取档案
await page.evaluate(() => {
  const btn = [...document.querySelectorAll('button')].find((b) => b.textContent?.includes('调取档案'))
  btn?.click()
})
await sleep(1300)
await shot('04-review-dossier')

// 5. 拔枪覆盖层
await page.evaluate(() => {
  const btn = [...document.querySelectorAll('button')].find((b) => b.textContent?.includes('拔枪'))
  btn?.click()
})
await sleep(600)
await shot('05-gun-overlay')

// 6. 取消，改走批准
await page.evaluate(() => {
  const btn = [...document.querySelectorAll('button')].find((b) => b.textContent?.includes('收起武器'))
  btn?.click()
})
await sleep(400)
await page.evaluate(() => {
  const btn = [...document.querySelectorAll('button')].find((b) => b.textContent?.includes('批准入境'))
  btn?.click()
})
await sleep(1900)
await shot('06-after-verdict')

console.log(JSON.stringify({ asked, errors: logs.slice(0, 8) }, null, 1))
await browser.close()
