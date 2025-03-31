import React, { useState } from "react";

const HealthEducation = () => {
  const [language, setLanguage] = useState("English"); // Language selection
  const [offlineMode, setOfflineMode] = useState(false); // Offline toggle
  const [quizActive, setQuizActive] = useState(false); // Toggle for quizzes

  // Example topics, can be expanded with more detailed or localized content
  const topics = [
    {
      id: 1,
      title: "Hygiene",
      content: {
        video: "/videos/hygiene.mp4",
        article:
          "Good hygiene practices can prevent diseases. Always wash your hands...",
        interactive: "Take a quiz on hygiene practices...",
      },
    },
    {
      id: 2,
      title: "Nutrition",
      content: {
        video: "/videos/nutrition.mp4",
        article:
          "A balanced diet is key to good health. Include fruits and vegetables...",
        interactive: "Interactive chart for daily nutrition needs...",
      },
    },
    {
      id: 3,
      title: "Disease Prevention",
      content: {
        video: "/videos/disease_prevention.mp4",
        article:
          "Vaccinations and regular check-ups help prevent many illnesses...",
        interactive: "Preventive health checklist...",
      },
    },
  ];

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Placeholder: Fetch content in the selected language
  };

  const toggleQuiz = () => setQuizActive(!quizActive);

  return (
    <div className="p-4 mx-auto max-w-3xl text-gray-800">
      <h2 className="text-center text-3xl font-semibold py-6 text-gray-700">
        Digital Health Literacy & Preventive Health Education
      </h2>

      {/* Language Selector */}
      <div className="flex justify-end mb-4">
        <label className="text-sm mr-2">Select Language:</label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="border p-1 rounded"
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Marathi</option>
          <option>Kannada</option>
        </select>
      </div>

      {/* Offline Toggle */}
      <div className="flex justify-end mb-4">
        <label className="text-sm mr-2">Offline Mode:</label>
        <input
          type="checkbox"
          checked={offlineMode}
          onChange={() => setOfflineMode(!offlineMode)}
        />
      </div>

      {/* Educational Topics */}
      {topics.map((topic) => (
        <div key={topic.id} className="border rounded-lg p-4 mb-6 shadow-md">
          <h3 className="font-semibold text-lg mb-2">{topic.title}</h3>

          {/* Video Content */}
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-1">Educational Video</h4>
            {offlineMode ? (
              <p className="text-red-600">Video unavailable in offline mode</p>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/lD6XbqaQkB0"
                title="Educational Video"
                className="w-full rounded"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Article Content */}
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-1">Article</h4>
            <p>{topic.content.article}</p>
          </div>

          {/* Interactive Content */}
          <div>
            <h4 className="font-semibold text-sm mb-1">Interactive Content</h4>
            <p
              className="text-blue-600 underline cursor-pointer"
              onClick={toggleQuiz}
            >
              {quizActive ? "Close Quiz" : topic.content.interactive}
            </p>
            {quizActive && (
              <div className="mt-4 p-2 border rounded-lg bg-gray-50">
                <p>1. How often should you wash your hands?</p>
                <ul>
                  <li>
                    <input type="radio" name="quiz1" /> After meals
                  </li>
                  <li>
                    <input type="radio" name="quiz1" /> Every hour
                  </li>
                  <li>
                    <input type="radio" name="quiz1" /> After using the bathroom
                  </li>
                </ul>
                {/* Add more questions as desired */}
                <button className="mt-4 p-2 bg-blue-600 text-white rounded">
                  Submit Answers
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* CSR and Providence Branding Section */}
      <div className="border-t mt-8 pt-4">
        <p className="text-sm text-gray-600">
          <strong>Providence CSR Initiative:</strong> This educational platform
          is part of Providence’s commitment to improve health literacy and
          preventive healthcare. Providence aims to empower communities while
          collecting anonymized health insights to guide future developments.
        </p>
      </div>
    </div>
  );
};

export default HealthEducation;
