'use client'

import {Navbar} from "@/components/Navbar";

import AuthContextProvider from "@/components/contexts/AuthContextProvider";
import { EnrolledCourseCard } from "@/components/EnrolledCourseCard";

export default function Catalog() {
    return (
        <AuthContextProvider >
            
            <Navbar />
            <h1 className="ml-[6vw] text-[4.5vw] text-black mt-[12vh]">Course Hub</h1>
            <div className="grid grid-cols-3 justify-center mx-[10vw] mt-[3vh] mb-[10vh] gap-[4vw]">
                <EnrolledCourseCard
                courseTitle="Morality in Poetry"
                professorName="Professor Remus Lupin"
                index={1}
                />
                <EnrolledCourseCard
                courseTitle="Media Ethics in the Age of Technology"
                professorName="Professor Peter Parker"
                index={2}
                />
                <EnrolledCourseCard
                courseTitle="Existentialism and the Absurd in Modern Philosophy"
                professorName="Professor Sherlock Holmes"
                index={3}
                />
                <EnrolledCourseCard
                courseTitle="The Evolution of Civil Rights"
                professorName="Professor T'Challa Udaku"
                index={4}
                />
                <EnrolledCourseCard
                courseTitle="Philosophy of Power and Leadership"
                professorName="Professor Tyrion Lannister"
                index={5}
                />
                <EnrolledCourseCard
                courseTitle="Gender and Identity in Contemporary Society"
                professorName="Professor Hermione Granger"
                index={6}
                />
            </div>
        </AuthContextProvider>
    );
}