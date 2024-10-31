"use client";

import React from "react";
import Link from "next/link";
import {
    FaScroll,
    FaTheaterMasks,
    FaMask,
    FaLongArrowAltRight,
} from "react-icons/fa";

interface Interest {
    name: string;
    icon: JSX.Element;
}

const StudentInterests = () => {
    const interests: Interest[] = [
        { name: "History", icon: <FaScroll color="#555" /> },
        { name: "Theater", icon: <FaTheaterMasks color="#555" /> },
        { name: "Classical", icon: <FaMask color="#555" /> },
        { name: "History", icon: <FaScroll color="#555" /> },
        { name: "History", icon: <FaScroll color="#555" /> },
        { name: "History", icon: <FaScroll color="#555" /> },
        { name: "History", icon: <FaScroll color="#555" /> },
        { name: "History", icon: <FaScroll color="#555" /> },
    ];

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold mt-12">Select Your Interests</h1>
            <h2 className="text-3xl mt-2 mb-8 font-light">
                Choose At Least Three:
            </h2>
            <div className="grid grid-cols-4 gap-8">
                {interests.map((interest, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center w-48 p-6 bg-slate-200 rounded-lg shadow-md transition-all hover:shadow-xl duration-300 cursor-pointer"
                    >
                        <div className="text-6xl mb-4">{interest.icon}</div>
                        <h3 className="text-xl">{interest.name}</h3>
                    </div>
                ))}
            </div>
            <Link href="/register">
                <button className="bg-[#96CBB1] text-white mt-12 py-2 px-10 mb-10 rounded-lg drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)]">
                    <div className="flex flex-row items-center">
                        <text className="mr-2">Next</text>
                        <FaLongArrowAltRight />
                    </div>
                </button>
            </Link>
        </div>
    );
};

export default StudentInterests;
