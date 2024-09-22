//sources: 
//1. Tailwind CSS
//2. ChatGPT 
'use client'
import React, { useEffect, useRef, useState } from "react";

const page = ()=>
{
    const [title, setTitle] = useState<string|undefined>(undefined)
    const [muted, setMuted] = useState<boolean>(true)
    const [cameraOn, setCameraOn] = useState<boolean>(false)
    const [screenSharing, setScreenSharing] = useState<boolean>(false)

    const toggleMuted = ()=>
    {
        if(window.opener)
        {
            window.opener.postMessage({ toggle: 'mute', val:!muted }, '*');

        }
        setMuted(!muted)
        
            
    }

    const toggleCamera = ()=>
    {
        if(window.opener)
            window.opener.postMessage({ toggle: 'camera', val:!cameraOn }, '*');

        setCameraOn(!cameraOn)
        
    }

    const toggleScreenShare = ()=>
    {
        if(window.opener)
            window.opener.postMessage({ toggle: 'screenShare', val: !screenSharing }, '*');

        setScreenSharing(!screenSharing)
       
    }

    // Listen for messages from parent window
    useEffect(() => {
        const messageListener = (event: MessageEvent) => {
            if (event.data.closeWindow !== undefined) {
                window.close();
            }

            if (event.data.title !== undefined)
            {
                setTitle(event.data.title)
            }

            if (event.data.toggle)
                {
                    switch(event.data.toggle)
                    {
                        case 'mute':
                            if(event.data.val !== 'undefined')
                            {
                                setMuted(event.data.val)
                            }
                                
                            break
                        case 'camera':
                            if(event.data.val !== 'undefined')
                            {
                                setCameraOn(event.data.val)
                            }
                            break
                        case 'screenShare':
                            if(event.data.val !== 'undefined')
                            {
                                setScreenSharing(event.data.val)
                            }
                            break
                    }
                }
        };

        const windowCloseListener = ()=>{
            if(window.opener)
                window.opener.postMessage({ toggle: 'enlargeCallClosed' }, '*');
        };
        

        window.addEventListener('message', messageListener);
        window.addEventListener('beforeunload', windowCloseListener);
        if(typeof title === 'undefined')
            if(window.opener)
                window.opener.postMessage({ request: 'title' }, '*');
        
        // Clean up listener when component unmounts
        return () => {
            window.removeEventListener('message', messageListener);
            window.removeEventListener('beforeunload', windowCloseListener);
        };
    }, []);

    const leaveCall = ()=>
    {
        if(window.opener)
            window.opener.postMessage({request: 'leaveCall'}, '*')
        window.close()
        
    }
    
    return(
        <>
            
            <div className="flex flex-col h-screen">
                <div className="h-auto">
                    <div className="text-ziste-blue font-bold text-xl mb-2">{title}</div>
                </div>

                <div className="h-full bg-ziste-blue w-full rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4 ">
                        <div className="text-ziste-hazel font-bold text-xl mb-2">{title}</div>
                    </div>
                </div>                
           
                <div className="h-auto">
                    <div className="flex flex-row v-screen">
                        <div className="w-auto">
                            <div className="text-ziste-blue font-bold">test</div>
                        </div>
                        <div className="w-auto">
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
                        </div>
                        <div className="w-auto">
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
                        </div>
                        <div className="w-auto">
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
                        </div>
                        <div className="w-auto">
                            <button onClick={leaveCall} className="h-12 inline-block bg-gray-200 rounded-full px-3 py-1 text-lg font-semibold text-gray-700 mr-2 mb-2">
                        
                                <svg width="43" height="43" viewBox="0 0 47 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 2.5L45 35" stroke="#3D405B" stroke-width="5"/>
                                    <path d="M45 2.5L2.5 35.5" stroke="#3D405B" stroke-width="5"/>
                                </svg>

                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default page