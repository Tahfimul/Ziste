"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Use this hook for query params
import { db } from "@/services/firebase";
import { doc, getDoc, DocumentReference } from "firebase/firestore";
import { format } from "date-fns"; // For date formatting
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // Firebase Storage imports

interface Course {
  courseTitle: string;
  courseDescription: string;
  subject: string;
  length: string;
  price: string;
  materials: string;
  classSize: number;
  endDate: string;
  createdAt: Date;
  startDate: string;
  professorRef: DocumentReference;
  courseId: string;
}

interface FullCourse extends Course {
  professorName: string;
  schoolName: string;
  professorPic: string;
}

const CourseDashboard: React.FC = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId"); // Get courseId from URL query parameters

  const [course, setCourse] = useState<FullCourse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>("professorInfo");
  const [professorPic, setProfessorPic] = useState<string>("");

  const sections = [
    { id: "professorInfo", name: "Professor Info", bgColor: "#9FA5DB" },
    { id: "classInfo", name: "Class Info", bgColor: "#F2CC8F" },
    { id: "syllabus", name: "Syllabus", bgColor: "#81B29A" },
    { id: "materials", name: "Materials", bgColor: "#E07A5F" },
  ];

  // Fetch professor's avatar
  const fetchProfessorPic = async (professorId: string) => {
    try {
      const storage = getStorage();
      const imageRef = ref(storage, `users/${professorId}/profile.jpg`);
      const url = await getDownloadURL(imageRef);
      setProfessorPic(url);
    } catch (error) {
      console.error("Error fetching professor's avatar:", error);
      setProfessorPic("/default-profile-pic.jpg"); // Default avatar if there's an error
    }
  };

  // Fetch course and professor data
  const fetchCourseDetails = async () => {
    if (!courseId) return; // Ensure courseId is available

    setLoading(true);
    try {
      console.log('courseId in courseDashboard: ',courseId);
      const courseDocRef = doc(db, "courses-temp", courseId);
      const courseDoc = await getDoc(courseDocRef);

      

      if (courseDoc.exists()) {
        console.log('courseDoc exists in courseDashboard');
        const courseData = courseDoc.data() as Course;
        const professorDocRef = courseData.professorRef; // Reference to professor

        // Fetch the professor's data from the professorRef
        const professorDoc = await getDoc(professorDocRef);

        if (professorDoc.exists()) {
          console.log('professorDoc exists in courseDashboard');
          const professorData = professorDoc.data();
          console.log('professorData in courseDashboard: ',professorData)
          // Fetch user data from the 'users' collection using professor's userId
          const userDocRef = doc(db, "users", professorData?.userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            console.log('userDoc exists in courseDashboard');
            const userData = userDoc.data();
            const professorName = `Professor ${userData?.firstName} ${userData?.lastName}`;
            const schoolName = professorData.experience?.[0]?.institution || "Institution Not Available";
            const professorPic = userData?.profilePic || "/default-profile-pic.jpg"; // Default image if none exists

            // Fetch the professor's avatar image
            fetchProfessorPic(professorData.userId);

            setCourse({
              ...courseData,
              professorName,
              schoolName,
              professorPic,
            });
          } else {
            setError("User data for professor not found.");
          }
        } else {
          setError("Professor not found.");
        }
      } else {
        setError("Course not found.");
      }
    } catch (error) {
      console.log('----------');
      setError("Failed to fetch course details.");
      console.log('---------------');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!course) return <div>No course data available.</div>;

  const handleSelect = (id: string) => {
    setSelectedSection(id);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
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

      {/* Right Side - Section Details (Dynamic Content) */}
      <div className="w-[60vw]">
        <div className="bg-white shadow-xl shadow-[#bfb4a3] px-[2vw] py-[2vh] rounded-2xl transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-[#d5c7b2]">
          {selectedSection === "professorInfo" && (
            <div className="text-center">
              <h3 className="text-3xl font-semibold mb-4 text-gray-800">
                Welcome to {course.courseTitle}
              </h3>
              <h4 className="text-3xl font-semibold mb-4 text-gray-800">
                Meet your professor
              </h4>
              <div className="flex justify-center items-center gap-6">
                <img
                  src={professorPic}
                  alt="Professor"
                  className="w-40 h-40 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold">{course.professorName}</h2>
                  <p className="text-sm text-gray-600 bg-yellow-200 px-2 py-1 rounded-md">
                    {course.schoolName}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Other sections (classInfo, syllabus, materials) */}
          {selectedSection === "classInfo" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Class Info</h3>
              <p className="text-lg mb-4">{course.courseDescription}</p>
              <div className="mt-4">
                <p className="text-lg font-semibold" style={{ color: "green" }}>
                  Class Starts on: {formatDate(course.startDate)}
                </p>
                <p className="text-lg font-semibold" style={{ color: "red" }}>
                  Class Ends on: {formatDate(course.endDate)}
                </p>
                <p className="text-gray-600">Class size: {course.classSize}</p>
                <p className="text-gray-600">
                  Seats available: {course.classSize - 10}
                </p>
              </div>
            </div>
          )}

          {/* Other sections (syllabus, materials) */}
        </div>
      </div>
    </div>
  );
};

export default CourseDashboard;
