import os
import pandas as pd
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

# ==========================
# CONFIG
# ==========================

IMAGE_FOLDER = r"E:\Bhavika_Catering\gallery"
EXCEL_FILE = r"E:\Bhavika_Catering\cloudinary_gallery_mapping.xlsx"
CLOUDINARY_FOLDER = "bhavika-catering/gallery"

# ==========================
# LOAD ENV
# ==========================

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

# ==========================
# LOAD EXISTING EXCEL
# ==========================

if os.path.exists(EXCEL_FILE):
    df = pd.read_excel(EXCEL_FILE)

    if "filename" not in df.columns:
        raise Exception(
            "Excel must contain a 'filename' column"
        )

else:
    df = pd.DataFrame(
        columns=[
            "filename",
            "name",
            "public_url",
            "category"
        ]
    )

uploaded_files = set(df["filename"].astype(str))

# ==========================
# PROCESS IMAGES
# ==========================

allowed_extensions = (
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".avif"
)

uploaded_count = 0
skipped_count = 0

for filename in os.listdir(IMAGE_FOLDER):

    if not filename.lower().endswith(allowed_extensions):
        continue

    if filename in uploaded_files:
        print(f"✓ Skipped: {filename}")
        skipped_count += 1
        continue

    filepath = os.path.join(IMAGE_FOLDER, filename)

    public_id = os.path.splitext(filename)[0]

    print(f"⬆ Uploading: {filename}")

    try:
        result = cloudinary.uploader.upload(
            filepath,
            folder=CLOUDINARY_FOLDER,
            public_id=public_id,
            overwrite=False,
            unique_filename=False,
            use_filename=False
        )

        # Generate default name by removing extension, replacing hyphens/underscores with spaces, and capitalizing
        base_name = os.path.splitext(filename)[0]
        prettified_name = base_name.replace('-', ' ').replace('_', ' ').title()

        new_row = pd.DataFrame([{
            "filename": filename,
            "name": prettified_name,
            "public_url": result["secure_url"],
            "category": ""
        }])

        df = pd.concat(
            [df, new_row],
            ignore_index=True
        )

        uploaded_count += 1

        print(f"✓ Uploaded: {filename}")

    except Exception as e:
        print(f"❌ Failed: {filename}")
        print(e)

# ==========================
# SAVE EXCEL
# ==========================

df.to_excel(EXCEL_FILE, index=False)

print("\n========================")
print("UPLOAD COMPLETE")
print("========================")
print(f"Uploaded : {uploaded_count}")
print(f"Skipped  : {skipped_count}")
print(f"Excel    : {EXCEL_FILE}")
print("========================")

# Automatically convert Excel database to website JSON config
import subprocess
try:
    print("\nSyncing gallery JSON data...")
    subprocess.run(["python", "scripts/convert_gallery.py"], check=True)
except Exception as e:
    print("⚠️ Failed to automatically run convert_gallery.py:")
    print(e)