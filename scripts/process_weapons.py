"""用途：清理并裁切武器透明图，输出可直接用于 UI 的素材。
输入：源图目录下的 PNG。
输出：trim 后的 *_trim.png 与 512 宽 *_512.png。
依赖：Pillow。
"""
from pathlib import Path
from PIL import Image

SRC = Path(__file__).resolve().parent.parent / "public" / "assets" / "weapons"
PAD_RATIO = 0.06


def clean_edges(img: Image.Image) -> Image.Image:
    """把近似全透明但仍带色的边缘像素统一为纯透明，消除彩边。"""
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 24:
                px[x, y] = (0, 0, 0, 0)
            elif a < 140:
                # 半透明边缘去色，避免灰/红色晕
                gray = int(0.299 * r + 0.587 * g + 0.114 * b)
                px[x, y] = (gray, gray, gray, a)
    return img


def trim(img: Image.Image) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        raise ValueError("整张图都是透明的")
    img = img.crop(bbox)
    pad_x = int(img.width * PAD_RATIO)
    pad_y = int(img.height * PAD_RATIO)
    canvas = Image.new("RGBA", (img.width + pad_x * 2, img.height + pad_y * 2), (0, 0, 0, 0))
    canvas.paste(img, (pad_x, pad_y), img)
    return canvas


def main() -> None:
    jobs = {
        "_test.png": "m1911_a.png",
        "m1911_b.png": "m1911_b.png",
        "m1911_c.png": "m1911_c.png",
    }
    for src_name, out_name in jobs.items():
        src = SRC / src_name
        if not src.exists():
            print(f"跳过（不存在）: {src_name}")
            continue
        img = Image.open(src)
        img = clean_edges(img)
        img = trim(img)
        out = SRC / out_name
        img.save(out)
        small = img.copy()
        small.thumbnail((512, 512), Image.LANCZOS)
        small.save(SRC / out_name.replace(".png", "_512.png"))
        alpha = img.getchannel("A")
        hist = alpha.histogram()
        transparent = hist[0]
        total = img.width * img.height
        print(
            f"{out_name}: {img.width}x{img.height} "
            f"透明占比={transparent / total:.1%} 边缘透明底={hist[0]}"
        )


if __name__ == "__main__":
    main()
