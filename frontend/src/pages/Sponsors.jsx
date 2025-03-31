import React, { useState } from "react";

const CareLink = () => {
  const [programName, setProgramName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState("");
  const [programs, setPrograms] = useState([]);

  const handleAddProgram = (e) => {
    e.preventDefault();
    const newProgram = { programName, date, location, participants };
    setPrograms([...programs, newProgram]);
    // Reset form fields
    setProgramName("");
    setDate("");
    setLocation("");
    setParticipants("");
  };

  return (
    <div className="p-4 mx-auto max-w-3xl text-gray-800">
      <h2 className="text-center text-3xl font-semibold py-6 text-gray-700">
        Sponsored Healthcare Programs
      </h2>

      {/* Program Scheduling Form */}
      <form onSubmit={handleAddProgram} className="mb-6">
        <div className="mb-4">
          <label className="block font-semibold text-gray-600 mb-2">
            Program Name:
          </label>
          <input
            type="text"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter Program Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-600 mb-2">
            Date:
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-600 mb-2">
            Location:
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter Location"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-600 mb-2">
            Expected Participants:
          </label>
          <input
            type="number"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter Number of Participants"
            required
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Schedule Program
        </button>
      </form>

      {/* List of Scheduled Programs */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg text-gray-700">
          Scheduled Programs
        </h3>
        {programs.length > 0 ? (
          <ul className="list-disc pl-5">
            {programs.map((program, index) => (
              <li key={index} className="py-2">
                <strong>{program.programName}</strong> on {program.date} at{" "}
                {program.location}. Expected Participants:{" "}
                {program.participants}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No programs scheduled yet.</p>
        )}
      </div>

      {/* CSR Note */}
      <div className="mt-6 text-gray-500 text-xs">
        <p>
          Through Healthconnect, Providence partners with local governments and
          NGOs to sponsor health programs, contributing to community health and
          well-being.
        </p>
      </div>
    </div>
  );
};

export default CareLink;
