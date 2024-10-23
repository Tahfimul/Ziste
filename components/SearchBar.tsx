import GradientBorder from '../components/GradientBorder';
import { Search } from "lucide-react";

export const Searchbar = () => {
    return (
    <header>
        <div className="flex justify-center p-[1.2vw]">
            <GradientBorder className="flex justify-between items-center w-[66vw] h-[10vh] rounded-full gradient-animate">
                <div className="flex justify-between w-full h-full rounded-full items-center bg-white relative">
                    <input
                    className="w-[95%] py-[1.5vh] px-[2vw] border-none text-[#3D405B] text-[1.8vw] rounded-full outline-none focus:ring-0 placeholder-[#3D405B]"
                    placeholder="Search"
                    />
                    <Search className="w-[4vw] h-[4vh] text-[#3D405B] absolute right-[1vw] top-1/2 transform -translate-y-1/2" />
                </div>
            </GradientBorder>
        </div>

    
    </header>
    );
}