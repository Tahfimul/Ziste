"use client";

import { useState } from "react";
import { db } from "../../services/firebase"; // Centralized auth and db exports
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { firebaseSignUp } from "@/services/authService";
// import { FaCalendar } from "react-icons/fa";
// import RegisterProgress from "@/components/RegisterProgress";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const userCredential = await firebaseSignUp({ email, password });
            const user = userCredential.user;

            // Save user info to Firestore
            await setDoc(doc(db, "users", user.uid), {
                email,
                createdAt: new Date(),
            });

            router.push("/chat"); // Redirect to chat page upon successful registration
        } catch (err) {
            setError("Registration failed. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold mt-2 py-10">Sign Up</h1>
            <form
                className="flex flex-col justify-center items-center gap-6 w-[36vw] "
                onSubmit={handleRegister}
            >
                {error && <p>{error}</p>}
                <input
                    className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)] "
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)]"
                    placeholder="Username"
                />
                <div className="self-start">
                    <input
                        className="p-3 bg-[#f1f1f1] rounded-md w-[22vw] px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)]"
                        placeholder="Birthday"
                    />
                </div>
                <input
                    className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)]"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)]"
                    placeholder="Confirm Password"
                />
                <button
                    type="submit"
                    className="bg-[#96CBB1] text-white mt-4 py-2 px-10 mb-10 rounded-lg drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)]"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Register;
