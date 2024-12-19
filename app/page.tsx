"use client";
import App from "@/components/welcome";
import Hero from "@/components/hero";
import Courses from "@/components/courseSection";
import ProfCarousel from "@/components/profCardCarousel";
import Reviews from "@/components/reviews";
import { Navbar } from "@/components/Navbar";
import AuthContextProvider from "@/components/contexts/AuthContextProvider";
import { UserContextProvider } from "@/components/contexts/UserContextProvider";
import SignIn from "@/components/Sign_In";
import { useContext } from "react";
import { AuthContext } from "@/components/contexts/AuthContextProvider";
import Pricing from "@/components/pricingSection";
import { Footer } from "@/components/Footer";

export default function Home() {
    const { showSignIn } = useContext(AuthContext);

    return (
        <AuthContextProvider>
            <UserContextProvider>
                <Navbar />
                {showSignIn && <SignIn />}
                <App />
                <Hero />
                <Courses/>
                <ProfCarousel/>
                <Reviews/>
                <Pricing/>
                <Footer/>
            </UserContextProvider>
        </AuthContextProvider>
    );
}
