/**
 * 用途：随机后的通关冒烟测试——不再依赖硬编码名单，改用游戏自己的「新手提示破绽数」判断。
 * 输入：dev server。
 * 输出：每日截图 + 结果统计。
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
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text())
})

await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
await page.evaluate(() => localStorage.clear())
await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
await sleep(1500)

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

const path = () => page.evaluate(() => location.pathname)

const log = []
for (let day = 1; day <= 5; day += 1) {
  for (let guard = 0; guard < 14; guard += 1) {
    if ((await path()) !== '/review') break
    const name = await who()
    if (!name) break

    // 问满三个问题
    await page.evaluate(() => {
      ;[...document.querySelectorAll('button')]
        .filter((b) => ['代号', '来意', '担保人'].some((q) => b.textContent?.trim() === q))
        .forEach((b) => b.click())
    })
    await click('调取档案')
    await sleep(980)

    // 读游戏自己算出的破绽数（最可靠）
    const hint = await page.evaluate(() => {
      const t = document.body.innerText.match(/已发现\s*(\d+)\s*处破绽/)
      return t ? Number(t[1]) : -1
    })
    const isAnomaly = name === '普瑞塞斯'
    const shouldReject = !isAnomaly && hint > 0

    if (shouldReject) await click('拒绝入境')
    else await click('批准入境')

    log.push({ day, name, hint, verdict: shouldReject ? 'reject' : 'approve' })

    // 处理突脸事件
    await sleep(650)
    for (let k = 0; k < 16; k += 1) {
      const inEvent = await page.evaluate(() => document.body.innerText.includes('呼叫 S.W.E.E.P.'))
      if (!inEvent) break
      await click('呼叫 S.W.E.E.P.')
      await sleep(85)
    }
    await sleep(2600)
  }

  const p = await path()
  if (p === '/day-end') {
    await page.screenshot({ path: `${OUT}/E0-day${day}.png` })
    await click(day === 5 ? '查看评级' : '进入下一天')
    await sleep(900)
  }
}

const ending = await path()
await page.screenshot({ path: `${OUT}/E1-ending.png` })
const summary = await page.evaluate(() => document.body.innerText.replace(/\n+/g, ' | ').slice(0, 240))

console.log(
  JSON.stringify(
    {
      daysCleared: [...new Set(log.map((l) => l.day))],
      totalHandled: log.length,
      rejected: log.filter((l) => l.verdict === 'reject').length,
      approved: log.filter((l) => l.verdict === 'approve').length,
      noHintCases: log.filter((l) => l.hint === -1).length,
      ending,
      summary,
      errors: errors.slice(0, 5),
    },
    null,
    1,
  ),
)
await browser.close()
