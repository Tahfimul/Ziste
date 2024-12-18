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
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";
// import { useUser } from "@/components/contexts/UserContextProvider";
import { firebaseAuth } from "@/services/firebase";

export interface DaySchedule {
    start: Date;
    end: Date;
    selected: boolean;
}

export type Schedule = {
    [key in 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday']: DaySchedule;
};

interface ScheduleModalProps {
    daysOfWeek: (keyof Schedule)[];
    schedule: Schedule;
    onTimeChange: (day: keyof Schedule, type: 'start' | 'end', newTime: Date | undefined) => void;
    onCheckedChange: (day: keyof Schedule) => void;
    setShowModal: (show: boolean) => void;
}

const CourseCreation = () => {
    const router = useRouter();
    // const { user } = useUser();
    const user = firebaseAuth.currentUser
    console.log("user: ", user?.uid)

    const [showModal, setShowModal] = React.useState(false)
    const [error, setError] = React.useState("")

    const [courseTitle, setCourseTitle] = React.useState("")
    const [courseDescription, setCourseDescription] = React.useState("")
    const [subject, setSubject] = React.useState("")
    const [classSize, setClassSize] = React.useState(20)
    const [courseStart, setCourseStart] = React.useState(Date())
    const [courseEnd, setCourseEnd] = React.useState(Date())

    const [schedule, setSchedule] = React.useState<Schedule>({
        Monday: { start: new Date(new Date().setHours(10, 0, 0, 0)), end: new Date(new Date().setHours(14, 0, 0, 0)), selected: false },
        Tuesday: { start: new Date(new Date().setHours(10, 0, 0, 0)), end: new Date(new Date().setHours(14, 0, 0, 0)), selected: false },
        Wednesday: { start: new Date(new Date().setHours(10, 0, 0, 0)), end: new Date(new Date().setHours(14, 0, 0, 0)), selected: false },
        Thursday: { start: new Date(new Date().setHours(10, 0, 0, 0)), end: new Date(new Date().setHours(14, 0, 0, 0)), selected: false },
        Friday: { start: new Date(new Date().setHours(10, 0, 0, 0)), end: new Date(new Date().setHours(14, 0, 0, 0)), selected: false },
        Saturday: { start: new Date(new Date().setHours(10, 0, 0, 0)), end: new Date(new Date().setHours(14, 0, 0, 0)), selected: false },
        Sunday: { start: new Date(new Date().setHours(10, 0, 0, 0)), end: new Date(new Date().setHours(14, 0, 0, 0)), selected: false },
    });

    const daysOfWeek: (keyof Schedule)[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const fileInputRef = React.useRef(null);

    const handleOnClickSyllabus = () => {
        // Programmatically click the hidden file input
        // if (fileInputRef.current) {
        //     fileInputRef.current.click();
        // }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Access the uploaded file
        if (file) {
            console.log("Selected file:", file);
            // Handle the file upload logic here
        }
    };
    
    const onCheckedChange = (day: keyof Schedule) => {
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            [day]: {
                ...prevSchedule[day],
                selected: !prevSchedule[day].selected,
            },
        }));
    }

    const onTimeChange = (day: keyof Schedule, type: 'start' | 'end', newTime: Date | undefined) => {
        if (!newTime) return;
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            [day]: {
                ...prevSchedule[day],
                [type]: newTime,
            },
        }))
    }

    const formatTime = (date: Date) => {
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

    // Use firebase storage to upload the syllabus file
    // const uploadSyllabus = () => {}


    const getProfessorId = async () => {
        try {
            const collectionRef = collection(db, 'professors')
            console.log(user?.uid)
            const professorQuery = query(collectionRef, where('userId', "==", user?.uid))
            const querySnapshot = await getDocs(professorQuery);
            console.log(querySnapshot.docs[0])
            return querySnapshot.docs[0].ref
        } catch (e) {
            console.log("Error fetching professor id: ", e)
        }
    }

    // Handle errors
    const handleSubmit = async () => {
        for (const [key, value] of Object.entries({
            "Course title": courseTitle,
            "Subject": subject,
            "Course description": courseDescription,
        })) {
            if (value.trim() === "") {
                setError(`${key} cannot be empty`);
                return;
            }
        }

        if (classSize === 0) {
            setError("Class size cannot be 0")
        }

        // Handle more errors..

        setError("")

        const professorId = await getProfessorId()

        try {
            await addDoc(collection(db, "courses-temp"), {
                courseTitle: courseTitle,
                subject: subject,
                courseDescription: courseDescription,
                classSize: classSize,
                startDate: courseStart,
                endDate: courseEnd,
                schedule: schedule,
                materials: "Computer",
                price: "20",
                professorRef: professorId,
                createdAt: new Date()
            })

            router.push("/portal")

            // uploadSyllabus()

            console.log("Course successfully added")
        } catch (e) {
            console.log("Error creating a course: ", e)
        }
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
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            required
                        />
                        <input
                            className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)] "
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                        <textarea
                            className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 h-32 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)]"
                            placeholder="Course Description"
                            value={courseDescription}
                            onChange={(e) => setCourseDescription(e.target.value)}
                            required
                        />
                        <div className="flex flex-col">
                            <label>Class Size</label>
                            <input
                                className="p-3 bg-[#f1f1f1] rounded-md w-1/2 px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)] "
                                type="number"
                                value={classSize}
                                onChange={(e) => setClassSize(Number(e.target.value))}
                                required
                            />
                        </div>
                        <div className="flex flex-row items-end">
                            <div className="flex flex-col">
                                <label>Start Date</label>
                                <input
                                    className="p-3 bg-[#f1f1f1] rounded-md px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)] "
                                    type="date"
                                    value={courseStart}
                                    onChange={(e) => setCourseStart(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4 ml-6">to</div>
                            <div className="flex flex-col ml-6">
                                <label>End Date</label>
                                <input
                                    className="p-3 bg-[#f1f1f1] rounded-md px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)] "
                                    type="date"
                                    value={courseEnd}
                                    onChange={(e) => setCourseEnd(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                    <div>
                        <button
                            className="bg-[#E17B60] p-3 px-6 rounded-2xl text-white flex flex-row items-center mt-10 mb-6"
                            onClick={handleOnClickSyllabus}
                        >
                            <FaPlus size={12} />
                            <div className="pl-2">Upload Syllabus</div>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }} // Hide the input
                            onChange={handleFileChange} // Handle file selection
                        />
                    </div>
                    <div className="text-red-600">{error}</div>
                    <button
                        className={
                            "bg-[#81B29A] text-white mt-2 py-3 px-10 rounded-lg drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)]"
                        }
                        onClick={handleSubmit}
                    >
                        Create Course
                    </button>
                    <Link href="/portal"><div className="underline ml-2 mt-2 text-sm">Do it later</div></Link>
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
                            <div className="pl-2">Set Schedule</div>
                        </button> :
                        <div>
                            {daysOfWeek.map((day, index) => {
                                if (schedule[day].selected) {
                                    return (
                                        <div key={index} className="w-full mt-6">
                                            <h2 className="text-xl mb-3">{day}</h2>
                                            <div className="flex flex-row">
                                                <span>{formatTime(schedule[day].start)}</span>
                                                <span className="px-4">to</span>
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
                            <div className="pl-2">Edit Schedule</div>
                        </button>
                        </div>
                    }
                    {showModal && <ScheduleModal schedule={schedule} onCheckedChange={onCheckedChange} onTimeChange={onTimeChange} daysOfWeek={daysOfWeek} setShowModal={setShowModal}/>}
                </div>
            </div>
        </div>
    );
};

const ScheduleModal: React.FC<ScheduleModalProps> = (props) => {
    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 flex-col justify-center items-center">
            <div className="">
                {props.daysOfWeek.map((day, index) => {
                        return (
                            <div key={index} className="w-full mt-6">
                                <h2 className="text-xl mb-3">{day}</h2>
                                <div className="flex flex-row">
                                    <div className="pr-6">
                                        <TimePicker
                                            date={props.schedule[day].start} 
                                            hourCycle={12}
                                            onChange={(newTime) => props.onTimeChange(day, 'start', newTime)}
                                        />
                                    </div>
                                    <div className="px-4">to</div>
                                    <div className="pl-6">
                                        <TimePicker
                                            date={props.schedule[day].end} 
                                            hourCycle={12}
                                            onChange={(newTime) => props.onTimeChange(day, 'end', newTime)}
                                        />
                                    </div>
                                    <Switch className="ml-6" checked={props.schedule[day].selected} onCheckedChange={() => props.onCheckedChange(day)}/>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className="mt-8 flex justify-center w-full"> {/* Centered button at the bottom */}
                <button
                    className="bg-[#81B29A] text-white py-2 px-6 rounded-lg"
                    onClick={() => props.setShowModal(false)}
                >
                    Done
                </button>
            </div>
        </div>
    </div>
    )
}

export default CourseCreation;