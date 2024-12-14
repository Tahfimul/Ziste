import GradientBorder from "../components/GradientBorder";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export interface CourseCardProps {
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

export const CourseCard: React.FC<CourseCardProps> = ({
    courseTitle,
    professorName,
    schoolName,
    description,
    subject,
    length,
    price,
    materials,
    date,
    courseID,
}) => {

const [isBookmark, setBookmark] = useState(false);

const handleBookmarkClick = () => {
    setBookmark(!isBookmark);
}

    return (
      <div className="flex justify-center py-[1.8vh]">
          <div className="bg-white w-[70vw] min-h-[35vh] max-h-[46vh] shadow-xl shadow-[#bfb4a3] px-[2vw] py-[2vh] rounded-2xl transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-[#d5c7b2]">
                <div className="flex justify-between w-full">
                    <h1 className="flex items-center text-[2vw] font-semibold text-black mb-1">
                        {courseTitle}
                    </h1>
                    <Bookmark onClick={handleBookmarkClick} className={`justify-end w-[4.5vw] h-[4.5vh] transition-transform duration-100 ease-in-out transform hover:scale-110 cursor-pointer" ${isBookmark ? 'fill-[#e1613d] text-[#e1613d]' : 'fill-none'}`}/>
                </div>
            <a href={`/enroll?courseName=${encodeURIComponent(courseTitle)}&professorName=${encodeURIComponent(professorName)}&price=${encodeURIComponent(price)}&courseID=${encodeURIComponent(courseID)}`} className="flex flex-col items-start">

              <h2 className="pt-[0.4vh]">
                <span className="bg-[#aac9ba] px-[1vw] py-[0.5vh] mb-1 rounded-md text-[1.5vw] text-black">{professorName}</span>
                <span className="px-[1.5vw] text-[1.5vw] text-[#6E739E]">{schoolName}</span>
              </h2>

              <h3 className="py-[2vh] text-[1.5vw]">
                {description}
              </h3>

              <h4 className="flex justify-between items-center w-full">
                    <div className="flex justify-between items-center gap-[1vw]">
                        <span className="flex px-[1.5vw] py-[1vh] h-[4.6vh] items-center rounded-full bg-[#F2CC8F] text-[1.5vw] text-black w-10% justify-between">{subject}</span>
                        <span className="flex px-[1.5vw] py-[1vh] h-[4.6vh] items-center rounded-full bg-[#E07A5F] text-[1.5vw] text-black w-10% justify-between">{length}</span>
                        <span className="flex px-[1.5vw] py-[1vh] h-[4.6vh] items-center rounded-full bg-[#81B29A] text-[1.5vw] text-black w-10% justify-between">{price}</span>
                        <span className="flex px-[1.5vw] py-[1vh] h-[4.6vh] items-center rounded-full bg-[#9fa5db] text-[1.5vw] text-black w-10% justify-between">{materials}</span>
                    </div>
                    <Link href={`/enroll?courseName=${encodeURIComponent(courseTitle)}&professorName=${encodeURIComponent(professorName)}&price=${encodeURIComponent(price)}`}>
                        <GradientBorder className="flex justify-end rounded-full p-0.5 gradient-animate transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-md">
                            <div className="px-[1.5vw] py-[1.1vh] border-none rounded-full bg-white text-[1.5vw] text-black w-10% justify-between items-center transition-transform duration-300 ease-in-out transform hover:bg-gradient-to-r from-[#E07A5F] via-[#81B29A] to-[#9fa5db] gradient-animate ">
                                Enroll {date}
                            </div>
                        </GradientBorder>
                    </Link>
                
              </h4>
            </a>
          </div>
      </div>
    );
};
