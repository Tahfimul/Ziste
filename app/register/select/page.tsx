"use client";

import React from "react";
import { FaGraduationCap, FaAppleAlt } from "react-icons/fa";
import Link from "next/link";

const RegisterSelect = () => {
    // const router = useRouter();

    return (
        <div className="flex flex-col items-center mt-[12vh]">
            <h1 className="text-5xl font-bold mb-12">Are you a...</h1>
            <div className="flex flex-row gap-12">
                <Link href="/register">
                    <div className="flex flex-col justify-center items-center h-[320px] w-[420px] bg-[#96CBB1] rounded-xl drop-shadow-md hover:drop-shadow-xl transition-drop-shadow duration-200 cursor-pointer hover:w-[450px]">
                        <FaGraduationCap
                            color="white"
                            size={164}
                            className="max-h-[164px]"
                        />
                        <text className="text-white text-6xl mb-4">
                            Student
                        </text>
                    </div>
                </Link>
                <Link href="/register">
                    <div
                        className="flex flex-col justify-center items-center h-[320px] w-[420px] bg-[#F2CC8F] rounded-xl drop-shadow-md hover:drop-shadow-xl transition-drop-shadow duration-200 cursor-pointer hover:w-[450px]"
                        // onClick={() => router.push("/register")}
                    >
                        <FaAppleAlt color="white" size={120} className="" />
                        <text className="text-white text-6xl mt-6">
                            Professor
                        </text>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default RegisterSelect;
