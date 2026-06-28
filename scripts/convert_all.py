import os
import sys

# Add scripts directory to path to ensure imports work
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import convert_menu
import convert_gallery

def convert_all():
    print("--- Starting Data Conversion ---")
    
    print("\n[1/2] Converting Menu Master Excel...")
    try:
        convert_menu.convert()
    except Exception as e:
        print(f"❌ Error converting menu data: {e}")
        
    print("\n[2/2] Converting Gallery Mapping Excel...")
    try:
        convert_gallery.convert()
    except Exception as e:
        print(f"❌ Error converting gallery data: {e}")
        
    print("\n--- Data Conversion Finished ---")

if __name__ == '__main__':
    convert_all()
