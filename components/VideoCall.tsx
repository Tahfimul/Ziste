import React, { useRef, useEffect, useState } from "react";
import CallBanner from './CallBanner'

const VideoCall = ()=>
{
    const [called, setCalled] = useState<boolean>(false)
    const videoRef = useRef<HTMLVideoElement>(null);
    const [captureStream, setCaptureStream] = useState<MediaStream | null>(null);
  
    const toggleCall = ()=>
    {
      setCalled(!called);
    }
  
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleCall}>{`${!called?'Start Call':'End Call'}`}</button>
            <button className={`${captureStream ? 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded': 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}`} onClick={startCapture} disabled={captureStream!==null}>Start Screen Capture</button>
            <button className={`${!captureStream ? 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded': 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}`} onClick={stopCapture} disabled={!captureStream}>Stop Screen Capture</button>
            {
            called? <CallBanner title="Test Title" callEndCallback={toggleCall}/>:<></>
            }
            <video ref={videoRef} autoPlay style={{ width: "100%", height: "auto" }} />
        
        </>

    );
}

export default VideoCall