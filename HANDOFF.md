# 交接文件：这不是我的干员（原名 罗德岛入境审查）

> ⚠️ **本文件是项目最早期的交接文档（v0.x 时代），内容已大量过时。**
> 例如：当时规划的「拔枪射击」在后续改版中已彻底移除；人数、破绽维度、突脸规则均已变化。
> **当前实际实现请以 [`docs/12-当前状态.md`](docs/12-当前状态.md) 与源码为准。**
>
> 本文件保留作历史沿革参考，不再更新。

> 本文件用于把任务从旧会话无损交接到**新会话**。新 Agent 读完本文件 + 原提示词后即可继续，不需要用户重述需求。

## 0. 为什么换会话

DSH 的「子智能体可选模型」是**会话级记录**（源码：`subagent/model-selection-policy` 事件）。旧会话（`session-a18843b8…`）创建时没有该策略，Host 配置后来虽已保存（`~/.dsh/profiles/desktop/cordis.patch.yml` 第 113–237 行，`subagent-model-selection-settings` 已放开 bee / gpt / gemini / opencode-go），但**旧会话仍只允许继承父路由** `opencode-go/deepseek-v4.1-flash`。已验证：旧会话调 `gpt` 仍报 `not allowed for this Session`。

→ 因此**必须在新会话继续**。新会话第一步请先跑 `list_subagent_models` 确认路由，再动工。

## 1. 原提示词（必读）

`D:\QQ数据\3523264105\FileRecv\AGENT.md` —— 用户指定的角色规则：产品原型工程师；React 18 + TS(strict) + Vite + React Router v6 + Tailwind（禁内联 style）+ lucide-react + RHF/Zod；目录固定 `pages/components/api/mocks/store/types/hooks/utils/constants`；`src/api/` 内用 `VITE_USE_MOCK` 切 mock；单文件 ≤200 行；`docs/00–06` 共 7 份文档；先追问（≤3 轮、清晰度 ≥85）再编码；每轮回复末尾给「本次变更清单」。

## 2. 用户已逐条确认的决策（不要再问）

| 项 | 决定 |
|---|---|
| 产品 | 同人网页游戏，参考《请出示证件》《边境检察官》《这不是你的邻居》 |
| 题材 | 明日方舟：罗德岛入境口岸审查官 |
| 运行形态 | 在线浏览器打开即玩（纯前端） |
| 天数/人数 | 5 天，每天 3–5 人，共约 20 人（D1:3、递增到 5） |
| 玩家任务 | 比对「通行证 / 罗德岛档案 / 本人 / 对话」找矛盾：日期、编号、照片、印章、职业 |
| 处置 | 批准入境 / 拒绝入境 / **拔枪射击，中枪即消灭，无战斗场景** |
| 开枪时机 | **任何时候都能开枪**（对正常干员也能开），误杀取决于玩家判断 |
| 对话 | 固定 3 个问题按钮：代号 / 来意 / 推荐人 |
| 内容形式 | 手工剧本约 20 人，身份/伪造点/台词固定，玩一轮重玩内容不变 |
| 失败 | 放走入侵者扣「安全度」，误杀干员扣「信任度」，任一归零即失败 |
| 胜利 | 撑过 5 天，给评级 |
| 武器 | 手枪，需用生图生成；用户说“2011 手枪”，已按 **M1911 风格**理解，可在开工时一句话再确认 |
| 美术 | 来自明日方舟，从 prts.wiki 取（已实测可下载）；缺图才生图 |
| UI | 全中文 |
| 产物位置 | `D:\DSH工作区\arknights-gate\`，不覆盖 `FileRecv` 原文件；存档用 localStorage |

## 3. 还欠用户拍板的 3 件事（方案已给出，用户尚未回答）

1. **是否加「拒绝入境」中间动作**（建议加，否则只剩批准/枪毙两个极端）。
2. **矛盾是否自动高亮**（建议不自动，给「新手提示」开关）。
3. **交付节奏**：M1 先做「第 1 天可玩竖切」（3 人、全交互、能结算），确认手感后 M2 铺满 5 天 + 全部文档（推荐）。

## 4. 已向用户展示、未被否决的方案

**页面（与 `src/pages/` 一一对应）**：`TitleScreen` / `ReviewScreen`（核心）/ `DayEndScreen` / `EndingScreen` / `CodexScreen`(P2)。

**核心界面三栏**：左=申请人立绘 + 三问按钮；中=桌面证件（通行证、派遣函、印章）；右=调取档案。底部=批准 / 拒绝 / 拔枪。

**判定表**：
- 正常干员：批准 +2 信任；拒绝 −8 信任；处决 −35 信任
- 入侵者：批准 −25 安全（放走）；拒绝 +5 安全；处决 +10 安全
- 初始各 100；20 人里 8 名入侵者（D1:1 D2:1 D3:2 D4:2 D5:2）
- 通关评级按两项残值之和：S≥190 / A≥170 / B≥145 / C≥110 / D<110

**伪造手法阶梯**：D1 印章糊 → D2 编号查无 → D3 照片/职业不符 → D4 冒名在册干员 → D5 多重破绽+对话矛盾。

**类型**：`Applicant`(id/codeName/portrait/race/origin/occupation/isImpostor/day/slot/intent/recommender/dialogue[]/passportId/dossierId) `Passport`(number/holderName/photo/issueDate/expiryDate/route/stampType/sealText) `Dossier`(codeName/number/occupation/origin/recommender/photo/status) `Discrepancy`(field/expected/actual/hint) `GameState`(day/slotIndex/safety/trust/verdicts/phase)。

**API（`src/api/`，带 mock 开关）**：`fetchDayRoster(day)`、`fetchPassport(id)`、`fetchDossier(codeName)`（模拟 0.8s 查档延迟）、`submitVerdict(applicantId, action)`。

**组件**：`pages/Review/` 下 ReviewScreen、ApplicantWindow、DocumentTray、PassportCard、DossierCard、ComparePanel、ActionBar、GunOverlay；`components/` 下 StatBar、DayHeader、Stamp、Panel、Button。

**视觉**：深色 `#0b0e13` + 金 `#c8a45c` + 危险红 `#e8483c`；细线框 + 等宽数字；全 Tailwind；动画用 CSS + WebAudio 合成枪声（不引音频文件）。

