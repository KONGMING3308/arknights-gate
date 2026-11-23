/**
 * 用途：用 WebAudio 合成游戏音效，避免引入音频文件。
 * 输入：音效类型。输出：播放效果。
 * 依赖：浏览器 AudioContext
 */

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    ctx = new Ctor()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/** 枪声：短促的低频爆裂 + 噪声 */
export function playGunshot(): void {
  const ac = getCtx()
  if (!ac) return
  const now = ac.currentTime

  const noiseLen = 0.35
  const buffer = ac.createBuffer(1, ac.sampleRate * noiseLen, ac.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i += 1) {
    const decay = Math.pow(1 - i / data.length, 3)
    data[i] = (Math.random() * 2 - 1) * decay
  }
  const noise = ac.createBufferSource()
  noise.buffer = buffer
  const noiseFilter = ac.createBiquadFilter()
  noiseFilter.type = 'lowpass'
  noiseFilter.frequency.setValueAtTime(1800, now)
  noiseFilter.frequency.exponentialRampToValueAtTime(220, now + noiseLen)
  const noiseGain = ac.createGain()
  noiseGain.gain.setValueAtTime(0.55, now)
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + noiseLen)
  noise.connect(noiseFilter).connect(noiseGain).connect(ac.destination)
  noise.start(now)

  const thump = ac.createOscillator()
  thump.type = 'sine'
  thump.frequency.setValueAtTime(140, now)
  thump.frequency.exponentialRampToValueAtTime(38, now + 0.22)
  const thumpGain = ac.createGain()
  thumpGain.gain.setValueAtTime(0.5, now)
  thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.24)
  thump.connect(thumpGain).connect(ac.destination)
  thump.start(now)
  thump.stop(now + 0.26)
}

/** 盖章：短促的闷响 */
export function playStamp(): void {
  const ac = getCtx()
  if (!ac) return
  const now = ac.currentTime
  const osc = ac.createOscillator()
  osc.type = 'square'
  osc.frequency.setValueAtTime(180, now)
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.09)
  const gain = ac.createGain()
  gain.gain.setValueAtTime(0.18, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11)
  osc.connect(gain).connect(ac.destination)
  osc.start(now)
  osc.stop(now + 0.12)
}

/** 翻页/点击：轻微提示音 */
export function playTick(): void {
  const ac = getCtx()
  if (!ac) return
  const now = ac.currentTime
  const osc = ac.createOscillator()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(880, now)
  const gain = ac.createGain()
  gain.gain.setValueAtTime(0.05, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
  osc.connect(gain).connect(ac.destination)
  osc.start(now)
  osc.stop(now + 0.06)
}
