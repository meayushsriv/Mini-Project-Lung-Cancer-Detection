import React, { useState } from "react";

const EHRIntegration = () => {
  const [patientID, setPatientID] = useState("");
  const [ehrData, setEhrData] = useState(null);
  const [schemeBenefits, setSchemeBenefits] = useState(null);
  const [claimStatus, setClaimStatus] = useState("");

  const handleSearchEHR = () => {
    // Simulated fetch for EHR data
    setEhrData({
      name: "John Doe",
      age: 45,
      medicalHistory: "Diabetes, Hypertension",
      recentVisits: "Last visit on 15-Oct-2024",
    });
  };

  const handleViewBenefits = () => {
    // Simulated fetch for scheme benefits
    setSchemeBenefits({
      schemeName: "Ayushman Bharat",
      eligibility: "Eligible",
      benefits: "Up to ₹5 lakh per family per year",
    });
  };

  const handleSubmitClaim = () => {
    // Simulated claim submission
    setClaimStatus("Claim submitted successfully and under review.");
  };

  return (
    <div className="p-4 mx-auto max-w-3xl text-gray-800">
      <h2 className="text-center text-3xl font-semibold py-6 text-gray-700">
        EHR & Government Scheme Integration
      </h2>

      {/* Patient EHR Search */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-600 mb-2">
          Enter Patient ID:
        </label>
        <input
          type="text"
          value={patientID}
          onChange={(e) => setPatientID(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter Patient ID"
        />
        <button
          onClick={handleSearchEHR}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fetch EHR
        </button>
      </div>

      {/* Display EHR Data */}
      {ehrData && (
        <div className="border rounded-lg p-4 mb-6 shadow-md">
          <h3 className="font-semibold text-lg text-gray-700">
            Electronic Health Record
          </h3>
          <p>
            <strong>Name:</strong> {ehrData.name}
          </p>
          <p>
            <strong>Age:</strong> {ehrData.age}
          </p>
          <p>
            <strong>Medical History:</strong> {ehrData.medicalHistory}
          </p>
          <p>
            <strong>Recent Visits:</strong> {ehrData.recentVisits}
          </p>
        </div>
      )}

      {/* View Scheme Benefits */}
      <div className="mb-6">
        <button
          onClick={handleViewBenefits}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          View Government Scheme Benefits
        </button>
      </div>

      {/* Display Scheme Benefits */}
      {schemeBenefits && (
        <div className="border rounded-lg p-4 mb-6 shadow-md">
          <h3 className="font-semibold text-lg text-gray-700">
            Scheme Benefits
          </h3>
          <p>
            <strong>Scheme Name:</strong> {schemeBenefits.schemeName}
          </p>
          <p>
            <strong>Eligibility:</strong> {schemeBenefits.eligibility}
          </p>
          <p>
            <strong>Benefits:</strong> {schemeBenefits.benefits}
          </p>
        </div>
      )}

      {/* Submit Claim Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-700 mb-2">
          Submit a Claim
        </h3>
        <button
          onClick={handleSubmitClaim}
          className="px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Submit Claim
        </button>
      </div>

      {/* Display Claim Status */}
      {claimStatus && (
        <div className="border rounded-lg p-4 mb-6 shadow-md">
          <h3 className="font-semibold text-lg text-gray-700">Claim Status</h3>
          <p>{claimStatus}</p>
        </div>
      )}

      {/* CSR and Providence Note */}
      <div className="border-t mt-8 pt-4 text-sm text-gray-600">
        <p>
          <strong>Providence’s Role:</strong> As part of Providence’s CSR
          initiative, this platform simplifies access to healthcare by
          integrating EHRs with government schemes, ensuring that patients can
          access benefits with ease while maintaining data privacy and security.
        </p>
      </div>
    </div>
  );
};

export default EHRIntegration;
