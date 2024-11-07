"use client";

import { useEffect, useState } from "react";
import { firebaseAuth } from "../../services/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Footer } from '@/components/Footer';
import Loading from '../../components/Loading';

const VerifyEmail = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [verificationSent, setVerificationSent] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkUserVerification = async () => {
            const user = firebaseAuth.currentUser;
            if (user && !user.emailVerified) {
                await user.reload();
                if (!user.emailVerified) {
                    setVerificationSent(true);
                }
                setLoading(false);
            } else {
                router.push("/profile"); // Redirect if already verified
            }
        };

        checkUserVerification();
    }, [router]);

    const handleResendVerification = async () => {
        const user = firebaseAuth.currentUser;
        if (user) {
            try {
                await sendEmailVerification(user);
                setError(null);
                alert("Verification email sent! Please check your inbox.");
            } catch (err) {
                setError("Failed to resend verification email. Please try again later.");
            }
        }
    };

    if (loading) return <Loading/>;

    return (
        <>
            <div className="flex flex-col justify-center items-center mt-10">
                <h1 className="text-5xl font-bold font-bold mt-2 py-10">Verify Your Email</h1>
                <p className="text-xl mt-4 text-center">
                    A verification email has been sent to{" "}
                    {firebaseAuth.currentUser?.email}. Please check your inbox to verify.
                </p>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {verificationSent && (
                    <button
                        onClick={handleResendVerification}
                        className="bg-[#81B29A] text-white mt-6 py-2 px-6 rounded-lg"
                    >
                        Resend Verification Email
                    </button>
                )}
                <p className="mt-4 text-sm text-gray-500">
                    After verifying your email, reload the page. If you dont see the email, please check your spam folder.
                </p>
            </div>
            <Footer/>
        </>
    );
};

export default VerifyEmail;
