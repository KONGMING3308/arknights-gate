/**
 * 用途：验证「新手提示默认关闭」以及「老存档迁移为关闭」。
 * 输入：dev server。
 * 输出：断言结果。
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
  defaultViewport: { width: 1440, height: 900 },
})
const results = []

// 用例 1：全新玩家（无存档）→ 默认关闭
{
  const page = await browser.newPage()
  await page.setCacheEnabled(false)
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
  await page.evaluate(() => localStorage.clear())
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
  await sleep(1200)
  const titleText = await page.evaluate(() => document.body.innerText)
  // 开局后才会写存档，此时再校验 store 里的值
  await page.evaluate(() => {
    ;[...document.querySelectorAll('button')].find((b) => b.textContent?.includes('开始值班'))?.click()
  })
  await sleep(2000)
  const storeState = await page.evaluate(() => {
    const raw = localStorage.getItem('arknights-gate-save')
    return raw ? JSON.parse(raw).state : null
  })
  results.push({
    case: '1 全新玩家默认关闭',
    pass: titleText.includes('新手提示：已关闭') && storeState?.hintsEnabled === false,
    detail: `标题页=${titleText.includes('新手提示：已关闭')} store=${storeState?.hintsEnabled}`,
  })
  await page.close()
}

// 用例 2：审查页不显示破绽计数
{
  const page = await browser.newPage()
  await page.setCacheEnabled(false)
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
  await page.evaluate(() => {
    localStorage.clear()
    localStorage.setItem(
      'arknights-gate-save',
      JSON.stringify({
        state: { day: 1, slotIndex: 0, safety: 100, trust: 100, records: [], hintsEnabled: false, phase: 'review' },
        version: 2,
      }),
    )
  })
  await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
  await sleep(1400)
  await page.evaluate(() => {
    ;[...document.querySelectorAll('button')].find((b) => b.textContent?.includes('调取档案'))?.click()
  })
  await sleep(1100)
  const txt = await page.evaluate(() => document.body.innerText)
  results.push({
    case: '2 关闭时不显示破绽计数',
    pass: txt.includes('新手提示已关闭') && !/已发现\s*\d+\s*处破绽/.test(txt),
    detail: `含关闭提示=${txt.includes('新手提示已关闭')} 含破绽数=${/已发现\s*\d+\s*处破绽/.test(txt)}`,
  })
  await page.close()
}

// 用例 3：手动开启后生效
{
  const page = await browser.newPage()
  await page.setCacheEnabled(false)
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
  await page.evaluate(() => {
    localStorage.clear()
    localStorage.setItem(
      'arknights-gate-save',
      JSON.stringify({
        state: { day: 1, slotIndex: 0, safety: 100, trust: 100, records: [], hintsEnabled: false, phase: 'review' },
        version: 2,
      }),
    )
  })
  await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
  await sleep(1400)
  // 点右上角开关
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('button')].find((x) => x.textContent?.includes('新手提示'))
    b?.click()
  })
  await sleep(500)
  await page.evaluate(() => {
    ;[...document.querySelectorAll('button')].find((b) => b.textContent?.includes('调取档案'))?.click()
  })
  await sleep(1100)
  const txt = await page.evaluate(() => document.body.innerText)
  const state = await page.evaluate(() => JSON.parse(localStorage.getItem('arknights-gate-save')).state)
  results.push({
    case: '3 手动开启后生效',
    pass: /已发现\s*\d+\s*处破绽/.test(txt) && state.hintsEnabled === true,
    detail: `显示破绽数=${/已发现\s*\d+\s*处破绽/.test(txt)} store=${state.hintsEnabled}`,
  })
  await page.close()
}

// 用例 4：老存档（v1，hintsEnabled: true）被迁移为关闭
{
  const page = await browser.newPage()
  await page.setCacheEnabled(false)
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
  await page.evaluate(() => {
    localStorage.clear()
    localStorage.setItem(
      'arknights-gate-save',
      JSON.stringify({
        state: { day: 2, slotIndex: 0, safety: 90, trust: 80, records: [], hintsEnabled: true, phase: 'review' },
        version: 1,
      }),
    )
  })
  await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
  await sleep(1400)
  const state = await page.evaluate(() => JSON.parse(localStorage.getItem('arknights-gate-save')).state)
  results.push({
    case: '4 老存档迁移为关闭',
    pass: state.hintsEnabled === false,
    detail: `迁移后 hintsEnabled=${state.hintsEnabled}`,
  })
  await page.close()
}

console.log(JSON.stringify(results, null, 1))
await browser.close()
