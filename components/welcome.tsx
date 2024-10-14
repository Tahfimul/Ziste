import Logo from '@/app/assets/logo.png';
import Image from 'next/image';
import { useSession } from "next-auth/react";
{/** import { song_myung } from '@/app/fonts/fonts'; **/}


const App = () => {
    const { data: session } = useSession();
    return (
        <header className=" bg-white sticky h-7/8 w-full">
        
        <div className="pt-16">
            <h1 className="flex mx-auto justify-center px-5 text-8xl font-extralight text-transparent bg-clip-text"
            style={{
                background: 'linear-gradient(to bottom, #6E739E, #3D405B, #3D405B)',
                backgroundSize: '40% 80%',
                backgroundPosition: 'center',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
              }}>Welcome</h1>
            <h2 className="flex mx-auto justify-center px-5 text-7xl font-light text-transparent bg-clip-text"
            style={{
                background: 'linear-gradient(to bottom, #6E739E, #3D405B, #3D405B)',
                backgroundSize: '40% 80%',
                backgroundPosition: 'center',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
              }}>To</h2>
            <h3 className="flex mx-auto justify-center px-5 text-9xl font-semibold text-transparent bg-clip-text"
            style={{
                background: 'linear-gradient(to right, #E07A5F, #81B29A, #3D405B)',
                backgroundSize: '25% 25%',
                backgroundPosition: 'center',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
              }}>Zíste</h3>
        </div>

        <div className='flex pt-16 pb-6 mx-auto justify-center gap-28'>
            {session?.user ? 
                (<></>):
                (<div>
                    <a href="/">
                        <button className='flex font-semibold shadow-md rounded-full px-9 py-4 text-2xl text-white bg-gradient-to-r from-[#81B29A] via-[#aed2c1] to-[#81B29A]'>
                            Sign In
                        </button>
                    </a>
                </div>)
            }
            

    {/** Static Logo Image btwn SignIn & Browse Buttons **/}
            <div className='flex top-1 items-center'>
                <Image src={Logo} alt="Logo" height={100} width={100}></Image>
            </div>

            <div>
                <a href="/catalog">
                    <button className='flex font-semibold shadow-md rounded-full px-6 py-4 text-2xl text-white bg-gradient-to-r from-[#E07A5F] via-[#f7b29e] to-[#E07A5F]'>
                        Browse
                    </button>
                </a>
            </div>
        </div>
        
        <div className='flex py-5 pb-40 mx-auto justify-center text-black text-xl'>
            <p>Learn More</p>
            {/**<Image src= "app/assets/reshot-chevron-arrow-down-circle.svg" alt="Down Arrow" height={20} width={20}></Image>**/}

        </div>
        
        </header>

    );
};

export default App