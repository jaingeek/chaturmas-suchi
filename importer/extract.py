import fitz
from pathlib import Path

# PDF location
pdf_path = Path("input/Chaturmas-Suchi-2026.pdf")

# Output folder
output_folder = Path("output/images")
output_folder.mkdir(parents=True, exist_ok=True)

# Open PDF
doc = fitz.open(pdf_path)

print(f"Total Pages: {len(doc)}")

for page_num in range(len(doc)):
    page = doc.load_page(page_num)

    # High quality image (2x zoom)
    matrix = fitz.Matrix(2, 2)

    pix = page.get_pixmap(matrix=matrix)

    image_path = output_folder / f"page_{page_num + 1:03}.png"

    pix.save(image_path)

    print(f"Saved {image_path.name}")

print("\nAll pages converted to images successfully!")