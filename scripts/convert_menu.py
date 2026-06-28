import pandas as pd
import json
import os

def convert():
    excel_path = 'bhavika_menu_master_unique.xlsx'
    if not os.path.exists(excel_path):
        print(f"Error: {excel_path} not found")
        return

    df = pd.read_excel(excel_path)
    
    # Filter only Active items
    if 'Active' not in df.columns:
        print("Error: 'Active' column not found in Excel sheet")
        return
        
    # Standardize to boolean checks
    df_active = df[df['Active'].astype(str).str.lower().str.strip().isin(['true', '1', 'yes', 'y'])]

    menu_items = []
    for idx, row in df_active.iterrows():
        # Map category 'Sindhi Special' to 'Sindhi Specials'
        category = str(row['Category']).strip()
        if category == 'Sindhi Special':
            category = 'Sindhi Specials'

        # Parse tags
        tags = str(row['Tags']).strip() if pd.notna(row['Tags']) else ''
        tags_list = [t.strip() for t in tags.replace(',', ';').split(';') if t.strip()] if tags else []

        menu_items.append({
            'id': f"m_{idx}",
            'name': str(row['Dish Name']).strip(),
            'category': category,
            'tags': tags_list,
            'description': str(row['Description']).strip() if pd.notna(row['Description']) else ''
        })

    # Ensure target directory exists
    os.makedirs('src/data', exist_ok=True)
    with open('src/data/menu.json', 'w', encoding='utf-8') as f:
        json.dump(menu_items, f, ensure_ascii=False, indent=2)

    print(f"Successfully converted {len(menu_items)} active menu items to src/data/menu.json")

if __name__ == '__main__':
    convert()
