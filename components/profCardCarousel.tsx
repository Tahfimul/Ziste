import { motion } from "framer-motion";


const ProfCarousel = () => {
    return (
        <section>
            <div className="flex justify-center items-center">
                <h1 className="flex justify-start items-center text-[3vw] font-light mr-4">Real Professors in Real-Time</h1>
            </div>
            <div className="container">
                <motion.div className="flex justify-center items-center mt-[2vh] mb-[3vh] gap-[1.5vw] flex-none px-[1.7vw]"
                    animate={{translateX: "-50%",}}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop",

                    }}
                    >
                    <div className="flex-shrink-0 bg-slate-100 rounded-xl w-[15vw] h-[35vh]">
                        <div className="rounded-full"></div>
                    </div>
                    <div className="flex-shrink-0 bg-red-100 rounded-xl w-[15vw] h-[35vh]"></div>
                    <div className="flex-shrink-0 bg-blue-100 rounded-xl w-[15vw] h-[35vh]"></div>
                    <div className="flex-shrink-0 bg-green-100 rounded-xl w-[15vw] h-[35vh]"></div>
                    <div className="flex-shrink-0 bg-yellow-100 rounded-xl w-[15vw] h-[35vh]"></div>
                    <div className="flex-shrink-0 bg-pink-100 rounded-xl w-[15vw] h-[35vh]"></div>
                    <div className="flex-shrink-0 bg-slate-100 rounded-xl w-[15vw] h-[35vh]"></div>
                    <div className="flex-shrink-0 bg-red-100 rounded-xl w-[15vw] h-[35vh]"></div>
                    <div className="flex-shrink-0 bg-blue-100 rounded-xl w-[15vw] h-[35vh]"></div>
                    <div className="flex-shrink-0 bg-green-100 rounded-xl w-[15vw] h-[35vh]"></div>
                    <div className="flex-shrink-0 bg-yellow-100 rounded-xl w-[15vw] h-[35vh]"></div>
                    <div className="flex-shrink-0 bg-pink-100 rounded-xl w-[15vw] h-[35vh]"></div>

                    
                    
                </motion.div>
            </div>
        </section>
    );
}

export default ProfCarousel