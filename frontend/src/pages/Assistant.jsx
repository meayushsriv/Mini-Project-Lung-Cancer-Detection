import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GeminiAssistant = () => {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [medicalReport, setMedicalReport] = useState(null);
  const [stepCount, setStepCount] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [suggestions, setSuggestions] = useState("");

  const genAI = new GoogleGenerativeAI(
    "AIzaSyBMHffY3LU_bNvkzXP8ULaJvL6A-oTtCDg"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const prompt = `
        Patient Information:
        - Name: ${patientName}
        - Age: ${age}
        - Symptoms: ${symptoms}

        Health Data:
        - Step Count: ${stepCount || "Not provided"}
        - Heart Rate: ${heartRate || "Not provided"}
        - Sleep Hours: ${sleepHours || "Not provided"}

        Please give what could be medicine that are given by the medical reports.
      `;

      const result = await model.generateContent(prompt);
      setSuggestions(result.response.text());
    } catch (error) {
      console.error("Error generating suggestions:", error);
      setSuggestions("Error generating suggestions. Please try again later.");
    }
  };

  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          VIRTUAL <span className="text-gray-700 font-semibold">NURSING</span>
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="my-10 flex flex-col gap-6 mb-28 text-sm mx-auto max-w-lg"
      >
        {/* Patient Name */}
        <label className="text-gray-600 font-semibold">Patient Name:</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        {/* Age */}
        <label className="text-gray-600 font-semibold">Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border p-2 rounded"
          required
        />

        {/* Symptoms */}
        <label className="text-gray-600 font-semibold">Symptoms:</label>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="border p-2 rounded"
          rows="4"
          placeholder="Describe the symptoms here..."
          required
        />

        {/* Health Metrics */}
        <label className="text-gray-600 font-semibold">Daily Step Count:</label>
        <input
          type="number"
          value={stepCount}
          onChange={(e) => setStepCount(e.target.value)}
          className="border p-2 rounded"
          placeholder="Enter your daily steps count"
        />

        <label className="text-gray-600 font-semibold">
          Average Heart Rate (bpm):
        </label>
        <input
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          className="border p-2 rounded"
          placeholder="Enter your average heart rate"
        />

        <label className="text-gray-600 font-semibold">
          Sleep Duration (hours):
        </label>
        <input
          type="number"
          value={sleepHours}
          onChange={(e) => setSleepHours(e.target.value)}
          className="border p-2 rounded"
          placeholder="Enter your sleep duration"
        />

        {/* Upload Medical Report */}
        <label className="text-gray-600 font-semibold">
          Upload Medical Report:
        </label>
        <input
          type="file"
          onChange={(e) => setMedicalReport(e.target.files[0])}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="border border-black px-8 py-4 mt-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
        >
          Get Suggestions
        </button>
      </form>

      {/* Display AI Suggestions */}
      {suggestions && (
        <div className="my-10 text-gray-600">
          <h2 className="font-semibold text-lg">
            Suggested Prescription & Cure:
          </h2>
          <p>{suggestions}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiAssistant;
