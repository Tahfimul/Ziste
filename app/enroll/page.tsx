"use client";
import {Navbar} from '../../components/Navbar';
import { ArrowLeft } from 'lucide-react';
import { LockIcon } from 'lucide-react';
import GradientBorder from '@/components/GradientBorder';
import { useSearchParams } from 'next/navigation';

export default function Enrollment() {
    const searchParams = useSearchParams();
    const courseName = searchParams.get('courseName');
    const professorName = searchParams.get('professorName');
    const price = searchParams.get('price');


    return (
        <>
        <Navbar/>
        <h1 className="ml-[6vw] text-[4.5vw] text-black mt-[12vh]">Payment & Enrollment</h1>
        <a  href='/catalog' className="inline-flex ml-[4vw] mt-[0.5vh] transition-transform duration-150 ease-in-out transform hover:translate-x-[-2vw]">
            <ArrowLeft></ArrowLeft>
            <h2 className="px-[0.5vw] text-[1.2vw]">Go Back to Catalog</h2>
        </a>
        <div className="flex flex-col justify-start mx-[25vw] mt-[2.5vh] pt-[2vh] pb-[5vh] px-[3vw] w-[50vw] h-full shadow-sm bg-gray-100 rounded-xl">
            <h2 className="flex justify-center items-center text-[3vw] py-[0.5vh] mt-[0.5vh]">
                Secure Checkout
                <LockIcon className="mx-[0.5vw]"></LockIcon>
            </h2>

            <h3 className="px-[1vw] my-[1vh] mt-[2vh] text-[2vw] rounded-full bg-[#F2CC8F]">Selected Course</h3>
            <h4 className="mb-[2vh] px-[0.5vw] py-[0.5vh] text-[1.8vw] font-medium"><i>{courseName || "No course selected"}</i></h4>
            <h4 className="mb-[2vh] px-[0.5vw] py-[0.5vh] text-[1.8vw] font-light">Taught By: {professorName || ""}</h4>
            <h4 className="mb-[2vh] px-[0.5vw] py-[0.5vh] text-[1.8vw] font-medium text-red-400">Price: {price || ""}</h4>


            <h3 className="px-[1vw] my-[1vh] mt-[2vh] text-[2vw] rounded-full bg-[#81B29A]">Payment Information</h3>
            <h4 className="mt-[2vh] px-[0.5vw] py-[0.5vh] text-[1.5vw] text-black">Name on Card:</h4>
            <input className="mx-[0vw] p-[0.5vw] shadow-sm rounded-sm outline-none"></input>
            <h4 className=" mt-[2vh] px-[0.5vw] py-[0.5vh] text-[1.5vw] text-black">Card Number:</h4>
            <input className=" p-[0.5vw] shadow-sm rounded-sm outline-none"></input>
            <h4 className=" mt-[2vh] px-[0.5vw] py-[0.5vh] text-[1.5vw] text-black">Zipcode:</h4>
            <input className="mb-[4vh] p-[0.5vw] shadow-sm rounded-sm outline-none"></input>

            <h3 className="px-[1vw] my-[1vh] mt-[2vh] text-[2vw] rounded-full bg-[#E07A5F]">Billing Address</h3>
            <h4 className="mt-[2vh] px-[0.5vw] py-[0.5vh] text-[1.5vw] text-black">Street:</h4>
            <input className="mx-[0vw] p-[0.5vw] shadow-sm rounded-sm outline-none"></input>
            <div className="flex items-center justify-start my-[1vh]">
                <h4 className=" mt-[2vh] px-[0.5vw] py-[0.5vh] text-[1.5vw] text-black">Apt/Suite:</h4>
                <input className="mt-[2vh] p-[0.5vw] shadow-sm rounded-sm outline-none"></input>
                <h4 className="ml-[1vw] mt-[2vh] px-[0.5vw] py-[0.5vh] text-[1.5vw] text-black">City:</h4>
                <input className="mt-[2vh] p-[0.5vw] shadow-sm rounded-sm outline-none"></input>
            </div>
            <div className="flex items-center justify-start my-[1vh]">
                <h4 className=" mt-[2vh] px-[0.5vw] py-[0.5vh] text-[1.5vw] text-black">State:</h4>
                <input className="mt-[2vh] p-[0.5vw] shadow-sm rounded-sm outline-none"></input>
                <h4 className="ml-[1vw] mt-[2vh] px-[0.5vw] py-[0.5vh] text-[1.5vw] text-black">Zipcode:</h4>
                <input className="mt-[2vh] p-[0.5vw] shadow-sm rounded-sm outline-none"></input>
            </div>
            <div>
                <GradientBorder className="flex justify-center w-[9vw] mt-[4vh] rounded-full p-0.5 gradient-animate transition-transform duration-100 ease-in-out transform hover:scale-105 hover:shadow-md">
                    <button className="justify-center w-full px-[1vw] py-[0.5vh] rounded-full bg-white text-[1.7vw]">
                        Enroll
                    </button>
                </GradientBorder>
            </div>
        </div>
        <footer className="my-[15vh]">

        </footer>
        </>
    );
}