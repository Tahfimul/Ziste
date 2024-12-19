import WordScroll from "./wordScroll";
import Spline from '@splinetool/react-spline';



const Hero = () => {
    return (
        <section id="hero" className="bg-white w-screen h-screen">
            <div className="flex justify-center items-center ">
                <h1 className="flex justify-start items-center text-[3vw] font-light mr-4"><i>Zíste means</i></h1><WordScroll/>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex flex-col justify-start ml-[12vw]">
                    <h2 className="text-[2vw] w-[32vw]">Go Back to the <span className=" text-[#E07A5F]">Heart</span> of Learning</h2>
                    <p className="flex justify-start w-[30vw] text-[1.2vw] mt-[1.5vh]">We believe learning doesn’t have to stop once you leave the classroom.
                    Jump Back into the Tried and True, all from the comfort of your home.</p>
                </div>
                <div className="relative left-10 top-0 h-[80vh] w-[50vw]">
                <Spline
                scene="https://prod.spline.design/SRI17JtCSi-VtZVI/scene.splinecode" 
                />
                </div>
            </div>

        </section>
    );
}

export default Hero