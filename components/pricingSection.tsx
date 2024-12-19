import { Check } from "lucide-react";
import GradientBorder from "./GradientBorder";

const Pricing = () => {
    return (
        <section className="mt-[12vh] mb-[8vh]">
            <div className="flex justify-center items-center">
                <h1 className="flex justify-start items-center text-[3vw] font-light mr-4 pb-[2vh]">
                    Pay For What <span className="font-semibold ml-2 mr-3"><i>You</i></span> Want.
                </h1>
            </div>
            <div className="flex justify-center items-center gap-[3vw]">
                <div className="flex justify-center items-center px-[2vw] py-[1vh] rounded-xl border-[#81B29A] border-dotted border-4">
                    <Check className="mr-[0.8vw]"></Check>
                    <p className="text-[1.5vw]">
                    <span className="font-semibold mr-1">NO</span> Subscription
                    </p>
                </div>
                <div className="flex justify-center items-center px-[2vw] py-[1vh] rounded-xl border-[#E07A5F] border-dotted border-4">
                    <Check className="mr-[0.8vw]"></Check>
                    <p className="text-[1.5vw]">
                    <span className="font-semibold mr-1">NO</span> Hidden Fees
                    </p>
                </div>
                <div className="flex justify-center items-center px-[2vw] py-[1vh] rounded-xl border-[#F2CC8F] border-dotted border-4">
                    <Check className="mr-[0.8vw]"></Check>
                    <p className="text-[1.5vw]">
                    <span className="font-semibold mr-1">NO</span> Surcharges
                    </p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-[10vh] mb-[5vh]">
                <h1 className="flex justify-center items-center text-[3vw] font-semibold mr-4 pb-[2vh]">
                        Join Our Classroom
                </h1>
                <a href="/catalog">
                <GradientBorder className="flex justify-end rounded-full p-0.5 gradient-animate transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-md">
                    <div className="px-[1.5vw] py-[1.1vh] border-none rounded-full bg-white text-[1.5vw] text-black  justify-between items-center transition-transform duration-300 ease-in-out transform hover:bg-gradient-to-r from-[#E07A5F] via-[#81B29A] to-[#9fa5db] gradient-animate ">
                        Enroll in a Zíste Course Now
                    </div>
                </GradientBorder>
            </a>
            </div>
        </section>
    )

};

export default Pricing;