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
    
    </header>
    );
}