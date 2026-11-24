# 这不是我的干员 v1.0

> 原名《罗德岛入境审查》 · RHODES ISLAND BORDER INSPECTION

《请出示证件》式审查玩法的**明日方舟同人网页游戏**原型。你扮演罗德岛入境口岸的审查官：
比对通行证、人事档案、派遣函与申请人本人的陈述，决定批准或拒绝。

> 同人作品，非商业用途，设定版权归鹰角网络所有。

## 快速开始

```bash
npm install
npm run dev
```

(已修改）

生产构建：

```bash
npm run build
npm run preview
```

## 玩法

你是罗德岛入境口岸的审查官。每天有干员和访客要求登舰，其中混着不该进来的人。

- **比对材料**：通行证、人事档案、派遣函与本人陈述，找出矛盾（编号、印章、照片、职业、担保人）
- **处置**：批准入境 / 拒绝入境（已移除射击系统）
- **求援事件**：拒绝入侵者时，对方可能「突脸」——手剪影伸向屏幕，你需要连点「呼叫 S.W.E.E.P.」呼叫增援，成功后阿斯卡纶登场处置。
  - 变形者集群**必定**突脸；其余入侵者约 **35%** 概率触发（`SWEEP.chance`）
- **失败条件**：安全度或信任度任一归零
- **特殊存在**：普瑞塞斯会随机出现在第 3–5 天，所有材料都是乱码，放行或拒绝都不计分

## 当前进度

- ✅ 5 天 33 位申请人（32 位固定 + 普瑞塞斯随机 1 位），9 名入侵者
- ✅ 完整链路：问话 → 调档 → 比对 → 批准 / 拒绝 → 求援事件 → 每日结算 → 最终评级
- ✅ 伪造手法逐天升级：印章污损 → 编号不符 → 照片干扰/职业不符 → 冒名在册干员 → 多重破绽
- ✅ 键盘快捷键：`1` 批准、`2` 拒绝
- ✅ 存档续玩（localStorage）、新手提示开关、WebAudio 合成音效
- ⏳ 待打磨：数值平衡（全对时总分远高于 S 线）、移动端适配

## 目录结构

```
src/
  api/          所有数据请求 + mock 开关（client.ts / gameApi.ts）
  components/   跨页复用组件（Button / Panel / StatBar / Stamp / DayHeader）
  constants/    数值常量（game.ts）、文案（copy.ts）、武器素材（weapon.ts）
  hooks/        自定义 hooks（useHotkeys）
  mocks/        剧本数据（roster.ts 为第 1 天，d2~d5 为后续天数）
  pages/        每个页面一个文件夹
    TitleScreen/  Review/  DayEnd/  Ending/
  store/        Zustand 全局状态（gameStore.ts）
  types/        全局类型（index.ts，与 docs/04 一一对应）
  utils/        比对规则（compare.ts）、结算规则（verdict.ts）、音效（audio.ts）
public/
  assets/portraits/   21 张干员头像（来源 prts.wiki）
  assets/weapons/     M1911 素材（AI 生成，透明背景）
docs/           产品文档 00–06
scripts/        素材抓取、生图、截图验收脚本
```

## 切换到真实接口

1. 复制 `.env.example` 为 `.env`；
2. 把 `VITE_USE_MOCK` 改成 `false`；
3. 把 `VITE_API_BASE_URL` 指向你的后端；
4. 后端按 `docs/04-数据模型.md` 的接口表实现四个端点即可，业务代码无需改动。

## 素材说明

- 干员头像：从 `prts.wiki` 抓取，脚本见 `scripts/fetch_portraits.mjs`。
- 武器图：`scripts/gen_image.mjs` 直连图像接口生成（透明背景），后处理见 `scripts/process_weapons.py`。
- 音效：全部由 WebAudio 实时合成（`src/utils/audio.ts`），不依赖音频文件。

## 已知限制

- DSH 的模型通道只支持对话类 API，不支持 `images/generations`，因此生图走脚本而非会话内工具；
- 沙盒默认禁止创建子进程，`vite` 需要更宽的执行权限才能启动；
- 剧本为手工写死，一轮通关后重玩内容不变（设计如此）。
