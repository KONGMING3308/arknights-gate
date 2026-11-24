/**
 * 用途：验证 v1.1 的三项改动——日期破绽、印章图片、扩充后的随机池。
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
  defaultViewport: { width: 1600, height: 1000 },
})
const results = []

const open = async (day, slot) => {
  const page = await browser.newPage()
  await page.setCacheEnabled(false)
  await page.goto(BASE + '/', { waitUntil: 'networkidle2' })
  await page.evaluate(
    (d, s) =>
      localStorage.setItem(
        'arknights-gate-save',
        JSON.stringify({
          state: { day: d, slotIndex: s, safety: 100, trust: 100, records: [], hintsEnabled: true, phase: 'review' },
          version: 2,
        }),
      ),
    day,
    slot,
  )
  await page.goto(BASE + '/review', { waitUntil: 'networkidle2' })
  await sleep(1300)
  return page
}

// 1) 印章改为图片渲染
{
  const page = await open(1, 0)
  await page.evaluate(() => {
    ;[...document.querySelectorAll('button')].find((b) => b.textContent?.includes('调取档案'))?.click()
  })
  await sleep(1000)
  const info = await page.evaluate(() => ({
    sealImgs: [...document.querySelectorAll('img')].filter((i) => (i.getAttribute('src') ?? '').includes('/seals/')).length,
    sealLoaded: [...document.querySelectorAll('img')]
      .filter((i) => (i.getAttribute('src') ?? '').includes('/seals/'))
      .every((i) => i.naturalWidth > 0),
    hasSealHint: document.body.innerText.includes('对照标准章核对'),
  }))
  results.push({
    case: '1 印章以图片渲染且加载成功',
    pass: info.sealImgs >= 1 && info.sealLoaded && info.hasSealHint,
    detail: `图片数=${info.sealImgs} 已加载=${info.sealLoaded} 提示=${info.hasSealHint}`,
  })
  await page.close()
}

// 2) 艾雅法拉日期倒置破绽（随机抽取，多试几轮）
{
  let found = false
  let detail = ''
  for (let attempt = 0; attempt < 6 && !found; attempt += 1) {
    for (let slot = 0; slot < 9 && !found; slot += 1) {
    const page = await open(3, slot)
      const name = await page.evaluate(() => {
        const p = [...document.querySelectorAll('p')].find((x) => x.textContent?.includes('当前申请人：'))
        return p ? p.textContent.split('：').pop().trim() : ''
      })
      if (name === '艾雅法拉') {
      await page.evaluate(() => {
        ;[...document.querySelectorAll('button')].find((b) => b.textContent?.includes('调取档案'))?.click()
      })
      await sleep(1000)
      const txt = await page.evaluate(() => document.body.innerText)
      const hasDate = txt.includes('日期') && /1097-04-12/.test(txt) && /1096-04-11/.test(txt)
      results.push({
        case: '2 艾雅法拉日期倒置可检出',
        pass: hasDate,
        detail: `显示日期破绽=${txt.includes('日期')} 签发/到期是否可见=${hasDate}`,
      })
        found = true
      }
      await page.close()
    }
  }
  if (!found) results.push({ case: '2 艾雅法拉日期倒置可检出', pass: false, detail: '多轮未抽到艾雅法拉（随机池）' })
}

// 3) 五个印章图片文件都能通过 HTTP 取到
{
  const page = await browser.newPage()
  const codes = {}
  for (const id of ['standard', 'wrong_dept', 'foreign', 'fake', 'smudged']) {
    const r = await page.goto(`${BASE}/assets/seals/seal_${id}.png`)
    codes[id] = r.status()
  }
  await page.close()
  results.push({
    case: '3 五种印章素材可访问',
    pass: Object.values(codes).every((c) => c === 200 || c === 304),
    detail: JSON.stringify(codes),
  })
}

console.log(JSON.stringify(results, null, 1))
await browser.close()
