import Logo from '@/app/assets/logo.png';
import Image from 'next/image';


export const Navbar = () => {
    return (
        <header className="sticky">

        <div className="flex px-8 h-24 mx-auto justify-between items-center bg-transparent">
            
        <a href= "/home"><Image src={Logo} alt="Logo" height={45} width={45} className="mx-4"></Image></a>
                <ul className="flex space-x-4 mx-5">
                    <li className="px-4 py-3 h-full flex items-center">
                        <a href="/catalog" className="text-[#E07A5F]">Courses</a>
                    </li>
                    <li className="px-4 py-3 h-full flex items-center">
                        <a href="/register"className="text-[#81B29A]">Register</a>
                    </li>
                    <li className="px-4 py-3 h-full flex items-center">
                        <a href="/portal"className="text-[#3D405B]">Portal</a>
                    </li>
                </ul>
            
            
        </div>
        </header>
    );
};