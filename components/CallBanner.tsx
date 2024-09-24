//sources: 
//1. https://v1.tailwindcss.com/components/cards
//2. Figma.com
//3. ChatGPT

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type User =
{
    name:string
}

const dummyUsersQueue:User[] =[
    {name: 'James'},
    {name: 'Karol'},
    {name: 'Roger'},
    {name: 'Kevin'}
] 


type props =
{
    title:string,
    callEndCallback:Function
}

const CallBanner = ({title, callEndCallback}:props)=>
{
    const [muted, setMuted] = useState<boolean>(true)
    const [cameraOn, setCameraOn] = useState<boolean>(false)
    const [screenSharing, setScreenSharing] = useState<boolean>(false)
    const [windowEnlarged, setWindowEnlarged] = useState<boolean>(false)
    const enlargedWindow = useRef<Window|null>(null);

    const toggleMuted = ()=>{
        if(enlargedWindow.current)
            enlargedWindow.current.postMessage({toggle:'mute', val:!muted},'*')
        setMuted(!muted)
    }
    const toggleCamera = ()=>{
        if(enlargedWindow.current)
            enlargedWindow.current.postMessage({toggle:'camera', val:!cameraOn},'*')
        
        setCameraOn(!cameraOn)
    }
    const toggleScreenShare= ()=>{
        if(enlargedWindow.current)
            enlargedWindow.current.postMessage({toggle:'screenShare', val:!screenSharing},'*')
        setScreenSharing(!screenSharing)
    }

    const toggleEnlargeWindow = ()=>{
        if(!windowEnlarged)
        {
            openEnlargedWindow()
        }
        else
        {
            closeEnlargedWindow()
        }
    
        setWindowEnlarged(!windowEnlarged)
       
      
    }

    const openEnlargedWindow = ()=>
    {
        enlargedWindow.current = window.open(
            '/enlargedcall', 
            'Enlarged Window',
            'width=400,height=400'
          );

    }

    const closeEnlargedWindow = ()=>
    {
        if(enlargedWindow.current)
        {
            enlargedWindow.current.postMessage({closeWindow:true},'*')
        }

        setWindowEnlarged(false)
    }

    const leaveCall = ()=>
    {
        closeEnlargedWindow();
        if(callEndCallback)
            callEndCallback();
    }

    const sendParticipants = async ()=>
    {
        if (enlargedWindow.current)
            {
                enlargedWindow.current.postMessage({participants: dummyUsersQueue}, '*')
                const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
                await sleep(2000);
                enlargedWindow.current.postMessage({participants: dummyUsersQueue}, '*')
            }  
    }

    useEffect(()=>{
        const messageListener = (event: MessageEvent) => {
            if (event.data.request === 'title') {
               
              if(enlargedWindow.current)
                enlargedWindow.current.postMessage({title: 'Test Title'},'*')
            }

            if (event.data.request === 'muteState')
            {
                if(enlargedWindow.current)
                    enlargedWindow.current.postMessage({muteState:muted},'*')
            }

            if (event.data.request === 'cameraState')
            {
                if(enlargedWindow.current)
                    enlargedWindow.current.postMessage({cameraState:cameraOn},'*')
            }

            if (event.data.request === 'screenShareState')
            {
                if(enlargedWindow.current)
                    enlargedWindow.current.postMessage({screenShareState:screenSharing},'*')
            }

            if (event.data.request === 'leaveCall')
            {
                callEndCallback()
            }

            if (event.data.request === 'participants')
            {
                sendParticipants()
                 
                    

                // dummyUsersQueue.length = 0

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
                    case 'enlargeCallClosed':
                        setWindowEnlarged(false)
                        break
                }
            }
          };

          const windowCloseListener = ()=>
          {
                leaveCall()
          };

          window.addEventListener('message', messageListener);          
          window.addEventListener('beforeunload', windowCloseListener);

          // Clean up listener when component unmounts
          return () => {
            window.removeEventListener('message', messageListener);
          };
    },[muted, cameraOn, screenSharing])

    
    return (
        <div className="bg-ziste-blue max-w-sm rounded overflow-hidden shadow-lg">
            <div className="flex flex-row v-screen">
                <div className="w-3/4 px-6 py-4">
                    <div className="text-ziste-hazel font-bold text-xl mb-2">{title}</div>
                </div>
                <div className="w-auto px-6 py-4">
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

                
                <button onClick={leaveCall} className="h-12 inline-block bg-gray-200 rounded-full px-3 py-1 text-lg font-semibold text-gray-700 mr-2 mb-2">
                    
                    <svg width="43" height="43" viewBox="0 0 47 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 2.5L45 35" stroke="#3D405B" stroke-width="5"/>
                        <path d="M45 2.5L2.5 35.5" stroke="#3D405B" stroke-width="5"/>
                    </svg>

                </button>
            </div>
        </div>
    )
}

export default CallBanner