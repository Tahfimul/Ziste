"use client"
import { motion } from "framer-motion";
import React from "react";

const reviewCards = [
    {
        text: "Thought it would give me an existential crisis, but I actually learned a lot.",
        name: "-Chandler M. Bing",
        bg: "bg-[#F2CC8F]",
    },
    {
        text: "Zíste made me realize how much I missed learning.",
        name: "-Monica Geller",
        bg: "bg-[#E07A5F]",
    },
    {
        text: "20 years after I graduated, I’ve learned more than I ever expected to on Zíste!",
        name: "-Joey Tribbiani",
        bg: "bg-[#81B29A]",
    },
    {
        text: "I never thought online learning could be so enriching.",
        name: "-Phoebe Buffay",
        bg: "bg-[#9fa5db]",
    },
    {
        text: "I’m so glad I found Zíste! The professors are engaging, and the courses are not only informative but also deeply inspiring!",
        name: "-Rachel Green",
        bg: "bg-[#B5B2B2]",
    },
    {
        text: "Zíste is a goldmine for anyone interested in the humanities. Whether it's history, philosophy, or literature, there's something for everyone.",
        name: "-Ross Geller",
        bg: "bg-[#F2CC8F]",
    },
    {
        text: "An amazing platform for learning! The professors bring the material to life, making complex topics both accessible and enjoyable.",
        name: "-Michael Scott",
        bg: "bg-[#E07A5F]",
    },
    {
        text: "I’ve taken several courses here, and each one has been a rewarding experience.",
        name: "-Jim Halpert",
        bg: "bg-[#81B29A]",
    },
    {
        text: "I love how Zíste offers a wide range of humanities courses with professors who are truly experts in their fields. It’s the perfect way to learn!",
        name: "-Gunther Barista",
        bg: "bg-[#9fa5db]",
    },
];
const firstCol = reviewCards.slice(0,3);
const secondCol = reviewCards.slice(3,6);
const thirdCol = reviewCards.slice(6,9);

const ReviewColumn = (props: {reviewCards: typeof reviewCards; duration?:number}) => (
    <div className="relative overflow-hidden my-auto h-[75vh] rounded-2xl">
        <motion.div 
        animate={{
            translateY: '-50%',
        }}
        transition={{
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
            duration: props.duration || 7,
        }}
        className="relative flex flex-col justify-center items-center mt-[2vh] overflow-hidden my-auto -translate-y-1/2">
            <div className="flex flex-col justify-center items-center gap-[2vh] px-[1vw] w-full">
            {[...new Array(2)].fill(0).map((_,index) => (
                <React.Fragment key={index}>
                    {props.reviewCards.map(({text, name, bg}, idx) => (
                        <div 
                            key={idx} // Add unique `key` here
                            className={`flex flex-col justify-center items-center px-[2.3vw] py-[2vh] w-[25vw] h-[25vh] rounded-xl shadow-md shadow-[#fcf2e0] ${bg} bg-opacity-70`}>
                            <div className="pt-[2vh] text-[1.2vw] text-center font-normal tracking-tight">&quot;{text}&quot;</div>
                            <div className="pt-[1vh] text-[1vw] text-center font-light">{name}</div>
                        </div>
                    ))}
                </React.Fragment>
            ))}
            </div>
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-[10%] bg-gradient-to-t from-transparent to-black opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-[10%] bg-gradient-to-b from-transparent to-black opacity-20"></div>

    </div>
);

const Reviews = () => {
    return (
        <section className="mt-[15vh]">
            <div className="flex flex-col justify-center items-center mt-[7vh] mb-[2vh]">
                <h1 className="flex justify-start items-center text-[3vw] font-light mr-4">
                    We&apos;re <span className="ml-2 mr-3"><i>Really</i></span> Just That Good.
                </h1>
                <p className="pb-[4vh] text-[1.5vw] tracking-tight">But Don&apos;t Just Take it From Us. Hear What Our Students Have to Say</p>
                <div className="flex justify-center">
                    <ReviewColumn reviewCards={firstCol} duration={10}/>
                    <ReviewColumn reviewCards={secondCol} duration={18}/>
                    <ReviewColumn reviewCards={thirdCol} duration={14}/>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
