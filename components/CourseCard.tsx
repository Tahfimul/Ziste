import GradientBorder from "../components/GradientBorder";

interface CourseCardProps {
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
}) => {
    return (
      <div className="flex justify-center py-3">
          <div className="bg-white w-7/12 h-1/2 shadow-xl shadow-[#bfb4a3] px-5 py-3 rounded-2xl transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-[#d5c7b2]">
            <a href="#" className="flex flex-col items-start">
              <h1 className="text-xl font-semibold text-black mb-1">
                {courseTitle}
              </h1>
              
              <h2 className="pt-1">
                <span className="bg-[#aac9ba] px-2 py-1 mb-1 rounded-md text-md text-black">{professorName}</span>
                <span className="px-3 text-md text-[#6E739E]">{schoolName}</span>
              </h2>

              <h3 className="py-3">
                {description}
              </h3>

              <h4 className="flex my-1 justify-between items-center gap-9">
                <div className="flex gap-2">
                    <span className="flex px-4 py-1 rounded-full bg-[#F2CC8F] text-md text-black w-10% justify-between">{subject}</span>
                    <span className="flex px-4 py-1 rounded-full bg-[#E07A5F] text-md text-black w-10% justify-between">{length}</span>
                    <span className="flex px-4 py-1 rounded-full bg-[#81B29A] text-md text-black w-10% justify-between">{price}</span>
                    <span className="flex px-4 py-1 rounded-full bg-[#9fa5db] text-md text-black w-10% justify-between">{materials}</span>
                </div>
                <GradientBorder className="rounded-full p-0.5 gradient-animate transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-md">
                    <div className="flex px-4 py-1.5 border-none rounded-full bg-white text-md text-black w-10% justify-between transition-transform duration-300 ease-in-out transform hover:bg-gradient-to-r from-[#E07A5F] via-[#81B29A] to-[#9fa5db] gradient-animate ">
                        Enroll {date}
                    </div>
                </GradientBorder>
              </h4>
            </a>
          </div>
      </div>
    );
};
