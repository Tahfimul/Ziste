'use client'
import React, { useEffect } from "react";

const page = ()=>
{
    // Listen for messages from parent window
    useEffect(() => {
        const messageListener = (event: MessageEvent) => {
        if (event.data.close !== undefined) {
            window.close();
        }
        };

        window.addEventListener('message', messageListener);

        // Clean up listener when component unmounts
        return () => {
        window.removeEventListener('message', messageListener);
        };
    }, []);

    return(
        <h1>
            Welcome to Enlarged Window.
        </h1>
    )
}

export default page