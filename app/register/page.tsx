"use client";

import React, { useState } from "react";
import { db } from "../../services/firebase"; // Centralized auth and db exports
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { firebaseSignUp } from "@/services/authService";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import for user to read their typed password
// import { FaCalendar } from "react-icons/fa";
import { useUser } from "@/components/contexts/UserContextProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Register = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    //    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { user, setUser, student, professor } = useUser();

    const handleOnChange = (type: string, value: string) => {
        setUser((prevUser) => ({
            ...prevUser,
            [type]: value,
        }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const userCredential = await firebaseSignUp({
                email: user.email,
                password,
            });

            const newUser = userCredential.user;

            let studentDocRef = null;
            let professorDocRef = null;
            if (user.isStudent) {
                studentDocRef = await addDoc(collection(db, "students"), {
                    userId: newUser.uid,
                    interests: student.interests,
                    courses: []
                });
            } else {
                // Professors can be both students and professors
                professorDocRef = await addDoc(collection(db, "professors"), {
                    userId: newUser.uid,
                    courses: professor.courses,
                    experience: professor.experience,
                });
                studentDocRef = await addDoc(collection(db, "students"), {
                    userId: newUser.uid,
                    interests: [],
                    courses: []
                });
            }

            // Save user info to Firestore
            await setDoc(doc(db, "users", newUser.uid), {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                birthday: user.birthday,
                createdAt: new Date(),
                studentRef: studentDocRef,
                professorDocRef: professorDocRef,
            });

            setError(
                "Registration successful! Please check your email to verify your account."
            );
            router.push("/verifyEmail"); // Redirect to chat page upon successful registration
        } catch (err) {
            setError("Registration failed. Please try again.");
            console.error(err);
        }
    };

    const disabled =
        user.email === "" ||
        user.firstName === "" ||
        user.lastName === "" ||
        user.birthday === "" ||
        password === "";

    return (
        <>
            <Navbar />
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
                        value={user.email}
                        onChange={(e) =>
                            handleOnChange("email", e.target.value)
                        }
                        required
                    />
                    <input
                        className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)]"
                        placeholder="First Name"
                        value={user.firstName}
                        onChange={(e) =>
                            handleOnChange("firstName", e.target.value)
                        }
                        required
                    />
                    <input
                        className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)]"
                        placeholder="Last Name"
                        value={user.lastName}
                        onChange={(e) =>
                            handleOnChange("lastName", e.target.value)
                        }
                        required
                    />

                    {/* Birthday Label and Input */}
                    <div className="flex flex-col w-full">
                        <label className="flex items-center text-gray-700 font-medium">
                            Birthday
                            <span className="ml-2 text-gray-500 relative group cursor-pointer">
                                {/* Circle with question mark */}
                                <span className="flex justify-center items-center w-5 h-5 rounded-full bg-gray-500 text-white text-xs group-hover:bg-gray-400">
                                    ?
                                </span>
                                {/* Tooltip on hover over the circle */}
                                <span className="absolute left-1/2 -translate-x-1/2 -top-9 w-64 p-2 rounded-lg bg-gray-700 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    When you provide your birthday, we can get
                                    you the right experience for your age.
                                </span>
                            </span>
                        </label>
                        <input
                            className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)]"
                            type="date"
                            placeholder="Birthday"
                            value={user.birthday}
                            onChange={(e) =>
                                handleOnChange("birthday", e.target.value)
                            }
                            required
                        />
                    </div>

                    <input
                        className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)]"
                        type={"password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)]"
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <button
                        type="submit"
                        className={`bg-[#81B29A] text-white mt-4 py-2 px-10 mb-10 rounded-lg drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] ${
                            disabled && "opacity-50"
                        }`}
                        disabled={disabled}
                    >
                        Sign Up
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Register;
