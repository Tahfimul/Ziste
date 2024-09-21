'use client'
import React, { useEffect, useState } from "react";

const page = ()=>
{
    const [title, setTitle] = useState<string|undefined>(undefined)


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
        };

        window.addEventListener('message', messageListener);
        
        if(typeof title === 'undefined')
            if(window.opener)
                window.opener.postMessage({ request: 'title' }, '*');

        // Clean up listener when component unmounts
        return () => {
            window.removeEventListener('message', messageListener);
        };
    }, []);



    return(
        <h1>
            {title}
        </h1>
    )
}

export default page