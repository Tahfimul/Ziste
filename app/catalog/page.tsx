'use client'
import { Filterbar } from "@/components/FilterBar";
import GradientBorder from "@/components/GradientBorder";
import { Navbar } from "@/components/Navbar2";
import { Searchbar } from "@/components/SearchBar";
import { CourseCard } from "@/components/CourseCard";

export default function Catalog() {
    return (
        <>
        <section id="catalog" className="bg-white">
            <Navbar/>
            <div className="flex justify-center p-3">
                <h1 className="text-6xl text-black">Course Catalog</h1>
            </div>
            <Searchbar/>
            <Filterbar/>
        </section>

        <h1 className="flex py-4 pl-48 text-black font-medium">5 listings:</h1>

        {/* Course Cards Container */}
        <div className="relative z-10 justify-center gap-4">
          <CourseCard
            courseTitle="Ethics & Morality in Poetry"
            professorName="Professor Lupin"
            schoolName="Hogwarts School of Witchcraft and Wizardry"
            description="A deep dive into poetic themes such as love, jealousy, revenge, etc. and how they not only reflect the climate of the times they were written, but how they also shaped the forecoming moral trends of ethical thinking."
            subject="Poetry"
            length="9 Weeks"
            price="$69"
            materials=""
          />

          <CourseCard
            courseTitle="Ethics & Morality in Poetry"
            professorName="Professor Lupin"
            schoolName="Hogwarts School of Witchcraft and Wizardry"
            description="A deep dive into poetic themes such as love, jealousy, revenge, etc. and how they not only reflect the climate of the times they were written, but how they also shaped the forecoming moral trends of ethical thinking."
            subject="Poetry"
            length="9 Weeks"
            price="$69"
            materials=""
          />

          <CourseCard
            courseTitle="Ethics & Morality in Poetry"
            professorName="Professor Lupin"
            schoolName="Hogwarts School of Witchcraft and Wizardry"
            description="A deep dive into poetic themes such as love, jealousy, revenge, etc. and how they not only reflect the climate of the times they were written, but how they also shaped the forecoming moral trends of ethical thinking."
            subject="Poetry"
            length="9 Weeks"
            price="$69"
            materials=""
          />

          <CourseCard
            courseTitle="Ethics & Morality in Poetry"
            professorName="Professor Lupin"
            schoolName="Hogwarts School of Witchcraft and Wizardry"
            description="A deep dive into poetic themes such as love, jealousy, revenge, etc. and how they not only reflect the climate of the times they were written, but how they also shaped the forecoming moral trends of ethical thinking."
            subject="Poetry"
            length="9 Weeks"
            price="$69"
            materials=""
          />

          <CourseCard
            courseTitle="Ethics & Morality in Poetry"
            professorName="Professor Lupin"
            schoolName="Hogwarts School of Witchcraft and Wizardry"
            description="A deep dive into poetic themes such as love, jealousy, revenge, etc. and how they not only reflect the climate of the times they were written, but how they also shaped the forecoming moral trends of ethical thinking."
            subject="Poetry"
            length="9 Weeks"
            price="$69"
            materials=""
          />
        </div>
    
        </>

    );
}