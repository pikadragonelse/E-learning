"use client";

import React, { useEffect, useRef, useState } from "react";
import "./index.scss";

export interface HandleClickProgressProps {
    event?: React.MouseEvent<HTMLDivElement, MouseEvent>;
    ref?: React.RefObject<HTMLDivElement>;
}

export type ProgressBar = {
    loadedSeconds?: number;
    videoPercent?: number;
    className?: string;
    duration?: number;
    videoRef: React.RefObject<HTMLVideoElement> | null;
    setIsVideoLoading?: (props?: any) => void;
};
export const ProgressBar = ({
    className,
    duration = 1,
    videoRef = null,
    videoPercent = 0,
    loadedSeconds = 0,
    setIsVideoLoading = () => {},
}: ProgressBar) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        setPercent(videoPercent);
    }, [videoPercent]);

    const handleClickProgress = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (
            containerRef != null &&
            containerRef.current != null &&
            event != null &&
            videoRef != null &&
            videoRef?.current != null
        ) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const width = rect.width;
            setPercent((x / width) * 100);
            videoRef.current.currentTime =
                (x / width) * videoRef.current.duration;
            if (!videoRef.current.paused) {
                setIsVideoLoading(true);
            }
        }
    };

    return (
        <div className={`progress-bar-container ${className}`}>
            <div
                ref={containerRef}
                className={`progress-bar`}
                onClick={(e) => {
                    handleClickProgress(e);
                }}
            >
                <div
                    className="progress-bar-line progress-bar-line-loaded"
                    style={{ width: `${loadedSeconds}%` }}
                ></div>
                <div
                    className="progress-bar-line bg-orange-600"
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
        </div>
    );
};
