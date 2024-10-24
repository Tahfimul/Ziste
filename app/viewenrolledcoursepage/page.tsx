//sources:
//1. https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
//2. ChatGPT
'use client'
import {Navbar} from "../../components/Navbar2";
import VideoCall from '../../components/VideoCall'
import AuthContextProvider from "@/components/contexts/AuthContextProvider";
import Chat from "@/components/Chat";
const page = () =>
{

 
    
    return (
        <AuthContextProvider>
            
            <Navbar/>
            <div className="mt-[12vh]">
                <VideoCall/>
                <Chat/>
            </div>
        </AuthContextProvider>
        
    );
}

export default page;