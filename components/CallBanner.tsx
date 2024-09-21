//sources: 
//1. https://v1.tailwindcss.com/components/cards
//2. Figma.com
import React, { useState } from "react";
import Image from "next/image";

type props =
{
    title:string
}

const CallBanner = ({title}:props)=>
{
    const [muted, setMuted] = useState<boolean>(true)
    const [cameraOn, setCameraOn] = useState<boolean>(false)
    const [screenSharing, setScreenSharing] = useState<boolean>(false)
    const [windowEnlarged, setWindowEnlarged] = useState<boolean>(false)

    const toggleMuted = ()=>{setMuted(!muted)}
    const toggleCamera = ()=>{setCameraOn(!cameraOn)}
    const toggleScreenShare= ()=>{setScreenSharing(!screenSharing)}
    const toggleEnlargeWindow = ()=>{setWindowEnlarged(!windowEnlarged)}
    return (
        <div className="bg-ziste-blue max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="text-ziste-hazel font-bold text-xl mb-2">{title}</div>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button onClick={toggleMuted} className="h-12 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    
                    {muted?
                    
                    <svg width="43" height="43" viewBox="0 0 43 117" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 80H40M3 59V3H40V59H3Z" stroke="#3D405B" stroke-width="5"/>
                        <path d="M21 81V114" stroke="#3D405B" stroke-width="5"/>
                        <path d="M11 114H32" stroke="#3D405B" stroke-width="5"/>
                        <path d="M39.5 3.5L20.5 32.25L2.5 59.5" stroke="#3D405B" stroke-width="5"/>
                    </svg>
                    
                    :
                    <svg width="43" height="43" viewBox="0 0 43 117" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 80H40M3 59V3H40V59H3Z" stroke="#3D405B" stroke-width="5"/>
                        <path d="M21 81V114" stroke="#3D405B" stroke-width="5"/>
                        <path d="M11 114H32" stroke="#3D405B" stroke-width="5"/>
                    </svg>
                    
                    }

                </button>

                <button onClick={toggleCamera} className="h-12 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {
                        cameraOn?
                            
                            <svg width="43" height="33" viewBox="0 0 43 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2.5" y="2.5" width="38" height="28" stroke="#3D405B" stroke-width="5"/>
                                <circle cx="21.5" cy="16.5" r="6" stroke="#3D405B" stroke-width="5"/>
                            </svg>

                            :                        
                            
                            <svg width="43" height="33" viewBox="0 0 43 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2.5" y="2.5" width="38" height="28" stroke="#3D405B" stroke-width="5"/>
                                <circle cx="21.5" cy="16.5" r="6" stroke="#3D405B" stroke-width="5"/>
                                <path d="M39.5 4.5L4.5 29" stroke="#3D405B" stroke-width="5"/>
                            </svg>


                    }
                </button>

                <button onClick={toggleScreenShare} className="h-12 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {
                        screenSharing?
                            <svg width="43" height="33" viewBox="0 0 43 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2.5" y="2.5" width="38" height="28" stroke="#3D405B" stroke-width="5"/>
                                <path d="M29 16.5L17.75 24.7272L17.75 8.27276L29 16.5Z" fill="#3D405B"/>
                            </svg>
                            :                        
                            <svg width="43" height="33" viewBox="0 0 43 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2.5" y="2.5" width="38" height="28" stroke="#3D405B" stroke-width="5"/>
                                <path d="M29 16.5L17.75 24.7272L17.75 8.27276L29 16.5Z" fill="#3D405B"/>
                                <path d="M39 5.5L5 28.5" stroke="#3D405B" stroke-width="5"/>
                            </svg>

                    }
                </button>

                <button onClick={toggleEnlargeWindow} className="h-12 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {
                        windowEnlarged?
                            
                            <svg width="43" height="33" viewBox="0 0 43 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2.5" y="2.5" width="38" height="28" stroke="#3D405B" stroke-width="5"/>
                                <rect y="14" width="25" height="19" fill="#3D405B"/>
                                <rect y="14" width="25" height="19" stroke="#3D405B"/>
                            </svg>

                            :                        
                            
                            <svg width="43" height="33" viewBox="0 0 43 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2.5" y="2.5" width="38" height="28" stroke="#3D405B" stroke-width="5"/>
                                <rect x="2.5" y="16.5" width="20" height="14" stroke="#3D405B" stroke-width="5"/>
                            </svg>


                    }
                </button>
            </div>
        </div>
    )
}

export default CallBanner