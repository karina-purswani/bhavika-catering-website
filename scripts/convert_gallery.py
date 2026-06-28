import pandas as pd
import json
import os

def convert():
    excel_path = 'cloudinary_gallery_mapping.xlsx'
    if not os.path.exists(excel_path):
        print(f"Error: {excel_path} not found")
        return

    df = pd.read_excel(excel_path)
    
    # Check required columns
    required_cols = ['public_url', 'category']
    for col in required_cols:
        if col not in df.columns:
            print(f"Error: Required column '{col}' not found in Excel sheet")
            return

    # Filter only rows with valid public_url
    df_valid = df[df['public_url'].astype(str).str.strip().str.startswith('http')]

    gallery_items = []
    for idx, row in df_valid.iterrows():
        # Clean and standardize category
        category = str(row['category']).strip()
        category_lower = category.lower()
        
        if 'food' in category_lower:
            category_standardized = 'Food Items'
        elif 'event' in category_lower or 'setup' in category_lower:
            category_standardized = 'Event Setups'
        elif 'live' in category_lower or 'counter' in category_lower:
            category_standardized = 'Live Counters'
        else:
            # Fallback to category as-is, or default to Food Items
            category_standardized = 'Food Items'

        # Get name/title
        title = str(row['name']).strip() if 'name' in df.columns and pd.notna(row['name']) else ''
        if not title:
            # If name is empty, try to prettify filename
            if 'filename' in df.columns and pd.notna(row['filename']):
                filename = str(row['filename']).strip()
                base_name = os.path.splitext(filename)[0]
                title = base_name.replace('-', ' ').replace('_', ' ').title()
            else:
                title = f"Gallery Item {idx + 1}"

        # Get description (support 'description' or 'desc' columns)
        desc = ""
        for col_name in ['description', 'desc']:
            if col_name in df.columns and pd.notna(row[col_name]):
                desc = str(row[col_name]).strip()
                break

        gallery_items.append({
            'id': f"g_{idx}",
            'title': title,
            'category': category_standardized,
            'image': str(row['public_url']).strip(),
            'desc': desc
        })

    # Ensure target directory exists
    os.makedirs('src/data', exist_ok=True)
    with open('src/data/gallery.json', 'w', encoding='utf-8') as f:
        json.dump(gallery_items, f, ensure_ascii=False, indent=2)

    print(f"Successfully converted {len(gallery_items)} gallery items to src/data/gallery.json")

if __name__ == '__main__':
    convert()
