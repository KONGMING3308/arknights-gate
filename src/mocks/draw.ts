/**
 * 用途：按本局种子，从「当天候选池」里随机抽出固定人数（入侵者数量固定），
 *       使每天人数与原来一致、但具体是谁每局不同。
 * 输入：候选池、当天要抽的人数、要抽的入侵者数量、种子。
 * 输出：抽好的申请人数组。
 * 依赖：无
 */

/** mulberry32：确定性伪随机 */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296
  }
}

export function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  const rand = seededRandom(seed)
  const list = [...items]
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    const a = list[i]
    const b = list[j]
    if (a !== undefined && b !== undefined) {
      list[i] = b
      list[j] = a
    }
  }
  return list
}

/**
 * 从池中抽固定人数：先按配额抽入侵者，再补足正常干员，最后打乱顺序。
 * 池子不足时按实际数量返回（不会凭空造人）。
 */
export function drawRoster<T extends { kind: string }>(
  pool: T[],
  total: number,
  impostorQuota: number,
  seed: number,
): T[] {
  const impostors = shuffleWithSeed(
    pool.filter((a) => a.kind === 'impostor'),
    seed + 11,
  )
  const operators = shuffleWithSeed(
    pool.filter((a) => a.kind !== 'impostor'),
    seed + 23,
  )

  const pickedImpostors = impostors.slice(0, Math.min(impostorQuota, impostors.length))
  const need = Math.max(0, total - pickedImpostors.length)
  const pickedOperators = operators.slice(0, Math.min(need, operators.length))

  return shuffleWithSeed([...pickedImpostors, ...pickedOperators], seed + 37)
}
