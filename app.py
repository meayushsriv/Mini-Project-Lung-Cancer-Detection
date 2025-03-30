from flask import Flask, request, render_template
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import os

# Initialize Flask app
app = Flask(__name__)

# Load trained model
MODEL_PATH = "lung_cancer_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

# Define image size (same as during training)
IMAGE_SIZE = (350, 350)

# Define class labels (same as used during training)
class_labels = ["Normal", "Adenocarcinoma", "Large Cell Carcinoma", "Squamous Cell Carcinoma"]

# Function to preprocess the image
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=IMAGE_SIZE)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Convert to batch format
    img_array /= 255.0  # Normalize
    return img_array

# Route to render the upload form
@app.route("/", methods=["GET", "POST"])
def upload_file():
    if request.method == "POST":
        if "file" not in request.files:
            return "No file uploaded", 400
        
        file = request.files["file"]
        if file.filename == "":
            return "No selected file", 400

        # Save the uploaded file
        file_path = os.path.join("uploads", file.filename)
        file.save(file_path)

        # Preprocess and predict
        img = preprocess_image(file_path)
        predictions = model.predict(img)
        predicted_class = np.argmax(predictions[0])
        predicted_label = class_labels[predicted_class]

        return render_template("result.html", filename=file.filename, prediction=predicted_label)

    return render_template("upload.html")

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
