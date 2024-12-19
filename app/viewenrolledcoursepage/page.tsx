"use client";

import { Navbar } from "../../components/Navbar";
import AuthContextProvider from "@/components/contexts/AuthContextProvider";
import Chat from "@/components/Chat";
import CourseDashboard from "@/components/courseDashboard";
import "@/styles/globals.css";
import VideoCall from '../../components/VideoCall'
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";

const Page = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [courseTitle, setCourseTitle] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseTitle = async () => {
      if (!courseId) return;

      try {
        const courseDocRef = doc(db, "courses-temp", courseId);
        const courseDoc = await getDoc(courseDocRef);

        if (courseDoc.exists()) {
          const courseData = courseDoc.data();
          setCourseTitle(courseData?.courseTitle || "Course Not Found");
        } else {
          setCourseTitle("Course Not Found");
        }
      } catch (error) {
        console.error("Error fetching course title:", error);
        setCourseTitle("Error Loading Course");
      }
    };

    fetchCourseTitle();
  }, [courseId]);

  return (
    <AuthContextProvider>
      <Navbar />
      <div className="mt-[12vh]">
        <h1 className="ml-[6vw] text-[3vw] text-black mt-[12vh]">
          {courseTitle || "Loading..."}
        </h1>
        <a
          href="/portal"
          className="inline-flex ml-[4vw] mt-[0.5vh] transition-transform duration-150 ease-in-out transform hover:translate-x-[-2vw]"
        >
          <ArrowLeft />
          <h2 className="px-[0.5vw] text-[1.2vw]">Go Back to Course Hub</h2>
        </a>
        <VideoCall />

        <CourseDashboard />

        <div className="chatPage">
          <div className="chatContainer">
            <Chat />
          </div>
        </div>
      </div>
      <Footer />
    </AuthContextProvider>
  );
};

export default Page;
