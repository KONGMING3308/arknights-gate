/**
 * 用途：自动通关 5 天 21 人，验证天数推进、结算、评级全链路。
 * 输入：dev server。
 * 输出：每日结算截图 + 最终评级 + 通过/失败结论。
 * 依赖：puppeteer-core + 本机 Edge
 */
import puppeteer from 'puppeteer-core'

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const BASE = 'http://127.0.0.1:5273'
const OUT = 'D:/DSH工作区/shots'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** 已知的 8 名入侵者（用于模拟「正确判定」） */
const IMPOSTORS = new Set(['米格鲁', '玫兰莎', '流星', '杜宾', '能天使', '可颂', '闪灵', '推进之王', '变形者集群'])

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
  defaultViewport: { width: 1600, height: 1000 },
})
const page = await browser.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text())
})

await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
await page.evaluate(() => localStorage.clear())
await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
await sleep(1400)

const click = (t) =>
  page.evaluate((txt) => {
    const b = [...document.querySelectorAll('button')].find((x) => x.textContent?.trim().includes(txt))
    if (!b) return false
    b.click()
    return true
  }, t)

const currentName = () =>
  page.evaluate(() => {
    const p = [...document.querySelectorAll('p')].find((x) => x.textContent?.includes('当前申请人：'))
    return p ? p.textContent.split('：').pop().trim() : null
  })

const path = () => page.evaluate(() => location.pathname)

const log = []
for (let day = 1; day <= 5; day += 1) {
  // 每天最多 5 人，按页面状态循环
  for (let guard = 0; guard < 14; guard += 1) {
    if ((await path()) !== '/review') break
    const name = await currentName()
    if (!name) break

    // 问满三个问题
    await page.evaluate(() => {
      ;[...document.querySelectorAll('button')]
        .filter((b) => ['代号', '来意', '推荐人'].some((q) => b.textContent?.trim() === q))
        .forEach((b) => b.click())
    })
    await click('调取档案')
    await sleep(950)

    const isImpostor = IMPOSTORS.has(name)
    if (isImpostor) {
      await click('拒绝入境')
    } else {
      await click('批准入境')
    }
    log.push({ day, name, verdict: isImpostor ? 'reject' : 'approve' })

    // 拒绝后可能触发「突脸」事件：连点呼叫 S.W.E.E.P. 直到事件结束
    await sleep(700)
    for (let k = 0; k < 16; k += 1) {
      const inEvent = await page.evaluate(() => document.body.innerText.includes('呼叫 S.W.E.E.P.'))
      if (!inEvent) break
      await click('呼叫 S.W.E.E.P.')
      await sleep(90)
    }
    await sleep(2600)
  }

  const p = await path()
  if (p === '/day-end') {
    await page.screenshot({ path: `${OUT}/30-day${day}-end.png` })
    await click(day === 5 ? '查看评级' : '进入下一天')
    await sleep(900)
  }
}

const ending = await path()
await page.screenshot({ path: `${OUT}/31-ending-5days.png` })
const summary = await page.evaluate(() => document.body.innerText.replace(/\n+/g, ' | ').slice(0, 260))

console.log(
  JSON.stringify(
    {
      daysCleared: [...new Set(log.map((l) => l.day))],
      totalHandled: log.length,
      ending,
      summary,
      errors: errors.slice(0, 5),
    },
    null,
    1,
  ),
)
await browser.close()
