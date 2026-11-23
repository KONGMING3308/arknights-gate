/**
 * 用途：为打破「见破绽就拒」的必胜法，注入两类新情况：
 *       ① 备注自证型正常干员：编号不一致，但档案有「换发」备注 → 实际合规
 *       ② 言行不符型入侵者：证件全对，只有问话能发现他说错担保人
 * 输入：src/mocks/roster.dN.pool*.ts
 * 输出：就地修改
 * 依赖：Node 内置 fs
 */
import { readFileSync, writeFileSync } from 'node:fs'

/** 每天：备注型正常干员 + 言行型入侵者（D5 终局不加言行型） */
const PLAN = {
  1: { noteOp: '斯卡蒂', noteOld: 'RI-0101-100', conflictImp: '崖心', wrongSponsor: '银灰', realSponsor: '临光' },
  2: { noteOp: '古米', noteOld: 'RI-0201-100', conflictImp: '送葬人', wrongSponsor: '阿米娅', realSponsor: '塞雷娅' },
  3: { noteOp: '暗索', noteOld: 'RI-0301-100', conflictImp: '麦哲伦', wrongSponsor: '凯尔希', realSponsor: '嘉维尔' },
  4: { noteOp: '星极', noteOld: 'RI-0401-100', conflictImp: '白雪', wrongSponsor: '嘉维尔', realSponsor: '芙蓉' },
}

for (let day = 1; day <= 5; day += 1) {
  const plan = PLAN[day]

  const appPath = `src/mocks/roster.d${day}.pool.ts`
  const passPath = `src/mocks/roster.d${day}.pool.passports.ts`
  const dosPath = `src/mocks/roster.d${day}.pool.dossiers.ts`

  let app = readFileSync(appPath, 'utf8')
  let pass = readFileSync(passPath, 'utf8')
  let dos = readFileSync(dosPath, 'utf8')

  if (plan) {
    // ---- ① 备注自证型正常干员：编号改掉，档案加备注 ----
    const opBlock = app.split('\n  {').find((b) => b.includes(`codeName: '${plan.noteOp}'`))
    if (opBlock) {
      const oldNum = opBlock.match(/passportNumber: '([^']+)'/)?.[1]
      if (oldNum) {
        const newNum = oldNum.replace(/-(\d+)$/, (m, n) => `-${String(Number(n) + 500)}`)
        // applicant 的 passportNumber 保持新号，dossierNumber 用旧号
        app = app.replace(
          new RegExp(`(codeName: '${plan.noteOp}'[\\s\\S]*?passportNumber: ')${oldNum}(')`),
          `$1${newNum}$2`,
        )
        // 通行证也用新号
        pass = pass.replace(
          new RegExp(`(holderName: '${plan.noteOp}'[\\s\\S]*?number: ')${oldNum}(')`),
          `$1${newNum}$2`,
        )
        // 档案编号保持旧号，并加备注
        dos = dos.replace(
          new RegExp(`(  ${plan.noteOp}: \\{[\\s\\S]*?requiredSeal: '罗德岛人事部',)`),
          `$1\n    note: '编号已换发：旧号 ${oldNum} 换发为 ${newNum}，换发记录在本部备案。',`,
        )
        console.log(`D${day} 备注型：${plan.noteOp} 通行证 ${newNum} / 档案 ${oldNum} + 换发备注`)
      }
    }

    // ---- ② 言行不符型入侵者：清掉数据破绽，改为台词说错担保人 ----
    const impBlock = app.split('\n  {').find((b) => b.includes(`codeName: '${plan.conflictImp}'`))
    if (impBlock) {
      const impId = impBlock.match(/id: '([^']+)'/)?.[1]
      // 通行证：印章改清晰、编号与档案一致
      pass = pass.replace(
        new RegExp(`('${impId}': \\{[\\s\\S]*?)stampType: '(smudged|missing)'([\\s\\S]*?sealText: ')[^']*'`),
        `$1stampType: 'clear'$3罗德岛人事部'`,
      )
      const dosNum = dos.match(new RegExp(`  ${plan.conflictImp}: \\{[\\s\\S]*?number: '([^']+)'`))?.[1]
      if (dosNum) {
        pass = pass.replace(
          new RegExp(`('${impId}': \\{[\\s\\S]*?number: ')[^']+(')`),
          `$1${dosNum}$2`,
        )
        app = app.replace(
          new RegExp(`(codeName: '${plan.conflictImp}'[\\s\\S]*?passportNumber: ')[^']+(')`),
          `$1${dosNum}$2`,
        )
      }
      // 档案：状态改回在册
      dos = dos.replace(
        new RegExp(`(  ${plan.conflictImp}: \\{[\\s\\S]*?status: ')(missing|revoked)(')`),
        `$1active$3`,
      )
      console.log(`D${day} 言行型：${plan.conflictImp} 证件全部改正确（编号/印章/档案状态）`)
    }
  }

  writeFileSync(appPath, app, 'utf8')
  writeFileSync(passPath, pass, 'utf8')
  writeFileSync(dosPath, dos, 'utf8')
}

console.log('数据注入完成')
