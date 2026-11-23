/**
 * 用途：验证新增的两类机制是否打破了「见破绽就拒」的必胜法。
 *       策略 A（旧必胜法）：破绽数 > 0 就拒绝
 *       策略 B（正确策略）：认读档案备注 + 依赖言行破绽
 * 输入：dev server。
 * 输出：两种策略的判错次数对比。
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
  defaultViewport: { width: 1600, height: 1000 },
})

/** 跑一局，strategy: 'naive' | 'smart' */
async function play(strategy) {
  const page = await browser.newPage()
  await page.setCacheEnabled(false)
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

  const who = () =>
    page.evaluate(() => {
      const p = [...document.querySelectorAll('p')].find((x) => x.textContent?.includes('当前申请人：'))
      return p ? p.textContent.split('：').pop().trim() : null
    })

  const path = () => page.evaluate(() => location.pathname)
  const results = []

  for (let day = 1; day <= 5; day += 1) {
    for (let guard = 0; guard < 14; guard += 1) {
      if ((await path()) !== '/review') break
      const name = await who()
      if (!name) break

      await page.evaluate(() => {
        ;[...document.querySelectorAll('button')]
          .filter((b) => ['代号', '来意', '担保人'].some((q) => b.textContent?.trim() === q))
          .forEach((b) => b.click())
      })
      await click('调取档案')
      await sleep(950)

      const info = await page.evaluate(() => {
        const txt = document.body.innerText
        const hint = txt.match(/已发现\s*(\d+)\s*处破绽/)
        return {
          count: hint ? Number(hint[1]) : -1,
          hasNote: txt.includes('人事备注'),
          hasSpeechMismatch: txt.includes('言行'),
          isAnomaly: txt.includes('校验失败'),
        }
      })

      // 判断策略
      let reject
      if (info.isAnomaly) reject = false
      else if (strategy === 'naive') reject = info.count > 0
      else {
        // smart：档案有备注 → 编号差异属正常换发，应批准；其余有破绽则拒
        reject = info.hasNote ? false : info.count > 0
      }

      if (reject) await click('拒绝入境')
      else await click('批准入境')
      results.push({ day, name, count: info.count, hasNote: info.hasNote, speech: info.hasSpeechMismatch, reject })

      await sleep(600)
      for (let k = 0; k < 16; k += 1) {
        const inEvent = await page.evaluate(() => document.body.innerText.includes('呼叫 S.W.E.E.P.'))
        if (!inEvent) break
        await click('呼叫 S.W.E.E.P.')
        await sleep(85)
      }
      await sleep(2500)
    }
    if ((await path()) === '/day-end') {
      await click(day === 5 ? '查看评级' : '进入下一天')
      await sleep(900)
    }
  }

  const summary = await page.evaluate(() => document.body.innerText.replace(/\n+/g, ' ').slice(0, 200))
  await page.close()
  return { results, summary }
}

const naive = await play('naive')
const smart = await play('smart')

function score(s) {
  const m = s.summary.match(/判断正确\s*(\d+)\s*人/)
  const safety = s.summary.match(/最终安全度\s*\|?\s*(\d+)/)
  return { correct: m ? Number(m[1]) : -1, raw: s.summary.slice(0, 120) }
}

console.log(
  JSON.stringify(
    {
      strategyA_naive: {
        handled: naive.results.length,
        noteCases: naive.results.filter((r) => r.hasNote).length,
        result: score(naive),
      },
      strategyB_smart: {
        handled: smart.results.length,
        noteCases: smart.results.filter((r) => r.hasNote).length,
        result: score(smart),
      },
    },
    null,
    1,
  ),
)
await browser.close()
