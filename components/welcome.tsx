import React from "react";
import Logo from "@/app/assets/logo.png";
import Image from "next/image";
import Login from "./Login";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";

const App = () => {
    const [viewLogin, setViewLogin] = React.useState<boolean>(false);

    const { data: session } = useSession();
    return (
        <header className=" bg-white h-screen w-full relative">
            <AnimatePresence>
                {viewLogin && <Login setViewLogin={setViewLogin} />}
            </AnimatePresence>

            <div className="pt-16">
                <h1
                    className="flex mx-auto justify-center px-5 text-8xl font-extralight text-transparent bg-clip-text"
                    style={{
                        background:
                            "linear-gradient(to bottom, #6E739E, #3D405B, #3D405B)",
                        backgroundSize: "40% 80%",
                        backgroundPosition: "center",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                    }}
                >
                    Welcome
                </h1>
                <h2
                    className="flex mx-auto justify-center px-5 text-7xl font-light text-transparent bg-clip-text"
                    style={{
                        background:
                            "linear-gradient(to bottom, #6E739E, #3D405B, #3D405B)",
                        backgroundSize: "40% 80%",
                        backgroundPosition: "center",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                    }}
                >
                    To
                </h2>
                <h3
                    className="flex mx-auto justify-center px-5 text-9xl font-semibold text-transparent bg-clip-text"
                    style={{
                        background:
                            "linear-gradient(to right, #E07A5F, #81B29A, #3D405B)",
                        backgroundSize: "25% 25%",
                        backgroundPosition: "center",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                    }}
                >
                    Zíste
                </h3>
            </div>

            <div className="flex pt-16 pb-6 mx-auto justify-center gap-28">
                {session?.user ? (
                    <></>
                ) : (
                    <div>
                        <button
                            className="flex font-semibold shadow-md rounded-full px-9 py-4 text-2xl text-white bg-gradient-to-r from-[#81B29A] via-[#aed2c1] to-[#81B29A]"
                            onClick={() => setViewLogin(true)}
                        >
                            Login
                        </button>
                    </div>
                )}

                {/** Static Logo Image btwn SignIn & Browse Buttons **/}
                <div className="flex top-1 items-center">
                    <Image src={Logo} alt="Logo" height={90} width={90}></Image>
                </div>

                <div>
                    <a href="/catalog">
                        <button className="flex font-semibold shadow-md rounded-full px-6 py-4 text-2xl text-white bg-gradient-to-r from-[#E07A5F] via-[#f7b29e] to-[#E07A5F]">
                            Browse
                        </button>
                    </a>
                </div>
            </div>

            <div className="flex py-5 mx-auto justify-center text-black text-xl">
                <p>Learn More</p>
                {/**<Image src= "app/assets/reshot-chevron-arrow-down-circle.svg" alt="Down Arrow" height={20} width={20}></Image>**/}
            </div>
        </header>
    );
};

export default App;
