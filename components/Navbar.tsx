import Logo from "@/app/assets/logo.svg";
import Image from "next/image";
import { AuthContext } from "@/components/contexts/AuthContextProvider";
import { useContext } from "react";
import Link from "next/link";

export const Navbar = () => {
    const auth = useContext(AuthContext);

    return (
        <header className="fixed top-0 left-0 w-full z-30">
            <div className="flex px-[2vw] h-[11vh] mx-auto justify-between items-center bg-white bg-opacity-85 backdrop-blur-sm">
                <a href="/">
                    <Image
                        src={Logo}
                        alt="Logo"
                        className="justify-start items-center mx-[0vw]"
                        style={{ width: "7vw", height: "7vh" }}
                    ></Image>
                </a>
                <ul className="flex space-x-[2vw] mx-[2.2vw] text-[1.4vw] items-center">
                    <li className="px-4 py-3 h-full flex items-center">
                        <a
                            href="/catalog"
                            className="text-[#E07A5F] transition-transform duration-300 ease-in-out transform hover:scale-105"
                        >
                            Catalog
                        </a>
                    </li>

                    {auth?.user ? (
                        <></>
                    ) : (
                        <li className="px-4 py-3 h-full flex items-center">
                            <a
                                href="/register/select"
                                className="text-[#81B29A] transition-transform duration-300 ease-in-out transform hover:scale-105"
                            >
                                Register
                            </a>
                        </li>
                    )}
                    <li className="px-4 py-3 h-full flex items-center">
                        {auth?.user ? (
                            <div className="flex gap-x-[1vw] items-center">
                                <p>
                                    {auth?.user?.displayName}{" "}
                                    <Link href={"/profile"}>
                                        {auth?.user?.email}
                                    </Link>
                                </p>
                                {auth?.user?.photoURL ? (
                                    <Image
                                        src={auth.user.photoURL!}
                                        alt=""
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                    />
                                ) : (
                                    <></>
                                )}

                                <button
                                    onClick={async () => {
                                        await auth.signOut();
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            // <a href="/signin"className="text-[#3D405B]">Sign In</a>
                            <button
                                className="text-[#3D405B] transition-transform duration-300 ease-in-out transform hover:scale-105"
                                onClick={() => {
                                    auth.setShowSignIn();
                                }}
                            >
                                Sign In
                            </button>
                        )}
                    </li>
                    {auth?.user ? (
                        <li className="px-4 py-3 h-full flex items-center">
                            <a href="/portal" className="text-[#3D405B]">
                                Portal
                            </a>
                        </li>
                    ) : (
                        <></>
                    )}
                </ul>
            </div>
        </header>
    );
};
