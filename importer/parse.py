from pathlib import Path
import re
import pandas as pd

output_folder = Path("output")

rows = []

phone_pattern = r"\b\d{10}\b"

for file in sorted(output_folder.glob("page_*.txt")):

    text = file.read_text(encoding="utf-8")

    phones = re.findall(phone_pattern, text)

    rows.append({
        "Page": file.stem,
        "Phone Numbers Found": ", ".join(phones),
        "Total Phones": len(phones)
    })

df = pd.DataFrame(rows)

df.to_excel(output_folder / "phone_summary.xlsx", index=False)

print(df)

print("\nDone!")