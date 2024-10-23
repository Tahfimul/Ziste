// components/Navbar2.tsx

import Logo from '@/app/assets/logo.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface User {
    name: string | null;
    email: string | null;
    image: string | null;
}

const Navbar = () => {
    const auth = getAuth();
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser({
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL,
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const handleLogout = async () => {
        await auth.signOut();
        router.push("/"); // Redirect to homepage after sign out
    };

    return (
        <header className="sticky">
            <div className="flex px-8 h-24 mx-auto justify-between items-center bg-transparent">
                <a href="/"><Image src={Logo} alt="Logo" height={45} width={45} className="mx-4" /></a>
                <ul className="flex space-x-4 mx-5">
                    <li className="px-4 py-3 h-full flex items-center">
                        <a href="/catalog" className="text-[#E07A5F]">Courses</a>
                    </li>

                    {user ? 
                        (<></>) :
                        (
                        <li className="px-4 py-3 h-full flex items-center">
                            <a href="/register" className="text-[#81B29A]">Register</a>
                        </li>
                        )
                    }
                    <li className="px-4 py-3 h-full flex items-center">
                        {user ? (
                            <div className="flex gap-x-2 items-center">
                                <p>{user.name} {user.email}</p>
                                {user.image && (
                                    <Image
                                        src={user.image}
                                        alt="Profile"
                                        width={40} // Adjust width as needed
                                        height={40} // Adjust height as needed
                                        className="rounded-full cursor-pointer"
                                    />
                                )}
                                <button onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <a href="/signin" className="text-[#3D405B]">Sign In</a>
                        )}
                    </li>
                    {user ? 
                        (
                        <li className="px-4 py-3 h-full flex items-center">
                            <a href="/portal" className="text-[#3D405B]">Portal</a>
                        </li>
                        ) : (<></>)
                    }
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
