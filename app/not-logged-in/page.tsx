"use client";

import { useRouter } from 'next/navigation';
import GradientBorder from "@/components/GradientBorder";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotLoggedInPage() {
    const router = useRouter();

    return (
        <>
            <header>
                <Navbar />
                <div className="flex flex-col items-center justify-center mt-[10vw] text-center">
                    <h1 className="text-[5vw] font-bold text-black">Access Denied</h1>
                    <div className="mt-[2vh] bg-[#E07A5F] w-[15vw] h-[1vh] rounded-[2vw]"></div>
                    <p className="mt-[2vh] text-[1.8vw] text-gray-600">
                        You are not logged in. Please log in to access this page.
                    </p>
                </div>
            </header>
            <main className="flex flex-col items-center justify-center mt-[5vw]">
                <GradientBorder className="rounded-full gradient-animate">
                    <button
                        className="flex px-[2vw] py-[1.5vh] rounded-full items-center bg-white hover:scale-105 transition-transform duration-300 ease-in-out"
                        onClick={() => router.push('/')}
                    >
                        <span className="text-[1.5vw] text-[#E07A5F] font-semibold">
                            Go to Login Page
                        </span>
                    </button>
                </GradientBorder>
            </main>
            <Footer />
        </>
    );
}
