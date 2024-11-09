"use client";

import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import GradientBorder from "@/components/GradientBorder";
import {Navbar} from "@/components/Navbar";
import { Bookmark } from "lucide-react";
import ProfileInfo from "@/components/ProfileInfo";
import { CourseCard } from "@/components/CourseCard";
import { getCurrentUser, firebaseSignOut } from '@/services/authService';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';

type course =
{
    courseTitle: string,
    professorName:string,
    schoolName:string,
    description:string,
    subject:string,
    length:string,
    price:string,
    materials:string,
    date:string

}

export default function Profile() {
    const [activeTab, setActiveTab] = useState("profile");
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const userRole = "Student";
    const [cardName, setCardName] = useState<string>("");
    const cardNum = "...(ending in 3240)";
    const billAddress = "545 Sesame Street"
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [enrolledCourses, setEnrolledCourses] = useState<course[]>([])

    useEffect(() => {
        if (loading) {
            (async () => { 
                try {
                    let enrolledCoursesCollection = await getDocs(collection(db, 'enrolled_courses'));
                    console.log(enrolledCoursesCollection.size);
    
                    if (enrolledCoursesCollection.size === 0) {
                        const enrolled_courses_c = collection(db, 'enrolled_courses');
                        await setDoc(doc(enrolled_courses_c, `Philosophy of Power and Leadership`), {
                            courseTitle: "Philosophy of Power and Leadership",
                            professorName: "Professor Tyrion Lannister",
                            schoolName: "Westeros Institute of Political Studies",
                            description: "Explore the dynamics of power, ethics in leadership, and the moral dilemmas of governance through history. This course dissects political theories, real-world case studies, and the complexities of decision-making in high-stakes environments.",
                            subject: "Politics",
                            length: "4 Weeks",
                            price: "$150",
                            materials: "",
                            date: "Oct. 31st"
                        });
                    }
    
                    enrolledCoursesCollection = await getDocs(collection(db, 'enrolled_courses'));
                    const courses: course[] = [];
                    enrolledCoursesCollection.forEach((c) => {
                        const c_ = c.data();
                        const c_model = {
                            courseTitle: c_.courseTitle,
                            professorName: c_.professorName,
                            schoolName: c_.schoolName,
                            description: c_.description,
                            subject: c_.subject,
                            length: c_.length,
                            price: c_.price,
                            materials: c_.materials,
                            date: c_.date
                        } as course;
                        courses.push(c_model);
                    });
                    setEnrolledCourses(courses);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            })();
        }
    
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after 2 seconds
        }, 2000);
    
        setEmail(getCurrentUser()?.email as string);
        setName(getCurrentUser()?.uid as string);
        setCardName(getCurrentUser()?.uid as string);
    
        return () => clearTimeout(timer); // Clean up timer on unmount
    }, []); // Empty dependency array, meaning this effect will run once on component mount
    
    
    if (loading) return <Loading/>;

    return (
        <>
        <header>
            <Navbar/>
            {userRole === "Student" ? (
                <>
                <div className="flex items-center gap-[2vw] ml-[6vw] py-3 mt-[5vw]">
                    <button className="text-[5vw] text-black" onClick={() => setActiveTab("profile")}>Profile</button>
                    <GradientBorder className="rounded-full gradient-animate">
                        <button className="flex px-[2vw] py-[1vh] rounded-full items-center bg-white" onClick={() => setActiveTab("bookmarks")}>
                            <Bookmark className={`justify-center w-[2vw] h-[4vh] mr-[0.5vw] fill-[#e1613d] text-[#e1613d] transition-transform duration-100 ease-in-out transform cursor-pointer`} />
                            <h2 className="justify-center text-[1.5vw]">Bookmarks</h2>
                        </button>
                    </GradientBorder>
                </div>
                <div className={`${
                activeTab === "bookmarks" ? "ml-[23vw] w-[10vw]" : "ml-[6vw]"} bg-[#E07A5F] rounded-[2vw] w-[15.5vw] py-[0.5vh] transition-all duration-200`}></div>
                </>
            ) : (
                <>
                    <h1 className="ml-[6vw] py-3 text-6xl text-black">Profile</h1>
                    <div className="ml-[6vw] bg-[#e07a5f] w-[185px] py-1"></div>
                </>
            )}
        </header>
        {activeTab === "bookmarks" ? (
            <>
            {console.log('bookmarks clicked')}
            <header className="pt-[3vh]"></header>

            {enrolledCourses.map((course)=>{
                {console.log(course)}
                return(
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
                );
            })}

            
          </>
        ) : (
            <ProfileInfo name={name} email={email} userRole={userRole} cardName={cardName} cardNum={cardNum} billAddress={billAddress}/>
        )}
        <div className="mt-[3vh] mb-[5vh]">
            <button onClick={()=>{firebaseSignOut(); router.push('/');}} className="px-[1.5vw] py-[1vh] ml-[6vw] text-[1.4vw] text-white bg-[#E07A5F] shadow-lg rounded-lg transition-transform duration-300 ease-in-out transform hover:bg-gradient-to-r from-[#E07A5F] via-[#81B29A] to-[#9fa5db] gradient-animate hover:scale-105">Sign Out</button>
        </div>
        <Footer/>
        </>
    );
}