## 5. 素材落地方式（已实测）

- **干员头像**：`https://media.prts.wiki/b/b9/%E5%A4%B4%E5%83%8F_%E5%85%8B%E6%B4%9B%E4%B8%9D.png?v=…`（克洛丝 180×180 PNG 已成功下载）。做通行证照/档案照正合适。20 张按需从 prts.wiki 干员页取直链。
- **生图**：
  - 首选 `gpt-image-2.6-flare`（provider `gpt`，Key 走 `GPT_API_KEY`，中转 `https://www.jiangeyun.xyz/v1`）——**新会话需先验证是否真能出图**。
  - 兜底：pollinations 免费接口已实测可用：`https://image.pollinations.ai/prompt/<encoded>?width=1024&height=768&nologo=true`（返回 JPEG；curl 走 schannel 会失败，用 Node 的 `fetch` 下载；注意返回实际是 JPEG，命名要 `.jpg`）。
- 手枪要求：M1911 侧视、透明背景 PNG、无文字水印。生成 3 张挑 1 张。

## 6. 环境事实

- Node **v26.13.0**、npm **11.20.0**；**没有 pnpm**（用 npm）。
- 工作区 `D:\DSH工作区`；沙箱 workspace-write。
- `prts.wiki` 与 `media.prts.wiki` 可访问（已实测）。
- DSH 模型配置：`bee`(9 个文本模型)、`gpt`(6 个 gpt-image 生图)、`gemini`(13 个)、`opencode-go`(默认 `deepseek-v4.1-flash`)。
- 用户是非技术人员：**先用人话讲做了什么，再给技术细节；提问必须带选项**。

## 7. 建议的下一步顺序

1. `list_subagent_models` 验证 `bee/gpt/gemini` 是否可用；记下实际可用路由。
2. 若 `gpt-image` 可用：生 3 张 M1911 对比挑 1；否则用 pollinations 兜底。
3. 抓 20 个干员头像入库 `public/assets/portraits/`。
4. `npm create vite@latest` 搭骨架，按 AGENT.md 目录规范；先做 **M1：D1 三人全流程可玩 + 结算**。
5. 同步补 `docs/00–06`（00 里必须补上第 2 节的历史澄清记录）。
6. 每轮回复末尾给「本次变更清单」。
7. 用户拍板第 3 节三件事后，再铺 M2 剩余 17 人。

<!-- TODO(产品): 确认「2011 手枪」是否即 M1911 风格 -->
