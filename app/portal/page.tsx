'use client'

import {Navbar} from "@/components/Navbar2";

import AuthContextProvider from "@/components/contexts/AuthContextProvider";
import { EnrolledCourseCard } from "@/components/EnrolledCourseCard";

export default function Catalog() {
    return (
        <AuthContextProvider >
            
            <Navbar />
                <h1 className="text-black text-3xl">portal</h1>
                    <EnrolledCourseCard
                    courseTitle="Media Ethics in the Age of Technology"
                    professorName="Professor Peter Parker"
                    schoolName="New York Institute of Communication and Journalism"
                    description="This course explores the evolving role of media in society, focusing on ethical journalism, privacy issues, and the responsibilities of digital reporting. From traditional newspapers to social media platforms, students will discuss the moral implications of truth, transparency, and bias in today’s fast-paced information age."
                    subject="English"
                    length="12 Weeks"
                    price="$50"
                    materials="Textbook Free"
                    date="Oct. 31st"
                    />
        </AuthContextProvider>
    );
}