'use client'

import {Navbar} from "@/components/Navbar";

import React from "react";
import AuthContextProvider from "@/components/contexts/AuthContextProvider";
import { EnrolledCourseCard } from "@/components/EnrolledCourseCard";
import { doc, getDoc } from "firebase/firestore";
import { db, firebaseAuth } from "@/services/firebase";
import { useRouter } from "next/navigation";
import GradientBorder from "@/components/GradientBorder";


export default function Portal() {
    const router = useRouter();

    const authUser = firebaseAuth?.currentUser
    const userId = authUser?.uid

    const [user, setUser] = React.useState<any>(null)
    const [studentCourses, setStudentCourses] = React.useState<any>([])
    const [professorCourses, setProfessorCourses] = React.useState<any>([])

    const getUser = async () => {
        try {
            const userDocRef = doc(db, "users", userId!)
            const userDocSnapshot = await getDoc(userDocRef)
            if (userDocSnapshot.exists()) {
                return userDocSnapshot.data()
            } else {
                console.log(`No user found with ID: ${userId}`)
                return null;
            }
        } catch (e) {
            console.log("Error fetching user: ", e)
        }
    }

    const fetchCourses = async () => {
        try {
          // Fetch the user document
        const userData = await getUser()
        if (!userData) return
    
        setUser(userData);

        // console.log("user data ", userData)
    
          // Fetch student courses if studentRef exists
        if (userData.studentRef) {
            const studentDocSnapshot = await getDoc(userData.studentRef)
            if (studentDocSnapshot.exists()) {
                const studentData = studentDocSnapshot.data() as any                
                const studentCourseRes = await Promise.all(studentData.courses.map(async (courseId: any) => {
                    const courseDocRef = doc(db, "courses-temp", courseId)
                    const courseDocSnapshot = await getDoc(courseDocRef)

                    if (courseDocSnapshot.exists()) {
                        // Get the professor associated with the course
                        const courseData = courseDocSnapshot.data()
                        const professorSnapshot = await getDoc(courseData.professorRef)
                        const professorData = professorSnapshot.data() as any
                        const professorUserSnapshot = await getDoc(doc(db, "users", professorData.userId))
                        const professorUserData = professorUserSnapshot.data() as any
                        const professorName = `${professorUserData.firstName} ${professorUserData.lastName}`

                        return {courseId: courseId, ...courseData, professorName} // Include the course ID with the data
                    } else {
                        console.log(`Course with ID ${courseId} not found.`)
                        return null
                    }
                }))
                // console.log("res ", studentCourseRes)
                setStudentCourses(studentCourseRes)
            }
        }
    
          // Fetch professor courses if professorRef exists
        if (userData.professorDocRef) {
            const professorDocSnapshot = await getDoc(userData.professorDocRef)
            if (professorDocSnapshot.exists()) {
                const professorData = professorDocSnapshot.data() as any
                const professorCourseRes = await Promise.all(professorData.courses.map(async (courseId: any) => {
                    const courseDocRef = doc(db, "courses-temp", courseId)
                    const courseDocSnapshot = await getDoc(courseDocRef)
                    
                    const professorName = `${userData.firstName} ${userData.lastName}`

                    if (courseDocSnapshot.exists()) {
                        return {courseId: courseId, ...courseDocSnapshot.data(), professorName} // Include the course ID with the data
                    } else {
                        console.log(`Course with ID ${courseId} not found.`)
                        return null
                    }
                }))
                setProfessorCourses(professorCourseRes)
            }
        }
        } catch (e) {
            console.error("Error fetching courses:", e)
        }
    };

    React.useEffect(() => {
        if (userId) {
            fetchCourses();
        }
    }, [userId]) 

    // React.useEffect(() => {
    //     console.log("prof courses ", professorCourses)
    // }, [professorCourses])

    return (
        <AuthContextProvider >
            
            <Navbar />
            <h1 className="ml-[6vw] text-[4.5vw] text-black mt-[12vh]">Course Hub</h1>

            {/* Professor specific section */}
            {user?.professorDocRef &&
                <div>
                    <div className="flex flex-row justify-between">
                    <div className="ml-[7vw]">
                        <GradientBorder className="inline-block rounded-full">
                            <h2 className="px-[1vw] py-[0.6vh] border-none text-[1.5vw] text-black font-normal bg-white rounded-full">
                                Courses I&#39;m Taking:
                            </h2>
                        </GradientBorder>
                    </div>
                    <button
                        className={
                            "bg-[#81B29A] text-white mr-[10vw] py-2 px-8 rounded-lg drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)]"
                        }
                        onClick={() => router.push('/professor/create-course')}
                    >
                        List New Course
                    </button>
                    </div>
                    <div className="grid grid-cols-3 justify-center mx-[10vw] mt-[3vh] mb-[10vh] gap-[4vw]">
                        {professorCourses.map((course: any, index: number) => {
                            return (
                                <EnrolledCourseCard
                                    key={course.courseId}
                                    courseTitle={course.courseTitle}
                                    professorName={course.professorName}
                                    courseId={course.courseId}
                                    index={index}
                                />
                            )
                        })}
                    </div>
                </div>
            } 
            <div className="ml-[7vw]">
                <GradientBorder className="inline-block rounded-full gradient-animate">
                    <h2 className="px-[1vw] py-[0.6vh] border-none text-[1.5vw] text-black font-normal bg-white rounded-full">
                        Courses I&#39;m Taking:
                    </h2>
                </GradientBorder>
            </div>
            <div className="grid grid-cols-3 justify-center mx-[10vw] mt-[3vh] mb-[10vh] gap-[4vw]">
                {studentCourses.map((course: any, index: number) => {
                    return (
                        <EnrolledCourseCard
                            key={course.courseId}
                            courseTitle={course.courseTitle}
                            professorName={course.professorName}
                            courseId={course.courseId}
                            index={index}
                        />
                    )
                })}
            </div>

        </AuthContextProvider>
    );
}


{/* <EnrolledCourseCard
courseTitle="Existentialism and the Absurd in Modern Philosophy"
professorName="Professor Sherlock Holmes"
index={3}
/>
<EnrolledCourseCard
courseTitle="The Evolution of Civil Rights"
professorName="Professor T'Challa Udaku"
index={4}
/>
<EnrolledCourseCard
courseTitle="Philosophy of Power and Leadership"
professorName="Professor Tyrion Lannister"
index={5}
/>
<EnrolledCourseCard
courseTitle="Gender and Identity in Contemporary Society"
professorName="Professor Hermione Granger"
index={6}
/> */}