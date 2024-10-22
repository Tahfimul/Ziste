"use client";
import GradientBorder from "@/components/GradientBorder";
import { Navbar } from "@/components/Navbar2";
import { Bookmark } from "lucide-react";
import ProfileInfo from "@/components/ProfileInfo";
import { CourseCard } from "@/components/CourseCard";
import { useState } from "react";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("profile");
    const name = "Shlama Dama DingDong";
    const email = "da_pimp_is_here@hotmail.com";
    const userRole = "Student";
    const cardName = "Shlama Dama DingDong";
    const cardNum = "...(ending in 3240)";
    const billAddress = "545 Sesame Street"

    return (
        <>
        <header>
            <Navbar/>
            {userRole === "Student" ? (
                <>
                <div className="flex items-center gap-[2vw] ml-[6vw] py-3">
                    <button className="text-6xl text-black" onClick={() => setActiveTab("profile")}>Profile</button>
                    <GradientBorder className="rounded-full gradient-animate">
                        <button className="flex px-3 py-1.5 rounded-full items-center bg-white" onClick={() => setActiveTab("bookmarks")}>
                            <Bookmark className={`justify-end w-8 h-8 fill-[#e1613d] text-[#e1613d] transition-transform duration-100 ease-in-out transform cursor-pointer`} />
                            <h2 className="justify-center">Bookmarks</h2>
                        </button>
                    </GradientBorder>
                </div>
                <div className={`${
                activeTab === "bookmarks" ? "ml-[6vw] w-[11.45vw]" : "ml-[6vw]"} bg-[#E07A5F] w-[185px] py-1 ml-[6vw] transition-all duration-200`}></div>
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
            <div className="my-[3vh]">
                <button className="px-3 py-2 ml-[6vw] text-lg text-white bg-[#E07A5F] shadow-lg rounded-lg transition-transform duration-300 ease-in-out transform hover:bg-gradient-to-r from-[#E07A5F] via-[#81B29A] to-[#9fa5db] gradient-animate hover:scale-105">Sign Out</button>
            </div>
        </footer>
        </>
    );
}