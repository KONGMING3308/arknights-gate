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
// 新手提示现在默认关闭，自动通关测试需要先手动开启（存档里直接置为 true）
await page.evaluate(() => {
  localStorage.clear()
  localStorage.setItem(
    'arknights-gate-save',
    JSON.stringify({
      state: { day: 1, slotIndex: 0, safety: 100, trust: 100, records: [], hintsEnabled: true, phase: 'review' },
      version: 2,
    }),
  )
})
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

    // 读游戏自己算出的破绽数（最可靠）+ 是否有人事备注
    const info = await page.evaluate(() => {
      const txt = document.body.innerText
      const m = txt.match(/已发现\s*(\d+)\s*处破绽/)
      return { hint: m ? Number(m[1]) : -1, hasNote: txt.includes('人事备注') }
    })
    const isAnomaly = name === '普瑞塞斯'
    // 正确打法：档案有换发备注 → 编号差异属正常，应批准；其余有破绽则拒
    const shouldReject = !isAnomaly && !info.hasNote && info.hint > 0

    if (shouldReject) await click('拒绝入境')
    else await click('批准入境')

    log.push({ day, name, hint: info.hint, note: info.hasNote, verdict: shouldReject ? 'reject' : 'approve' })

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
