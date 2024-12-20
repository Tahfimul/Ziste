import Logo from '@/app/assets/logo.svg';
import Image from 'next/image';


export const Footer = () => {
    return (
        <>
        <div className="w-screen bg-white">
            <div className="flex flex-col justify-center px-[20vw] pb-[3vh] pt-[3vh]">
                <div className="flex justify-center gap-[0.5vw] mr-[3vw]">
                    <Image src={Logo} alt="Logo" width={30} height={30}></Image>
                    <h1 className="text-[2.5vw]">Zíste</h1>
                </div>
                <div className="flex flex-col justify-center my-[1vh]">
                    <div className="flex justify-center gap-[5vw]">
                        <button className="justify-center text-[#73779b] text-[1.5vw]"><a href="/contact">Contact Us </a></button>
                        <button className="justify-center text-[#73779b] text-[1.5vw]">Help</button>
                        <button className="justify-center text-[#73779b] text-[1.5vw]"><a href="/about">Learn More </a></button>
                        <button className="justify-center text-[#73779b] text-[1.5vw]"><a href="/legal">Legal </a></button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}