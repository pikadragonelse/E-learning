"use client";

import {
    CaretRightOutlined,
    PauseOutlined,
    SettingFilled,
} from "@ant-design/icons";
import {
    IconDefinition,
    faClosedCaptioning as faClosedCaptioningSolid,
    faCompress,
    faExpand,
    faVolumeHigh,
    faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faClosedCaptioning } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConfigProvider, Modal, Popover, Slider, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { IconForward10s } from "../../lib/assets/icon/forward-10s";
import { IconRewind10s } from "../../lib/assets/icon/rewind-10s";
import { formatTime } from "../../lib/utils/formatTime";
import {
    defaultCustomConfigSlider,
    defaultOverlayInnerStylePop,
    defaultPropsToolTip,
    defaultSettingItems,
    settingItemContentMap,
} from "./default-value";
import "./index.scss";
import { SettingContent } from "./setting-content";
import { SettingItem } from "./setting-item";
import axios from "axios";
import { VideoWatching } from "../../lib/model/video";

const mapIconVolume: Record<string, IconDefinition> = {
    true: faVolumeXmark,
    false: faVolumeHigh,
};

export type SettingState = {
    speed: number;
    quality: number;
};

const mapQuality: Record<number, string> = {
    720: "720p",
    1080: "1080p",
    4: "4k",
};

export type ControlPlayerType = {
    videoRef?: React.MutableRefObject<HTMLVideoElement | null>;
    fullscreenHandler?: (props?: any) => void;
    isFullscreen?: boolean;
    hidden?: boolean;
    setIsLoadingHidden?: (props?: any) => void;
    setSpeedVid?: (props?: any) => void;
    setSrcVideo?: (props?: any) => void;
    setIsOpenModal?: (props?: any) => void;
    setTrackMode?: (props?: any) => void;
    className?: string;
    trackMode?: "hidden" | "disabled" | "showing";
};

