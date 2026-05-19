from __future__ import annotations

import argparse
import base64
import colorsys
import html
import io
import json
import math
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageOps


ASCII_RAMP_PRESETS = [
    " .,:;i1tfLCG08@",
    " `^\",:;Il!i><~+_-?][}{1)(|\\/*TJCLQ0OZmwqpdbkhao*#MW&8%B@$",
    " .'`^\",:;Il!i~+_-?][}{1)(|\\/*tfrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
]


@dataclass(frozen=True)
class RenderConfig:
    image_path: Path
    output_dir: Path
    ascii_width: int = 96
    ascii_frames: int = 18
    pixel_width: int = 80
    pixel_frames: int = 18
    pixel_scale: int = 8
    alpha_threshold: int = 8


def parse_args() -> RenderConfig:
    parser = argparse.ArgumentParser(
        description="Generate animated ASCII and pixel-art frames plus a self-contained HTML preview from one image."
    )
    parser.add_argument(
        "image",
        nargs="?",
        default=r"C:\Users\totot\Downloads\plasma gun.jpg",
        help="Input image path.",
    )
    parser.add_argument(
        "--output-dir",
        default=None,
        help="Directory to write generated assets into. Defaults to a folder beside the script.",
    )
    parser.add_argument("--ascii-width", type=int, default=96)
    parser.add_argument("--ascii-frames", type=int, default=18)
    parser.add_argument("--pixel-width", type=int, default=80)
    parser.add_argument("--pixel-frames", type=int, default=18)
    parser.add_argument("--pixel-scale", type=int, default=8)
    parser.add_argument("--alpha-threshold", type=int, default=8)
    args = parser.parse_args()

    script_dir = Path(__file__).resolve().parent
    output_dir = Path(args.output_dir) if args.output_dir else script_dir / "dist"

    return RenderConfig(
        image_path=Path(args.image),
        output_dir=output_dir,
        ascii_width=args.ascii_width,
        ascii_frames=args.ascii_frames,
        pixel_width=args.pixel_width,
        pixel_frames=args.pixel_frames,
        pixel_scale=args.pixel_scale,
        alpha_threshold=args.alpha_threshold,
    )


def ensure_source_image(path: Path) -> None:
    if not path.exists():
        raise FileNotFoundError(f"Input image not found: {path}")


def prepare_image(image: Image.Image) -> Image.Image:
    if image.mode not in {"RGBA", "RGB"}:
        image = image.convert("RGBA")
    elif image.mode == "RGB":
        image = image.convert("RGBA")
    return image


def fit_ascii_size(image: Image.Image, target_width: int) -> tuple[int, int]:
    width, height = image.size
    aspect = height / max(width, 1)
    target_height = max(1, int(target_width * aspect * 0.5))
    return target_width, target_height


def fit_pixel_size(image: Image.Image, target_width: int) -> tuple[int, int]:
    width, height = image.size
    aspect = height / max(width, 1)
    target_height = max(1, int(target_width * aspect))
    return target_width, target_height


def sample_rgba(image: Image.Image, x: int, y: int) -> tuple[int, int, int, int]:
    r, g, b, a = image.getpixel((x, y))
    return int(r), int(g), int(b), int(a)


def pseudo_noise(x: int, y: int, frame: int, salt: int = 0) -> float:
    value = math.sin((x * 12.9898) + (y * 78.233) + (frame * 37.719) + salt * 19.19) * 43758.5453
    return value - math.floor(value)


def ascii_char_for_luma(luma: float, frame_index: int, x: int, y: int, ramp: str) -> str:
    if luma <= 0.02:
        return " "

    jitter = pseudo_noise(x, y, frame_index, salt=3)
    wave = math.sin((frame_index * 0.5) + (x * 0.08) + (y * 0.12)) * 0.06
    adjusted = max(0.0, min(1.0, luma + wave + (jitter - 0.5) * 0.08))
    index = min(len(ramp) - 1, int(adjusted * (len(ramp) - 1)))
    return ramp[index]


