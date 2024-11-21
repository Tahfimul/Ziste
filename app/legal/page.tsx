// source for legal terms: chatgpt

"use client";
import React from 'react';
import {Navbar} from '../../components/Navbar';
import {Footer} from "@/components/Footer";
export default function legal() {
    return (
        <>
    <Navbar />
    <section id="legal" className="bg-gray-100 pt-[3vw] pb-16">
        <div className="flex flex-col justify-center items-center mt-10">
            <h1 className="text-5xl font-bold mt-2 py-10 text-gray-800">Legal Information</h1>

            {/* Terms and Conditions */}
            <div className="w-full max-w-4xl px-6 py-4 bg-white rounded-lg shadow-lg mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Terms and Conditions</h2>
                <p className="mt-4 text-gray-700">Last updated: [Date]</p>
                <p className="mt-4 text-gray-700">
                    By accessing or using the Zíste platform (&quot;Website&quot;), you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Website.
                </p>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">1. Acceptance of Terms</h3>
                <p className="mt-2 text-gray-700">
                    By accessing or using the Website, you acknowledge that you have read, understood, and agree to these Terms and Conditions. These terms may be updated from time to time, and any updates will be posted on this page.
                </p>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">2. User Responsibilities</h3>
                <p className="mt-2 text-gray-700">
                    You are responsible for maintaining the confidentiality of your account information and for all activities under your account. You agree to use the Website only for lawful purposes and in accordance with the terms provided.
                </p>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">3. Limitations of Liability</h3>
                <p className="mt-2 text-gray-700">
                    Zíste is not liable for any direct, indirect, incidental, special, or consequential damages that may arise from the use or inability to use the Website, even if we have been advised of the possibility of such damages.
                </p>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">4. Governing Law</h3>
                <p className="mt-2 text-gray-700">
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law principles.
                </p>
            </div>

            {/* Privacy Policy */}
            <div className="w-full max-w-4xl px-6 py-4 bg-white rounded-lg shadow-lg mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Privacy Policy</h2>
                <p className="mt-4 text-gray-700">Last updated: [Date]</p>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">1. Information We Collect</h3>
                <p className="mt-2 text-gray-700">
                    We collect personal information that you voluntarily provide to us, such as your name, email address, and other details when registering for an account, subscribing to our services, or contacting us.
                </p>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">2. How We Use Your Information</h3>
                <p className="mt-2 text-gray-700">
                    We use your personal information to provide services, improve the Website, send you updates, and respond to your inquiries. We do not sell or rent your personal information to third parties.
                </p>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">3. Data Security</h3>
                <p className="mt-2 text-gray-700">
                    We use reasonable measures to protect your personal information from unauthorized access, alteration, or destruction. However, no system is entirely secure, and we cannot guarantee absolute security.
                </p>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">4. Cookies</h3>
                <p className="mt-2 text-gray-700">
                    We use cookies to enhance your experience on our Website. You can choose to disable cookies through your browser settings, but this may affect your experience on the site.
                </p>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">5. Your Rights</h3>
                <p className="mt-2 text-gray-700">
                    You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at [email].
                </p>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">6. Governing Law</h3>
                <p className="mt-2 text-gray-700">
                    This Privacy Policy is governed by the laws of the State of New York, United States.
                </p>
            </div>

            {/* Cookie Policy */}
            <div className="w-full max-w-4xl px-6 py-4 bg-white rounded-lg shadow-lg mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Cookie Policy</h2>
                <p className="mt-4 text-gray-700">Last updated: [Date]</p>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">1. What Are Cookies?</h3>
                <p className="mt-2 text-gray-700">
                    Cookies are small files stored on your device that help us enhance your user experience, analyze traffic, and personalize content.
                </p>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">2. Types of Cookies We Use</h3>
                <ul className="list-disc pl-6">
                    <li><strong>Essential Cookies:</strong> Necessary for the Website&apos;s functionality.</li>
                    <li><strong>Performance Cookies:</strong> Used to analyze user activity and improve the Website.</li>
                    <li><strong>Functionality Cookies:</strong> Allow for customization and improved user experience.</li>
                </ul>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">3. How to Control Cookies</h3>
                <p className="mt-2 text-gray-700">
                    You can control the use of cookies through your browser settings, but disabling cookies may affect certain features on our Website.
                </p>
            </div>

            {/* Disclaimer */}
            <div className="w-full max-w-4xl px-6 py-4 bg-white rounded-lg shadow-lg mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Disclaimer</h2>
                <p className="mt-4 text-gray-700">Last updated: [Date]</p>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">1. No Professional Advice</h3>
                <p className="mt-2 text-gray-700">
                    The content on the Website is not intended to replace professional advice or guidance in any field. Always seek professional advice before making any decisions.
                </p>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">2. External Links</h3>
                <p className="mt-2 text-gray-700">
                    The Website may contain links to external sites. We are not responsible for the content or accuracy of these external sites and do not endorse them.
                </p>
                <h3 className="mt-6 text-xl font-semibold text-gray-800">3. Limitation of Liability</h3>
                <p className="mt-2 text-gray-700">
                    Zíste will not be liable for any direct, indirect, or incidental damages arising from your use of the Website, including but not limited to data loss, or any other damages.
                </p>
            </div>

            {/* Copyright Notice */}
            <div className="w-full max-w-4xl px-6 py-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800">Copyright Notice</h2>
                <p className="mt-4 text-gray-700">Last updated: [Date]</p>
                <p className="mt-2 text-gray-700">
                    The content on the Zíste Website, including text, images, logos, and other materials, is protected by copyright law. You may not use, reproduce, distribute, or create derivative works based on any content from the Website without prior written consent.
                </p>
            </div>
        </div>
    </section>
    <Footer />
        </>
    );
  }