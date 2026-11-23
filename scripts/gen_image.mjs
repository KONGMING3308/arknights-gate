/**
 * 用途：调用中转站 images/generations 生成游戏素材图并落盘。
 * 输入：环境变量 GPT_API_KEY；命令行 prompt 与输出路径。
 * 输出：PNG 文件 + 服务端返回摘要。
 * 依赖：Node 26 内置 fetch（无第三方包）。
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const BASE = process.env.GPT_API_BASE || 'https://www.jiangeyun.xyz/v1'
const KEY = process.env.GPT_API_KEY
const MODEL = process.env.IMAGE_MODEL || 'gpt-image-2.6-flare'

if (!KEY) {
  console.error('缺少 GPT_API_KEY')
  process.exit(1)
}

const [prompt, outPath] = process.argv.slice(2)
if (!prompt || !outPath) {
  console.error('用法: node gen_image.mjs "<prompt>" <out.png>')
  process.exit(1)
}

const body = {
  model: MODEL,
  prompt,
  n: 1,
  size: '1024x1024',
  quality: 'high',
  background: 'transparent',
  output_format: 'png',
}

const res = await fetch(`${BASE}/images/generations`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
  body: JSON.stringify(body),
})

const text = await res.text()
if (!res.ok) {
  console.error(`HTTP ${res.status}: ${text.slice(0, 500)}`)
  process.exit(2)
}

let json
try {
  json = JSON.parse(text)
} catch {
  console.error('非 JSON 响应:', text.slice(0, 300))
  process.exit(3)
}

const item = json?.data?.[0]
if (!item) {
  console.error('无 data[0]:', JSON.stringify(json).slice(0, 400))
  process.exit(4)
}

mkdirSync(dirname(outPath), { recursive: true })

if (item.b64_json) {
  const buf = Buffer.from(item.b64_json, 'base64')
  writeFileSync(outPath, buf)
  console.log(JSON.stringify({ ok: true, mode: 'b64', bytes: buf.length, out: outPath, revised: item.revised_prompt?.slice(0, 80) }))
} else if (item.url) {
  const img = await fetch(item.url)
  const buf = Buffer.from(await img.arrayBuffer())
  writeFileSync(outPath, buf)
  console.log(JSON.stringify({ ok: true, mode: 'url', bytes: buf.length, out: outPath, contentType: img.headers.get('content-type') }))
} else {
  console.error('未知返回结构:', JSON.stringify(item).slice(0, 400))
  process.exit(5)
}
