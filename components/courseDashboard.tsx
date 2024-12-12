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

  const handleSelect = (id: string) => {
    setSelectedSection(id);
  };

  // Functions for adding and editing files
  const handleAddFile = () => {
    alert("Add file functionality will be here.");
    // Implement file upload logic here
  };

  const handleEditSyllabus = () => {
    alert("Edit syllabus functionality will be here.");
    // Implement syllabus edit logic here
  };

  const handleEditMaterials = () => {
    alert("Edit materials functionality will be here.");
    // Implement materials edit logic here
  };

  return (
    <div className="flex space-x-6">
      {/* Left Side - Dashboard Links */}
      <div className="dashboardLinks flex flex-col space-y-4 w-[20vw] ml-4"> {/* Added margin-left */}
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

      {/* Right Side - Section Details (Permanent Window) */}
      <div className="w-[60vw]">
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Section Details */}
          {selectedSection === "professorInfo" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Professor Info</h3>
              <p className="text-gray-600">Here is the professor information.</p>
            </div>
          )}

          {selectedSection === "syllabus" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Syllabus</h3>
              <p className="text-gray-600">Here is the syllabus content.</p>
              <div className="mt-4">
                <button
                  onClick={handleAddFile}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add File
                </button>
                <button
                  onClick={handleEditSyllabus}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md ml-4"
                >
                  Edit Syllabus
                </button>
              </div>
            </div>
          )}

          {selectedSection === "materials" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Materials</h3>
              <p className="text-gray-600">Here are the materials for the course.</p>
              <div className="mt-4">
                <button
                  onClick={handleAddFile}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add File
                </button>
                <button
                  onClick={handleEditMaterials}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md ml-4"
                >
                  Edit Materials
                </button>
              </div>
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
