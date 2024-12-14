//Filtering & Search Functions code from ChatGPT
'use client'
import { useState, useEffect } from "react";
import { FilterBar } from "@/components/filterbar";
import { Navbar } from "@/components/Navbar";
import { Searchbar } from "@/components/SearchBar";
import AuthContextProvider from "@/components/contexts/AuthContextProvider";
import { CourseCard } from "@/components/CourseCard";
// import { PageBar } from "@/components/PageBar";
import { db } from "@/services/firebase"; 
import { /**DocumentData, QueryDocumentSnapshot,limit, startAfter,*/ collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import AddCourseModal from "@/components/AddCourseModal"; 
import { Footer } from '@/components/Footer';
import Loading from '../../components/Loading';

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
  courseID: string;
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

// const [currentPage, setCurrentPage] = useState<number>(1);
// const [lastVisibleDoc, setLastVisibleDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
// const itemsPerPage = 10;

// Todays date for course enrollment date comparison
const today = new Date().toISOString().split('T')[0];  

// Fetch courses from Firestore
const fetchCourses = async (/**page: number*/) => {
  setLoading(true);
  try {
    const coursesQuery = query(
      collection(db, "courses"),
      orderBy("date", "asc"),
      // limit(itemsPerPage)
    );

    // if (page > 1 && lastVisibleDoc) {
    //   coursesQuery = query(coursesQuery, startAfter(lastVisibleDoc));
    // }

    const snapshot = await getDocs(coursesQuery);
    const courseData = snapshot.docs.map(doc => doc.data() as Course);

    // Filter out courses with past dates
    const upcomingCourses = courseData.filter(course => course.date >= today);
    setCourses(upcomingCourses);

    // setLastVisibleDoc(snapshot.docs[snapshot.docs.length - 1] || null);
    setLoading(false);
  } catch (error) {
    setError("Failed to fetch courses.");
    setLoading(false);
  }
};


useEffect(() => {
  fetchCourses();
}, []);
//   fetchCourses(currentPage);
// }, [currentPage]);

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

// Get the total number of courses
const [filteredTotalCourses, setFilteredTotalCourses] = useState<number>(0);

useEffect(() => {
  const fetchFilteredCourses = async () => {
    try {
      const snapshot = await getDocs(collection(db, "courses"));
      const allCourses = snapshot.docs.map(doc => doc.data() as Course);

      // Filter out past courses
      const upcomingCourses = allCourses.filter(course => course.date >= today);

      // Apply the additional filters
      const filteredCount = upcomingCourses.filter(course =>
        course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedSubject ? course.subject === selectedSubject : true) &&
        (selectedLength ? course.length === selectedLength : true) &&
        (selectedPrice ? course.price === selectedPrice : true) &&
        (selectedMaterial ? course.materials === selectedMaterial : true)
      ).length;

      setFilteredTotalCourses(filteredCount); // Update filtered course count
    } catch (error) {
      console.error("Failed to fetch filtered courses count:", error);
    }
  };

  fetchFilteredCourses();
}, [searchTerm, selectedSubject, selectedLength, selectedPrice, selectedMaterial]);


useEffect(() => {
    const timer = setTimeout(() => {
        setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clean up timer on unmount
}, []);

if (loading) return <Loading/>;

if (error) {
  return <div>{error}</div>;
}

  return (
    <AuthContextProvider>
      <>
        <section id="catalog" className="bg-white pt-[3vw]">
          <Navbar />
          <div className="flex justify-center py-[0.8vh] mt-[70px]">
            <h1 className="text-[5vw] text-black">Course Catalog</h1>
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
          {filteredTotalCourses} listings:
        </h1>

        {/* Course Cards Container */}
        <div className="relative z-10 flex flex-col items-center gap-">

            
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
                courseID={course.courseID}
              />
            ))}
        </div>

        {/* <PageBar totalItems={courses.length} onPageChange={setCurrentPage} /> */}
        <Footer />
      </>
    </AuthContextProvider>
  );
}