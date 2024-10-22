import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

interface SigninProps {
    setViewSignin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signin: React.FC<SigninProps> = ({ setViewSignin }) => {
    return (
        <motion.div
            className="w-auto h-screen bg-white absolute p-12 pt-20 flex flex-col items-center drop-shadow-[3px_1px_6px_rgba(0,0,0,0.1)] gap-8"
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
                className="absolute top-8 right-8 cursor-pointer"
                onClick={() => setViewSignin(false)}
            />
            <h1 className="text-6xl font-semibold">Log In</h1>
            <input
                className="p-4 bg-slate-200 rounded-md w-[50vw]"
                placeholder="Email"
            />
            <input
                className="p-4 bg-slate-200 rounded-md w-[50vw]"
                placeholder="Password"
            />
            <button className="font-semibold shadow-md rounded-full px-6 py-2 text-xl text-white bg-gradient-to-r from-[#81B29A] via-[#aed2c1] to-[#81B29A]">
                Signin
            </button>
            <text>
                New to Ziste{" "}
                <span className="text-[#81B29A] font-bold">
                    <a href="/signin">Create an account.</a>
                </span>
            </text>
        </motion.div>
    );
};

export default Signin;
