interface CourseCardProps {
    courseTitle: string;
    professorName: string;
    schoolName: string;
    description: string;
    subject: string;
    length: string;
    price: string;
    materials: string;
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
}) => {
    return (
      <div className="flex justify-center py-3">
          <div className="bg-white w-7/12 h-1/2 shadow-xl px-5 py-3 rounded-2xl" style={{ zIndex: 1 }}>
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-semibold text-black mb-1">
                {courseTitle}
              </h1>
              <h2 className="">
                <span className="bg-[#81B29A] px-2 py-1 mb-1 rounded-md text-md text-black">{professorName}</span>
                <span className="px-2 text-md text-[#6E739E]">{schoolName}</span>
              </h2>
              <h3 className="py-3">
                {description}
              </h3>
              <h4 className="flex py-1 justify-center items-center gap-2">
                <span className="flex px-4 py-1 rounded-full bg-[#F2CC8F] text-md text-black w-10% justify-between">{subject}</span>
                <span className="flex px-4 py-1 rounded-full bg-[#E07A5F] text-md text-black w-10% justify-between">{length}</span>
                <span className="flex px-4 py-1 rounded-full bg-[#81B29A] text-md text-black w-10% justify-between">{price}</span>
                <span className="flex px-4 py-1 rounded-full bg-[#8186b5] text-md text-black w-10% justify-between">{materials}</span>

              </h4>
            </div>
          </div>
      </div>
    );
  };
  