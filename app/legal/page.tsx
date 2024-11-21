// source for legal terms: chatgpt

"use client";
import React from 'react';
import {Navbar} from '../../components/Navbar';
import {Footer} from "@/components/Footer";
import { Circle } from 'lucide-react';
import { useState } from 'react';
import './legal.css';

export default function legal() {
    const [activeSideTab, setActiveSideTab] = useState<string>("");
    return (
    <>
    <Navbar />
    
    <h1 className="fixed items-start ml-[6vw] py-3 mt-[10vh] text-[4vw] text-black font-bold pb-2 mb-[1vh] z-10">Legal Information</h1>
    <div className="flex">
        <div className="flex">
            <div className="fixed top-[22vh] left-[2vw] flex flex-col w-[20vw] ml-[8vw] mt-[3vh] gap-[4.5vh] px-[1vw] z-10">
                <a href="#TermsAndConditions" className="flex flex-col items-center transition-transform duration-150 ease-in-out transform hover:translate-x-[-2vw]" onClick={() => setActiveSideTab("TermsAndConditions")}>
                    <div className="flex items-center w-full gap-2">
                        <Circle width={15} height={15} className="text-white fill-[#81B29A] opacity-50 pr-6-"></Circle>
                        <h1 className="w-full my-[0vh] text-[1.5vw] text-black">Terms and Conditions</h1>
                    </div>
                    <div className={`${activeSideTab === "TermsAndConditions" ? "opacity-100" : "opacity-0"} w-full h-[0.8vh] mt-[0.5vh] rounded-full bg-[#81B29A]`}></div>
                </a>
                <a href="#PrivacyPolicy" className="flex flex-col items-center gap-2 transition-transform duration-150 ease-in-out transform hover:translate-x-[-2vw]" onClick={() => setActiveSideTab("PrivacyPolicy")}>
                    <div className="flex items-center w-full gap-2">
                        <Circle width={15} height={15} className="text-white fill-[#9fa5db]"></Circle>
                        <h1 className="my-[0vh] text-[1.5vw] text-black">Privacy Policy</h1>
                    </div>
                    <div className={`${activeSideTab === "PrivacyPolicy" ? "opacity-100" : "opacity-0"} w-full h-[0.8vh] mt-[0.5vh] rounded-full bg-[#9fa5db]`}></div>
                </a>
                <a href="#CookiePolicy" className="flex flex-col items-center gap-2 transition-transform duration-150 ease-in-out transform hover:translate-x-[-2vw]" onClick={() => setActiveSideTab("CookiePolicy")}>
                    <div className="flex items-center w-full gap-2">
                        <Circle width={15} height={15} className="text-white fill-[#F2CC8F]"></Circle>
                        <h1 className="my-[0vh] text-[1.5vw] text-black">Cookie Policy</h1>
                    </div>
                    <div className={`${activeSideTab === "CookiePolicy" ? "opacity-100" : "opacity-0"} w-full h-[0.8vh] mt-[0.5vh] rounded-full bg-[#F2CC8F]`}></div>
                </a>
                <a href="#Disclaimer"className="flex flex-col items-center gap-2 transition-transform duration-150 ease-in-out transform hover:translate-x-[-2vw]" onClick={() => setActiveSideTab("Disclaimer")}>
                    <div className="flex items-center w-full gap-2">
                        <Circle width={15} height={15} className="text-white fill-[#E07A5F]"></Circle>
                        <h1 className="my-[0vh] text-[1.5vw] text-black">Disclaimer</h1>
                    </div>
                    <div className={`${activeSideTab === "Disclaimer" ? "opacity-100" : "opacity-0"} w-full h-[0.8vh] mt-[0.5vh] rounded-full bg-[#E07A5F]`}></div>
                </a>
                <a href="#CopyrightNotice" className="flex flex-col items-center gap-2 transition-transform duration-150 ease-in-out transform hover:translate-x-[-2vw]" onClick={() => setActiveSideTab("CopyrightNotice")}>
                    <div className="flex items-center w-full gap-2">
                        <Circle width={15} height={15} className="text-white fill-[#B5B2B2]"></Circle>
                        <h1 className="my-[0vh] text-[1.5vw] text-black">Copyright Notice</h1>
                    </div>
                    <div className={`${activeSideTab === "CopyrightNotice" ? "opacity-100" : "opacity-0"} w-full h-[0.8vh] mt-[0.5vh] rounded-full bg-[#B5B2B2]`}></div>
                </a>
            </div>
            <div className="w-[0.5vw] ml-[30vw] mt-[22vh] rounded-full bg-gray-500"></div>
        </div>
        <div className="flex flex-col items-start mt-[22vh] ml-[2vw] max-h-[60vh] overflow-y-auto pr-[2.5vw]">
            <section id="TermsAndConditions" className="ml-[2vw]">
                <div className="flex flex-col">
                    <h2 className="flex justify-start w-full text-[#81B29A] mb-[1vh] text-[2.5vw] font-semibold">Terms and Conditions</h2>
                    <div className="items-start pr-[2.5vw]">
                        <p className="text-gray-700">Last updated: [Date]</p>
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
                </div>
            </section>
            <section id="PrivacyPolicy" className="ml-[2vw] mt-[4vh]">
                <div className="flex flex-col">
                    <h2 className="flex justify-start w-full text-[#9fa5db] mb-[1vh] text-[2.5vw] font-semibold">Privacy Policy</h2>
                    <div className="items-start pr-[1.5vw]">
                        <p className="text-gray-700">Last updated: [Date]</p>
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
                </div>
            </section>
            <section id="CookiePolicy" className="ml-[2vw] mt-[4vh]">
                <div className="flex flex-col">
                    <h2 className="flex justify-start w-full text-[#F2CC8F] mb-[2vh] text-[2.5vw] font-semibold">Cookie Policy</h2>
                    <div className="items-start pr-[1.5vw]">
                            <p className="text-gray-700">Last updated: [Date]</p>
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
                </div>
            </section>
            <section id="Disclaimer" className="ml-[2vw] mt-[4vh]">
                <div className="flex flex-col">
                    <h2 className="flex justify-start w-full text-[#E07A5F] mb-[2vh] text-[2.5vw] font-semibold">Disclaimer</h2>
                    <div className="items-start pr-[1.5vw]">
                        <p className="text-gray-700">Last updated: [Date]</p>
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
                </div>
            </section>
            <section id="CopyrightNotice" className="ml-[2vw] mt-[4vh]">
                <div className="flex flex-col">
                    <h2 className="flex justify-start w-full text-[#B5B2B2] mb-[2vh] text-[2.5vw] font-semibold">Copyright Notice</h2>
                    <div className="items-start pr-[1.5vw]">
                        <p className="text-gray-700">Last updated: [Date]</p>
                        <p className="mt-2 text-gray-700">
                            The content on the Zíste Website, including text, images, logos, and other materials, is protected by copyright law. You may not use, reproduce, distribute, or create derivative works based on any content from the Website without prior written consent.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </div>

    <Footer />
    </>
    );
  }