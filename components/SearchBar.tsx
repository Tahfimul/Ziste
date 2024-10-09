import Image from 'next/image';
import GradientBorder from '../components/GradientBorder';

export const Searchbar = () => {
    return (
    <header>
        <div className="flex justify-center p-5">
            <GradientBorder className="w-2/3 rounded-full gradient-animate">
                <input className="flex justify-center p-4 border-transparent text-[#3D405B] rounded-full w-full placeholder-[#3D405B]"
                placeholder="Search"/>
            </GradientBorder>
        </div>

        <div className="flex justify-center items-center mx-60 gap-8">
            <h1 className="text-md font-medium text-[black]">Filter:</h1>
            <button className="px-4 py-2 rounded-full border-[#F2CC8F] border-2 text-md text-[#3D405B]">Subject</button>
            <button className="px-4 py-2 rounded-full border-[#E07A5F] border-2 text-md text-[#3D405B]">Course Length</button>
            <button className="px-4 py-2 rounded-full border-[#81B29A] border-2 text-md text-[#3D405B]">Price</button>
            <button className="px-4 py-2 rounded-full border-[#6E739E] border-2 text-md text-[#3D405B]">Materials</button>
        </div>
    
    </header>
    );
}