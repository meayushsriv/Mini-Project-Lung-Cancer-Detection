from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from PIL import Image
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the trained model
MODEL_PATH = "lung_cancer_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Define class labels (Ensure they match the model's training)
CLASS_LABELS = ["Normal", "Adenocarcinoma", "Large Cell Carcinoma", "Squamous Cell Carcinoma"]
CANCER_TYPES = {
    "Normal": "No Cancer Detected",
    "Adenocarcinoma": "Adenocarcinoma - Cancer in mucus-producing glands",
    "Large Cell Carcinoma": "Large Cell Carcinoma - Aggressive non-small cell lung cancer",
    "Squamous Cell Carcinoma": "Squamous Cell Carcinoma - Cancer in thin, flat cells lining airways"
}

def preprocess_image(image_path):
    """Preprocess image for model prediction"""
    img = Image.open(image_path).convert("RGB")
    img = img.resize((350, 350))  # Ensure model input size
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route("/", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if file:
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        file.save(file_path)

        # Preprocess and predict
        processed_image = preprocess_image(file_path)
        predictions = model.predict(processed_image)[0]  # Extract predictions

        # Get highest confidence class
        predicted_class_index = np.argmax(predictions)
        predicted_class = CLASS_LABELS[predicted_class_index]
        confidence = float(predictions[predicted_class_index])  # Convert to Python float
        cancer_type = CANCER_TYPES[predicted_class]  # Get description

        # Create a dictionary for class probabilities
        class_probabilities = {CLASS_LABELS[i]: float(predictions[i]) for i in range(len(CLASS_LABELS))}

        response = {
            "result": predicted_class,
            "confidence": confidence,
            "cancer_type": cancer_type,
            "class_probabilities": class_probabilities
        }

        return jsonify(response)

    return jsonify({"error": "Invalid request"}), 400

if __name__ == "__main__":
    app.run(debug=True)
