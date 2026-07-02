from rapidocr_onnxruntime import RapidOCR

print("Starting OCR...")

engine = RapidOCR()

print("Engine loaded.")

image_path = "output/images/page_001.png"

print(f"Reading: {image_path}")

try:
    result, _ = engine(image_path)

    print("OCR Finished!")

    print(result)

except Exception as e:
    print("ERROR:")
    print(e)