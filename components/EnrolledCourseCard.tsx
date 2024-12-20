"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import banner1 from "@/app/assets/courseBannerPics/banner1.jpg";
import banner2 from "@/app/assets/courseBannerPics/banner2.jpg";
import banner3 from "@/app/assets/courseBannerPics/banner3.jpg";
import banner4 from "@/app/assets/courseBannerPics/banner4.jpg";
import banner5 from "@/app/assets/courseBannerPics/banner5.jpg";
import banner6 from "@/app/assets/courseBannerPics/banner6.jpg";
import banner7 from "@/app/assets/courseBannerPics/banner7.jpg";
import banner9 from "@/app/assets/courseBannerPics/banner9.jpg";

interface EnrolledCourseCardProps {
    courseTitle: string;
    professorName: string;
    courseId: string;
    index: number;
}

export const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = ({
    courseTitle,
    professorName,
    courseId,
    index,
}) => {
    const userRole = "Student";
    const colorArray = ['#F2CC8F', '#E07A5F', '#81B29A', '#9FA5DB', '#B5B2B2', '#73779b'];
    const bannerPathArray = [banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner9];
    const router = useRouter();

    const showEnrolledCourse = () => {
        router.push(`/viewenrolledcoursepage?courseId=${courseId}`);
    };

    const courseColor = colorArray[index % colorArray.length];
    // Use modulo to cycle through the banners
    const courseBanner = bannerPathArray[index % bannerPathArray.length];

    return (
        <>
            <button
                onClick={showEnrolledCourse}
                className="flex flex-col w-[23vw] h-[35vh] rounded-full bg-transparent transition-transform duration-200 ease-in-out transform hover:scale-105"
            >
                <div className="flex items-center justify-center w-full h-[20vh] bg-gray-50 rounded-tr-xl rounded-tl-xl">
                    <Image
                        src={courseBanner}
                        alt="Banner Image"
                        className="justify-center w-full h-full text-gray-400 rounded-tr-xl rounded-tl-xl"
                    />
                </div>

                <div
                    className="flex flex-col items-start justify-start gap-y-[0.5vh] w-full h-[13vh] rounded-br-xl rounded-bl-xl"
                    style={{ backgroundColor: courseColor }}
                >
                    <h1 className="text-left mr-[2vw] ml-[1vw] mt-[1vh] w-[calc(100%-2vw)] text-[1.5vw] overflow-hidden text-ellipsis whitespace-nowrap">
                        {courseTitle}
                    </h1>
                    {userRole === "Student" ? (
                        <h2 className="text-left px-[0.5vw] ml-[1vw] mb-[2vh] text-[1.2vw] bg-gray-100 rounded-sm">
                            {professorName}
                        </h2>
                    ) : (
                        <h2>Seats</h2>
                    )}
                </div>
            </button>
        </>
    );
};
