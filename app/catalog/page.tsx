"use client";

import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { FilterBar } from "@/components/filterbar";
import { Navbar } from "@/components/Navbar";
import { Searchbar } from "@/components/SearchBar";
import AuthContextProvider from "@/components/contexts/AuthContextProvider";

import { CourseCard } from "@/components/CourseCard";
import { PageBar } from "@/components/PageBar";


export default function Catalog() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after 2 seconds
        }, 2000);

        return () => clearTimeout(timer); // Clean up timer on unmount
    }, []);
    
    if (loading) return <Loading/>;

    return (
        <AuthContextProvider>
        <>
        <section id="catalog" className="bg-white pt-[4vw]">
            <Navbar/>
            <div className="flex justify-center py-[0.8vh] mt-[4vw]">
                <h1 className="text-[6vw] text-black">Course Catalog</h1>
            </div>
            <Searchbar/>
            <FilterBar/>
        </section>

        <h1 className="flex py-[2vh] pl-[12vw] text-black font-semibold text-[1.5vw]">5 listings:</h1>

        {/* Course Cards Container */}
        <div className="relative z-10 justify-center gap-4">
          <CourseCard
            courseTitle="Ethics & Morality in Poetry"
            professorName="Professor Remus Lupin"
            schoolName="Hogwarts School of Witchcraft and Wizardry"
            description="A deep dive into poetic themes such as love, jealousy, revenge, etc. and how they not only reflect the climate of the times they were written, but how they also shaped the forecoming moral trends of ethical thinking."
            subject="Poetry"
            length="9 Weeks"
            price="$69"
            materials="Textbook Free"
            date="Oct. 31st"
          />

          <CourseCard
            courseTitle="Philosophy of Power and Leadership"
            professorName="Professor Tyrion Lannister"
            schoolName="Westeros Institute of Political Studies"
            description="Explore the dynamics of power, ethics in leadership, and the moral dilemmas of governance through history. This course dissects political theories, real-world case studies, and the complexities of decision-making in high-stakes environments."
            subject="Politics"
            length="4 Weeks"
            price="$150"
            materials=""
            date="Oct. 31st"
          />

          <CourseCard
            courseTitle="The Evolution of Civil Rights"
            professorName="Professor T'Challa Udaku"
            schoolName="Wakanda Institute of Global Justice"
            description="A comprehensive look at the global civil rights movements of the 20th century, from apartheid to racial equality, and the leaders who inspired change. This course examines the challenges and progress made in human rights."
            subject="History"
            length="12 Weeks"
            price="$45"
            materials="Textbook Free"
            date="Oct. 31st"
          />

          <CourseCard
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

          <CourseCard
            courseTitle="Existentialism and the Absurd in Modern Philosophy"
            professorName="Professor Sherlock Holmes"
            schoolName="London Academy of Logic and Philosophy"
            description="Analyze existentialist themes and the philosophy of absurdity, reflecting on the meaning (or lack thereof) of life, morality, and individual freedom. This course will look at the works of key thinkers like Sartre, Camus, and Kierkegaard."
            subject="Philosophy"
            length="9 Weeks"
            price="$100"
            materials="Low-Cost"
            date="Oct. 31st"
          />

          <CourseCard
            courseTitle="Gender and Identity in Contemporary Society"
            professorName="Professor Hermione Granger"
            schoolName="Hogwarts School of Witchcraft and Wizardry"
            description="This course examines the complexities of gender and identity in today's world, focusing on intersectionality, representation, and societal norms. Students will analyze various media, literature, and historical contexts to understand how gender roles are constructed and challenged. Discussions will also explore activism and the impact of social movements on gender equality and identity politics."
            subject="Gender Studies"
            length="12 Weeks"
            price="$250"
            materials="Textbook Free"
            date="Oct. 31st"
          />
        </div>
        <PageBar/>
        </>
        </AuthContextProvider>

    );
}