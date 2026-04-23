import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.models import Model
from tensorflow.keras.layers import GlobalAveragePooling2D
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.utils.class_weight import compute_class_weight
import joblib

# =========================
# 📁 Dataset paths
# =========================
train_dir = "dataset/train"
test_dir = "dataset/test"

# =========================
# 🔄 Data preprocessing (🔥 FIXED)
# =========================
datagen = ImageDataGenerator(
    preprocessing_function=preprocess_input,  # ✅ IMPORTANT
    rotation_range=20,
    zoom_range=0.2,
    horizontal_flip=True
)

train_data = datagen.flow_from_directory(
    train_dir,
    target_size=(224, 224),
    batch_size=32,
    class_mode='sparse',
    shuffle=False
)

test_data = datagen.flow_from_directory(
    test_dir,
    target_size=(224, 224),
    batch_size=32,
    class_mode='sparse',
    shuffle=False
)

# =========================
# 🧠 MobileNet Feature Extractor
# =========================
print("🧠 Loading MobileNetV2...")

base_model = MobileNetV2(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)

for layer in base_model.layers:
    layer.trainable = False

x = base_model.output
x = GlobalAveragePooling2D()(x)

cnn = Model(inputs=base_model.input, outputs=x)

# =========================
# 🔄 RESET GENERATORS
# =========================
train_data.reset()
test_data.reset()

# =========================
# 📊 Extract features
# =========================
print("📊 Extracting features...")
train_features = cnn.predict(train_data)
test_features = cnn.predict(test_data)

train_labels = train_data.classes
test_labels = test_data.classes

print("Train features:", train_features.shape)
print("Class distribution:", np.bincount(train_labels))

# =========================
# ⚙️ Feature scaling
# =========================
print("⚙️ Scaling features...")
scaler = StandardScaler()
train_features = scaler.fit_transform(train_features)
test_features = scaler.transform(test_features)

# =========================
# ⚖️ Compute class weights (🔥 FIX)
# =========================
classes = np.unique(train_labels)
weights = compute_class_weight('balanced', classes=classes, y=train_labels)
class_weights = dict(zip(classes, weights))

print("Class weights:", class_weights)

# =========================
# ⚡ Train SVM (🔥 IMPROVED)
# =========================
print("⚡ Training SVM...")

svm_model = SVC(
    kernel='rbf',
    C=20,                 # 🔥 stronger separation
    gamma='auto',         # 🔥 better feature spread
    probability=True,
    class_weight=class_weights
)

svm_model.fit(train_features, train_labels)

# =========================
# 📈 Evaluate
# =========================
accuracy = svm_model.score(test_features, test_labels)
print("✅ Final Hybrid Model Accuracy:", accuracy)

# =========================
# 💾 Save models
# =========================
joblib.dump(svm_model, "svm_model.pkl")
joblib.dump(scaler, "scaler.pkl")
cnn.save("cnn_model.h5")

print("💾 Models saved successfully!")