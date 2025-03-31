import React, { useState } from "react";
import axios from "axios";

const HealthAccess = () => {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [consultationScheduled, setConsultationScheduled] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState(null);
  const [aiRecommendation, setAiRecommendation] = useState(null);

  const handleScheduleConsultation = () => {
    setConsultationScheduled(true);
  };

  const handleRunDiagnostics = () => {
    setDiagnosticResults({
      diagnosis: "Mild Respiratory Infection",
      recommendedCare: "Rest, hydration, and over-the-counter cold medication",
    });
  };

  const handleGetRecommendation = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/get-recommendation",
        {
          symptoms,
        }
      );

      setAiRecommendation(response.data.recommendation);
    } catch (error) {
      console.error("Error fetching AI recommendations:", error);
      setAiRecommendation("Unable to fetch recommendations at this time.");
    }
  };

  return (
    <div className="p-4 mx-auto max-w-3xl text-gray-800">
      <h2 className="text-center text-3xl font-semibold py-6 text-gray-700">
        Community Health Platform
      </h2>

      <div className="mb-6">
        <label className="block font-semibold text-gray-600 mb-2">
          Patient Name:
        </label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter Patient Name"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-gray-600 mb-2">Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter Age"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-gray-600 mb-2">
          Symptoms:
        </label>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="border p-2 rounded w-full"
          rows="4"
          placeholder="Describe symptoms here..."
        ></textarea>
      </div>

      <div className="mb-6">
        <button
          onClick={handleScheduleConsultation}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Schedule Virtual Consultation
        </button>
      </div>

      <div className="mb-6">
        <button
          onClick={handleRunDiagnostics}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Run AI Diagnostics
        </button>
      </div>

      <div className="mb-6">
        <button
          onClick={handleGetRecommendation}
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Get AI Recommendations
        </button>
      </div>

      {diagnosticResults && (
        <div className="border rounded-lg p-4 mb-6 shadow-md">
          <h3 className="font-semibold text-lg text-gray-700">
            Diagnostic Results
          </h3>
          <p>
            <strong>Diagnosis:</strong> {diagnosticResults.diagnosis}
          </p>
          <p>
            <strong>Recommended Care:</strong>{" "}
            {diagnosticResults.recommendedCare}
          </p>
        </div>
      )}

      {aiRecommendation && (
        <div className="border rounded-lg p-4 mb-6 shadow-md">
          <h3 className="font-semibold text-lg text-gray-700">
            AI Recommendation
          </h3>
          <p>{aiRecommendation}</p>
        </div>
      )}

      {consultationScheduled && (
        <div className="border rounded-lg p-4 mb-6 shadow-md">
          <h3 className="font-semibold text-lg text-gray-700">
            Consultation Scheduled
          </h3>
          <p>
            A healthcare provider will contact you shortly for a virtual
            consultation.
          </p>
        </div>
      )}
    </div>
  );
};

export default HealthAccess;
