// app/page.tsx
"use client";
import App from "@/components/welcome";
import Hero from "@/components/hero";

import { Navbar } from "@/components/Navbar";
import AuthContextProvider from "@/components/contexts/AuthContextProvider";
import { UserContextProvider } from "@/components/contexts/UserContextProvider";

export default function Home() {
    return (
        <AuthContextProvider>
            <UserContextProvider>
                <Navbar />
                <App />
                <Hero />
            </UserContextProvider>
        </AuthContextProvider>
    );
}
