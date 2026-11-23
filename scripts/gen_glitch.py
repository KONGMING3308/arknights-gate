"""用途：给证件照叠加「电子信号干扰」效果（像素块 / 噪点 / 色散 / 扫描线），
        用于表现「照片与本人不符」——照片被处理过、看不清是不是本人。
输入：原头像 PNG（public/assets/portraits/*.png）
输出：*_glitch.png
依赖：Pillow, numpy
"""
from pathlib import Path
import random

import numpy as np
from PIL import Image, ImageDraw

SRC = Path(__file__).resolve().parent.parent / "public" / "assets" / "portraits"
SIZE = 220


def pixelate_region(img: Image.Image, box: tuple[int, int, int, int], block: int) -> None:
    """把指定矩形区域做成马赛克（缩小再放大）。"""
    x0, y0, x1, y1 = box
    region = img.crop(box)
    w, h = region.size
    small = region.resize((max(1, w // block), max(1, h // block)), Image.BILINEAR)
    big = small.resize((w, h), Image.NEAREST)
    img.paste(big, (x0, y0))


def glitch(src: Path, dst: Path, seed: int) -> None:
    random.seed(seed)
    np.random.seed(seed)

    img = Image.open(src).convert("RGBA")
    # 统一裁成方形证件照
    side = min(img.size)
    left = (img.width - side) // 2
    top = (img.height - side) // 2
    img = img.crop((left, top, left + side, top + side)).resize((SIZE, SIZE), Image.LANCZOS)

    # 1) 局部像素块（伪造处理痕迹）
    for _ in range(random.randint(3, 5)):
        w = random.randint(30, 70)
        h = random.randint(25, 60)
        x = random.randint(0, SIZE - w)
        y = random.randint(0, SIZE - h)
        pixelate_region(img, (x, y, x + w, y + h), random.choice([6, 8, 10]))

    # 2) 色散：R/B 通道水平错位
    arr = np.array(img).astype(np.int16)
    shift = random.randint(4, 9)
    arr[..., 0] = np.roll(arr[..., 0], shift, axis=1)
    arr[..., 2] = np.roll(arr[..., 2], -shift, axis=1)

    # 3) 噪点（信号雪花）
    noise = np.random.normal(0, 26, (SIZE, SIZE, 1))
    arr[..., :3] = np.clip(arr[..., :3] + noise, 0, 255)

    # 4) 扫描线
    for y in range(0, SIZE, 3):
        arr[y, :, :3] = np.clip(arr[y, :, :3] * 0.62, 0, 255)

    img = Image.fromarray(arr.astype(np.uint8), "RGBA")

    # 5) 过曝闪光块
    draw = ImageDraw.Draw(img)
    for _ in range(random.randint(2, 3)):
        w = random.randint(16, 38)
        h = random.randint(10, 22)
        x = random.randint(0, SIZE - w)
        y = random.randint(0, SIZE - h)
        draw.rectangle([x, y, x + w, y + h], fill=(255, 255, 255, 200))

    # 6) 横向撕裂条
    for _ in range(random.randint(2, 3)):
        y = random.randint(0, SIZE - 6)
        h = random.randint(3, 7)
        band = img.crop((0, y, SIZE, y + h))
        offset = random.randint(-18, 18)
        img.paste(band, (offset, y))

    img.save(dst)
    print(f"{dst.name}: {img.size}")


if __name__ == "__main__":
    targets = [("meteor.png", "meteor_glitch.png"), ("croissant.png", "croissant_glitch.png"), ("siege.png", "siege_glitch.png"), ("exusiai.png", "exusiai_glitch.png")]
    for i, (s, d) in enumerate(targets):
        glitch(SRC / s, SRC / d, seed=42 + i)
