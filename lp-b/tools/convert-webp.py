"""
convert-webp.py
assets/images/ 内の JPG / PNG を WebP に変換する。
元ファイルはそのまま残す（<picture> タグのフォールバック用）。

使い方:
  python3 tools/convert-webp.py
"""

from PIL import Image
from pathlib import Path

SRC_DIR = Path(__file__).parent.parent / "assets" / "images"
QUALITY = 85

extensions = {".jpg", ".jpeg", ".png"}

converted = []
skipped   = []

for src in sorted(SRC_DIR.iterdir()):
    if src.suffix.lower() not in extensions:
        continue

    out = src.with_suffix(".webp")
    if out.exists():
        skipped.append(src.name)
        continue

    try:
        mode = "RGBA" if src.suffix.lower() == ".png" else "RGB"
        img  = Image.open(src).convert(mode)
        img.save(out, "WEBP", quality=QUALITY, method=6)

        orig_kb = src.stat().st_size // 1024
        webp_kb = out.stat().st_size // 1024
        rate    = 100 - webp_kb * 100 // orig_kb if orig_kb else 0
        converted.append(f"  {src.name:45s} {orig_kb:>6}KB → {webp_kb:>5}KB ({rate}% 削減)")
    except Exception as e:
        print(f"ERROR {src.name}: {e}")

print(f"\n変換完了: {len(converted)} 件 / スキップ（既存）: {len(skipped)} 件\n")
for line in converted:
    print(line)
if skipped:
    print(f"\nスキップ: {', '.join(skipped)}")
