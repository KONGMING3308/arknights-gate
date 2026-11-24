/**
 * 用途：修正 pool2 中因人名替换导致称呼/语义错乱的担保人台词。
 *       原则：不再使用职务称呼（教官/骑士/姐姐/先生等），改成中性表述。
 * 输入：src/mocks/roster.dN.pool2.ts
 * 输出：就地修正
 * 依赖：Node 内置 fs
 */
import { readFileSync, writeFileSync } from 'node:fs'

/** 需要重写的句子：[代号, 新台词] */
const REWRITE = {
  年: '担保人是银灰。他的印章我核对过，没问题。',
  迷迭香: '杜宾签的字。她带过我一段，认得我。',
  铃兰: '担保人填的是芙蓉，手续都是她经手的。',
  桃金娘: '临光替我做的保。她答应的事从不反悔。',
  稀音: '博士……签的字……我确认过……',
  达格达: '塞雷娅担保。她的名字在册，你可以查。',
  惊蛰: '杜宾担保我。她的规矩，我守得起。',
  夜刀: '嘉维尔给我担保。她的名字在册上，查得到。',
  红隼: '阿米娅担保。她亲自过问过我这次轮换。',
  泡泡: '银灰担保的。他说过会认这笔账。',
  褐果: '嘉维尔女士担保，手续齐全，随时可查。',
  微风: '塞雷娅担保我。她的签名在推荐函末尾。',
  卡达: '凯尔希担保我。她的名字在册上，一查就知道。',
  惊蛰_备用: '',
}

const FILES = ['roster.d1.pool2.ts', 'roster.d2.pool2.ts', 'roster.d3.pool2.ts', 'roster.d4.pool2.ts', 'roster.d5.pool2.ts']

let fixed = 0
const done = []

for (const f of FILES) {
  const path = `src/mocks/${f}`
  let text = readFileSync(path, 'utf8')
  const blocks = text.split('\n  {')

  for (let i = 1; i < blocks.length; i += 1) {
    let b = blocks[i]
    const name = b.match(/codeName: '([^']+)'/)?.[1]
    if (!name || !REWRITE[name]) continue

    const m = b.match(/\{ question: '担保人', answer: '[^']*' \}/)
    if (!m) continue

    b = b.replace(m[0], `{ question: '担保人', answer: '${REWRITE[name]}' }`)
    blocks[i] = b
    fixed += 1
    done.push(name)
  }

  writeFileSync(path, blocks.join('\n  {'), 'utf8')
}

console.log(`重写 ${fixed} 句：${done.join('、')}`)
