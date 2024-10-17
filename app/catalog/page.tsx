'use client'
import GradientBorder from "@/components/GradientBorder";
import { Navbar } from "@/components/Navbar2";
import { Searchbar } from "@/components/SearchBar";

export default function Catalog() {
    return (
        <>
        <header className="bg-white">
        <Navbar/>
        <div className="flex justify-center p-3">
            <h1 className="text-6xl text-black">Course Catalog</h1>
        </div>
        <Searchbar/>
        <h1 className="flex my-2 ml-44 text-black font-medium">5 listings:</h1>
        <div className="flex justify-center">
            <GradientBorder className="w-7/12 h-1/2 rounded-40 gradient-animate">
                <div className="flex bg-white h-1/2 rounded-40 shadow-lg">
                    <h1 className="px-5 pt-1 text-lg text-black">
                        Ethics & Morality in Poetry
                    </h1>
                    <h2 className="block px-2 py-1 rounded-1/4 bg-[#81B29A]">
                        <span className="block px-3 text-lg text-black">
                            Professor Lupin
                        </span>
                    </h2>
                        
                </div>
            </GradientBorder>

        </div>
        </header>
        </>

    );
}