def generate_ascii_frame(
    image: Image.Image,
    width: int,
    frame_index: int,
    total_frames: int,
    alpha_threshold: int,
) -> str:
    target_width, target_height = fit_ascii_size(image, width)
    resized = ImageOps.contain(image, (target_width, target_height), method=Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (target_width, target_height), (0, 0, 0, 0))
    offset = ((target_width - resized.width) // 2, (target_height - resized.height) // 2)
    canvas.alpha_composite(resized, offset)

    ramp = ASCII_RAMP_PRESETS[frame_index % len(ASCII_RAMP_PRESETS)]
    ramp_shift = frame_index % max(1, len(ramp))
    ramp = ramp[ramp_shift:] + ramp[:ramp_shift]

    lines: list[str] = []
    for y in range(target_height):
        chars: list[str] = []
        for x in range(target_width):
            r, g, b, a = sample_rgba(canvas, x, y)
            if a <= alpha_threshold:
                chars.append(" ")
                continue
            luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255.0
            luma *= a / 255.0
            # Tiny phase shifts keep the same image recognizable while the art keeps moving.
            phase = math.sin((frame_index / max(1, total_frames)) * math.tau)
            luma = max(0.0, min(1.0, luma + phase * 0.04 + (pseudo_noise(x, y, frame_index) - 0.5) * 0.05))
            chars.append(ascii_char_for_luma(luma, frame_index, x, y, ramp))
        lines.append("".join(chars))
    return "\n".join(lines)


def shift_hue(r: int, g: int, b: int, hue_offset: float, sat_boost: float = 1.0, val_boost: float = 1.0) -> tuple[int, int, int]:
    rf, gf, bf = (r / 255.0, g / 255.0, b / 255.0)
    h, s, v = colorsys.rgb_to_hsv(rf, gf, bf)
    h = (h + hue_offset) % 1.0
    s = max(0.0, min(1.0, s * sat_boost))
    v = max(0.0, min(1.0, v * val_boost))
    rr, gg, bb = colorsys.hsv_to_rgb(h, s, v)
    return int(rr * 255), int(gg * 255), int(bb * 255)


def generate_pixel_frame(
    image: Image.Image,
    width: int,
    frame_index: int,
    total_frames: int,
    scale: int,
) -> Image.Image:
    target_width, target_height = fit_pixel_size(image, width)
    resized = ImageOps.contain(image, (target_width, target_height), method=Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (target_width, target_height), (0, 0, 0, 0))
    offset = ((target_width - resized.width) // 2, (target_height - resized.height) // 2)
    canvas.alpha_composite(resized, offset)

    pixels = canvas.load()
    frame = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    out_pixels = frame.load()
    hue_offset = (frame_index / max(1, total_frames)) * 0.08
    hue_wave = math.sin(frame_index * 0.55) * 0.03
    brightness_wave = math.sin((frame_index / max(1, total_frames)) * math.tau) * 0.08

    palette_seed = (frame_index % 4) * 0.015
    for y in range(target_height):
        for x in range(target_width):
            r, g, b, a = pixels[x, y]
            if a <= 8:
                out_pixels[x, y] = (0, 0, 0, 0)
                continue

            noise = pseudo_noise(x, y, frame_index, salt=11)
            local_hue = hue_offset + hue_wave + (noise - 0.5) * 0.02 + palette_seed
            local_sat = 1.04 + (noise - 0.5) * 0.10
            local_val = 1.00 + brightness_wave + (noise - 0.5) * 0.08
            nr, ng, nb = shift_hue(r, g, b, local_hue, sat_boost=local_sat, val_boost=local_val)

            # Slight quantization keeps the image blocky without losing the source identity.
            nr = min(255, max(0, round(nr / 17) * 17))
            ng = min(255, max(0, round(ng / 17) * 17))
            nb = min(255, max(0, round(nb / 17) * 17))
            out_pixels[x, y] = (nr, ng, nb, a)

    upscaled = frame.resize((frame.width * scale, frame.height * scale), resample=Image.Resampling.NEAREST)
    return upscaled


def write_html_preview(output_dir: Path, ascii_frames: list[str], pixel_frames: list[str], ascii_size: tuple[int, int], pixel_size: tuple[int, int]) -> None:
    html_path = output_dir / "preview.html"
    css = """
        :root {
          color-scheme: dark;
          --bg: #050816;
          --panel: rgba(15, 23, 42, 0.82);
          --border: rgba(148, 163, 184, 0.25);
          --accent: #f97316;
          --text: #e2e8f0;
        }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          min-height: 100vh;
          background:
            radial-gradient(circle at top, rgba(249, 115, 22, 0.18), transparent 36%),
            linear-gradient(180deg, #030712, #0f172a 55%, #020617);
          color: var(--text);
          font-family: Inter, system-ui, sans-serif;
          display: grid;
          place-items: center;
          padding: 24px;
        }
        .shell {
          width: min(1200px, 100%);
          display: grid;
          gap: 16px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
          padding: 0 8px;
        }
        .header h1 {
          margin: 0;
          font-size: 18px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .header p {
          margin: 0;
          color: #94a3b8;
          font-size: 13px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .panel {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 16px;
          box-shadow: 0 24px 72px rgba(0, 0, 0, 0.34);
          overflow: hidden;
        }
        .panel h2 {
          margin: 0 0 12px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #cbd5e1;
        }
        pre {
          margin: 0;
          white-space: pre;
          overflow: auto;
          line-height: 0.95;
          font-size: 8px;
          font-family: 'Courier New', Consolas, monospace;
          color: #f8fafc;
        }
        .pixel-wrap {
          display: grid;
          place-items: center;
          min-height: 100%;
        }
        img {
          width: min(100%, 100%);
          image-rendering: pixelated;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.2);
        }
        .footer {
          padding: 0 8px;
          color: #94a3b8;
          font-size: 12px;
        }
        @media (max-width: 900px) {
          .grid { grid-template-columns: 1fr; }
        }
    """

    js = f"""
        const asciiFrames = {json.dumps(ascii_frames)};
        const pixelFrames = {json.dumps(pixel_frames)};
        const asciiEl = document.getElementById('ascii-frame');
        const pixelEl = document.getElementById('pixel-frame');
        const statusEl = document.getElementById('status');
        const fps = 8;
        const stageDuration = 1000 / fps;
        const totalFrames = Math.max(asciiFrames.length, pixelFrames.length);
        let index = 0;

        function tick() {{
          const asciiIndex = index % asciiFrames.length;
          const pixelIndex = index % pixelFrames.length;
          asciiEl.textContent = asciiFrames[asciiIndex];
          pixelEl.src = pixelFrames[pixelIndex];
          statusEl.textContent = `frame ${{index + 1}} / ${{totalFrames}}`;
          index = (index + 1) % totalFrames;
        }}

        tick();
        setInterval(tick, stageDuration);
    """

    ascii_preview = html.escape(ascii_frames[0])
    pixel_first = pixel_frames[0]

    markup = f"""<!doctype html>
<html lang=\"en\">
<head>
  <meta charset=\"utf-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  <title>ASCII + Pixel Preview</title>
  <style>{css}</style>
</head>
<body>
  <main class=\"shell\">
    <div class=\"header\">
      <h1>ASCII -> Pixel -> Image preview</h1>
      <p id=\"status\">loading...</p>
    </div>
    <section class=\"grid\">
      <article class=\"panel\">
        <h2>ASCII animation</h2>
        <pre id=\"ascii-frame\">{ascii_preview}</pre>
      </article>
      <article class=\"panel\">
        <h2>Pixel animation</h2>
        <div class=\"pixel-wrap\">
          <img id=\"pixel-frame\" src=\"{pixel_first}\" alt=\"Pixel preview\" />
        </div>
      </article>
    </section>
    <div class=\"footer\">ASCII size: {ascii_size[0]} x {ascii_size[1]} | Pixel size: {pixel_size[0]} x {pixel_size[1]} | scale: generated frames loop continuously</div>
  </main>
  <script>{js}</script>
</body>
</html>"""

    html_path.write_text(markup, encoding="utf-8")


def frame_to_data_uri(image: Image.Image) -> str:
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode("ascii")
    return f"data:image/png;base64,{encoded}"


def main() -> None:
    config = parse_args()
    ensure_source_image(config.image_path)

    config.output_dir.mkdir(parents=True, exist_ok=True)
    ascii_dir = config.output_dir / "ascii"
    pixel_dir = config.output_dir / "pixel"
    ascii_dir.mkdir(exist_ok=True)
    pixel_dir.mkdir(exist_ok=True)

    with Image.open(config.image_path) as src:
        image = prepare_image(src)
        ascii_preview_size = fit_ascii_size(image, config.ascii_width)
        pixel_preview_size = fit_pixel_size(image, config.pixel_width)

        ascii_frames: list[str] = []
        pixel_frames: list[str] = []

        for frame_index in range(config.ascii_frames):
            ascii_text = generate_ascii_frame(
                image=image,
                width=config.ascii_width,
                frame_index=frame_index,
                total_frames=config.ascii_frames,
                alpha_threshold=config.alpha_threshold,
            )
            ascii_frames.append(ascii_text)
            (ascii_dir / f"ascii-{frame_index + 1:03}.txt").write_text(ascii_text, encoding="utf-8")

        for frame_index in range(config.pixel_frames):
            pixel_image = generate_pixel_frame(
                image=image,
                width=config.pixel_width,
                frame_index=frame_index,
                total_frames=config.pixel_frames,
                scale=config.pixel_scale,
            )
            output_path = pixel_dir / f"pixel-{frame_index + 1:03}.png"
            pixel_image.save(output_path)
            pixel_frames.append(frame_to_data_uri(pixel_image))

    write_html_preview(config.output_dir, ascii_frames, pixel_frames, ascii_preview_size, pixel_preview_size)

    manifest = {
        "source_image": str(config.image_path),
        "output_dir": str(config.output_dir),
        "ascii_frames": config.ascii_frames,
        "pixel_frames": config.pixel_frames,
        "ascii_width": config.ascii_width,
        "pixel_width": config.pixel_width,
        "pixel_scale": config.pixel_scale,
    }
    (config.output_dir / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    print(f"Generated ASCII frames in: {ascii_dir}")
    print(f"Generated pixel frames in: {pixel_dir}")
    print(f"Generated HTML preview in: {config.output_dir / 'preview.html'}")


if __name__ == "__main__":
    main()
