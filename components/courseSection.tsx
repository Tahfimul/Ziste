import Image from "next/image";
import CatalogDemo from "@/app/assets/CatalogDemoPic.png";

const Courses = () => {
    return (
        <section id="course" className="w-screen h-[68vh]">
            <div className="flex justify-center items-center pt-[12.5vh]">
                <div className="bg-slate-100 w-[45vw] rounded-md">
                <Image src={CatalogDemo} alt="Catalog Demo" className="rounded-lg shadow-lg w-full"/>
                </div>
                <div className="flex flex-col justify-start ml-[8vw]">
                    <h2 className="text-[2vw] w-[32vw]">All That You Want and <span className="text-[#81B29A]">More</span></h2>
                    <p className="flex justify-start w-[30vw] text-[1.2vw] mt-[1.5vh]">Browse Our endless selection of Humanities courses to find the one right for you.</p>
                    <p className="mt-[3vh]">Want to learn about Politics? <span className="text-[#F2CC8F]"><i>We Got it.</i></span></p>
                    <p className="mt-[1vh]">Want to learn about Philosophy? <span className="text-[#E07A5F]"><i>We Got it.</i></span></p>
                    <p className="mt-[1vh]">Want to learn about Anything & Everything? <span className="text-[#9fa5db]"><i>We Got it.</i></span></p>
                    <p className="mt-[1vh] font-bold">We Got You.</p>
                </div>
            </div>

        </section>
    );
}

export default Courses