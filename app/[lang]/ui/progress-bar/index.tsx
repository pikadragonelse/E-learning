"use client";

import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { formatTime } from "../../lib/utils/formatTime";
import axios from "axios";
// import fs from "fs-extra";

interface FileItem {
    time: string;
    path: string;
}

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
    const [isShowPreview, setIsShowPreview] = useState(false);
    const [positionTime, setPositionTime] = useState(0);

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

    const [srPreviewImg, setSrcPreviewImg] = useState("");
    const handlePreview = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (
            containerRef != null &&
            containerRef.current != null &&
            event != null &&
            videoRef != null &&
            videoRef.current != null
        ) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const width = rect.width;
            const time = formatTime(
                Number(((x / width) * videoRef.current.duration).toFixed())
            );

            setSrcPreviewImg(time);
            setPositionTime(Number(((x / width) * rect.width).toFixed()));
        }
    };

    return (
        <>
            <p
                className={`absolute top-[-2rem] text-sm text-zinc-50 py-1 bg-zinc-800/70`}
                style={{
                    left: positionTime - 24,
                }}
                hidden={!isShowPreview}
            >
                {srPreviewImg}
            </p>
            <div className={`progress-bar-container ${className}`}>
                <div
                    ref={containerRef}
                    className={`progress-bar relative`}
                    onMouseMove={(event) => {
                        handlePreview(event);
                    }}
                    onMouseEnter={() => {
                        setIsShowPreview(true);
                    }}
                    onMouseLeave={() => {
                        setIsShowPreview(false);
                    }}
                    onClick={(e) => {
                        handleClickProgress(e);
                    }}
                >
                    <div
                        className="progress-bar-line progress-bar-line-loaded"
                        style={{ width: `${loadedSeconds}%` }}
                    ></div>
                    <div
                        className="progress-bar-line bg-orange-700"
                        style={{ width: `${percent}%` }}
                    ></div>
                </div>
            </div>
        </>
    );
};
