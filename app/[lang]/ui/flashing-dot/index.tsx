import React from "react";
import "./index.css";

export const FlashingDot = () => {
    return (
        <div className="flex space-x-2">
            <div className="dot  bg-zinc-600 rounded-full w-2 h-2"></div>
            <div className="dot bg-zinc-600 rounded-full w-2 h-2"></div>
            <div className="dot bg-zinc-600 rounded-full w-2 h-2"></div>
        </div>
    );
};
