/**
 * 用途：完整跑完第 1 天三人流程（问话→调档→处置），验证结算与评级页。
 * 输入：dev server。输出：shots/10~15 截图与结果日志。
 * 依赖：puppeteer-core + 本机 Edge。
 */
import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const BASE = 'http://127.0.0.1:5273'
const OUT = 'D:/DSH工作区/shots'
mkdirSync(OUT, { recursive: true })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--window-size=1600,1000'],
  defaultViewport: { width: 1600, height: 1000 },
})
const page = await browser.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text())
})

const clickText = (t) =>
  page.evaluate((txt) => {
    const btn = [...document.querySelectorAll('button')].find((b) => b.textContent?.includes(txt))
    if (!btn) return false
    btn.click()
    return true
  }, t)

/** 读取当前申请人代号与两条数值 */
const readState = () =>
  page.evaluate(() => {
    const name = document.querySelector('header + div section header span')?.textContent ?? ''
    const nums = [...document.querySelectorAll('header span.font-mono')]
      .map((n) => n.textContent?.trim())
      .filter(Boolean)
    return { name, nums }
  })

await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
await sleep(1200)

const timeline = []
for (let i = 0; i < 3; i += 1) {
  const state = await readState()
  timeline.push({ round: i + 1, state })

  // 问三个问题
  await page.evaluate(() => {
    ;[...document.querySelectorAll('button')]
      .filter((b) => ['代号', '来意', '推荐人'].some((q) => b.textContent?.trim() === q))
      .forEach((b) => b.click())
  })
  await sleep(300)

  // 调档
  await clickText('调取档案')
  await sleep(1200)

  if (i < 2) {
    await clickText('批准入境')
  } else {
    // 第三位（入侵者）走拔枪
    await clickText('拔枪射击')
    await sleep(500)
    await clickText('确认开枪')
    await sleep(900)
  }
  await sleep(1800)

  const after = await page.evaluate(() => ({
    path: location.pathname,
    body: document.body.innerText.slice(0, 120),
  }))
  timeline.push({ round: i + 1, after })
}

await page.screenshot({ path: `${OUT}/10-day-end.png` })
console.log('at:', await page.evaluate(() => location.pathname))

await clickText('查看评级')
await sleep(900)
await page.screenshot({ path: `${OUT}/11-ending.png` })
console.log('final path:', await page.evaluate(() => location.pathname))

console.log(JSON.stringify({ timeline, errors: errors.slice(0, 6) }, null, 1))
await browser.close()
