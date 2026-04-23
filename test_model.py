import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image

# load trained model
model = tf.keras.models.load_model("skora_skin_model.h5")

# class names
classes = ["bcc","dermatofibroma","keratosis","melanoma","nevus","vascular"]

# load image
img = image.load_img("test.jpg", target_size=(224,224))
img_array = image.img_to_array(img)

img_array = img_array/255.0
img_array = np.expand_dims(img_array, axis=0)

# prediction
prediction = model.predict(img_array)

predicted_class = classes[np.argmax(prediction)]

print("Predicted disease:", predicted_class)