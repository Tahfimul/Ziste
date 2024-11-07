"use client";

import React, { useState } from "react";
import { db } from "../../services/firebase"; // Centralized auth and db exports
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { firebaseSignUp, sendVerification } from "@/services/authService";
import { useUser } from "@/components/contexts/UserContext";
import { Navbar } from "@/components/Navbar";
import { User } from "firebase/auth";

const Register = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { user, setUser, student } = useUser();

    const handleOnChange = (type: string, value: string) => {
        setUser((prevUser) => ({
            ...prevUser,
            [type]: value,
        }));
    };

    const sendVerificationEmail = async (user: User) => {
        let attempts = 0;
        while (attempts < 3) {
            try {
                await sendVerification(user); // Firebase's sendVerification
                break; // If successful, break out of the loop
            } catch (err) {
                if (err instanceof Error && err.message.includes("auth/too-many-requests")) {
                    attempts++;
                    if (attempts >= 3) {
                        setError("Too many requests. Please try again later.");
                        break;
                    }
                    // Wait 1 minute before retrying
                    await new Promise((resolve) => setTimeout(resolve, 100));
                } else {
                    setError("Error sending verification email. Please try again.");
                    break;
                }
            }
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const userCredential = await firebaseSignUp({
                email: user.email,
                password,
            });

            const newUser = userCredential.user;

            // Send the verification email
            await sendVerificationEmail(newUser);

            // Add user details to Firestore
            let studentDocRef = null;
            let professorDocRef = null;
            if (user.isStudent) {
                studentDocRef = await addDoc(collection(db, "students"), {
                    userId: newUser.uid,
                    interests: student.interests,
                });
            } else {
                professorDocRef = await addDoc(collection(db, "professors"), {
                    userId: newUser.uid,
                    interests: student.interests,
                });
            }

            // Save user info to Firestore
            await addDoc(collection(db, "users"), {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                birthday: user.birthday,
                createdAt: new Date(),
                studentRef: studentDocRef,
                professorDocRef: professorDocRef,
            });

            // Redirect after successful registration and email verification request
            router.push("/verifyEmail");
        } catch (err) {
            if (err instanceof Error) {
                setError("Registration failed. Please try again.");
            } else {
                setError("An unknown error occurred.");
            }
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
                        onChange={(e) => handleOnChange("email", e.target.value)}
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
                        onChange={(e) => handleOnChange("lastName", e.target.value)}
                        required
                    />
                    <input
                        className="p-3 bg-[#f1f1f1] rounded-md w-full px-4 drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)] focus:outline-none focus:drop-shadow-[2px_3px_3px_rgba(0,0,0,0.4)]"
                        type="date"
                        placeholder="Birthday"
                        value={user.birthday}
                        onChange={(e) => handleOnChange("birthday", e.target.value)}
                        required
                    />
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
        </>
    );
};

export default Register;