"""用途：把 pool2（第二批 50 人）接入 src/mocks/index.ts。
输入：src/mocks/index.ts
输出：就地修改
依赖：无
"""
from pathlib import Path

p = Path('src/mocks/index.ts')
t = p.read_text(encoding='utf-8')

if 'POOL2_APPLICANTS' in t:
    print('已接入，跳过')
    raise SystemExit(0)

# 1) 追加 import（放在 anomaly import 之前）
imports = '\n'.join(
    f"import {{ DAY{d}_POOL2_APPLICANTS }} from './roster.d{d}.pool2'\n"
    f"import {{ DAY{d}_POOL2_PASSPORTS }} from './roster.d{d}.pool2.passports'\n"
    f"import {{ DAY{d}_POOL2_DOSSIERS }} from './roster.d{d}.pool2.dossiers'"
    for d in range(1, 6)
)
anchor = "import {\n  getAnomalyPlacement,"
assert anchor in t, '未找到 anomaly import 锚点'
t = t.replace(anchor, imports + '\n' + anchor, 1)

# 2) POOL_BY_DAY 合并
for d in range(1, 6):
    old_variants = [
        f"...DAY{d}_POOL_APPLICANTS],",
        f"...DAY{d}_POOL_APPLICANTS],",
    ]
    target = f"...DAY{d}_POOL_APPLICANTS],"
    replacement = f"...DAY{d}_POOL_APPLICANTS, ...DAY{d}_POOL2_APPLICANTS],"
    assert target in t, f'D{d} POOL_BY_DAY 未找到'
    t = t.replace(target, replacement, 1)

# 3) ALL_PASSPORTS / ALL_DOSSIERS 合并
pool2_pass = ''.join(f"  ...DAY{d}_POOL2_PASSPORTS,\n" for d in range(1, 6))
pool2_dos = ''.join(f"  ...DAY{d}_POOL2_DOSSIERS,\n" for d in range(1, 6))
t = t.replace("  ...DAY5_POOL_PASSPORTS,\n  [PRESETH_ID]: PRESETH_PASSPORT,",
              "  ...DAY5_POOL_PASSPORTS,\n" + pool2_pass + "  [PRESETH_ID]: PRESETH_PASSPORT,", 1)
t = t.replace("  ...DAY5_POOL_DOSSIERS,\n  普瑞塞斯: PRESETH_DOSSIER,",
              "  ...DAY5_POOL_DOSSIERS,\n" + pool2_dos + "  普瑞塞斯: PRESETH_DOSSIER,", 1)

p.write_text(t, encoding='utf-8')
print('index.ts 已接入 pool2')
