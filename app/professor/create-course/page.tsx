"use client";

import React from "react";
// import { useUser } from "@/components/contexts/UserContextProvider";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const CourseCreation = () => {
    const router = useRouter();
    // const { professor } = useUser();

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const fileInputRef = React.useRef(null);

    const handleButtonClick = () => {
        // Programmatically click the hidden file input
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Access the uploaded file
        if (file) {
            console.log("Selected file:", file);
            // Handle the file upload logic here
        }
    };

    return (
        <div className="flex flex-row">
            <div className="flex flex-col w-1/2 items-center">
                <div className="w-2/3 mt-12">
                    <h1 className="text-3xl font-bold mb-4">
                        Setup Your Course
                    </h1>
                    <form className="flex flex-col gap-8" onSubmit={() => {}}>
                        <input
                            className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)] "
                            placeholder="Course Title"
                            // value={user.email}
                            onChange={() => {}}
                            required
                        />
                        <input
                            className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)] "
                            placeholder="Subject"
                            // value={user.email}
                            onChange={() => {}}
                            required
                        />
                        <div className="flex flex-col">
                            <label>Class Size</label>
                            <input
                                className="p-3 bg-[#f1f1f1] rounded-md w-1/2 px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)] "
                                type="number"
                                // value={user.email}
                                onChange={() => {}}
                                required
                            />
                        </div>
                        <div className="flex flex-row items-end">
                            <div className="flex flex-col">
                                <label>Start Date</label>
                                <input
                                    className="p-3 bg-[#f1f1f1] rounded-md px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)] "
                                    type="date"
                                    // value={user.email}
                                    onChange={() => {}}
                                    required
                                />
                            </div>
                            <text className="mb-4 ml-6">to</text>
                            <div className="flex flex-col ml-6">
                                <label>End Date</label>
                                <input
                                    className="p-3 bg-[#f1f1f1] rounded-md px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)] "
                                    type="date"
                                    // value={user.email}
                                    onChange={() => {}}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                    <div>
                        <button
                            className="bg-[#E17B60] p-3 px-6 rounded-2xl text-white flex flex-row items-center mt-10"
                            onClick={handleButtonClick}
                        >
                            <FaPlus size={12} />
                            <text className="pl-2">Upload Syllabus</text>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }} // Hide the input
                            onChange={handleFileChange} // Handle file selection
                        />
                    </div>
                    <button
                        className={
                            "bg-[#81B29A] text-white mt-10 py-3 px-10 mb-10 rounded-lg drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)]"
                        }
                        onClick={() => {}}
                    >
                        Create Course
                    </button>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="w-2/3 mt-12">
                    <h1 className="text-3xl font-bold">Schedule</h1>
                    {daysOfWeek.map((week, index) => {
                        return (
                            <div key={index} className="w-full mt-6">
                                <h2 className="text-xl mb-3">{week}</h2>
                                <div className="flex flex-row">
                                    <TimePicker
                                        onChange={() => {}}
                                        clockIcon={null}
                                        clearIcon={null}
                                        value={"10:00"}
                                        className={"pr-10"}
                                    />
                                    <text className="pl-4">to</text>
                                    <TimePicker
                                        onChange={() => {}}
                                        clockIcon={null}
                                        clearIcon={null}
                                        value={"14:00"}
                                        className={"pl-6"}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CourseCreation;
