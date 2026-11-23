/**
 * 用途：基于现有头像做「换一个人」的图像编辑（用于制造「照片与本人不符」）。
 * 输入：环境变量 GPT_API_KEY；命令行 <原图> <输出> <prompt>。
 * 输出：编辑后的 PNG。
 * 依赖：Node 26 内置 fetch / FormData
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { basename, dirname } from 'node:path'

const BASE = process.env.GPT_API_BASE || 'https://www.jiangeyun.xyz/v1'
const KEY = process.env.GPT_API_KEY
const MODEL = process.env.IMAGE_MODEL || 'gpt-image-2.6-flare'

if (!KEY) {
  console.error('缺少 GPT_API_KEY')
  process.exit(1)
}

const [srcPath, outPath, prompt] = process.argv.slice(2)
if (!srcPath || !outPath || !prompt) {
  console.error('用法: node gen_image_edit.mjs <原图> <输出> <prompt>')
  process.exit(1)
}

const buf = readFileSync(srcPath)
const form = new FormData()
form.append('model', MODEL)
form.append('prompt', prompt)
form.append('size', '1024x1024')
form.append('n', '1')
form.append('background', 'transparent')
form.append('output_format', 'png')
form.append('image', new Blob([buf], { type: 'image/png' }), basename(srcPath))

const res = await fetch(`${BASE}/images/edits`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${KEY}` },
  body: form,
})

const text = await res.text()
if (!res.ok) {
  console.error(`HTTP ${res.status}: ${text.slice(0, 400)}`)
  process.exit(2)
}

let json
try {
  json = JSON.parse(text)
} catch {
  console.error('非 JSON:', text.slice(0, 300))
  process.exit(3)
}

const item = json?.data?.[0]
if (!item) {
  console.error('无 data[0]:', JSON.stringify(json).slice(0, 300))
  process.exit(4)
}

mkdirSync(dirname(outPath), { recursive: true })
if (item.b64_json) {
  const out = Buffer.from(item.b64_json, 'base64')
  writeFileSync(outPath, out)
  console.log(JSON.stringify({ ok: true, mode: 'b64', bytes: out.length, out: outPath }))
} else if (item.url) {
  const img = await fetch(item.url)
  const out = Buffer.from(await img.arrayBuffer())
  writeFileSync(outPath, out)
  console.log(JSON.stringify({ ok: true, mode: 'url', bytes: out.length, out: outPath }))
} else {
  console.error('未知结构:', JSON.stringify(item).slice(0, 300))
  process.exit(5)
}
