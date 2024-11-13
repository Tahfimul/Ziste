"use client";
import React from 'react';
import {Navbar} from '../../components/Navbar';
import {Footer} from "@/components/Footer";
export default function About() {
    return (
      <>
    <Navbar />
    <section id="about" className="bg-gray-100 pt-[3vw] pb-16">
        <div className="flex flex-col justify-center items-center mt-10">
            <h1 className="text-5xl font-bold mt-2 py-10 text-center"> About Zíste </h1>
            <div className="max-w-4xl px-6 py-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl mt-4 text-center"> Zíste is an educational platform that connects individuals seeking academic humanities courses to the professors that can provide them. 
                Ziste aims to give users a college-style academic experience without the commitment or price of enrolling in a college.
            </h2>
            </div>

            <h1 className="text-5xl font-bold mt-10 py-10 text-center">Courses</h1>
            <div className="max-w-4xl px-6 py-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl mt-4 text-center"> Courses offered through ziste are reflective of college-level classes. Each course runs for one semester. 
                Professors provide students with a course syllabus, which details course assignments, reading material, and course objectives.
            </h2>
            </div>
        </div>
    </section>
    <Footer />
      </>
    );
  }