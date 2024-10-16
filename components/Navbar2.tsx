import Logo from '@/app/assets/logo.png';
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();
    return (
        <header className="sticky">

        <div className="flex px-8 h-24 mx-auto justify-between items-center bg-transparent">
            
        <a href= "/"><Image src={Logo} alt="Logo" height={45} width={45} className="mx-4"></Image></a>
                <ul className="flex space-x-4 mx-5">
                    <li className="px-4 py-3 h-full flex items-center">
                        <a href="/catalog" className="text-[#E07A5F]">Courses</a>
                    </li>

                    {session?.user ? 
                        (<></>):
                        (
                        <li className="px-4 py-3 h-full flex items-center">
                            <a href="/register"className="text-[#81B29A]">Register</a>
                        </li>
                        )
                        
                    }
                    <li className="px-4 py-3 h-full flex items-center">
                        {session?.user ? (
                            <div className="flex gap-x-2 items-center">
                            <p>
                                {session.user.name} {session.user.email}
                            </p>
                            <img 
                            src={session.user.image!}
                                alt=""
                                className="w-10 h-10 rounded-full cursor-pointer"
                            />
                            <button
                                onClick={async () => {
                                await signOut({
                                    callbackUrl: "/",
                                })
                                }}
                            >
                                Logout
                            </button>
                            </div>
                        ) : (
                            <a href="/signin"className="text-[#3D405B]">Sign In</a>
                        )}
                    </li>
                    {session?.user ? 
                        (
                        <li className="px-4 py-3 h-full flex items-center">
                            <a href="/portal"className="text-[#3D405B]">Portal</a>
                        </li>
                        ):
                        (<></>)
                    }
                </ul>
            
            
        </div>
        </header>
    );
};

export default Navbar;