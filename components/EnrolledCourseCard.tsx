// random color picking func. from chatGPT
"use client";
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Image } from "lucide-react";

interface EnrolledCourseCardProps {
    courseTitle: string;
    professorName: string;
    index: number;
}

export const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = ({
    courseTitle,
    professorName,
    index,
    
}) => {
    const userRole = "Student";
    const colorArray = ['#F2CC8F', '#E07A5F', '#81B29A', '#9FA5DB', '#B5B2B2', '#73779b'];
    const router = useRouter();

    const showEnrolledCourse = ()=> {
        router.push(`/viewenrolledcoursepage?courseTitle=${courseTitle}`)
    }

    const courseColor = colorArray[index % colorArray.length];


    return (
      <>
      <button onClick={showEnrolledCourse} className="flex flex-col w-[23vw] h-[35vh] rounded-full bg-transparent shadow-xl transition-transform duration-200 ease-in-out transform hover:scale-105">
        
            <div className="flex items-center justify-center w-full h-[20vh] bg-gray-50 rounded-tr-xl rounded-tl-xl">
                <Image className="justify-center w-20 h-20 text-gray-400"></Image>
            </div>

            <div className="flex flex-col items-start justify-start gap-y-[0.5vh] w-full h-[15vh] rounded-br-xl rounded-bl-xl" style={{ backgroundColor: courseColor }}>
                
                <h1 className="text-left mr-[2vw] ml-[1vw] mt-[1vh] w-[calc(100%-2vw)] text-[1.5vw] overflow-hidden text-ellipsis whitespace-nowrap">{courseTitle}</h1>
                {userRole === "Student" ? (
                    <h2 className="text-left px-[0.5vw] ml-[1vw] mb-[2vh] text-[1.2vw] bg-gray-100 rounded-sm">{professorName}</h2>
                ):(
                    <h2>Seats</h2>
                )}
            </div>
        
      </button>
      </>
    );
};
