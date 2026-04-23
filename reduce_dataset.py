import os
import random
import shutil

# 📁 Path to nevus folder
source_folder = "dataset/train/nevus"

# 📁 Where extra images will go
backup_folder = "dataset/train/nevus_extra"

# 🎯 Number of images to KEEP
keep_count = 1200

# Create backup folder if not exists
os.makedirs(backup_folder, exist_ok=True)

# Get all images
images = os.listdir(source_folder)
print("Total images:", len(images))

# Shuffle randomly
random.shuffle(images)

# Split
keep_images = images[:keep_count]
remove_images = images[keep_count:]

# Move extra images
for img in remove_images:
    src_path = os.path.join(source_folder, img)
    dst_path = os.path.join(backup_folder, img)
    shutil.move(src_path, dst_path)

print(f"✅ Kept {len(keep_images)} images")
print(f"📦 Moved {len(remove_images)} images to backup folder")