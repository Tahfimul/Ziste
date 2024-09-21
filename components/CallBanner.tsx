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

    const toggleMuted = ()=>{setMuted(!muted)}

    return (
        <div className="bg-ziste-blue max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="text-ziste-hazel font-bold text-xl mb-2">{title}</div>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button onClick={toggleMuted} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    
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
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div>
        </div>
    )
}

export default CallBanner