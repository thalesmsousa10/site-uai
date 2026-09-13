import os
import subprocess
import time
from PIL import Image

CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE_URL = "http://localhost:3000/apresentacao/index.html?export=1"
OUTPUT_DIR = "/Users/machado/Documents/U.AI/Site UAI/Novo Site/apresentacao"
PDF_PATH = os.path.join(OUTPUT_DIR, "U.AI - Apresentacao Comercial.pdf")
TMP_IMAGES = []

TOTAL_SLIDES = 8

print("=== Gerando Apresentação U.AI em Ultra-Alta Resolução 4K Retina (3840x2160) ===")

for i in range(1, TOTAL_SLIDES + 1):
    slide_url = f"{BASE_URL}#slide-{i}"
    img_path = os.path.join(OUTPUT_DIR, f".retina_slide_{i}.png")
    TMP_IMAGES.append(img_path)
    
    # Captura em 2x Retina (3840x2160) direto do motor de renderizacao de tela
    cmd = [
        CHROME_PATH,
        "--headless",
        "--disable-gpu",
        "--window-size=1920,1080",
        "--force-device-scale-factor=2",
        f"--screenshot={img_path}",
        slide_url
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"✓ Slide {i}/{TOTAL_SLIDES} renderizado em 4K Retina com sucesso.")

# Carregar imagens em alta fidelidade e compilar em PDF de 300 DPI
images = []
for img_path in TMP_IMAGES:
    if os.path.exists(img_path):
        img = Image.open(img_path).convert("RGB")
        images.append(img)
    else:
        print(f"Erro: Imagem {img_path} não encontrada!")

if images:
    images[0].save(
        PDF_PATH,
        "PDF",
        resolution=300.0,
        quality=95,
        save_all=True,
        append_images=images[1:]
    )
    print(f"=== PDF 4K Retina gerado com sucesso: {PDF_PATH} ({len(images)} páginas) ===")

# Limpar arquivos temporarios
for img_path in TMP_IMAGES:
    if os.path.exists(img_path):
        os.remove(img_path)
print("Limpeza concluída.")
