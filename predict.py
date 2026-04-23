import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model, Model
from tensorflow.keras.preprocessing import image
import joblib

# 📦 Load models
cnn_model = load_model("cnn_model.h5")
svm_model = joblib.load("svm_model.pkl")
scaler = joblib.load("scaler.pkl")

# 🔍 Create feature extractor (remove last layer)
feature_extractor = Model(
    inputs=cnn_model.input,
    outputs=cnn_model.layers[-2].output
)

# 🖼 Load and preprocess image
def preprocess(img_path):
    img = image.load_img(img_path, target_size=(224,224))
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# 🚀 Prediction function
def predict_image(img_path):
    img = preprocess(img_path)

    # CNN → Feature extraction
    features = feature_extractor.predict(img)

    # Scaling
    features = scaler.transform(features)

    # SVM prediction
    prediction = svm_model.predict(features)

    return prediction[0]

# 🧪 Test
result = predict_image("test.jpg")
print("Prediction:", result)