export const ControlPlayer = ({
    videoRef,
    fullscreenHandler,
    isFullscreen,
    hidden,
    setIsLoadingHidden = () => {},
    setSpeedVid = () => {},
    className,
    setSrcVideo = () => {},
    setIsOpenModal = () => {},
    setTrackMode = () => {},
    trackMode,
}: ControlPlayerType) => {
    const [selectedSetting, setSelectedSetting] = useState("");
    const [stateSetting, setStateSetting] = useState<SettingState>({
        speed: 1,
        quality: 720,
    });
    const [isSelectedSettingIcon, setIsSelectedSettingIcon] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (videoRef != null && videoRef.current != null) {
            videoRef.current.paused || videoRef.current.ended
                ? videoRef.current.play()
                : videoRef.current.pause();
        }
    };
    useEffect(() => {
        if (videoRef?.current?.paused) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    }, [videoRef?.current?.paused]);

    const handleRewind = () => {
        if (videoRef != null && videoRef.current != null) {
            videoRef.current.currentTime -= 10;
        }
    };
    const handleForward = () => {
        if (videoRef != null && videoRef.current != null) {
            videoRef.current.currentTime += 10;
        }
    };

    const [isMuted, setIsMuted] = useState(false);
    const [valueSlider, setValueSlider] = useState(50);

    const handleMuted = () => {
        setIsMuted(!isMuted);
        if (isMuted === false) {
            setValueSlider(0);
        } else {
            setValueSlider(50);
        }
        if (videoRef != null && videoRef.current != null) {
            videoRef.current.muted = !videoRef.current.muted;
        }
    };

    const handleVolumeChange = (value: number) => {
        if (videoRef != null && videoRef.current != null) {
            videoRef.current.volume = value;
        }
        if (value === 0) {
            setIsMuted(true);
        } else {
            setIsMuted(false);
        }
        setValueSlider(value * 100);
    };

    useEffect(() => {}, [stateSetting.quality]);

    const getQualityVid = (quality: number) => {
        // setIsLoadingHidden(false);
        // axios
        //     .get(`${endpoint}/api/episode/qualities/${Number(episodeId)}`, {
        //         params: {
        //             quality: mapQuality[quality],
        //         },
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${accessToken}`,
        //         },
        //     })
        //     .then((res) => {
        //         console.log(res);
        //         setStateSetting({ ...stateSetting, quality: quality });
        //         setSrcVideo(res.data.data.videoUrl);
        //         setIsLoadingHidden(true);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         setIsLoadingHidden(true);
        //         if (err.response.status === 403) {
        //             setIsOpenModal(true);
        //             setIsLoadingHidden(false);
        //         }
        //     });
    };

    const handleSettingSelection = (value: number) => {
        const settingMap: Record<string, any> = {
            speed: () => {
                setStateSetting({ ...stateSetting, speed: value });
                setSpeedVid(value);
            },
            quality: () => {
                getQualityVid(value);
            },
        };
        settingMap[selectedSetting]();
        setSelectedSetting("");
    };

    const played = 0;
    const playedSeconds = 0;

    useEffect(() => {
        setIsLoadingHidden(true);
    }, [played]);

    return (
        <div
            className={`control-player text-zinc-50 ${className}`}
            hidden={hidden}
        >
            <div className="featured-container">
                <div className="feature feature-left flex gap-4">
                    <Tooltip
                        title={`${isPlaying ? "Dừng" : "Phát"}`}
                        {...defaultPropsToolTip}
                    >
                        <div
                            className="feature-item feature-left-item cursor-pointer"
                            onClick={handlePlayPause}
                        >
                            {isPlaying ? (
                                <PauseOutlined className="sm:text-3xl text-xl" />
                            ) : (
                                <CaretRightOutlined className="sm:text-3xl text-xl" />
                            )}
                        </div>
                    </Tooltip>
                    <Tooltip title={`Lùi 10s`} {...defaultPropsToolTip}>
                        <div
                            className="feature-item feature-left-item cursor-pointer"
                            onClick={handleRewind}
                        >
                            <IconRewind10s className="sm:w-7 sm:h-7 w-6 h-6" />
                        </div>
                    </Tooltip>
                    <Tooltip title={`Tới 10s`} {...defaultPropsToolTip}>
                        <div
                            className="feature-item feature-left-item cursor-pointer"
                            onClick={handleForward}
                        >
                            <IconForward10s className="sm:w-7 sm:h-7 w-6 h-6" />
                        </div>
                    </Tooltip>

                    <div className="feature-item feature-left-item feature-volume items-center cursor-pointer hidden sm:flex">
                        <Tooltip
                            title={`${isMuted === true ? "Bật âm" : "Tắt âm"}`}
                            {...defaultPropsToolTip}
                        >
                            <FontAwesomeIcon
                                icon={mapIconVolume[isMuted.toString()]}
                                size="lg"
                                onClick={handleMuted}
                                className="block sm:w-7 sm:h-7 w-6 h-6"
                            />
                        </Tooltip>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Slider: defaultCustomConfigSlider,
                                },
                            }}
                        >
                            <Slider
                                value={valueSlider}
                                onChange={(value) =>
                                    handleVolumeChange(value / 100)
                                }
                                className="w-11"
                            />
                        </ConfigProvider>
                    </div>
                    <Tooltip title={`Thời gian`} {...defaultPropsToolTip}>
                        <div className="feature-item feature-left-item text-xs sm:text-base">
                            <span>
                                {formatTime(
                                    Number(
                                        videoRef?.current?.currentTime?.toFixed()
                                    )
                                )}{" "}
                                /{" "}
                                {formatTime(
                                    Number(
                                        videoRef != null &&
                                            videoRef.current != null
                                            ? videoRef?.current.duration?.toFixed()
                                            : 0
                                    )
                                )}
                            </span>
                        </div>{" "}
                    </Tooltip>
                </div>
                <div className="feature feature-right gap-6">
                    <Tooltip
                        title={`${
                            trackMode === "hidden" ? "Bật phụ đề" : "Tắt phụ đề"
                        }`}
                        {...defaultPropsToolTip}
                    >
                        <div
                            className="feature-item feature-right-item cursor-pointer flex items-center"
                            onClick={setTrackMode}
                        >
                            <FontAwesomeIcon
                                icon={
                                    trackMode === "hidden"
                                        ? faClosedCaptioning
                                        : faClosedCaptioningSolid
                                }
                                className="sm:w-7 sm:h-7 w-5 h-5"
                            />
                        </div>
                    </Tooltip>
                    <Popover
                        content={() =>
                            settingItemContentMap[selectedSetting] != null ? (
                                <SettingContent
                                    title={
                                        settingItemContentMap[selectedSetting]
                                            .title
                                    }
                                    options={
                                        settingItemContentMap[selectedSetting]
                                            .options
                                    }
                                    onBack={() => setSelectedSetting("")}
                                    onSelected={(value) =>
                                        handleSettingSelection(value)
                                    }
                                />
                            ) : (
                                <SettingItem
                                    items={defaultSettingItems}
                                    onSelected={(value) =>
                                        setSelectedSetting(value as string)
                                    }
                                    currValue={Object.values(stateSetting)}
                                />
                            )
                        }
                        trigger="click"
                        arrow={false}
                        placement="topRight"
                        overlayInnerStyle={defaultOverlayInnerStylePop}
                        color="#171a18e6"
                        onOpenChange={() => {
                            setSelectedSetting("");
                            setIsSelectedSettingIcon(!isSelectedSettingIcon);
                        }}
                        zIndex={10}
                    >
                        <Tooltip title={`Cài đặt`} {...defaultPropsToolTip}>
                            <div className="feature-item feature-right-item cursor-pointer">
                                <SettingFilled
                                    className={`sm:text-2xl text-base ${
                                        isSelectedSettingIcon !== false
                                            ? "rotate-45"
                                            : ""
                                    } transition-transform `}
                                />
                            </div>
                        </Tooltip>
                    </Popover>

                    <Tooltip title={`Phóng to`} {...defaultPropsToolTip}>
                        <div
                            className="feature-item feature-right-item cursor-pointer"
                            onClick={fullscreenHandler}
                        >
                            <FontAwesomeIcon
                                icon={isFullscreen ? faCompress : faExpand}
                                size="xl"
                                className="mb-1 sm:w-7 sm:h-7 w-5 h-5"
                            />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};
