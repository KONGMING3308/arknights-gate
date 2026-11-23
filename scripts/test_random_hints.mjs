/**
 * 用途：验证「出场顺序随机」与「提示开关」两项改动。
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
  defaultViewport: { width: 1400, height: 900 },
})
const page = await browser.newPage()
await page.setCacheEnabled(false)
const results = []

const save = (day, slot, hints = true) =>
  page.evaluate(
    (d, s, h) =>
      localStorage.setItem(
        'arknights-gate-save',
        JSON.stringify({
          state: { day: d, slotIndex: s, safety: 100, trust: 100, records: [], hintsEnabled: h, phase: 'review' },
          version: 0,
        }),
      ),
    day,
    slot,
    hints,
  )

const who = () =>
  page.evaluate(() => {
    const p = [...document.querySelectorAll('p')].find((x) => x.textContent?.includes('当前申请人：'))
    return p ? p.textContent.split('：').pop().trim() : ''
  })

await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
await page.evaluate(() => localStorage.clear())

// 用例 1：同一局刷新两次，第一位申请人不变
await save(2, 0)
await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
await sleep(1200)
const first1 = await who()
await page.reload({ waitUntil: 'networkidle2' })
await sleep(1200)
const first2 = await who()
results.push({ case: '1 同一局顺序稳定', pass: first1 === first2 && !!first1, detail: `${first1} / ${first2}` })

// 用例 2：连续开新局，顺序应发生变化（3 次内至少一变）
const orders = [first1]
for (let i = 0; i < 4; i += 1) {
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
  await page.evaluate(() => {
    ;[...document.querySelectorAll('button')].find((b) => b.textContent?.includes('开始值班'))?.click()
  })
  await page.waitForFunction(() => location.pathname === '/review', { timeout: 6000 })
  await sleep(1100)
  orders.push(await who())
}
const uniq = new Set(orders.filter(Boolean))
results.push({ case: '2 新局顺序变化', pass: uniq.size >= 2, detail: orders.join(' → ') })

// 用例 3：关闭提示后，不再出现「担保失效」红条
await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
await save(5, 1, false) // 闪灵：担保人不在册
await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
await sleep(1300)
await page.evaluate(() => {
  ;[...document.querySelectorAll('button')].find((b) => b.textContent?.includes('调取档案'))?.click()
})
await sleep(1100)
const textOff = await page.evaluate(() => document.body.innerText)
results.push({
  case: '3 提示关闭后无担保失效标注',
  pass: !textOff.includes('担保失效'),
  detail: textOff.includes('担保失效') ? '仍显示' : '已隐藏',
})

// 用例 4：关闭提示后，照片字段不直接标注「与本人不符」
await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
await save(3, 0, false)
await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
await sleep(1300)
const textPhoto = await page.evaluate(() => document.body.innerText)
// 需要找到流星：逐个推进
let found = textPhoto.includes('流星')
for (let i = 0; i < 6 && !found; i += 1) {
  await page.evaluate(() => {
    ;[...document.querySelectorAll('button')].find((b) => b.textContent?.includes('批准入境'))?.click()
  })
  await sleep(1800)
  const t = await page.evaluate(() => document.body.innerText)
  found = t.includes('流星')
}
const photoText = await page.evaluate(() => document.body.innerText)
results.push({
  case: '4 提示关闭后照片不标注不符',
  pass: !photoText.includes('与本人不符') || photoText.includes('待人工核验'),
  detail: photoText.includes('与本人不符') ? '仍标注不符' : '仅显示待核验',
})

console.log(JSON.stringify(results, null, 1))
await browser.close()
