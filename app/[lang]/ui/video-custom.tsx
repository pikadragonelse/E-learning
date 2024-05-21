"use client";

import React, { useEffect, useRef, useState } from "react";
import { ProgressBar } from "./progress-bar";
import { ControlPlayer } from "./control-player";
import clsx from "clsx";
import { CaretRightOutlined, LoadingOutlined } from "@ant-design/icons";
import screenfull from "screenfull";

export type VideoCustom = {
    refresh?: number;
    videoSource?: string;
    onProgress?: (time: number) => void;
};
export const VideoCustom: React.FC<VideoCustom> = ({
    refresh,
    videoSource = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    onProgress = () => {},
}) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [loadedSecondsVideo, setLoadedSecondsVideo] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoading, setIsVideoLoading] = useState(false);

    useEffect(() => {
        onProgress(videoRef.current?.currentTime || 0);
    }, [videoRef.current?.currentTime]);

    useEffect(() => {
        setCurrentTime(0);
        if (videoRef.current != null && videoRef != null) {
            videoRef.current.currentTime = 0;
            videoRef.current.pause();
        }
    }, [refresh]);

    const updateBuffered = (
        event: React.SyntheticEvent<HTMLVideoElement, Event>
    ) => {
        const video = event.currentTarget;
        for (let i = 0; i < video.buffered.length; i++) {
            if (
                video.buffered.start(video.buffered.length - 1 - i) <
                video.currentTime
            ) {
                setLoadedSecondsVideo(
                    (video.buffered.end(video.buffered.length - 1 - i) * 100) /
                        video.duration
                );
                break;
            }
        }
    };

    const [isShowControl, setIsShowControl] = useState(false);
    const containerVideoRef = useRef<HTMLDivElement>(null);

    let timer: NodeJS.Timeout;
    const timeout = function () {
        if (videoRef.current?.paused === false) {
            setIsShowControl(false);
        }
    };

    useEffect(() => {
        const handleMouseStill = () => {
            setIsShowControl(true);
            clearTimeout(timer);
            timer = setTimeout(timeout, 2000);
        };
        if (containerVideoRef.current != null) {
            containerVideoRef.current.addEventListener(
                "mousemove",
                handleMouseStill
            );
        }
        return () => {
            if (containerVideoRef.current != null)
                containerVideoRef.current?.removeEventListener(
                    "mousemove",
                    handleMouseStill
                );
        };
    }, []);

    const [isFullScreen, setIsFullScreen] = useState(false);
    const fullscreenHandler = () => {
        if (containerVideoRef.current != null) {
            screenfull.toggle(containerVideoRef.current);
            setIsFullScreen((prev) => !prev);
        }
    };

    const [trackMode, setTrackMode] = useState<
        "hidden" | "disabled" | "showing"
    >("hidden");
    const trackRef = useRef<HTMLTrackElement>(null);
    const handleSetTrackMode = () => {
        if (trackRef != null && trackRef.current != null) {
            if (trackMode === "showing") {
                setTrackMode("hidden");
            } else {
                setTrackMode("showing");
            }
        }
    };
    useEffect(() => {
        if (trackRef.current != null && trackRef != null) {
            trackRef.current.track.mode = trackMode;
        }
    }, [trackMode]);

    useEffect(() => {
        if (videoRef.current != null) {
            videoRef.current.load();
        }
    }, [videoSource]);

    return (
        <div className="text-zinc-800 w-full">
            <div className="relative w-full flex" ref={containerVideoRef}>
                <video
                    ref={videoRef}
                    width="100%"
                    height="100%"
                    onProgress={(e) => {
                        updateBuffered(e);
                    }}
                    onPlaying={() => {
                        setIsVideoLoading(false);
                    }}
                    onTimeUpdate={(e) => {
                        if (videoRef.current?.duration != null) {
                            setCurrentTime(
                                (e.currentTarget.currentTime * 100) /
                                    videoRef.current?.duration
                            );
                        }
                    }}
                    className=""
                >
                    <source src={videoSource} type="video/mp4" />
                    <track
                        ref={trackRef}
                        src="/sample.vtt"
                        default
                        kind="captions"
                    />
                </video>

                <div
                    className={clsx(
                        "w-full h-full transition-all absolute top-0 flex items-center justify-center duration-200 to-black from-transparent bg-gradient-to-b ",
                        {
                            "opacity-60": isShowControl,
                            "opacity-0": !isShowControl,
                        }
                    )}
                    onClick={() => {
                        if (videoRef != null && videoRef.current != null) {
                            videoRef.current.paused || videoRef.current.ended
                                ? videoRef.current
                                      .play()
                                      .catch((error) => console.log(error))
                                : videoRef.current.pause();
                        }
                    }}
                >
                    <CaretRightOutlined
                        className={clsx(
                            "text-3xl sm:text-5xl text-zinc-50 absolute cursor-pointer bg-zinc-700 rounded-full p-3 z-10 ",
                            {
                                hidden:
                                    !videoRef.current?.paused || isVideoLoading,
                            }
                        )}
                    />
                    <LoadingOutlined
                        className={clsx(
                            "text-3xl sm:text-5xl absolute text-zinc-50 z-10 bg-black rounded-full p-3",
                            { hidden: !isVideoLoading }
                        )}
                    />
                </div>
                <div
                    className={clsx(
                        "absolute bottom-0 left-0 right-0 mx-4 py-4",
                        {
                            "opacity-100": isShowControl,
                            "opacity-0": !isShowControl,
                        }
                    )}
                >
                    <div className="video-progress relative flex items-center">
                        <ProgressBar
                            duration={videoRef.current?.duration}
                            className="w-full"
                            videoRef={videoRef}
                            videoPercent={currentTime}
                            loadedSeconds={loadedSecondsVideo}
                            setIsVideoLoading={setIsVideoLoading}
                        />
                    </div>
                    <ControlPlayer
                        videoRef={videoRef}
                        className="w-full"
                        fullscreenHandler={fullscreenHandler}
                        isFullscreen={isFullScreen}
                        setTrackMode={handleSetTrackMode}
                        trackMode={trackMode}
                    />
                </div>
            </div>
        </div>
    );
};
