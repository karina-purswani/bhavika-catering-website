import pandas as pd
import re

# Read existing file
df = pd.read_excel("bhavika_menu_master.xlsx")

# Words that indicate variants
variant_words = [
    "Premium",
    "Deluxe",
    "Wedding Style",
    "Party Special",
    "Chef's Choice",
    "Jain",
    "Punjabi",
    "Classic",
    "Traditional",
    "Royal"
]

def clean_dish_name(name):
    name = str(name)

    # Remove "- Premium", "- Deluxe", etc.
    name = re.sub(
        r"\s*-\s*(Premium|Deluxe|Wedding Style|Party Special|Chef's Choice)$",
        "",
        name,
        flags=re.IGNORECASE
    )

    # Remove prefixes like "Royal", "Traditional", etc.
    for word in variant_words:
        pattern = f"^{re.escape(word)}\\s+"
        name = re.sub(pattern, "", name, flags=re.IGNORECASE)

    return name.strip()

# Create cleaned name column
df["Dish Name"] = df["Dish Name"].apply(clean_dish_name)

# Remove duplicate dishes within same category
df = df.drop_duplicates(
    subset=["Category", "Dish Name"],
    keep="first"
)

# Reset index
df = df.reset_index(drop=True)

# Save output
output_file = "bhavika_menu_master_unique.xlsx"
df.to_excel(output_file, index=False)

print(f"Saved {len(df)} unique dishes to {output_file}")