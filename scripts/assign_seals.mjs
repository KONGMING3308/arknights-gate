/**
 * 用途：给全部通行证补充 sealId（印章图案 id），并按需要调整个别入侵者的印章类型，
 *       使 5 种印章状态（standard / wrong_dept / foreign / fake / smudged / none）全部出现。
 * 输入：src/mocks/roster*.ts
 * 输出：就地修改
 * 依赖：Node 内置 fs
 */
import { readFileSync, writeFileSync } from 'node:fs'

const FILES = [
  'roster.ts', 'roster.d2.ts', 'roster.d2.extra.ts', 'roster.d3.ts', 'roster.d3.extra.ts',
  'roster.d4.ts', 'roster.d4.extra.ts', 'roster.d4.docs.ts',
  'roster.d5.ts', 'roster.d5.extra.ts', 'roster.d5.docs.ts',
  'roster.d1.pool.passports.ts', 'roster.d2.pool.passports.ts', 'roster.d3.pool.passports.ts',
  'roster.d4.pool.passports.ts', 'roster.d5.pool.passports.ts',
]

/** 需要指定特殊印章的角色（按 holderName） */
const SEAL_OVERRIDE = {
  崖心: 'fake', // D1 入侵者：仿真假章（双圈+星形都对，但字体细、色浅、比例不同）
  鞭刃: 'foreign', // D5 入侵者：完全错误的机构章
  蓝毒: 'smudged',
  米格鲁: 'smudged',
  闪灵: 'wrong_dept',
  变形者集群: 'none',
  早露: 'none',
}

/** 印章 id 对应的 sealText（供 UI/日志使用） */
const SEAL_TEXT = {
  standard: '罗德岛人事部',
  wrong_dept: '罗德岛后勤部',
  foreign: '其他机构',
  fake: '罗德岛人事部（形制不符）',
  smudged: '污损，无法辨认',
  none: '无',
}

let added = 0
let overridden = 0

for (const f of FILES) {
  const path = `src/mocks/${f}`
  let text
  try {
    text = readFileSync(path, 'utf8')
  } catch {
    continue
  }

  // 逐条通行证处理：匹配 holderName 与 stampType/sealText 区块
  const blocks = text.split(/\n  '/)
  const out = [blocks[0]]

  for (let i = 1; i < blocks.length; i += 1) {
    let b = blocks[i]
    const holder = b.match(/holderName: '([^']+)'/)?.[1]
    const stamp = b.match(/stampType: '(clear|smudged|missing)'/)?.[1]
    const sealText = b.match(/sealText: '([^']*)'/)?.[1]

    if (!holder || !stamp) {
      out.push(b)
      continue
    }

    // 决定 sealId
    let sealId
    if (SEAL_OVERRIDE[holder]) {
      sealId = SEAL_OVERRIDE[holder]
      overridden += 1
      // 同步 stampType / sealText，保持数据自洽
      const newStamp = sealId === 'none' ? 'missing' : sealId === 'smudged' ? 'smudged' : 'clear'
      b = b.replace(/stampType: '(clear|smudged|missing)'/, `stampType: '${newStamp}'`)
      b = b.replace(/sealText: '[^']*'/, `sealText: '${SEAL_TEXT[sealId]}'`)
    } else {
      if (stamp === 'missing') sealId = 'none'
      else if (stamp === 'smudged') sealId = 'smudged'
      else if (sealText === '罗德岛人事部') sealId = 'standard'
      else if ((sealText ?? '').includes('后勤')) sealId = 'wrong_dept'
      else sealId = 'foreign'
    }

    // 已有 sealId 则替换，否则插在 sealText 后
    if (/sealId: '[^']*'/.test(b)) {
      b = b.replace(/sealId: '[^']*'/, `sealId: '${sealId}'`)
    } else {
      b = b.replace(/(sealText: '[^']*',)/, `$1\n    sealId: '${sealId}',`)
      added += 1
    }
    out.push(b)
  }

  writeFileSync(path, out.join("\n  '"), 'utf8')
}

console.log(`新增 sealId：${added} 条，特殊指定：${overridden} 条`)
