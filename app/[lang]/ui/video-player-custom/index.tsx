"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { ControlPlayer } from "../control-player";
import "./index.scss";
import screenfull from "screenfull";
import { CaretRightOutlined, LoadingOutlined } from "@ant-design/icons";
import { Modal, Spin } from "antd";
import { usePathname } from "next/navigation";
import { VideoWatching } from "../../lib/model/video";

export interface VideoState {
    playing: boolean;
    muted: boolean;
    volume: number;
    played: number;
    seeking: boolean;
    buffer: boolean;
    loadedSeconds: number;
    playedSeconds: number;
}

export type VideoPlayerCustom = {
    sourceUrl?: string;
    posterUrl?: string;
    episodeId?: number | string;
    setSrcVideo?: (props?: any) => void;
    watchingVideoId?: number;
};
export const VideoPlayerCustom = ({
    sourceUrl,
    posterUrl,
    episodeId,
    setSrcVideo = () => {},
    watchingVideoId,
}: VideoPlayerCustom) => {
    const playerRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isShowControl, setIsShowControl] = useState(false);
    const [isLoadingHidden, setIsLoadingHidden] = useState(true);
    const [speedVid, setSpeedVid] = useState(1);

    const [videoState, setVideoState] = useState<VideoState>({
        playing: false,
        muted: false,
        volume: 0.5,
        played: 0,
        loadedSeconds: 0,
        playedSeconds: 0,
        seeking: false,
        buffer: true,
    });

    const {
        playing,
        muted,
        volume,
        played,
        seeking,
        buffer,
        loadedSeconds,
        playedSeconds,
    } = videoState;

    const pathname = usePathname();

    useEffect(() => {
        localStorage.setItem(
            "durationInfo",
            JSON.stringify({
                episodeId: episodeId,
                duration: playedSeconds.toFixed(),
            })
        );
    }, [playedSeconds, pathname]);

    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            localStorage.setItem(
                "durationInfo",
                JSON.stringify({
                    episodeId: episodeId,
                    duration: playedSeconds.toFixed(),
                })
            );
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        // window.addEventListener('popstate', handleBeforeUnload);

        return () => {
            // Clean up event listeners when the component unmounts
            window.addEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    const playPauseHandler = () => {
        setVideoState({ ...videoState, playing: !videoState.playing });
    };

    const rewindHandler = () => {
        // if (playerRef.current != null) {
        //     playerRef.current.seekTo(playerRef.current.currentTime - 10);
        // }
    };

    const forwardHandler = () => {
        // if (playerRef.current != null) {
        //     playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
        // }
    };

    const fullscreenHandler = () => {
        if (containerRef.current != null) {
            screenfull.toggle(containerRef.current);
            setIsFullscreen((prev) => !prev);
        }
    };

    const handleVolumeChange = (value: number) => {
        setVideoState({ ...videoState, volume: value });
    };

    let timer: NodeJS.Timeout;
    const timeout = function () {
        setIsShowControl(false);
    };

    useEffect(() => {
        const handleMouseStill = () => {
            setIsShowControl(true);
            clearTimeout(timer);
            timer = setTimeout(timeout, 2000);
        };
        if (containerRef.current != null) {
            containerRef.current.addEventListener(
                "mousemove",
                handleMouseStill
            );
        }
        return () => {
            if (containerRef.current != null)
                containerRef.current?.removeEventListener(
                    "mousemove",
                    handleMouseStill
                );
        };
    }, []);

    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <div ref={containerRef} className="flex ">
            <Modal
                title={"Không có quyền truy cập"}
                open={isOpenModal}
                onCancel={() => {
                    setIsOpenModal(false);
                }}
                onOk={() => {}}
                okText={"Đăng ký gói"}
                cancelText="Tiếp tục xem"
            >
                Gói hiện tại của bạn không hỗ trợ xem phim ở chất lượng này, vui
                lòng nâng cấp gói để trải nghiệm chất lượng phim tốt nhất
            </Modal>
            <div
                className="player flex self-center"
                onClick={() => playPauseHandler()}
            >
                <video
                    ref={playerRef}
                    width="560"
                    height="640"
                    controls
                    preload="none"
                    onTimeUpdate={(e) => {
                        console.log(e.currentTarget.currentTime % 60);
                    }}
                    poster={posterUrl}
                >
                    <source
                        //src={sourceUrl}
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        type="video/mp4"
                    />
                    <track src="/sample.vtt" default />
                </video>
                <ReactPlayer
                    poster={posterUrl}
                    playing={playing}
                    onProgress={(props) => {
                        const data: VideoWatching = {
                            episodeId: episodeId,
                            loadedSeconds: props.loadedSeconds,
                            played: props.played * 100,
                            playedSeconds: props.playedSeconds,
                        };
                        setVideoState({
                            ...videoState,
                            playedSeconds: props.playedSeconds,
                            played: props.played,
                        });
                    }}
                    className="watching-player"
                    width="100%"
                    height="100%"
                    onEnded={playPauseHandler}
                    volume={volume}
                    playbackRate={speedVid}
                />
                <CaretRightOutlined
                    className="text-5xl absolute cursor-pointer bg-black/[.5] rounded-full p-3 top-[40%] left-[48%] z-10"
                    hidden={playing || !isLoadingHidden}
                />
                <LoadingOutlined
                    className="text-5xl absolute top-[40%] left-[48%] z-10 bg-black/[.5] rounded-full p-3"
                    hidden={isLoadingHidden}
                />
                <div className="absolute bottom-0 h-3 w-full bottom-box-shadow"></div>
            </div>
            {/* 
            <ControlPlayer
                onPlayPause={playPauseHandler}
                isPlaying={playing}
                isMuted={muted}
                videoState={{
                    played: played,
                    loadedSeconds: loadedSeconds,
                    playedSeconds: playedSeconds,
                }}
                rewindHandle={rewindHandler}
                forwardHandle={forwardHandler}
                fullscreenHandler={fullscreenHandler}
                isFullscreen={isFullscreen}
                handleVolumeChange={handleVolumeChange}
                valueVolume={volume}
                hidden={!isShowControl && playing}
                setIsLoadingHidden={setIsLoadingHidden}
                setSpeedVid={setSpeedVid}
                setSrcVideo={setSrcVideo}
                setIsOpenModal={setIsOpenModal}
            /> */}
        </div>
    );
};
