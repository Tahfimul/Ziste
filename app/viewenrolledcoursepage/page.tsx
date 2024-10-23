//sources:
//1. https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
//2. ChatGPT
'use client'
import Navbar from "../../components/Navbar2";
import VideoCall from '../../components/VideoCall'

const page = () =>
{

 
    
    return (
        <>
        <Navbar/>
        <h1>Welcome to the dashboard!</h1>
        <VideoCall/>
        </>
        
    );
}

export default page;