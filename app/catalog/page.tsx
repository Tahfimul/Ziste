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
import { collection, getDocs, getDoc, doc, query, orderBy, DocumentReference } from 'firebase/firestore';
// import AddCourseModal from "@/components/AddCourseModal"; 
import { Footer } from '@/components/Footer';
import Loading from '../../components/Loading';
import { Schedule } from "../professor/create-course/page";

// This is the data saved in the courses-temp collection
export interface Course {
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
  schedule: Schedule
  courseId: string
}

// This is the course data + added fields
interface FullCourse extends Course{
  professorName: string;
  schoolName: string;
}

export default function Catalog() {
const [courses, setCourses] = useState<FullCourse[]>([]);
const [searchTerm, setSearchTerm] = useState<string>("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// Filter state variables
const [selectedSubject, setSelectedSubject] = useState<string>("");
const [selectedLength, setSelectedLength] = useState<string>("");
const [selectedPrice, setSelectedPrice] = useState<string>("");
const [selectedMaterial, setSelectedMaterial] = useState<string>("");

// Todays date for course enrollment date comparison
const today = new Date().toISOString().split('T')[0];

// Fetch courses from Firestore
const fetchCourses = async (/**page: number*/) => {
  setLoading(true);
  try {
    const coursesQuery = query(
      collection(db, "courses-temp"),
      orderBy("startDate", "asc"),
    );

    const snapshot = await getDocs(coursesQuery);
    
    // Extracting id from each course doc
    const courseData = snapshot.docs.map((doc) => ({
      courseId: doc.id,
      ...doc.data(),
    }) as Course);

    // Appending professor name and school to each course data
    const fullCourseData = await Promise.all(
      courseData.map(async (course) => {
        try {
          // Fetch the professor document
          const professorDoc = await getDoc(course.professorRef)
  
          if (professorDoc.exists()) {
            const professorData = professorDoc.data()

            // Assuming the professor document contains a `userRef`
            const userDocRef = doc(db, "users", professorData?.userId)
            const userDoc = await getDoc(userDocRef)
  
            const userData =  userDoc?.data()
            const professorName = `Professor ${userData?.firstName} ${userData?.lastName}`

            const schoolName = professorData.experience[0].institution
  
            // Append professor name to the course data
            // Return as datatype Course to prevent TS errors
            return { ...course, professorName, schoolName } as FullCourse
          } else {
            console.warn(`Professor document not found for course: ${course.courseTitle}`)
            return null
          }
        } catch (e) {
          console.error("Error fetching professor details:", e)
        }
      })
    );

    // console.log("full ", fullCourseData)

    // Filter out courses with past dates
    const validCourses = fullCourseData.filter((course) => course !== null && course !== undefined)
    // Filter out courses with past dates
    const upcomingCourses = validCourses.filter((course) => course?.startDate >= today)
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

// Get the total number of courses
const [filteredTotalCourses, setFilteredTotalCourses] = useState<number>(0);

useEffect(() => {
  const fetchFilteredCourses = async () => {
    try {
      const snapshot = await getDocs(collection(db, "courses"));
      const allCourses = snapshot.docs.map(doc => doc.data());

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

      console.log("filteredCount ", filteredCount)

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
                description={course.courseDescription}
                subject={course.subject}
                length={course.length}
                price={course.price}
                materials={course.materials}
                date={course.startDate}
                courseID={course.courseId}
              />
            ))}
        </div>

        {/* <PageBar totalItems={courses.length} onPageChange={setCurrentPage} /> */}
        <Footer />
      </>
    </AuthContextProvider>
  );
}