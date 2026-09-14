import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_svg_favicon():
    svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081017"/>
      <stop offset="100%" stop-color="#040608"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00c2ff" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.4"/>
    </linearGradient>
    <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect x="4" y="4" width="92" height="92" rx="22" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="2.5"/>
  <text x="32" y="65" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="38" font-weight="900" fill="#f5f7fa" letter-spacing="-1">U</text>
  <circle cx="48" cy="62" r="4.5" fill="#00c2ff" filter="url(#cyanGlow)"/>
  <text x="56" y="65" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="38" font-weight="900" fill="#f5f7fa" letter-spacing="-1">AI</text>
</svg>'''
    return svg_content

def create_brand_icons():
    size = 180
    img = Image.new("RGBA", (size, size), (6, 12, 18, 255))
    draw = ImageDraw.Draw(img)

    # Rounded rectangle border
    draw.rounded_rectangle(
        [(4, 4), (size - 4, size - 4)],
        radius=40,
        fill=(8, 15, 22, 255),
        outline=(0, 194, 255, 220),
        width=3
    )

    try:
        font_uai = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 66)
        font_sub = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 15)
    except:
        font_uai = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    # Glow dot
    dot_x, dot_y = 88, 108
    draw.ellipse([(dot_x - 10, dot_y - 10), (dot_x + 10, dot_y + 10)], fill=(0, 160, 255, 120))
    draw.ellipse([(dot_x - 6, dot_y - 6), (dot_x + 6, dot_y + 6)], fill=(0, 225, 255, 255))

    # Text U.AI
    draw.text((36, 64), "U", font=font_uai, fill=(245, 247, 250, 255))
    draw.text((100, 64), "AI", font=font_uai, fill=(245, 247, 250, 255))
    draw.text((38, 138), "TECHNOLOGIES", font=font_sub, fill=(0, 200, 255, 255))

    img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
    img_16 = img.resize((16, 16), Image.Resampling.LANCZOS)

    return img, img_32, img_16

def create_og_image():
    W, H = 1200, 630
    # Create solid base RGB to eliminate any alpha conversion issues
    base = Image.new("RGB", (W, H), (7, 11, 16))

    # Aurora Overlay using separate RGBA layer
    aurora = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    aurora_draw = ImageDraw.Draw(aurora)
    
    # Cyan gradient blob (top right)
    for r in range(360, 0, -6):
        alpha = int(60 * (1 - r / 360))
        aurora_draw.ellipse([(960 - r, 110 - r), (960 + r, 110 + r)], fill=(0, 194, 255, alpha))
        
    # Violet gradient blob (bottom left)
    for r in range(320, 0, -6):
        alpha = int(50 * (1 - r / 320))
        aurora_draw.ellipse([(200 - r, 530 - r), (200 + r, 530 + r)], fill=(139, 92, 246, alpha))

    aurora = aurora.filter(ImageFilter.GaussianBlur(radius=45))
    base.paste(aurora, (0, 0), aurora)

    draw = ImageDraw.Draw(base)

    # Frame de luxo externo
    draw.rounded_rectangle([(28, 28), (W - 28, H - 28)], radius=22, outline=(35, 52, 68), width=2)
    draw.rounded_rectangle([(30, 30), (W - 30, H - 30)], radius=20, outline=(0, 194, 255), width=1)

    # Fonts
    try:
        font_brand = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 46)
        font_caption = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 15)
        font_h1 = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 62)
        font_h1_cyan = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 62)
        font_sub = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 25)
        font_tag = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 15)
        font_url = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 22)
    except:
        font_brand = font_caption = font_h1 = font_h1_cyan = font_sub = font_tag = font_url = ImageFont.load_default()

    # Top Brand: U.AI
    draw.text((85, 80), "U", font=font_brand, fill=(245, 247, 250))
    # Dot luminoso
    draw.ellipse([(118, 110), (130, 122)], fill=(0, 220, 255))
    draw.text((135, 80), "AI", font=font_brand, fill=(245, 247, 250))

    # Badge TECHNOLOGIES (Fundo escuro sólido + borda ciano + texto ciano brilhante)
    draw.rounded_rectangle([(208, 92), (370, 126)], radius=6, fill=(14, 28, 40), outline=(0, 194, 255), width=1)
    draw.text((224, 100), "TECHNOLOGIES", font=font_caption, fill=(0, 215, 255))

    # Main Headline
    draw.text((85, 190), "Seu próximo salto é agora.", font=font_h1, fill=(245, 247, 250))
    draw.text((85, 265), "Tecnologia & Marketing Conectados.", font=font_h1_cyan, fill=(56, 214, 255))

    # Subtitle
    sub_line1 = "Presenças digitais de alto padrão e agentes autônomos de Inteligência Artificial"
    sub_line2 = "desenhados sob medida para automatizar rotinas e acelerar seu faturamento."
    draw.text((85, 365), sub_line1, font=font_sub, fill=(185, 205, 220))
    draw.text((85, 405), sub_line2, font=font_sub, fill=(185, 205, 220))

    # Tags / Chips (Fundo grafite escuro com alto contraste + borda ciano + texto branco nítido)
    chips = [
        "SITES INSTITUCIONAIS & LANDING PAGES",
        "AGENTES DE IA PARA VENDAS",
        "AUTOMAÇÃO DE PROCESSOS"
    ]
    x_pos = 85
    for chip in chips:
        # Calcular dimensões do texto para centralizar
        bbox = draw.textbbox((0, 0), chip, font=font_tag)
        text_w = bbox[2] - bbox[0]
        pill_w = text_w + 36
        pill_h = 44
        y_top = 485

        # Fundo sólido escuro (16, 30, 44) de altíssimo contraste contra o texto branco
        draw.rounded_rectangle(
            [(x_pos, y_top), (x_pos + pill_w, y_top + pill_h)],
            radius=8,
            fill=(16, 30, 44),
            outline=(0, 194, 255),
            width=1
        )
        # Texto perfeitamente nítido e legível
        draw.text((x_pos + 18, y_top + 13), chip, font=font_tag, fill=(255, 255, 255))
        x_pos += pill_w + 18

    # Bottom domain link
    draw.ellipse([(85, 568), (95, 578)], fill=(0, 220, 255))
    draw.text((106, 561), "uaitechno.com", font=font_url, fill=(0, 210, 255))

    return base

def main():
    os.makedirs("assets", exist_ok=True)
    os.makedirs("dist/assets", exist_ok=True)

    # 1. SVG Favicon
    svg_data = create_svg_favicon()
    with open("assets/favicon.svg", "w") as f:
        f.write(svg_data)
    with open("dist/assets/favicon.svg", "w") as f:
        f.write(svg_data)
    with open("favicon.svg", "w") as f:
        f.write(svg_data)
    with open("dist/favicon.svg", "w") as f:
        f.write(svg_data)

    # 2. PNG and ICO Icons
    icon_180, icon_32, icon_16 = create_brand_icons()
    
    icon_180.save("assets/apple-touch-icon.png", format="PNG")
    icon_180.save("apple-touch-icon.png", format="PNG")
    icon_180.save("apple-touch-icon-precomposed.png", format="PNG")
    icon_180.save("dist/apple-touch-icon.png", format="PNG")
    icon_180.save("dist/apple-touch-icon-precomposed.png", format="PNG")
    icon_180.save("dist/assets/apple-touch-icon.png", format="PNG")

    icon_32.save("assets/favicon-32x32.png", format="PNG")
    icon_32.save("favicon-32x32.png", format="PNG")
    icon_32.save("dist/assets/favicon-32x32.png", format="PNG")
    icon_32.save("dist/favicon-32x32.png", format="PNG")

    icon_32.save("favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])
    icon_32.save("dist/favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])
    icon_32.save("assets/favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])
    icon_32.save("dist/assets/favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])

    # 3. OG Image (1200x630)
    og_img = create_og_image()
    og_img.save("assets/og-image.png", format="PNG", quality=95)
    og_img.save("dist/assets/og-image.png", format="PNG", quality=95)
    print("✓ Banner og-image.png (1200x630) re-gerado com contraste absoluto e alta legibilidade!")

if __name__ == "__main__":
    main()
