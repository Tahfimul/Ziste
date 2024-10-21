
import Logo from '@/app/assets/logo.svg';
import DownCircleArrow from '@/app/assets/reshot-chevron-arrow-down-circle.svg';
import Image from 'next/image';
import { useSession } from "next-auth/react";

import React from "react";
import Signin from "./Signin";
import { AnimatePresence } from "framer-motion";

const App = () => {
    const [viewSignin, setViewSignin] = React.useState<boolean>(false);

    const { data: session } = useSession();
    return (
        <header className=" bg-white h-screen w-screen relative z-0">

            <AnimatePresence>
                {viewSignin && <div className='absolute inset-0 z-40'><Signin setViewSignin={setViewSignin} /></div>}
            </AnimatePresence>

        {/** top-right gradient blob svg + animation */}
        <div className="absolute -right-0 -top-1">
        <svg width="549" height="509" viewBox="0 0 549 509" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M294.998 170C252.366 133.484 170.5 184.547 106.999 163.5C19.5 134.5 -14.4862 33.7469 6.49704 0.691351H548.997V508.5C548.997 508.5 505.537 396.95 478.998 383C439.998 362.5 398.998 368.5 373.998 362.5C309.864 347.108 345.206 213.005 294.998 170Z" fill="url(#paint0_radial_222_3)">
        <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            keyTimes="0;0.25;0.5;0.75;1"
            values="
                    M294.998 170C252.366 133.484 170.5 184.547 106.999 163.5C19.5 134.5 -14.4862 33.7469 6.49704 0.691351H548.997V508.5C548.997 508.5 505.537 396.95 478.998 383C439.998 362.5 398.998 368.5 373.998 362.5C309.864 347.108 345.206 213.005 294.998 170Z;
                    M294.998 170C252.366 133.484 180.5 174.547 106.999 163.5C19.5 134.5 -14.4862 40.7469 6.49704 0.691351H548.997V508.5C548.997 508.5 505.537 396.95 478.998 383C439.998 362.5 398.998 368.5 373.998 362.5C309.864 347.108 355.206 223.005 294.998 170Z;
                    M294.998 170C252.366 133.484 170.5 184.547 106.999 153.5C19.5 134.5 -14.4862 50.7469 6.49704 0.691351H548.997V508.5C548.997 508.5 505.537 396.95 478.998 383C439.998 362.5 398.998 368.5 373.998 362.5C309.864 347.108 335.206 203.005 294.998 170Z;
                    M294.998 170C252.366 143.484 170.5 184.547 106.999 163.5C19.5 134.5 -14.4862 30.7469 6.49704 0.691351H548.997V508.5C548.997 508.5 505.537 396.95 478.998 383C439.998 362.5 398.998 368.5 373.998 362.5C309.864 357.108 345.206 213.005 294.998 170Z;
                    M294.998 170C252.366 133.484 170.5 184.547 106.999 163.5C19.5 134.5 -14.4862 33.7469 6.49704 0.691351H548.997V508.5C548.997 508.5 505.537 396.95 478.998 383C439.998 362.5 398.998 368.5 373.998 362.5C309.864 347.108 345.206 213.005 294.998 170Z
                "
        />
        </path>

        <radialGradient id="paint0_radial_222_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(56.5 113.5) rotate(10.6834) scale(717.436 543.637)">
        <stop offset="0.232391" stop-color="#E07A5F" stop-opacity="0.75"/>
        <stop offset="0.514703" stop-color="#F2CC8F" stop-opacity="0.75"/>
        <stop offset="0.82772" stop-color="#81B29A" stop-opacity="0.75"/>
        </radialGradient>
    
        </svg>
        </div>
        {/** END OF top-right gradient blob svg + animation */}

        {/** bottom-right gradient blob svg + animation */}
        <div className="absolute z-1 -right-0 bottom-0 overflow-hidden">
        <svg width="700" height="617" viewBox="0 0 700 617" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M89.5 545.504C51.3011 566.305 0.5 617 0.5 617H700V0C700 0 657.935 169.583 641 181.5C614 200.5 554.457 201.208 518 225.5C467.225 259.333 511.58 415.303 451 420.5C396.119 425.208 412.811 403.022 358 408.5C308.606 413.437 308.769 530.65 261.355 545.504C213.154 560.605 133.933 521.309 89.5 545.504Z" fill="url(#paint0_radial_244_3)">
        <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            keyTimes="0;0.25;0.5;0.75;1"
            values="
                    M89.5 545.504C51.3011 566.305 0.5 617 0.5 617H700V0C700 0 657.935 169.583 641 181.5C614 200.5 554.457 201.208 518 225.5C467.225 259.333 511.58 415.303 451 420.5C396.119 425.208 412.811 403.022 358 408.5C308.606 413.437 308.769 530.65 261.355 545.504C213.154 560.605 133.933 521.309 89.5 545.504Z;
                    M89.5 545.504C51.3011 566.305 0.5 617 0.5 617H700V0C700 0 657.935 179.583 641 190.5C614 210.5 554.457 210.208 518 235.5C467.225 259.333 511.58 405.303 451 420.5C396.119 425.208 412.811 393.022 358 398.5C308.606 413.437 308.769 530.65 261.355 545.504C213.154 570.605 133.933 531.309 89.5 545.504Z;
                    M89.5 545.504C51.3011 566.305 0.5 617 0.5 617H700V0C700 0 657.935 169.583 641 181.5C614 200.5 554.457 201.208 518 220.5C467.225 259.333 511.58 415.303 451 415.5C396.119 420.208 412.811 413.022 358 408.5C308.606 423.437 308.769 540.65 261.355 545.504C213.154 550.605 133.933 521.309 89.5 545.504Z;
                    M89.5 545.504C51.3011 566.305 0.5 617 0.5 617H700V0C700 0 657.935 169.583 641 181.5C614 220.5 554.457 201.208 518 225.5C467.225 259.333 511.58 425.303 451 420.5C396.119 425.208 412.811 400.022 358 408.5C308.606 413.437 308.769 530.65 261.355 545.504C213.154 560.605 133.933 521.309 89.5 545.504Z;
                    M89.5 545.504C51.3011 566.305 0.5 617 0.5 617H700V0C700 0 657.935 169.583 641 181.5C614 200.5 554.457 201.208 518 225.5C467.225 259.333 511.58 415.303 451 420.5C396.119 425.208 412.811 403.022 358 408.5C308.606 413.437 308.769 530.65 261.355 545.504C213.154 560.605 133.933 521.309 89.5 545.504Z
                "
            />
        </path>
        
        <radialGradient id="paint0_radial_244_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(700.001 617) rotate(-168.204) scale(555.225 624.87)">
        <stop offset="0.392294" stop-color="#81B29A" stop-opacity="0.75"/>
        <stop offset="0.764316" stop-color="#6E739E" stop-opacity="0.75"/>
        <stop offset="1" stop-color="#3D405B" stop-opacity="0.75"/>
        </radialGradient>
        
        </svg>
        </div>
        {/** END OF bottom-right gradient blob svg + animation **/}

        {/** top-left gradient blob svg + animation **/}
        <div className="absolute top-0 left-0">
        <svg width="655" height="315" viewBox="0 0 655 315" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M134 224.5C84.1907 240.338 0 15 0 315V-100H700C700 -100 550.434 76.1692 471.5 92.5C389.799 109.403 334.579 41.7553 258.5 76C189.491 107.062 206.119 201.567 134 224.5Z" fill="url(#paint0_radial_245_4)">
        <animate
            attributeName="d"
            dur="3s"
            repeatCount="indefinite"
            keyTimes="0;0.25;0.5;0.75;1"
            values="
                    M134 224.5C84.1907 240.338 0 15 0 315V-100H700C700 -100 550.434 76.1692 471.5 92.5C389.799 109.403 334.579 41.7553 258.5 76C189.491 107.062 206.119 201.567 134 224.5Z;
                    M134 224.5C84.1907 250 0 5 0 315V-90H700C700 -100 550.434 86.1692 471.5 92.5C389.799 115 334.579 51.7553 258.5 70C189.491 117.062 206.119 210 134 224.5Z;
                    M134 224.5C84.1907 240.338 0 10 0 315V-100H700C700 -100 550.434 66.1692 471.5 85.5C389.799 103.403 334.579 38.7553 258.5 75C189.491 95.062 206.119 195.567 134 224.5Z;
                    M134 224.5C84.1907 220 0 15 0 315V-100H700C700 -100 550.434 76.1692 471.5 90.5C389.799 109.403 334.579 41.7553 258.5 76C189.491 117.062 206.119 190 134 224.5Z;
                    M134 224.5C84.1907 240.338 0 15 0 315V-100H700C700 -100 550.434 76.1692 471.5 92.5C389.799 109.403 334.579 41.7553 258.5 76C189.491 107.062 206.119 201.567 134 224.5Z
                "
            />
        </path>
  
        <radialGradient id="paint0_radial_245_4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(28 -2.00001) rotate(4.72688) scale(582.481 206.212)">
        <stop offset="0.00986366" stop-color="#E07A5F" stop-opacity="0.75"/>
        <stop offset="0.15235" stop-color="#F2CC8F" stop-opacity="0.75"/>
        <stop offset="0.569356" stop-color="#81B29A" stop-opacity="0.75"/>
        <stop offset="0.964827" stop-color="#6E739E" stop-opacity="0.75"/>
        </radialGradient>
        </svg>
        </div>
        {/** END OF top-left gradient blob svg + animation **/}

        {/** left (long) gradient blob svg + animation **/}
        <div className="absolute left-0 -top-8 bottom-0 overflow-hidden">
        <svg width="339" height="769" viewBox="0 0 339 769" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0V769H296C296 769 381.502 624.5 310 600C238.498 575.5 262.101 511.468 238.498 474C214.895 436.532 151.271 466 134 390.5C116.729 315 242.112 303.438 250 209.5C254.283 158.5 234.926 107.994 189.5 62C149.5 21.5 91.6806 0 61.6806 0H0Z" fill="url(#paint0_radial_222_4)">
        <animate
            attributeName="d"
            dur="5s"
            repeatCount="indefinite"
            keyTimes="0;0.25;0.5;0.75;1"
            values="
                    M0 0V769H296C296 769 381.502 624.5 310 600C238.498 575.5 262.101 511.468 238.498 474C214.895 436.532 151.271 466 134 390.5C116.729 315 242.112 303.438 250 209.5C254.283 158.5 234.926 107.994 189.5 62C149.5 21.5 91.6806 0 61.6806 0H0Z;
                    M0 0V769H296C296 769 381.502 624.5 310 600C238.498 575.5 262.101 511.468 238.498 464C214.895 426.532 151.271 486 134 390.5C116.729 335 242.112 283.438 250 219.5C254.283 178.5 234.926 157.994 189.5 72C149.5 41.5 91.6806 0 61.6806 0H0Z;
                    M0 0V769H296C296 769 381.502 624.5 310 590C238.498 565.5 262.101 511.468 238.498 474C214.895 446.532 151.271 496 134 390.5C116.729 315 242.112 293.438 250 209.5C254.283 158.5 234.926 107.994 189.5 62C149.5 21.5 91.6806 0 61.6806 0H0Z;
                    M0 0V769H296C296 769 381.502 624.5 310 610C238.498 575.5 262.101 511.468 238.498 474C214.895 436.532 151.271 466 134 390.5C116.729 315 242.112 313.438 250 219.5C254.283 158.5 234.926 107.994 189.5 72C149.5 21.5 91.6806 0 61.6806 0H0Z;
                    M0 0V769H296C296 769 381.502 624.5 310 600C238.498 575.5 262.101 511.468 238.498 474C214.895 436.532 151.271 466 134 390.5C116.729 315 242.112 303.438 250 209.5C254.283 158.5 234.926 107.994 189.5 62C149.5 21.5 91.6806 0 61.6806 0H0Z
                "
        />
        </path>
        <radialGradient id="paint0_radial_222_4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38 42.5) rotate(43.7602) scale(784.365 1740.59)">
        <stop offset="0.0776659" stop-color="#E07A5F" stop-opacity="0.75"/>
        <stop offset="0.388384" stop-color="#F2CC8F" stop-opacity="0.75"/>
        <stop offset="0.556908" stop-color="#81B29A" stop-opacity="0.75"/>
        </radialGradient>
        </svg>
        </div>
        {/** END OF left (long) gradient blob svg + animation */}

        {/** bottom-left gradient blob svg + animation **/}
        <div className="bottom-0" style={{ position: 'absolute', zIndex: -1 }}>
        <svg width="532" height="197" viewBox="0 0 532 197" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-0.000305176 197V82C-0.000305176 82 7.0224 -15.5145 73 3C134.699 27.8452 46.749 103.351 204.125 123.351C261.5 123.351 397.294 84.6501 462.5 91.9999C555.913 102.529 427.034 167 517.034 197H-0.000305176Z" fill="url(#paint0_radial_245_5)">
        <animate
            attributeName="d"
            dur="5s"
            repeatCount="indefinite"
            keyTimes="0;0.25;0.5;0.75;1"
            values="
            M-0.000305176 197V82C-0.000305176 82 7.0224 -15.5145 73 3C134.699 27.8452 46.749 103.351 204.125 123.351C261.5 123.351 397.294 84.6501 462.5 91.9999C555.913 102.529 427.034 167 517.034 197H-0.000305176Z;
            M-0.000305176 197V82C-0.000305176 85 7.0224 -10 73 3C134.699 35 46.749 90 204.125 130C261.5 130 397.294 90 462.5 100C555.913 110 427.034 180 517.034 197H-0.000305176Z;
            M-0.000305176 197V82C-0.000305176 75 7.0224 -15 63 5C134.699 30 46.749 120 204.125 125C261.5 115 397.294 85 462.5 90C555.913 100 427.034 160 517.034 197H-0.000305176Z;
            M-0.000305176 197V82C-0.000305176 82 7.0224 -20 79 2C134.699 45 46.749 110 204.125 120C261.5 130 397.294 80 462.5 95C555.913 105 427.034 170 517.034 197H-0.000305176Z;
            M-0.000305176 197V82C-0.000305176 82 7.0224 -15.5145 73 3C134.699 27.8452 46.749 103.351 204.125 123.351C261.5 123.351 397.294 84.6501 462.5 91.9999C555.913 102.529 427.034 167 517.034 197H-0.000305176Z
            "
        />
        </path>

        <radialGradient id="paint0_radial_245_5" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-3.73905e-05 183) rotate(-4.58835) scale(475.022 376.986)">
        <stop offset="0.15759" stop-color="#E07A5F" stop-opacity="0.75"/>
        <stop offset="0.417829" stop-color="#F2CC8F" stop-opacity="0.75"/>
        <stop offset="0.753341" stop-color="#6E739E" stop-opacity="0.75"/>
        <stop offset="0.998746" stop-color="#3D405B" stop-opacity="0.75"/>
        </radialGradient>
        </svg>
        </div>
        {/** END OF bottom-left gradient blob svg + animation **/}

        <div className="justify-center pt-36 mx-80" style={{
                background: 'linear-gradient(to right, #E07A5F, #F2CC8F, #81B29A, #6E739E, #3D405B)',
                backgroundSize: '50% 100%',
                backgroundPosition: 'center',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
              }}>
            <h3 className="flex mx-auto justify-center py-3 px-5 text-9xl font-semibold text-transparent bg-clip-text"
            >Zíste</h3>
        </div>

        <div className='flex pt-14 pb-6 mx-auto justify-center gap-28'>
            {session?.user ? 
                (<></>):
                (<div>
                        <button
                            className="flex font-semibold shadow-md rounded-full px-9 py-4 text-2xl text-white bg-gradient-to-r from-[#81B29A] via-[#aed2c1] to-[#81B29A]"
                            onClick={() => setViewSignin(true)}
                        >
                            Sign in
                        </button>
                 </div>)
            }
            {/** Static Logo Image btwn SignIn & Browse Buttons **/}

            <div className='flex top-1 items-center'>

                <Image src={Logo} alt="Logo" height={100} width={100}></Image>

            </div>
            
            <div>
                <a href="/catalog">
                    <button className="flex font-semibold shadow-md rounded-full px-6 py-4 text-2xl text-white bg-gradient-to-r from-[#E07A5F] via-[#f7b29e] to-[#E07A5F] transition-transform duration-250 ease-in-out transform hover:scale-105" 
                    style={{ position: 'relative', zIndex: 100 }}>
                        Browse
                    </button>
                </a>
            </div>
        </div>
        
        <div className='flex py-5 mx-auto justify-center text-black text-xl'>
            <a href="#hero" className="flex justify-center transition-transform duration-300 ease-in-out transform hover:scale-105">
                <button className="flex justify-center">
                    Learn More
                    <Image src={DownCircleArrow} alt="Down Arrow" height={28} width={28} className="ml-1"></Image>
                </button>
            </a>
            
        </div>
        </header>
    );
};

export default App;
