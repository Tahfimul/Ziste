//sources:
//1. https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
//2. ChatGPT
'use client'
import {Navbar} from "../../components/Navbar";
import VideoCall from '../../components/VideoCall'
import AuthContextProvider from "@/components/contexts/AuthContextProvider";
import Chat from "@/components/Chat";
import CourseDashboard from "@/components/courseDashboard";
import '@/styles/globals.css'
import {Footer} from "@/components/Footer";

const page = () =>
{

 
    
    return (
        <AuthContextProvider>
            
            <Navbar/>
            <div className="mt-[12vh]">
                <VideoCall/>
                <CourseDashboard/>

                <div className="chatPage">
                    <div className="chatContainer">
                        <Chat/>
                    </div>
                </div>
            </div>
            <Footer />
        </AuthContextProvider>
        
    );
}

export default page;