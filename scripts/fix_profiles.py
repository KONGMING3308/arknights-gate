"""用途：按官方设定批量修正申请人的种族 / 出身 / 路线（队长以上核对结果）。
输入：src/mocks/*.ts
输出：就地修正后的文件
依赖：无
"""

import re
from pathlib import Path

MOCKS = Path(__file__).resolve().parent.parent / "src" / "mocks"

# 干员 -> {race?, origin?}
FIXES = {
    "克洛丝": {"origin": "雷姆必拓"},
    "芬": {"race": "库兰塔", "origin": "卡西米尔"},
    "米格鲁": {"origin": "玻利瓦尔"},
    "安赛尔": {"race": "卡特斯", "origin": "雷姆必拓"},
    "卡缇": {"race": "佩洛", "origin": "莱塔尼亚"},
    "炎熔": {"origin": "维多利亚"},
    "芙蓉": {"origin": "维多利亚"},
    "流星": {"race": "库兰塔", "origin": "卡西米尔"},
    "可颂": {"origin": "米诺斯"},
    "清道夫": {"race": "札拉克"},
    "讯使": {"race": "依特拉", "origin": "谢拉格"},
    "末药": {"race": "沃尔珀"},
    "芙兰卡": {"race": "沃尔珀", "origin": "哥伦比亚"},
}

APPLICANT_RE = re.compile(r"\n  \{\n([\s\S]*?)\n  \},")
PASSPORT_RE = re.compile(r"\n  '([^']+)': \{\n([\s\S]*?)\n  \},")
DOSSIER_RE = re.compile(r"\n  ([^'{\n][^:\n]*): \{\n([\s\S]*?)\n  \},")

changed = []


def fix_applicant(body: str, name: str) -> str:
    patch = FIXES.get(name)
    if not patch:
        return body
    if "race" in patch:
        body = re.sub(r"race: '[^']+'", f"race: '{patch['race']}'", body, count=1)
    if "origin" in patch:
        body = re.sub(r"origin: '[^']+'", f"origin: '{patch['origin']}'", body, count=1)
    return body


def fix_dossier(body: str, name: str) -> str:
    patch = FIXES.get(name)
    if not patch or "origin" not in patch:
        return body
    return re.sub(r"origin: '[^']+'", f"origin: '{patch['origin']}'", body, count=1)


def fix_passport(body: str, name: str) -> str:
    patch = FIXES.get(name)
    if not patch or "origin" not in patch:
        return body
    # route: '旧出身 → 罗德岛本舰'
    return re.sub(r"route: '[^']*?'", f"route: '{patch['origin']} → 罗德岛本舰'", body, count=1)


for path in sorted(MOCKS.glob("*.ts")):
    text = path.read_text(encoding="utf-8")
    original = text

    # applicant 块
    def repl_app(m):
        body = m.group(1)
        name = re.search(r"codeName: '([^']+)'", body)
        if not name:
            return m.group(0)
        new_body = fix_applicant(body, name.group(1))
        if new_body != body:
            changed.append(f"{path.name}: {name.group(1)}（申请人）")
        return f"\n  {{\n{new_body}\n  }},"

    text = APPLICANT_RE.sub(repl_app, text)

    # passport 块（key 是 id，需要先查 codeName 对应关系，这里按 id 前缀判断）
    def repl_pass(m):
        body = m.group(2)
        holder = re.search(r"holderName: '([^']+)'", body)
        if not holder:
            return m.group(0)
        new_body = fix_passport(body, holder.group(1))
        if new_body != body:
            changed.append(f"{path.name}: {holder.group(1)}（通行证路线）")
        return f"\n  '{m.group(1)}': {{\n{new_body}\n  }},"

    text = PASSPORT_RE.sub(repl_pass, text)

    # dossier 块
    def repl_dos(m):
        key = m.group(1).strip()
        body = m.group(2)
        new_body = fix_dossier(body, key)
        if new_body != body:
            changed.append(f"{path.name}: {key}（档案出身）")
        return f"\n  {key}: {{\n{new_body}\n  }},"

    text = DOSSIER_RE.sub(repl_dos, text)

    if text != original:
        path.write_text(text, encoding="utf-8")

print("修正条目：", len(changed))
for c in changed:
    print(" -", c)
