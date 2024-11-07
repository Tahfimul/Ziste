"use client";

import React from "react";
import { FaPlus, FaPlusCircle, FaTimes } from "react-icons/fa";
import { useUser } from "@/components/contexts/UserContext";
import { useRouter } from "next/navigation";

import {
    ExperienceCourse,
    Experience,
} from "@/components/contexts/UserContext";

const ProfessorExperience = () => {
    const router = useRouter();

    const { professor, setProfessor } = useUser();

    const [addingExperience, setAddingExperience] =
        React.useState<boolean>(false);

    const [experience, setExperience] = React.useState<Experience>({
        institution: "",
        startDate: "",
        endDate: "",
        role: "",
        courses: [{ title: "", descriptions: [""] }],
    });

    const handleOnChange = (type: string, value: string | Date) => {
        setExperience({ ...experience, [type]: value });
    };

    const handleCourseTitleChange = (index: number, value: string) => {
        const updatedCourses = [...experience.courses];
        updatedCourses[index].title = value;
        setExperience({ ...experience, courses: updatedCourses });
    };

    const handleDescriptionChange = (
        courseIndex: number,
        descriptionIndex: number,
        value: string
    ) => {
        const updatedCourses = [...experience.courses];
        updatedCourses[courseIndex].descriptions[descriptionIndex] = value;
        setExperience({ ...experience, courses: updatedCourses });
    };

    const addNewDescription = (courseIndex: number) => {
        const updatedCourses = [...experience.courses];
        updatedCourses[courseIndex].descriptions.push("");
        setExperience({ ...experience, courses: updatedCourses });
    };

    const addNewCourse = () => {
        setExperience((prevExperience) => ({
            ...prevExperience,
            courses: [
                ...prevExperience.courses,
                { title: "", descriptions: [""] }, // Add a new course with an empty title and an initial empty description
            ],
        }));
    };

    const handleAddExperience = () => {
        setProfessor({
            ...professor,
            experience: [...professor.experience, experience],
        });
        setAddingExperience(false);
        setExperience({
            institution: "",
            startDate: "",
            endDate: "",
            role: "",
            courses: [{ title: "", descriptions: [""] }],
        });
    };

    const handleOnSubmit = () => {
        router.push("/register");
    };

    React.useEffect(() => {
        console.log("experience ", experience);
    }, [experience]);

    return (
        <div className="flex flex-col mx-auto items-center w-3/5 pt-8">
            <h1 className="flex self-start text-3xl font-bold mb-4">
                Teaching History
            </h1>
            {professor.experience.map((experience, experienceIndex) => (
                <div
                    className="w-full bg-green-100 p-8 rounded-2xl"
                    key={experienceIndex}
                >
                    <div className="flex flex-row justify-between">
                        <h2 className="font-semibold text-2xl">
                            {experience.institution}
                        </h2>
                        <text className="font-light">
                            {`${new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "long",
                            }).format(
                                new Date(experience.startDate)
                            )} - ${new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "long",
                            }).format(new Date(experience.endDate))}`}
                        </text>
                    </div>
                    <text className="font-extralight italic">
                        {experience.role}
                    </text>
                    {experience.courses.map((course, courseIndex) => (
                        <div className="mt-6" key={courseIndex}>
                            <h2 className="font-semibold mb-1">
                                {course.title}
                            </h2>
                            <ul className="list-disc pl-4 space-y-2">
                                {course.descriptions.map(
                                    (description, descriptionIndex) => (
                                        <li key={descriptionIndex}>
                                            {description}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}

            {addingExperience ? (
                <form
                    className="flex flex-col justify-center items-center gap-6 w-3/4 mt-8"
                    onSubmit={() => {}}
                >
                    {/* <FaTimes /> */}
                    <input
                        className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)] "
                        placeholder="Institution"
                        value={experience.institution}
                        onChange={(e) =>
                            handleOnChange("institution", e.target.value)
                        }
                    />
                    <div className="flex flex-row items-center gap-3 self-start w-full">
                        <label className="text-lg pt-1 w-14">Start: </label>{" "}
                        <input
                            className="p-3 bg-[#f1f1f1] w-1/2 rounded-md px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)]"
                            type="date"
                            placeholder="Start Date"
                            value={experience.startDate}
                            onChange={(e) =>
                                handleOnChange("startDate", e.target.value)
                            }
                        />
                    </div>
                    <div className="flex flex-row items-center gap-3 self-start w-full">
                        <label className="text-lg pt-1 w-14">End: </label>{" "}
                        <input
                            className="p-3 bg-[#f1f1f1] w-1/2 rounded-md px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)]"
                            type="date"
                            placeholder="End Date"
                            value={experience.endDate}
                            onChange={(e) =>
                                handleOnChange("endDate", e.target.value)
                            }
                        />
                    </div>
                    <input
                        className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)] "
                        placeholder="Role"
                        onChange={(e) => handleOnChange("role", e.target.value)}
                    />
                    <div className="w-full">
                        <div className="flex flex-row justify-between items-center">
                            <label className="self-start ml-1 font-semibold">
                                Courses
                            </label>
                            <button
                                className="flex flex-row items-center mt-1 ml-1"
                                type="button"
                                onClick={addNewCourse}
                            >
                                <FaPlusCircle size={12} />
                                <text className="ml-1 font-light">
                                    Add Course
                                </text>
                            </button>
                        </div>
                        {experience.courses.map((course, courseIndex) => (
                            <div>
                                <input
                                    key={courseIndex}
                                    className="my-3 p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)] "
                                    value={course.title}
                                    placeholder="Course Title"
                                    onChange={(e) =>
                                        handleCourseTitleChange(
                                            courseIndex,
                                            e.target.value
                                        )
                                    }
                                />
                                {course.descriptions.map(
                                    (description, descriptionIndex) => (
                                        <textarea
                                            key={descriptionIndex}
                                            className="mt-2 p-3 min-h-12 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)] "
                                            placeholder="Describe a key responsibility or accomplishment..."
                                            value={description}
                                            onChange={(e) =>
                                                handleDescriptionChange(
                                                    courseIndex,
                                                    descriptionIndex,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    )
                                )}
                                <button
                                    className="flex flex-row items-center mt-1 ml-1"
                                    type="button"
                                    onClick={() =>
                                        addNewDescription(courseIndex)
                                    }
                                >
                                    <FaPlusCircle size={12} />
                                    <text className="ml-1 font-light">
                                        Add Description
                                    </text>
                                </button>
                            </div>
                        ))}
                    </div>
                </form>
            ) : (
                <button
                    className="bg-[#E17B60] p-3 px-6 rounded-2xl text-white flex flex-row items-center mt-4 ml-auto"
                    onClick={() => setAddingExperience(true)}
                >
                    <FaPlus size={12} />
                    <text className="pl-2">Add Experience</text>
                </button>
            )}
            {addingExperience ? (
                <button
                    className={`bg-[#E17B60] text-white mt-8 py-2 px-10 mb-10 rounded-lg drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)]`}
                    onClick={handleAddExperience}
                >
                    Add
                </button>
            ) : (
                <button
                    className={`bg-[#81B29A] text-white mt-6 py-2 px-10 mb-10 rounded-lg drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] ${
                        professor.experience.length < 1 && "opacity-50"
                    }`}
                    onClick={handleOnSubmit}
                    disabled={professor.experience.length < 1}
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default ProfessorExperience;
