/**
 * 用途：所有用户可见文案集中管理（AGENT.md 要求）。
 * 输入：无。输出：文案常量。依赖：无。
 */

export const APP_TITLE = '这不是我的干员'
export const APP_SUBTITLE = 'RHODES ISLAND · BORDER INSPECTION'
export const APP_VERSION = 'v1.3'
export const ISSUER_LINE = 'RHODES ISLAND'

export const ACTION_LABEL = {
  approve: '批准入境',
  reject: '拒绝入境',
} as const

export const QUESTION_LABEL = {
  codeName: '代号',
  intent: '来意',
  recommender: '担保人',
} as const

export const HINT_LABEL = {
  master: '新手提示',
  on: '已开启',
  off: '已关闭',
  toggle: '新手提示',
}

export const SWEEP_COPY = {
  alert: '对方的手正伸过来',
  call: '呼叫 S.W.E.E.P.',
  tapHint: '连点呼叫',
  successTitle: '非法入侵的变形者已被处决',
  successBody: 'S.W.E.E.P. 已控制现场。审查官，请继续值班。',
  failTitle: '增援未能及时抵达',
  failBody: '你被拖进黑暗里——安全度下降。',
}

export const TITLE_SCREEN = {
  start: '开始值班',
  continue: '继续上次',
  warning: '误拒干员会损失信任，放走入侵者会损失安全。任何一项归零，你就被免职。',
}

/**
 * 标题页的背景通告（玩家身份 + 变形者威胁 + 审核职责），落款凯尔希。
 * 文案经 opencode 分组模型润色后按段落拆分，便于在标题页排版。
 */
export const INTRO_NOTICE = {
  title: '关于入舰人员身份核验的内部通告',
  classification: 'HR · NOTICE 07',
  paragraphs: [
    '近三月来，变形者渗透本舰的迹象持续增加。其伪装手段尚处学习阶段——证件编号错位、印章规格异常、影像与本人不符、问询应答失当，这些破绽仍可辨识。',
    '人事部审查岗须逐项核验材料与人员实况，独立作出批准或不批准的裁定。',
    '误拒将损耗干员信任，放行入侵者则危及全舰安全。二者代价均不可承受。望各审查员恪守规程，审慎履职。',
  ],
  department: '罗德岛人事部',
  signature: '凯尔希',
}

export const REVIEW_SCREEN = {
  loadingRoster: '正在调取今日名单…',
  loadingPassport: '正在读取通行证…',
  dayPrefix: '第',
  daySuffix: '日',
  slotPrefix: '待审',
  safety: '安全度',
  trust: '信任度',
  openDossier: '调取档案',
  dossierLoading: '正在检索人事档案…',
  dossierEmpty: '尚未调取档案。先看过通行证，再决定是否调档。',
  passport: '通行证',
  dossier: '人事档案',
  compare: '材料比对',
  compareHint: '点开两侧材料，自行核对。破绽不会自动标红。',
  dialogue: '询问',
  asked: '已问',
  tabApplicant: '申请人',
  tabDocuments: '证件',
  tabDossier: '档案',
  fieldLabel: {
    number: '编号',
    holderName: '姓名',
    issueDate: '签发日期',
    expiryDate: '有效至',
    route: '路线',
    seal: '印章',
    occupation: '职业',
    origin: '出身',
    recommender: '担保人',
    status: '档案状态',
    photo: '照片',
  },
  stampType: {
    clear: '清晰',
    smudged: '模糊',
    missing: '缺失',
  },
  dossierStatus: {
    active: '在册',
    missing: '查无此人',
    revoked: '已注销',
  },
}

export const RESULT_TEXT = {
  approve: '批准入境',
  reject: '拒绝入境',
  correct: '判断正确',
  wrong: '判断失误',
}

export const DAY_END = {
  kicker: 'RHODES ISLAND · DAY',
  title: '今日值班结束',
  next: '进入下一天',
  final: '查看评级',
  noVisitor: '今天没有人来过。',
  summaryPrefix: '共处置',
  summaryMiddle: '人，判断正确',
  summarySuffix: '人。',
  safety: '安全度',
  trust: '信任度',
  safetyDelta: '安全度变化',
  trustDelta: '信任度变化',
  records: '今日处置记录',
}

export const ENDING = {
  kicker: 'RHODES ISLAND · INSPECTION CLOSED',
  title: '审查结束',
  restart: '重新值班',
  grade: '评级',
  safety: '最终安全度',
  trust: '最终信任度',
  summaryPrefix: '共处置',
  summaryMiddle: '人，判断正确',
  summarySuffix: '人。',
}

export const FAIL_TEXT = {
  safety: '安全度归零。入侵者已经进入本舰，你被免职。',
  trust: '信任度归零。干员们不再信任审查官，你被调离岗位。',
}

export const FOOTER_TEXT = '同人作品 · 非商业 · 设定归鹰角网络所有'

export const PASSPORT_COPY = {
  photoMatch: '与本人相符',
  photoMismatch: '与本人不符',
  photoPending: '待人工核验',
  noStamp: '无入境章',
  todayPrefix: '今日',
  sealHint: '对照标准章核对',
  smudged: '污损',
  entry: '入境',
  stampApprove: '已批准',
  stampReject: '已拒绝',
}

export const APPLICANT_COPY = {
  race: '种族',
  origin: '出身',
  occupation: '申报职业',
  idle: '申请人站在窗口，等你开口。三个问题，问不问由你。',
  questionPrefix: '问：',
}

export const DISPATCH_COPY = {
  title: '派遣函 · DISPATCH',
  form: 'Form 07-B',
  target: '派遣对象',
  intent: '申报来意',
  recommender: '担保人',
  note: '本函与通行证同时有效。担保人须为在册干员。',
  sign: '人事部 · 签',
  invalid: '担保失效 · 担保人不在本舰名录，本函不具备效力',
}

export const STATION_COPY = {
  name: '入境审查台',
}

export const ACTION_BAR_HINT = '签字前请核对：编号 · 姓名 · 印章 · 照片 · 担保人'

export const ACTION_BAR_DELTA = {
  safety: '安全度',
  trust: '信任度',
}

export const DOSSIER_COPY = {
  requiredSeal: '入境章要求',
  ruleNote: '档案编号与通行证编号应完全一致 · 印章机构必须为',
  sealSample: '标准入境章样张',
  sealSampleHint: '档案附有章样：机构名「罗德岛人事部」、边框与中心纹样都应与此一致。',
  hintPrefix: '新手提示：',
  hintReady: '调取档案后可核对',
  hintCount: '已发现',
  hintUnit: '处破绽',
  hintFieldsPrefix: '（',
  hintFieldsSuffix: '）',
  hintOff: '新手提示已关闭，自行核对。',
  invalid: '校验失败：该申请人的材料无法按常规规则核对。',
  notePrefix: '人事备注：',
  currentApplicant: '当前申请人：',
}
