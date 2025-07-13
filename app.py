from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np
import os

app = Flask(__name__)

# Load the saved model from the models directory
model_path = os.path.join("models", "Hybrid.pkl")
model = joblib.load(model_path)

@app.route("/")
def home():
    return render_template("index.html")  # Load frontend

# Endpoint to make predictions
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json  # Expecting input as JSON
    features = np.array(data["features"]).reshape(1, -1)  # Convert to numpy array
    
    prediction = model.predict(features)  # Get prediction
    result = int(prediction[0])  # Convert to integer
    
    return jsonify({"prediction": result})  # Return response as JSON

if __name__ == "__main__":
    app.run(debug=True)
