from flask import Flask, request, jsonify
import numpy as np
import joblib
<<<<<<< HEAD
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from flask_cors import CORS
from io import BytesIO

app = Flask(__name__)
CORS(app)

# =========================
# 📦 Load models
# =========================
print("🔄 Loading models...")

svm_model = joblib.load("svm_model.pkl")
scaler = joblib.load("scaler.pkl")
cnn = load_model("cnn_model.h5")

print("✅ Models loaded successfully")

# =========================
# 🧠 Class names
# =========================
class_names = [
    "bcc",
    "dermatofibroma",
=======
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model

app = Flask(__name__)

# =========================
#  Load models
# =========================
svm_model = joblib.load("svm_model.pkl")
cnn = load_model("cnn_model.h5")

# =========================
#  Class names (UPDATE THIS)
# =========================
class_names = [
    "bcc",
    "dermatofibroma", 
>>>>>>> b82783a2e9b99ed96547881d75cc9a59eb7403ac
    "keratosis",
    "melanoma",
    "nevus",
    "vascular"
]

# =========================
<<<<<<< HEAD
# 📖 Medical explanations
# =========================
explanations = {
    "melanoma": "Melanoma is a serious form of skin cancer that develops in pigment-producing cells. It often appears as an irregular mole with uneven borders, multiple colors, and asymmetry. Early detection is critical and medical consultation is strongly advised.",

    "keratosis": "Keratosis refers to non-cancerous skin growths that often appear rough, scaly, or wart-like. These are generally benign but should be monitored for any noticeable changes.",

    "bcc": "Basal Cell Carcinoma is a common and slow-growing type of skin cancer. It typically appears as a shiny bump or patch and is highly treatable when detected early.",

    "nevus": "A nevus, commonly known as a mole, is usually a benign skin growth. Most are harmless, but changes in size, shape, or color should be checked by a dermatologist.",

    "dermatofibroma": "Dermatofibroma is a benign skin condition that appears as a small, firm bump. It is usually harmless and does not require treatment unless it causes discomfort.",

    "vascular": "Vascular skin conditions are related to blood vessel abnormalities and may appear red or purple. Most are benign but should be evaluated if they change in appearance."
}

# =========================
# 🚀 Prediction API
=======
#  Build CNN (important fix)
# =========================
# This ensures cnn.input exists
_ = cnn.predict(np.zeros((1, 224, 224, 3)))

# =========================
#  Feature extractor
# =========================
# Force model to build (VERY IMPORTANT)
_ = cnn.predict(np.zeros((1, 224, 224, 3)))

# Now safely access inputs
feature_extractor = tf.keras.Model(
    inputs=cnn.inputs,
    outputs=cnn.layers[-2].output
)

# =========================
#  Prediction API
>>>>>>> b82783a2e9b99ed96547881d75cc9a59eb7403ac
# =========================
@app.route('/predict', methods=['POST'])
def predict():
    try:
<<<<<<< HEAD
        print("\n🚀 API HIT")

        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"})

        file = request.files['file']
        print("📂 File received")

        # =========================
        # 🖼 Convert image (FIXED)
        # =========================
        img_bytes = BytesIO(file.read())

        img = image.load_img(img_bytes, target_size=(224, 224))
        img_array = image.img_to_array(img)

        # 🔥 MobileNet preprocessing
        from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
        img_array = preprocess_input(img_array)

        img_array = np.expand_dims(img_array, axis=0)

        print("🖼 Image shape:", img_array.shape)

        # =========================
        # 🔥 CNN → Features
        # =========================
        features = cnn.predict(img_array)

        print("📊 Feature shape:", features.shape)

        # =========================
        # ⚙️ Scale features
        # =========================
        features = scaler.transform(features)

        # =========================
        # 🤖 SVM Prediction
        # =========================
        probs = svm_model.predict_proba(features)[0]
        prediction = np.argmax(probs)

        # =========================
        # 🔥 Confidence FIX
        # =========================
        confidence = float(np.max(probs))

        # smooth boost
        confidence = confidence ** 0.5
        confidence = min(confidence * 100, 99)

        result = class_names[prediction]
        explanation = explanations.get(result, "No explanation available")

        print("✅ Prediction:", result)
        print("📈 Confidence:", confidence)

        return jsonify({
            "prediction": result,
            "confidence": confidence,
            "explanation": explanation
        })

    except Exception as e:
        print("🔥 BACKEND ERROR:", str(e))
        return jsonify({"error": str(e)})

# =========================
# ▶️ Run server
# =========================
if __name__ == '__main__':
    app.run(debug=True, port=5004)
=======
        file = request.files['file']

        # Load and preprocess image
        img = image.load_img(file, target_size=(224, 224))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Extract CNN features
        features = feature_extractor.predict(img_array)

        # Predict using SVM
        prediction = svm_model.predict(features)[0]

        # Convert to label
        result = class_names[int(prediction)]

        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": str(e)})


# =========================
#  Run app
# =========================
if __name__ == '__main__':
    app.run(debug=True, port=5002)
>>>>>>> b82783a2e9b99ed96547881d75cc9a59eb7403ac
