'use client'
import { Filterbar } from "@/components/filterbar";
import GradientBorder from "@/components/GradientBorder";
import { Navbar } from "@/components/Navbar2";
import { Searchbar } from "@/components/SearchBar";

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

        <h1 className="flex my-2 ml-44 text-black font-medium">5 listings:</h1>
        </>

    );
}