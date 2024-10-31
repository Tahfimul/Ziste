"use client";

import React from "react";

interface RegisterProgressProps {
    step: number;
}

const RegisterProgress = ({ step }: RegisterProgressProps) => {
    const SELECTED = "#81B29A";
    const UNSELECTED = "#D9D9D9";

    console.log("This is the step :", step);

    return (
        <div className="flex flex-row gap-12 justify-center mt-10">
            <div
                className="h-4 w-16 rounded-xl"
                style={{
                    backgroundColor: step >= 1 ? SELECTED : UNSELECTED,
                }}
            ></div>
            <div
                className="h-4 w-16 rounded-xl"
                style={{
                    backgroundColor: step >= 2 ? SELECTED : UNSELECTED,
                }}
            ></div>
            <div
                className="h-4 w-16 rounded-xl"
                style={{
                    backgroundColor: step >= 3 ? SELECTED : UNSELECTED,
                }}
            ></div>
        </div>
    );
};

export default RegisterProgress;
