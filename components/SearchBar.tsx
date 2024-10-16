import GradientBorder from '../components/GradientBorder';
import { Search } from "lucide-react";

export const Searchbar = () => {
    return (
    <header>
        <div className="flex justify-center p-5">
            <GradientBorder className="flex justify-between items-center w-2/3 rounded-full gradient-animate">
                <div className="flex justify-between w-full rounded-full items-center bg-white relative">
                    <input
                    className="w-[95%] py-4 px-6 border-none text-[#3D405B] rounded-full outline-none focus:ring-0 placeholder-[#3D405B]"
                    placeholder="Search"
                    />
                    <Search className="w-8 h-8 text-[#3D405B] absolute right-6 top-1/2 transform -translate-y-1/2" />
                </div>
            </GradientBorder>
        </div>

    
    </header>
    );
}