import { motion } from "framer-motion";
import Image from "next/image";
import Hermione from "@/app/assets/profExamplePics/hermioneGranger.jpg";
import Tyrion from "@/app/assets/profExamplePics/tyrion.jpg";
import Remus from "@/app/assets/profExamplePics/remus.jpg";
import Tchalla from "@/app/assets/profExamplePics/tchalla.jpg";
import Dumbledore from "@/app/assets/profExamplePics/dumbledore.jpg";
import Percy from "@/app/assets/profExamplePics/percy_jackson.jpg";
import Indiana from "@/app/assets/profExamplePics/indiana_jones.jpg";
import Sherlock from "@/app/assets/profExamplePics/sherlock.jpg";


const ProfCarousel = () => {
    const cards = [
        {
            image: Tyrion,
            name: "Tyrion Lannister",
            college: "Westeros University",
            subject: "Politics",
        },
        {
            image: Remus,
            name: "Remus Lupin",
            college: "Hogwarts School of Witchcraft & Wizardry",
            subject: "Poetry",
        },
        {
            image: Hermione,
            name: "Hermione Granger",
            college: "Hogwarts School of Witchcraft & Wizardry",
            subject: "Gender Studies",
        },
        {
            image: Tchalla,
            name: "T'Challa Udaku",
            college: "University of Wakanda",
            subject: "History",
        },
        {
            image: Dumbledore,
            name: "Albus Dumbledore",
            college: "Hogwarts School of Witchcraft & Wizardry",
            subject: "Computer Science",
        },
        {
            image: Percy,
            name: "Percy Jackson",
            college: "Olympus Institute for Half-Bloods",
            subject: "Mythology",
        },
        {
            image: Indiana,
            name: "Indiana Jones",
            college: "Treasure Island State University",
            subject: "Anthropology",
        },
        {
            image: Sherlock,
            name: "Sherlock Holmes",
            college: "The Doyle Institute of Criminal Sciences",
            subject: "Sociology",
        },
        
    ];
    return (
        <section className="mt-[5vh]">
            <div className="flex flex-col justify-center items-center">
                <h1 className="flex justify-start items-center text-[3vw] font-light mr-4">
                From <span className="font-semibold ml-2 mr-3">Real</span> Professors in <span className="font-semibold ml-2 mr-3">Real-Time</span>
                </h1>
                <div className="flex">
                    <p className="pb-[5vh] text-[1.5vw]">Now <span className="mr-1 underline underline-offset-4"><i>THIS</i></span> is a Line-Up.</p>
                </div>
                
            </div>
            <div className="container overflow-hidden mx-auto">
                {/* Motion div for seamless carousel */}
                <motion.div
                    className="flex justify-center items-center mt-[2vh] mb-[3vh] gap-[1.5vw]"
                    animate={{ translateX: "-90%" }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {/* Render cards twice for seamless looping */}
                    {[...cards, ...cards].map((card, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 bg-white rounded-xl w-[18vw] h-[40vh] flex flex-col items-center shadow-lg shadow-[#B5B2B2]"
                        >
                            <div className="relative w-[10vw] h-[19vh] my-[2vh] bg-white">
                                <Image
                                    src={card.image}
                                    alt={`${card.name} Image`}
                                    layout="fill" // This allows the image to cover the container area
                                    objectFit="cover" // Ensures the image covers the container without stretching
                                    className="rounded-full"
                                />
                            </div>
                            <h1 className="text-[1.5vw] font-semibold text-center">{card.name}</h1>
                            <h2 className="text-[1vw] text-[#6E739E] italic text-center break-words">{card.college}</h2>
                            <p className="text-[1vw] text-center break-words">{card.subject}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ProfCarousel