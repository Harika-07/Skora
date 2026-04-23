import os
import shutil
import pandas as pd
from sklearn.model_selection import train_test_split

# Load metadata
df = pd.read_csv("HAM10000_metadata.csv")

# Map disease codes to names
disease_map = {
    "mel": "melanoma",
    "nv": "nevus",
    "bcc": "bcc",
    "akiec": "keratosis",
    "bkl": "keratosis",
    "df": "dermatofibroma",
    "vasc": "vascular"
}

df["label"] = df["dx"].map(disease_map)

# Train-test split
train_df, test_df = train_test_split(df, test_size=0.2, stratify=df["label"], random_state=42)

# Image folders
image_dirs = ["HAM10000_images_part_1", "HAM10000_images_part_2"]

def find_image(image_id):
    for folder in image_dirs:
        path = os.path.join(folder, image_id + ".jpg")
        if os.path.exists(path):
            return path
    return None

def move_images(dataframe, split):
    for _, row in dataframe.iterrows():
        label = row["label"]
        img_path = find_image(row["image_id"])

        if img_path:
            dest_dir = os.path.join("dataset", split, label)
            os.makedirs(dest_dir, exist_ok=True)

            shutil.copy(img_path, os.path.join(dest_dir, row["image_id"] + ".jpg"))

# Move images
move_images(train_df, "train")
move_images(test_df, "test")

print("Dataset sorted successfully!")