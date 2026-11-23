/**
 * 用途：读取 app.asar 内的文本文件（DSH 把源码打包在 asar 里，普通工具读不了）。
 * 输入：asar 内相对路径，如 node_modules/@deepseek-ai/dsh-llm-pi-ai/package.json
 * 输出：文件内容打印到 stdout（截断）。
 * 依赖：Node 内置 fs。
 */
import { readFileSync } from 'node:fs'

const ASAR = 'E:/DSH/resources/app.asar'
const target = process.argv[2]

const fd = readFileSync(ASAR)
const headerSize = fd.readUInt32LE(12)
const headerJson = fd.subarray(16, 16 + headerSize).toString('utf8')
const header = JSON.parse(headerJson)

function walk(node, parts) {
  if (!node || typeof node !== 'object') return null
  if (parts.length === 1) {
    const child = node.files?.[parts[0]]
    return child && typeof child === 'object' && 'offset' in child ? child : null
  }
  const next = node.files?.[parts[0]]
  return next ? walk(next, parts.slice(1)) : null
}

const parts = target.split('/').filter(Boolean)
const entry = walk(header, parts)
if (!entry) {
  console.error('未找到:', target)
  process.exit(1)
}
const start = 16 + headerSize + Number(entry.offset)
const buf = fd.subarray(start, start + entry.size)
const text = buf.toString('utf8')
console.log(text.slice(0, 20000))
