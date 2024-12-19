import Logo from "@/app/assets/logo.svg";
import Image from "next/image";
import { AuthContext } from "@/components/contexts/AuthContextProvider";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { firebaseAuth } from "@/services/firebase";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export const Navbar = () => {
    const auth = useContext(AuthContext);
    const authUser = firebaseAuth?.currentUser

    const [firstName, setFirstName] = useState<string | null>(null);
    const [isLoadingName, setIsLoadingName] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [imageUrl, setImageUrl] = useState<string | StaticImport>("");

    useEffect(() => {
        const fetchImageUrl = async () => {
        try {
            const storage = getStorage()
            const imageRef = ref(storage, `users/${authUser?.uid}/profile.jpg`)
            const url = await getDownloadURL(imageRef); 
            console.log("url ", url)
            setImageUrl(url)
        } catch (e) {
            console.error("Error fetching image URL:", e)
        }
        };

        fetchImageUrl();
    }, []);

    const firestore = getFirestore();

    const fetchFirstName = async () => {
        if (auth?.user?.uid) {
            try {
                const userDocRef = doc(firestore, "users", auth.user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setFirstName(userData.firstName || "");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        setIsLoadingName(false);
    };

    useEffect(() => {
        if (auth?.user) {
            fetchFirstName();
        }
    }, [auth?.user]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-30 bg-white bg-opacity-85 backdrop-blur-sm shadow-md">
            <div className="flex px-[2vw] h-[11vh] mx-auto justify-between items-center">
                {/* Logo */}
                <a href="/">
                    <Image
                        src={Logo}
                        alt="Logo"
                        className="justify-start items-center mx-[0vw]"
                        style={{ width: "7vw", height: "7vh" }}
                    />
                </a>

                {/* Navigation Links */}
                <ul className="flex space-x-[2vw] mx-[2.2vw] text-[1.4vw] items-center">
                    <li className="px-4 py-3 h-full flex items-center">
                        <a
                            href="/catalog"
                            className="text-[#E07A5F] transition-transform duration-300 ease-in-out transform hover:scale-105"
                        >
                            Catalog
                        </a>
                    </li>

                    {/* Portal Button */}
                    {auth?.user && (
                        <li className="px-4 py-3 h-full flex items-center">
                            <a
                                href="/portal"
                                className="text-[#3D405B] transition-transform duration-300 ease-in-out transform hover:scale-105"
                            >
                                Portal
                            </a>
                        </li>
                    )}

                    {/* Authenticated User Section */}
                    {auth?.user ? (
                        <li className="relative px-4 py-3 h-full flex items-center">
                            {/* Greeting */}
                            <span className="text-[#3D405B] text-[1.2vw] font-semibold mr-[1vw]">
                                Hi, {isLoadingName ? "..." : firstName || "User"}
                            </span>

                            {/* Profile Avatar */}
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt="Profile"
                                    width={40} 
                                    height={40} 
                                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                    onClick={toggleDropdown}
                                />
                            ) : (
                                <div
                                    className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
                                    onClick={toggleDropdown}
                                >
                                    <span className="text-white text-lg font-bold">
                                        {auth?.user?.email?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div
                                    className="absolute top-[110%] right-0 bg-white shadow-lg rounded-lg w-[15vw] py-2 text-gray-700 text-[1.2vw] z-50 origin-top-right animate-slide-down"
                                    style={{
                                        border: "1px solid #ddd",
                                        boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    {/* User Info */}
                                    <div className="flex items-center px-[1vw] py-[1vh] border-b border-gray-200">
                                        {auth?.user?.photoURL && (
                                            <Image
                                                src={auth.user.photoURL!}
                                                alt="Profile Avatar"
                                                className="w-10 h-10 rounded-full"
                                            />
                                        )}
                                        <span className="ml-[1vw] text-[#3D405B] text-[1.2vw]">
                                            {firstName || "User"}
                                        </span>
                                    </div>

                                    {/* Menu Items */}
                                    <ul>
                                        <li className="px-[1vw] py-[0.5vh] hover:bg-gray-100 cursor-pointer">
                                            <Link href="/profile">Profile</Link>
                                        </li>
                                        <li className="px-[1vw] py-[0.5vh] hover:bg-gray-100 cursor-pointer">
                                            <button
                                                onClick={() =>
                                                    alert("Settings popup coming soon!")
                                                }
                                                className="w-full text-left"
                                            >
                                                Settings
                                            </button>
                                        </li>
                                        <li className="px-[1vw] py-[0.5vh] hover:bg-gray-100 cursor-pointer">
                                            <button
                                                onClick={auth.signOut}
                                                className="w-full text-left text-[#E07A5F]"
                                            >
                                                Sign Out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    ) : (
                        // Sign In Button for Guests
                        <li className="px-4 py-3 h-full flex items-center">
                            <Link href="/signIn">
                                <div className="px-[1.5vw] py-[1vh] text-[1.4vw] text-white bg-[#E07A5F] shadow-md rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105 gradient-animate">
                                    Sign In
                                </div>
                            </Link>
                        </li>
                        //removed unnecessary <a> wrapping inside <link> causing dev error
                    )}

                    {/* Register Link for Guests */}
                    {!auth?.user && (
                        <li className="px-4 py-3 h-full flex items-center">
                            <a
                                href="/register/select"
                                className="text-[#81B29A] transition-transform duration-300 ease-in-out transform hover:scale-105"
                            >
                                Register
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
};
