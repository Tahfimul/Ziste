// components/Sign_In.tsx

"use client"; // Ensure this is a client component

import React, { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation"; // Use next/navigation for app directory
import { firebaseAuth } from "../services/firebase"; // Adjust the path as needed

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign-up and sign-in
  const router = useRouter();

  useEffect(() => {
    const checkAuthState = () => {
      const auth = getAuth();
      const user = auth.currentUser;

      // If user is logged in, navigate to the protected route
      if (user) {
        router.push("/viewenrolledcoursepage"); // Adjust to your protected page
      }
    };

    checkAuthState();
  }, [router]);

  const signInWithGoogle = async () => {
    try {
      console.log("Attempting to sign in with Google...");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      console.log("User signed in: ", result.user);
      router.push("/viewenrolledcoursepage"); // Adjust to your protected page
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log("User signed in with email: ", result.user);
      router.push("/viewenrolledcoursepage"); // Adjust to your protected page
    } catch (error) {
      console.error("Error signing in with email: ", error);
    }
  };

  const handleSignUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      console.log("User signed up: ", result.user);
      router.push("/viewenrolledcoursepage"); // Redirect after successful sign-up
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">{isSignUp ? "Sign Up" : "Sign In"}</h1>

      {/* Email and Password Inputs */}
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 mb-2 border border-gray-300 rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Sign In / Sign Up Button */}
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300 mb-4"
        onClick={isSignUp ? handleSignUp : handleEmailSignIn}
      >
        {isSignUp ? "Sign Up" : "Sign In"}
      </button>

      {/* Google Sign In Button */}
      <button 
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 mb-4" 
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>

      {/* Toggle between Sign In and Sign Up */}
      <p>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? " Sign In" : " Sign Up"}
        </span>
      </p>
    </div>
  );
};

export default SignIn;
