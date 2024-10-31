"use client";

import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import GradientBorder from "@/components/GradientBorder";
import {Navbar} from "@/components/Navbar";
import { Bookmark } from "lucide-react";
import ProfileInfo from "@/components/ProfileInfo";
import { CourseCard } from "@/components/CourseCard";
import { getCurrentUser, firebaseSignOut } from '@/services/authService';
import { useRouter } from 'next/navigation';
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
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after 2 seconds
        }, 2000);
                
        setEmail(getCurrentUser()?.email as string)
        setName(getCurrentUser()?.uid as string)
        setCardName(getCurrentUser()?.uid as string)
        return () => clearTimeout(timer); // Clean up timer on unmount
    }, []);
    
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
            <header className="pt-[3vh]"></header>

            <CourseCard
            courseTitle="Philosophy of Power and Leadership"
            professorName="Professor Tyrion Lannister"
            schoolName="Westeros Institute of Political Studies"
            description="Explore the dynamics of power, ethics in leadership, and the moral dilemmas of governance through history. This course dissects political theories, real-world case studies, and the complexities of decision-making in high-stakes environments."
            subject="Politics"
            length="4 Weeks"
            price="$150"
            materials=""
            date="Oct. 31st"
          />

          <CourseCard
            courseTitle="The Evolution of Civil Rights"
            professorName="Professor T'Challa Udaku"
            schoolName="Wakanda Institute of Global Justice"
            description="A comprehensive look at the global civil rights movements of the 20th century, from apartheid to racial equality, and the leaders who inspired change. This course examines the challenges and progress made in human rights."
            subject="History"
            length="12 Weeks"
            price="$45"
            materials="Textbook Free"
            date="Oct. 31st"
          />

          <CourseCard
            courseTitle="Media Ethics in the Age of Technology"
            professorName="Professor Peter Parker"
            schoolName="New York Institute of Communication and Journalism"
            description="This course explores the evolving role of media in society, focusing on ethical journalism, privacy issues, and the responsibilities of digital reporting. From traditional newspapers to social media platforms, students will discuss the moral implications of truth, transparency, and bias in today’s fast-paced information age."
            subject="English"
            length="12 Weeks"
            price="$50"
            materials="Textbook Free"
            date="Oct. 31st"
          />
          </>
        ) : (
            <ProfileInfo name={name} email={email} userRole={userRole} cardName={cardName} cardNum={cardNum} billAddress={billAddress}/>
        )}
        <footer>
            <div className="mt-[3vh] mb-[5vh]">
                <button onClick={()=>{firebaseSignOut(); router.push('/');}} className="px-[1.5vw] py-[1vh] ml-[6vw] text-[1.4vw] text-white bg-[#E07A5F] shadow-lg rounded-lg transition-transform duration-300 ease-in-out transform hover:bg-gradient-to-r from-[#E07A5F] via-[#81B29A] to-[#9fa5db] gradient-animate hover:scale-105">Sign Out</button>
            </div>
        </footer>
        </>
    );
}