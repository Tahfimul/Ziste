'use client'
import React, { useRef, useEffect, useState } from "react";


type Pizza = 
{
  id: number,
  name: string,
  price: number
}

const menu:Pizza[] = [
  {id:0, name:"Cheese", price:3},
  {id:1, name:"Veggie", price: 5},
  {id:2, name:"Margaritta", price: 7}
]

function getPizzaDetails(indentifier:number|string)
{
  
  if(typeof indentifier === "number")
  {
    return menu.find(pizza => pizza.id===indentifier)
  }
  else if(typeof indentifier === "string")
  {
    console.log(menu.find(pizza=>pizza.name.toLowerCase()===indentifier.toLowerCase()))
    return menu.find(pizza=>pizza.name.toLowerCase()===indentifier.toLowerCase())
  }
}

getPizzaDetails("a")

const page = () =>
{

    const videoRef = useRef<any>(null);
  const [captureStream, setCaptureStream] = useState<any>(null);

  const displayMediaOptions = {
    video: {
      displaySurface: "browser",
    },
    audio: {
      suppressLocalAudioPlayback: false,
    },
    preferCurrentTab: false,
    selfBrowserSurface: "exclude",
    systemAudio: "include",
    surfaceSwitching: "include",
    monitorTypeSurfaces: "include",
  };

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      setCaptureStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

  const stopCapture = () => {
    if (captureStream) {
      captureStream.getTracks().forEach(track => track.stop());
      setCaptureStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null; // Clear the video element
      }
    }
  };

  useEffect(() => {
   

    return () => {
      // Cleanup the stream when the component unmounts
      if (captureStream) {
        captureStream.getTracks().forEach(track => track.stop());
      }
    };

  }, [captureStream]);
    
    return (
        <>
        <h1>Welcome to the dashboard!</h1>
        <button className={`${captureStream ? 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded': 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}`} onClick={startCapture} disabled={captureStream}>Start Screen Capture</button>
        <button className={`${!captureStream ? 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded': 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}`} onClick={stopCapture} disabled={!captureStream}>Stop Screen Capture</button>
        <video ref={videoRef} autoPlay style={{ width: "100%", height: "auto" }} />

        </>
        
    );
}

export default page;