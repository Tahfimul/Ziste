"use client";

import React from "react";
import {
    FaScroll,
    FaTheaterMasks,
    FaMask,
    FaLongArrowAltRight,
    FaBookOpen,
    FaUsers,
    FaDragon,
    FaLanguage,
    FaBrain,
} from "react-icons/fa";
import { useUser } from "@/components/contexts/UserContextProvider";
import { useRouter } from "next/navigation";

interface Interest {
    name: string;
    icon: JSX.Element;
}

const StudentInterests = () => {
    const router = useRouter();

    const interests: Interest[] = [
        { name: "History", icon: <FaScroll color="#555" /> },
        { name: "Theater", icon: <FaTheaterMasks color="#555" /> },
        { name: "Classical", icon: <FaMask color="#555" /> },
        { name: "Philosophy", icon: <FaBookOpen color="#555" /> },
        { name: "Sociology", icon: <FaUsers color="#555" /> },
        { name: "Mythology", icon: <FaDragon color="#555" /> },
        { name: "Linguistics", icon: <FaLanguage color="#555" /> },
        { name: "Psychology", icon: <FaBrain color="#555" /> },
    ];

    const { student, setStudent } = useUser();

    const [selectedInterests, setSelectedInterests] = React.useState<string[]>(
        student.interests
    );

    const handleSelectInterest = (interest: string) => {
        setSelectedInterests((prevInterests) => {
            if (prevInterests.includes(interest)) {
                return prevInterests.filter((item) => item !== interest);
            } else {
                return [...prevInterests, interest];
            }
        });
    };

    const handleOnSubmit = () => {
        setStudent({ ...student, interests: selectedInterests });
        router.push("/register");
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold mt-12">Select Your Interests</h1>
            <h2 className="text-3xl mt-2 mb-8 font-light">
                Choose At Least Three:
            </h2>
            <div className="grid grid-cols-4 gap-8">
                {interests.map((interest, index) => {
                    const selected = selectedInterests.includes(interest.name);
                    return (
                        <div
                            key={index}
                            className={`flex flex-col items-center w-48 p-6 bg-slate-200 rounded-lg shadow-md transition-all hover:shadow-xl duration-300 cursor-pointer ${
                                selected && "bg-[#6E739D] shadow-2xl"
                            }`}
                            onClick={() => handleSelectInterest(interest.name)}
                        >
                            <div className="text-6xl mb-4">
                                {React.cloneElement(interest.icon, {
                                    color: selected ? "#fff" : "#555",
                                })}
                            </div>
                            <h3
                                className={`text-xl ${
                                    selected && "text-white"
                                }`}
                            >
                                {interest.name}
                            </h3>
                        </div>
                    );
                })}
            </div>
            <button
                className={`bg-[#81B29A] text-white mt-12 py-2 px-10 mb-10 rounded-lg drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] ${
                    selectedInterests.length < 3 && "opacity-50"
                }`}
                onClick={() => {
                    handleOnSubmit();
                }}
                disabled={selectedInterests.length < 3}
            >
                <div className="flex flex-row items-center">
                    <text className="mr-2">Next</text>
                    <FaLongArrowAltRight />
                </div>
            </button>
        </div>
    );
};

export default StudentInterests;
