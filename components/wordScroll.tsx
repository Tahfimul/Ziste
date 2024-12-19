//function to cycle through 'Ziste means =' words for landing page component
'use client';
import React, { useState, useEffect } from 'react';

const WordScroll = () => {
  const words = ["Learning.", "Growing.", "Living.", "Exploring."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000); // Change word every 2 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [words.length]);

  return (
    <div className="flex flex-col items-center">
        <div className="relative w-[13vw] h-12 flex items-center justify-start">
            <div
                key={currentWordIndex}
                className="absolute transition-all ease-in-out duration-1000 transform translate-y-0 opacity-100 text-[3vw] font-bold"
            >
                {words[currentWordIndex]}
            </div>
        </div>
        <div className="w-full h-[0.5vh] bg-black"></div>
    </div>
  );
};

export default WordScroll;
