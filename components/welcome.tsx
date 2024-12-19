import Logo from "@/app/assets/logo.svg";
import DownCircleArrow from "@/app/assets/reshot-chevron-arrow-down-circle.svg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Signin from "./Sign_In";
import { AnimatePresence } from "framer-motion";
import { AuthContext } from "@/components/contexts/AuthContextProvider";
import { useContext } from "react";

const App = () => {
    const auth = useContext(AuthContext);

    const [viewSignin, setViewSignin] = React.useState<boolean>(false);

    const { data: session } = useSession();

    useEffect(() => {
        setViewSignin(auth.showSignIn);
    }, [auth.showSignIn]);
    return (
        <header className=" bg-white h-screen w-screen relative z-0">
            <AnimatePresence>
                {viewSignin && (
                    <div className="absolute inset-0 z-40">
                        <Signin />
                    </div>
                )}
            </AnimatePresence>

            <div className="justify-center mt-[13vh]">
                <h3
                    className="flex flex-col justify-center items-center text-[10vw] font-medium text-transparent bg-clip-text gradient-animate"
                    style={{
                        background:
                            "linear-gradient(to right, #E07A5F, #F2CC8F, #81B29A, #6E739E)",
                        backgroundSize: "62% 50%",
                        backgroundPosition: "center",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                    }}
                >
                    Zíste
                    <p className="absolute top-[23vh] text-[2vw] text-black font-extralight mb-[3vh]"><i>Experience Learning Again</i></p>
                </h3>

                <div className="flex pt-[7vh] pb-6 mx-auto justify-center items-center gap-[4vw]">
                    {session?.user ? <></> : <></>}

                    {auth?.user ? (
                        <></>
                    ) : (
                        <div>
                            <button
                                className="flex font-semibold shadow-md rounded-full px-9 py-4 text-[2.2vw] text-white bg-gradient-to-r from-[#81B29A] via-[#aed2c1] to-[#81B29A] transition-transform duration-250 ease-in-out transform hover:scale-105"
                                onClick={() => auth.setShowSignIn()}
                            >
                                Sign In
                            </button>
                        </div>
                    )}

                    {/** Static Logo Image btwn SignIn & Browse Buttons **/}

                    <div className="flex mr-2">
                        <Image
                            src={Logo}
                            alt="Logo"
                            style={{ width: "15vw", height: "15vh" }}
                        ></Image>
                    </div>

                    <div>
                        <a href="/catalog">
                            <button
                                className="flex font-semibold shadow-md rounded-full px-6 py-4 text-[2.2vw] text-white bg-gradient-to-r from-[#E07A5F] via-[#f7b29e] to-[#E07A5F] transition-transform duration-250 ease-in-out transform hover:scale-105"
                                style={{ position: "relative", zIndex: 100 }}
                            >
                                Browse
                            </button>
                        </a>
                    </div>
                </div>

                <div className="flex py-[2.5vh] mx-auto justify-center text-black text-xl">
                    <a
                        href="#hero"
                        className="flex justify-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                    >
                        <button className="flex justify-center items-center text-[1.7vw]">
                            Learn More
                            <Image
                                src={DownCircleArrow}
                                alt="Down Arrow"
                                style={{ width: "3vw", height: "4vh" }}
                            ></Image>
                        </button>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default App;
