//sources:
//1. https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
//2. ChatGPT
'use client'
import React, { useRef, useEffect, useState } from "react";
import VideoCall from '../../components/VideoCall'

const page = () =>
{

 
    
    return (
        <>
        <h1>Welcome to the dashboard!</h1>
        <VideoCall/>
        </>
        
    );
}

export default page;