"use client";

import React from "react";
import { FaGraduationCap, FaAppleAlt } from "react-icons/fa";
import { useUser } from "@/components/contexts/UserContextProvider";
import { useRouter } from "next/navigation";

const RegisterSelect = () => {
    const router = useRouter();
    const { user, setUser } = useUser();

    const handleOnSubmit = (type: string) => {
        setUser({ ...user, isStudent: type === "student" });
        if (type === "student") router.push("/register/interests");
        else router.push("/register/experience");
    };

    return (
        <div className="flex flex-col items-center mt-[12vh]">
            <h1 className="text-5xl font-bold mb-12">Are you a...</h1>
            <div className="flex flex-row gap-12">
                <div
                    className="flex flex-col justify-center items-center h-[320px] w-[420px] bg-[#96CBB1] rounded-xl drop-shadow-md hover:drop-shadow-xl transition-drop-shadow duration-200 cursor-pointer hover:w-[450px]"
                    onClick={() => handleOnSubmit("student")}
                >
                    <FaGraduationCap
                        color="white"
                        size={164}
                        className="max-h-[164px]"
                    />
                    <text className="text-white text-6xl mb-4">Student</text>
                </div>
                <div
                    className="flex flex-col justify-center items-center h-[320px] w-[420px] bg-[#F2CC8F] rounded-xl drop-shadow-md hover:drop-shadow-xl transition-drop-shadow duration-200 cursor-pointer hover:w-[450px]"
                    onClick={() => handleOnSubmit("professor")}
                >
                    <FaAppleAlt color="white" size={120} className="" />
                    <text className="text-white text-6xl mt-6">Professor</text>
                </div>
            </div>
        </div>
    );
};

export default RegisterSelect;
