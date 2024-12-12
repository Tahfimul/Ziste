"use client";

import React from "react";
// import { useUser } from "@/components/contexts/UserContextProvider";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { Switch } from "@/components/ui/switch"
import { TimePicker } from "@/components/ui/datetime-picker"
import Link from "next/link";

const CourseCreation = () => {
    const router = useRouter();
    // const { professor } = useUser();

    const [showModal, setShowModal] = React.useState(false)
    const [schedule, setSchedule] = React.useState({
        Monday: { start: new Date(new Date().setHours(10, 0, 0, 0)), end: new Date(new Date().setHours(14, 0, 0, 0)), selected: false },
        Tuesday: { start: new Date(new Date().setHours(10, 0, 0, 0)), end: new Date(new Date().setHours(14, 0, 0, 0)), selected: false },
        Wednesday: { start: new Date(new Date().setHours(10, 0, 0, 0)), end: new Date(new Date().setHours(14, 0, 0, 0)), selected: false },
        Thursday: { start: new Date(new Date().setHours(10, 0, 0, 0)), end: new Date(new Date().setHours(14, 0, 0, 0)), selected: false },
        Friday: { start: new Date(new Date().setHours(10, 0, 0, 0)), end: new Date(new Date().setHours(14, 0, 0, 0)), selected: false },
        Saturday: { start: new Date(new Date().setHours(10, 0, 0, 0)), end: new Date(new Date().setHours(14, 0, 0, 0)), selected: false },
        Sunday: { start: new Date(new Date().setHours(10, 0, 0, 0)), end: new Date(new Date().setHours(14, 0, 0, 0)), selected: false },
    });

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const fileInputRef = React.useRef(null);

    const handleUploadSyllabus = () => {
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
    
    const onCheckedChange = (day) => {
        console.log(schedule[day])
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            [day]: {
                ...prevSchedule[day],
                selected: !prevSchedule[day].selected,
            },
        }));
    }

    const formatTime = (date) => {
        if (!(date instanceof Date)) {
            throw new Error("Invalid input: Expected a Date object.");
        }
    
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? "PM" : "AM";
        
        const formattedHours = hours % 12 || 12; 
        const formattedMinutes = minutes.toString().padStart(2, "0");
    
        return `${formattedHours}:${formattedMinutes} ${period}`;
    }

    return (
        <div className="flex flex-row">
            <div className="flex flex-col w-1/2 items-center">
                <div className="w-2/3 mt-12">
                    <h1 className="text-3xl font-bold mb-4">
                        Setup Your First Course
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
                            onClick={handleUploadSyllabus}
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
                            "bg-[#81B29A] text-white mt-10 py-3 px-10 rounded-lg drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)]"
                        }
                        onClick={() => {}}
                    >
                        Create Course
                    </button>
                    <Link href="/portal"><div className="underline ml-2 mt-2 text-sm">I'll do it later</div></Link>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="mt-12">
                    <h1 className="text-3xl font-bold">Schedule</h1>
                    {Object.values(schedule).every((day) => !day.selected) ? 
                        <button
                            className="bg-[#E17B60] p-3 px-6 rounded-2xl text-white flex flex-row items-center mt-10"
                            onClick={() => setShowModal(true)}
                        >
                            <FaPlus size={12} />
                            <text className="pl-2">Set Schedule</text>
                        </button> :
                        <div>
                           {daysOfWeek.map((day, index) => {
                                if (schedule[day].selected) {
                                    return (
                                        <div key={index} className="w-full mt-6">
                                            <h2 className="text-xl mb-3">{day}</h2>
                                            <div className="flex flex-row">
                                                <span>{formatTime(schedule[day].start)}</span>
                                                <span className="pl-4">to</span>
                                                <span>{formatTime(schedule[day].end)}</span>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                            <button
                            className="bg-[#E17B60] p-3 px-6 rounded-2xl text-white flex flex-row items-center mt-10"
                            onClick={() => setShowModal(true)}
                        >
                            <text className="pl-2">Edit Schedule</text>
                        </button>
                        </div>
                    }
                    {showModal && <ScheduleModal schedule={schedule} onCheckedChange={onCheckedChange} daysOfWeek={daysOfWeek} setShowModal={setShowModal}/>}
                </div>
            </div>
        </div>
    );
};

const ScheduleModal = (props) => {
    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 flex-col justify-center items-center">
            <div className="">
                {props.daysOfWeek.map((day, index) => {
                        return (
                            <div key={index} className="w-full mt-6">
                                <h2 className="text-xl mb-3">{day}</h2>
                                <div className="flex flex-row">
                                    <TimePicker
                                        className={"pr-6"}
                                        date={props.schedule[day].start} 
                                        hourCycle={12}
                                        onChange={() => {}}
                                    />
                                    <div className="">to</div>
                                    <TimePicker
                                        className={"pl-6"}
                                        date={props.schedule[day].end} 
                                        hourCycle={12}
                                        onChange={() => {}}
                                    />
                                    <Switch className="ml-6" checked={props.schedule[day].selected} onCheckedChange={() => props.onCheckedChange(day)}/>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <button
                className="bg-[#81B29A] text-white py-2 px-6 rounded-lg"
                onClick={() => props.setShowModal(false)}
            >
                Done
            </button>
        </div>
    </div>
    )
}

export default CourseCreation;