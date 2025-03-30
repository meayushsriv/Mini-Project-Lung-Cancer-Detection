from flask import Flask, render_template, request
import numpy as np
import tensorflow as tf
from PIL import Image
import os

app = Flask(__name__)

# Load the trained model
MODEL_PATH = "lung_cancer_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


def preprocess_image(image_path):
    """Preprocess image for model prediction"""
    img = Image.open(image_path).convert("RGB")
    img = img.resize((350, 350))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array


@app.route("/", methods=["GET", "POST"])
def upload_file():
    if request.method == "POST":
        file = request.files["file"]
        if file:
            file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
            file.save(file_path)

            # Preprocess and predict
            processed_image = preprocess_image(file_path)
            prediction = model.predict(processed_image)

            # Convert prediction to readable format (adjust based on your model output)
            result = "Cancer Detected" if prediction[0][0] > 0.5 else "No Cancer Detected"

            return render_template("upload.html", result=result)

    return render_template("upload.html", result=None)


if __name__ == "__main__":
    app.run(debug=True)
