"""用途：把超过 200 行的剧本文件按证件部分拆分，满足单文件行数规范。
输入：src/mocks/roster.d4.ts / roster.d5.ts
输出：<name>.docs.ts（证件与档案）+ 精简后的原文件
依赖：无
"""
from pathlib import Path

MOCKS = Path(__file__).resolve().parent.parent / "src" / "mocks"


def split(day: int) -> None:
    src = MOCKS / f"roster.d{day}.ts"
    text = src.read_text(encoding="utf-8")
    marker = f"export const DAY{day}_PASSPORTS"
    idx = text.index(marker)
    head, docs = text[:idx].rstrip() + "\n", text[idx:]

    docs_file = MOCKS / f"roster.d{day}.docs.ts"
    docs_header = (
        "/**\n"
        f" * 用途：第 {day} 天的通行证与人事档案数据（从 roster.d{day}.ts 拆出，控制单文件行数）。\n"
        " * 输入：无。\n"
        f" * 输出：DAY{day}_PASSPORTS / DAY{day}_DOSSIERS。\n"
        " * 依赖：@/types\n"
        " */\n"
        "import type { Dossier, Passport } from '@/types'\n\n"
    )
    docs_file.write_text(docs_header + docs, encoding="utf-8")

    new_head = (
        head.replace(
            "import type { Applicant, Dossier, Passport } from '@/types'",
            "import type { Applicant } from '@/types'\n"
            f"import {{ DAY{day}_PASSPORTS, DAY{day}_DOSSIERS }} from './roster.d{day}.docs'",
        )
        + f"\nexport {{ DAY{day}_PASSPORTS, DAY{day}_DOSSIERS }}\n"
    )
    src.write_text(new_head, encoding="utf-8")

    print(
        f"d{day}: 主文件 {len(new_head.splitlines())} 行 / 证件文件 {len(docs_file.read_text(encoding='utf-8').splitlines())} 行"
    )


if __name__ == "__main__":
    for d in (4, 5):
        split(d)
