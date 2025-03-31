import React, { useState } from "react";

const LungCancerDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError("Error uploading file: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Lung Cancer Detection</h2>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload & Predict"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {prediction && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100">
          <p className="text-lg font-semibold">Result: {prediction.result}</p>
          <p>Confidence: {prediction.confidence.toFixed(2)}</p>
          {prediction.class_probabilities && (
            <div className="mt-2">
              <h3 className="text-md font-semibold">Class Probabilities:</h3>
              <ul>
                {Object.entries(prediction.class_probabilities).map(
                  ([className, prob], index) => (
                    <li key={index}>
                      {className}: {(prob * 100).toFixed(2)}%
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LungCancerDetection;
