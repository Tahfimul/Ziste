"use client"; // Ensure this is a Client Component

import { useState, useContext } from "react";
import { googleSignIn } from "@/services/authService";
import GradientBorder from "@/components/GradientBorder";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthContext } from "@/components/contexts/AuthContextProvider";
import { useRouter } from "next/navigation";

const SigninPage: React.FC = () => {
    const auth = useContext(AuthContext);
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn(); // Call the Google sign-in function
            router.push("/portal"); // Redirect to the portal page
        } catch (error) {
            console.error("Await, please...", error);
        }
    };

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="flex flex-col items-center justify-center mt-[10vh] px-[10vw]"> {/* Increased margin-top */}
                <div className="w-full h-auto bg-white p-12 flex flex-row justify-between items-center drop-shadow-[3px_1px_6px_rgba(0,0,0,0.1)] gap-12 z-100">
                    {/* Left Section */}
                    <div className="flex flex-col justify-center w-1/2 text-left">
                        <h1 className="text-[5vw] font-bold text-black">Sign In</h1>
                        <div className="mt-[2vh] bg-[#E07A5F] w-[10vw] h-[1vh] rounded-[2vw]"></div>
                        <p className="mt-[2vh] text-[1.8vw] text-gray-600">
                            Please log in to access your account.
                        </p>
                    </div>

                    {/* Right Section */}
                    <div className="w-1/2">
                        <form
                            className="flex flex-col items-center gap-6"
                            onSubmit={(e: React.FormEvent) => {
                                e.preventDefault();
                                auth.signIn({ email, password });
                            }}
                        >
                            <input
                                className="p-4 bg-slate-200 rounded-md w-[30vw]"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                className="p-4 bg-slate-200 rounded-md w-[30vw]"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <GradientBorder className="rounded-full gradient-animate">
                                <button
                                    className="flex px-[2vw] py-[1.5vh] rounded-full items-center bg-white hover:scale-105 transition-transform duration-300 ease-in-out"
                                    type="submit"
                                >
                                    <span className="text-[1.5vw] text-[#E07A5F] font-semibold">
                                        Sign in
                                    </span>
                                </button>
                            </GradientBorder>

                            <button
                            onClick={handleGoogleSignIn}
                            className="bg-sky-400 px-3 py-2 rounded mt-4"
                        >
                            Sign In with Google
                        </button>
                        </form>

                        <p className="mt-4 text-center">
                            New to Ziste?{" "}
                            <span className="text-[#81B29A] font-bold">
                                <a href="/register/select">
                                    Create an account.
                                </a>
                            </span>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default SigninPage;
