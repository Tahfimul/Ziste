"use client";
import React from 'react';
import {Navbar} from '../../components/Navbar';
import {Footer} from "@/components/Footer";

export default function Contact() {
  return (
    <>
<Navbar />
<section id="contact" className="bg-gray-100 pt-[3vw] pb-16">
    <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-5xl font-bold mt-2 py-10 text-gray-800">Contact Us</h1>
        <p className="text-xl mt-4 text-center text-gray-700">You can contact with our brilliant team via email:</p>

        <div className="w-full max-w-xl px-6 py-4 bg-white rounded-lg shadow-lg">
            <p className="text-3xl text-center text-gray-800">helpdesk@ziste.com</p>
        </div>

        <p className="text-xl mt-4 text-center text-gray-700">Also via phone number:</p>

        <div className="w-full max-w-xl px-6 py-4 bg-white rounded-lg shadow-lg">
            <p className="text-3xl text-center text-gray-800">+1 (212) 772-4000</p>
        </div>

    </div>
</section>
<Footer />
    </>
  );
}