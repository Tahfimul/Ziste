import { useState } from "react";
import { googleSignIn } from "@/services/authService";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { AuthContext } from "@/components/contexts/AuthContextProvider";
import { useContext } from "react";
import GradientBorder from "./GradientBorder";

interface SigninProps {
    // setViewSignin: React.Dispatch<React.SetStateAction<boolean>>;
}
const Signin: React.FC<SigninProps> = () => {
    const auth = useContext(AuthContext);

    // useEffect(()=>{
    //   if(session?.user)
    //     router.push('/', {scroll:false})
    // },[session])

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");

    // const handleSignIn = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     try {
    //         // await signInWithEmailAndPassword(firebaseAuth, email, password);
    //         await firebaseSignIn({ email, password });
    //     } catch (err) {
    //         setError("SignIn failed. Please check your credentials.");
    //         console.error(err);
    //     }
    // };

    return (
        <AuthContext.Consumer>
            {(context) =>
                context.user === null ? (
                    <motion.div
                        className="w-auto h-screen bg-white absolute p-12 pt-[15vh] flex flex-col items-center drop-shadow-[3px_1px_6px_rgba(0,0,0,0.1)] gap-8 z-100"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut",
                        }}
                    >
                        <FaArrowLeft
                            size={20}
                            className="absolute top-[8vh] right-8 cursor-pointer"
                            onClick={() => auth.setShowSignIn()}
                        />
                        <h1 className="text-6xl font-semibold">Sign In</h1>
                        <form
                            className="w-auto h-screen bg-white flex flex-col items-center gap-8"
                            onSubmit={(e: React.FormEvent) => {
                                e.preventDefault();
                                context.signIn({ email, password });
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
                            <div className="transition-transform hover:scale-105 duration-300 ease-in-out">
                                <GradientBorder className="rounded-full gradient-animate">
                                    <button
                                        className="flex px-[2vw] py-[1.5vh] rounded-full items-center bg-white"
                                        type="submit"
                                    >
                                        <span className="text-[1.5vw] text-[#E07A5F] font-semibold">
                                            Sign in
                                        </span>
                                    </button>
                                </GradientBorder>
                            </div>
                        </form>
                        {/* {error && <p>{error}</p>} */}
                        <button
                            onClick={async () => {
                                await googleSignIn();
                            }}
                            className="bg-[#81B29A] px-3 py-2 rounded-md transition-transform hover:scale-105 duration-300 ease-in-out"
                        >
                            Sign In with Google
                        </button>
                        <text>
                            New to Ziste{" "}
                            <span className="text-[#81B29A] font-bold">
                                <a href="/register/select">
                                    Create an account.
                                </a>
                            </span>
                        </text>
                    </motion.div>
                ) : (
                    <></>
                )
            }
        </AuthContext.Consumer>
    );
};

export default Signin;
