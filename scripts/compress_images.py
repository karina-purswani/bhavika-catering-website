import os
import sys
import subprocess

# Auto-install Pillow if not found
try:
    from PIL import Image
except ImportError:
    print("Pillow not found. Installing Pillow in the virtual environment...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
        # In python, to import a package installed dynamically in the same process,
        # we might need to refresh site-packages:
        import site
        from importlib import reload
        reload(site)
        from PIL import Image
        print("[SUCCESS] Pillow successfully installed.")
    except Exception as e:
        print(f"[ERROR] Failed to install Pillow: {e}")
        sys.exit(1)

def compress_image(filepath, format_type):
    """
    Compresses an image in-place if the compressed version is smaller.
    """
    original_size = os.path.getsize(filepath)
    if original_size == 0:
        return 0, 0
    
    try:
        img = Image.open(filepath)
        temp_filepath = filepath + ".tmp"
        
        if format_type == 'JPEG':
            # Save as JPEG with optimize=True, quality=80
            # JPEGs can't have alpha channel, convert to RGB if it has transparency
            if img.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[3]) # 3 is alpha
                background.save(temp_filepath, 'JPEG', quality=80, optimize=True)
            else:
                img.save(temp_filepath, 'JPEG', quality=80, optimize=True)
                
        elif format_type == 'PNG':
            # Save PNG with optimize=True
            img.save(temp_filepath, 'PNG', optimize=True)
            
        elif format_type == 'WEBP':
            # Save WebP with quality=80
            img.save(temp_filepath, 'WEBP', quality=80)
            
        else:
            return 0, 0
        
        compressed_size = os.path.getsize(temp_filepath)
        
        # Replace only if we actually saved space
        if compressed_size < original_size:
            os.replace(temp_filepath, filepath)
            saved = original_size - compressed_size
            percent = (saved / original_size) * 100
            print(f"  [COMPRESSED] {os.path.basename(filepath)} | Size: {original_size/1024:.1f}KB -> {compressed_size/1024:.1f}KB (-{percent:.1f}%)")
            return original_size, compressed_size
        else:
            os.remove(temp_filepath)
            print(f"  [SKIPPED] {os.path.basename(filepath)} | Size: {original_size/1024:.1f}KB")
            return original_size, original_size
            
    except Exception as e:
        print(f"  [ERROR] Failed to compress {os.path.basename(filepath)}: {e}")
        if os.path.exists(filepath + ".tmp"):
            os.remove(filepath + ".tmp")
        return 0, 0

def run_compression():
    print("--- Starting Image Compression ---")
    
    image_dirs = [
        ("public/assets", [".png", ".jpg", ".jpeg", ".webp"]),
        ("gallery", [".jpg", ".jpeg", ".png", ".webp"]),
        ("src/assets", [".png", ".jpg", ".jpeg", ".webp"])
    ]
    
    total_original = 0
    total_compressed = 0
    compressed_count = 0
    
    for dir_path, extensions in image_dirs:
        if not os.path.exists(dir_path):
            print(f"\nDirectory {dir_path} not found. Skipping.")
            continue
            
        print(f"\nScanning: {dir_path} ...")
        
        # Walk directory
        for root, _, files in os.walk(dir_path):
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in extensions:
                    filepath = os.path.join(root, file)
                    
                    if ext in [".jpg", ".jpeg"]:
                        fmt = 'JPEG'
                    elif ext == ".png":
                        fmt = 'PNG'
                    elif ext == ".webp":
                        fmt = 'WEBP'
                    else:
                        continue
                        
                    orig, comp = compress_image(filepath, fmt)
                    if orig > 0:
                        total_original += orig
                        total_compressed += comp
                        if comp < orig:
                            compressed_count += 1
                            
    print("\n--- Image Compression Summary ---")
    if total_original > 0:
        total_saved = total_original - total_compressed
        percent_saved = (total_saved / total_original) * 100
        print(f"Total files compressed: {compressed_count}")
        print(f"Original total size:   {total_original / (1024*1024):.2f} MB")
        print(f"Compressed total size: {total_compressed / (1024*1024):.2f} MB")
        print(f"Total space saved:     {total_saved / (1024*1024):.2f} MB (-{percent_saved:.1f}%)")
    else:
        print("No image assets processed.")
    print("---------------------------------")

if __name__ == "__main__":
    run_compression()
