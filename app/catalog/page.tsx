// Filtering & Search Functions code from ChatGPT
'use client'
import { useState, useEffect } from "react";
import { FilterBar } from "@/components/filterbar";
import { Navbar } from "@/components/Navbar";
import { Searchbar } from "@/components/SearchBar";
import AuthContextProvider from "@/components/contexts/AuthContextProvider";
import { CourseCard } from "@/components/CourseCard";
import { PageBar } from "@/components/PageBar";
import { db } from "@/services/firebase"; 
import { collection, getDocs, addDoc } from 'firebase/firestore';
import AddCourseModal from "@/components/AddCourseModal"; // Import the AddCourseModal
import { Footer } from '@/components/Footer';

interface Course {
    courseTitle: string;
    professorName: string;
    schoolName: string;
    description: string;
    subject: string;
    length: string;
    price: string;
    materials: string;
    date: string;
}

export default function Catalog() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter state variables
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedLength, setSelectedLength] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");

  // Fetch courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const snapshot = await getDocs(collection(db, "courses"));
        const courseData = snapshot.docs.map(doc => doc.data() as Course); // Type assertion to Course
        setCourses(courseData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch courses.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourse = async (courseData: Course) => {
    try {
      await addDoc(collection(db, "courses"), courseData);
      setCourses((prevCourses) => [...prevCourses, courseData]); // Update the state with the new course
      setIsModalOpen(false); // Close the modal after submission
    } catch (error) {
      console.error("Error adding course: ", error);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <AuthContextProvider>
      <>
        <section id="catalog" className="bg-white">
          <Navbar />
          <div className="flex justify-center py-[0.8vh] mt-[70px]">
            <h1 className="text-[6vw] text-black">Course Catalog</h1>
          </div>
          <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          {/* Pass the filter state to FilterBar component */}
          <FilterBar
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            selectedLength={selectedLength}
            setSelectedLength={setSelectedLength}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
          />

          {/* "List Course" Button */}
          <button
            onClick={handleOpenModal}
            className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
          >
            List Course
          </button>

          {/* Modal Component */}
          <AddCourseModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleAddCourse}
          />
        </section>

        <h1 className="flex py-[2vh] pl-[12vw] text-black font-semibold text-[1.5vw]">
          {courses.length} listings:
        </h1>

        {/* Course Cards Container */}
        <div className="relative z-10 justify-center gap-4">
          {courses
            .filter(course =>
              course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
              (selectedSubject ? course.subject === selectedSubject : true) &&
              (selectedLength ? course.length === selectedLength : true) &&
              (selectedPrice ? course.price === selectedPrice : true) &&
              (selectedMaterial ? course.materials === selectedMaterial : true)
            )
            .map(course => (
              <CourseCard
                key={course.courseTitle}
                courseTitle={course.courseTitle}
                professorName={course.professorName}
                schoolName={course.schoolName}
                description={course.description}
                subject={course.subject}
                length={course.length}
                price={course.price}
                materials={course.materials}
                date={course.date}
              />
            ))}
        </div>

        <PageBar totalItems={courses.length} />
        <Footer/>
      </>
    </AuthContextProvider>
  );
}
