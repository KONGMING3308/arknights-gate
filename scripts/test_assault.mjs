/**
 * 用途：验证「担保失效」与「拒后暴起」两条新链路。
 * 输入：dev server。
 * 输出：截图 + 断言结果。
 * 依赖：puppeteer-core + 本机 Edge
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
const results = []

const setSave = async (page, day, slot) => {
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
  await page.evaluate(
    (d, s) => {
      localStorage.setItem(
        'arknights-gate-save',
        JSON.stringify({
          state: {
            day: d,
            slotIndex: s,
            safety: 100,
            trust: 100,
            records: [],
            hintsEnabled: true,
            phase: 'review',
          },
          version: 0,
        }),
      )
    },
    day,
    slot,
  )
  await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
  await sleep(1400)
}

const click = (page, t) =>
  page.evaluate((txt) => {
    const b = [...document.querySelectorAll('button')].find((x) => x.textContent?.trim().includes(txt))
    if (!b) return false
    b.click()
    return true
  }, t)

// 用例 A：闪灵——担保人不在册，派遣函应显示失效标记
{
  const page = await browser.newPage()
  await setSave(page, 5, 1)
  await click(page, '调取档案')
  await sleep(1100)
  await page.screenshot({ path: `${OUT}/40-sponsor-invalid.png` })
  const text = await page.evaluate(() => document.body.innerText)
  results.push({
    case: 'A 担保失效提示与破绽',
    pass: text.includes('担保失效') && text.includes('已发现 3 处破绽'),
    detail: text.includes('担保失效') ? '派遣函有失效标记' : '缺少失效标记',
  })
  await page.close()
}

// 用例 B：拒绝能天使 → 触发第一人称场景；命中后结算为处决
{
  const page = await browser.newPage()
  await setSave(page, 4, 1)
  await click(page, '拒绝入境')
  await sleep(900)
  const inScene = await page.evaluate(() => document.body.innerText.includes('对方突然暴起'))
  await page.screenshot({ path: `${OUT}/41-assault-scene.png` })

  // 瞄准屏幕中心并开火
  await page.mouse.move(800, 500)
  await page.mouse.down()
  await page.mouse.up()
  await sleep(60)
  await page.screenshot({ path: `${OUT}/44-assault-hit.png` })
  await sleep(180)
  await page.screenshot({ path: `${OUT}/45-assault-impact.png` })
  await sleep(1400)
  const afterHit = await page.evaluate(() => ({
    path: location.pathname,
    stillScene: document.body.innerText.includes('对方突然暴起'),
  }))
  await page.screenshot({ path: `${OUT}/42-assault-result.png` })
  results.push({
    case: 'B 拒绝触发 FPS 并命中',
    pass: inScene && !afterHit.stillScene,
    detail: `进入场景=${inScene} 场景已结束=${!afterHit.stillScene} path=${afterHit.path}`,
  })
  await page.close()
}

// 用例 C：主界面提示开关可切换
{
  const page = await browser.newPage()
  await setSave(page, 1, 0)
  await click(page, '调取档案')
  await sleep(1100)
  const before = await page.evaluate(() => document.body.innerText.includes('已发现 0 处破绽'))
  await click(page, '破绽提示')
  await sleep(400)
  const after = await page.evaluate(() => document.body.innerText.includes('新手提示已关闭'))
  await page.screenshot({ path: `${OUT}/43-hint-toggle.png` })
  results.push({ case: 'C 主界面提示开关', pass: before && after, detail: `切换前=${before} 切换后=${after}` })
  await page.close()
}

console.log(JSON.stringify(results, null, 1))
await browser.close()
