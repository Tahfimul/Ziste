import { motion } from "framer-motion";
import Image from "next/image";


const ProfCarousel = () => {
    const cards = [
        {
            bg: "bg-slate-100",
            image: ,
            name: "Sadab Hafiz",
            college: "CUNY Hunter College",
            subject: "Computer Science",
        },
        {
            bg: "bg-slate-100",
            image: ,
            name: "",
            college: "CUNY Hunter College",
            subject: "Computer Science",
        },
        {
            bg: "bg-slate-100",
            image: ,
            name: "",
            college: "CUNY Hunter College",
            subject: "Computer Science",
        },
        {
            bg: "bg-slate-100",
            image: ,
            name: "",
            college: "CUNY Hunter College",
            subject: "Computer Science",
        },
        {
            bg: "bg-slate-100",
            image: ,
            name: "",
            college: "CUNY Hunter College",
            subject: "Computer Science",
        },
        {
            bg: "bg-slate-100",
            image: ,
            name: "",
            college: "CUNY Hunter College",
            subject: "Computer Science",
        },
        {
            bg: "bg-slate-100",
            image: ,
            name: "",
            college: "CUNY Hunter College",
            subject: "Computer Science",
        },
        {
            bg: "bg-slate-100",
            image: ,
            name: "",
            college: "CUNY Hunter College",
            subject: "Computer Science",
        },
        
    ];
    return (
        <section>
            <div className="flex justify-center items-center">
                <h1 className="flex justify-start items-center text-[3vw] font-light mr-4">
                    Real Professors in Real-Time
                </h1>
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
                            className={`${card.bg} flex-shrink-0 rounded-xl w-[18vw] h-[40vh] flex flex-col items-center`}
                        >
                            <Image
                                src={card.image}
                                alt={`${card.name} Image`}
                                width={100}
                                height={100}
                                className="rounded-full w-[10vw] h-[19vh] my-[2vh] bg-white"
                            />
                            <h1 className="text-[1.5vw] font-semibold">{card.name}</h1>
                            <h2 className="text-[1vw] italic">{card.college}</h2>
                            <p className="text-[1vw]">{card.subject}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ProfCarousel