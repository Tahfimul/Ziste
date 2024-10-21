'use client'
import { Navbar } from "../../components/Navbar2";
import AuthContextProvider from "@/components/contexts/AuthContextProvider";
export default function Catalog() {
    return (
        <AuthContextProvider >
            <>
            <Navbar />
            <h1 className="text-black text-3xl">portal</h1>
            </>
        </AuthContextProvider>
    );
}