"use client";

import React, { useState } from "react";

const CourseDashboard = () => {
  // State for selected section
  const [selectedSection, setSelectedSection] = useState<string>("professorInfo");

  const sections = [
    { id: "syllabus", name: "Syllabus", bgColor: "#F2CC8F" },
    { id: "professorInfo", name: "Professor Info", bgColor: "#9FA5DB" },
    { id: "materials", name: "Materials", bgColor: "#81B29A" },
    { id: "classInfo", name: "Class Info", bgColor: "#E07A5F" },
  ];

  // Mock data
  const professor = {
    name: "Dr. Jane Doe",
    avatar: "https://via.placeholder.com/100", // Replace with actual avatar URL
    description: "Dr. Jane Doe has been teaching Computer Science for over 15 years, specializing in AI and Machine Learning.",
  };

  const classmates = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
  ];

  const handleSelect = (id: string) => {
    setSelectedSection(id);
  };

  return (
    <div className="flex space-x-6">
      {/* Left Side - Dashboard Links */}
      <div className="dashboardLinks flex flex-col space-y-4 w-[20vw] ml-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSelect(section.id)}
            className="flex flex-col w-full h-[12vh] rounded-lg bg-transparent shadow-md transition-transform duration-200 ease-in-out transform hover:scale-105"
          >
            <div
              className="flex flex-col items-start justify-start gap-y-2 w-full h-full rounded-md p-4"
              style={{ backgroundColor: section.bgColor }}
            >
              <h1 className="text-left text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap text-gray-800">
                {section.name}
              </h1>
              <h2 className="text-left text-sm bg-gray-100 px-2 py-1 rounded-sm">
                Details
              </h2>
            </div>
          </button>
        ))}
      </div>

      {/* Right Side - Section Details */}
      <div className="w-[60vw]">
        <div className="bg-white shadow-lg rounded-lg p-6">
          {selectedSection === "professorInfo" && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Welcome to the Classroom</h3>
              <p className="text-lg text-gray-600 mb-6">Meet your professor:</p>

              {/* Professor Details */}
              <div className="flex items-center mb-8">
                <img
                  src={professor.avatar}
                  alt="Professor Avatar"
                  className="w-24 h-24 rounded-full mr-6"
                />
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">{professor.name}</h4>
                  <p className="text-gray-600">{professor.description}</p>
                </div>
              </div>

              {/* Classmates Section */}
              <h3 className="text-lg font-bold text-gray-800 mb-4">Meet your Classmates:</h3>
              <div className="grid grid-cols-2 gap-4">
                {classmates.map((classmate) => (
                  <div
                    key={classmate.id}
                    className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow"
                  >
                    <span className="text-gray-800 font-medium">{classmate.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedSection === "syllabus" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Syllabus</h3>
              <p className="text-gray-600">Here is the syllabus content.</p>
            </div>
          )}

          {selectedSection === "materials" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Materials</h3>
              <p className="text-gray-600">Here are the materials for the course.</p>
            </div>
          )}

          {selectedSection === "classInfo" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Class Info</h3>
              <p className="text-gray-600">Here is the class information.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDashboard;
