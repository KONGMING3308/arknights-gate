/**
 * 用途：比对通行证与人事档案，找出材料之间的矛盾（供 ComparePanel 与新手提示使用）。
 * 输入：申请人、通行证、档案。输出：破绽列表。
 * 依赖：@/types
 */
import type { Applicant, Discrepancy, Dossier, Passport } from '@/types'
import { isRegisteredRecommender } from '@/constants/registry'

export function buildDiscrepancies(
  applicant: Applicant,
  passport: Passport,
  dossier: Dossier,
): Discrepancy[] {
  const list: Discrepancy[] = []

  // 担保人必须是本舰在册干员，派遣函明文规定
  if (!isRegisteredRecommender(applicant.recommender)) {
    list.push({
      field: '担保人',
      expected: '在册干员',
      actual: `${applicant.recommender}（名录查无此人）`,
      hint: '担保人不在本舰在册名录里，派遣函随之失效。',
    })
  }

  if (passport.stampType === 'missing') {
    list.push({
      field: '印章',
      expected: dossier.requiredSeal,
      actual: '缺失',
      hint: '通行证上根本没有入境章。',
    })
  } else if (passport.stampType === 'smudged') {
    list.push({
      field: '印章',
      expected: dossier.requiredSeal,
      actual: '污损，无法辨认',
      hint: '印章糊成一团，看不出是哪个机构盖的。',
    })
  } else if (passport.sealText !== dossier.requiredSeal) {
    list.push({
      field: '印章',
      expected: dossier.requiredSeal,
      actual: passport.sealText,
      hint: '盖章机构与罗德岛要求的不一致。',
    })
  }

  if (passport.number !== dossier.number) {
    list.push({
      field: '编号',
      expected: dossier.number,
      actual: passport.number,
      hint: dossier.note
        ? '编号与档案不一致——但档案里有换发备注，先去读备注再决定。'
        : '通行证编号与档案编号对不上，档案里也没有换发记录。',
    })
  }

  if (passport.holderName !== dossier.codeName) {
    list.push({
      field: '姓名',
      expected: dossier.codeName,
      actual: passport.holderName,
      hint: '通行证上的姓名不是档案在册的人。',
    })
  }

  if (!applicant.photoMatch) {
    list.push({
      field: '照片',
      expected: '与在册档案照片一致',
      actual: '本人与照片不符',
      hint: '通行证照片与本人对不上。',
    })
  }

  if (applicant.occupation !== dossier.occupation) {
    list.push({
      field: '职业',
      expected: dossier.occupation,
      actual: applicant.occupation,
      hint: '本人申报的职业与档案在册职业不一致。',
    })
  }

  if (dossier.status === 'missing') {
    list.push({
      field: '档案状态',
      expected: '在册',
      actual: '查无此人',
      hint: '人事档案里没有这个人。',
    })
  }

  if (dossier.status === 'revoked') {
    list.push({
      field: '档案状态',
      expected: '在册',
      actual: '已注销',
      hint: '该干员档案已注销，不应再以本人身份入境。',
    })
  }

  // 言行不符：证件全对，只有问话能发现破绽
  if (applicant.dialogueConflict) {
    list.push({
      field: '言行',
      expected: '与证件一致',
      actual: applicant.dialogueConflict,
      hint: '他的说法与证件对不上。',
    })
  }

  return list
}
