import React from "react";
import Link from "next/link";
import { PlayCircleOutlined } from "@ant-design/icons";

export const HeroMainSector = () => {
    return (
        <div>
            <div className="bg-zinc-200 h-[280px] sm:h-[500px] flex items-center relative rounded-xl overflow-hidden">
                <div className="absolute w-full h-full bg-zinc-800/70"></div>
                <div className="text-zinc-50 ml-5 sm:ml-36 sm:w-96 absolute">
                    <h1 className="text-xs sm:text-lg text-orange-500">
                        Varied courses
                    </h1>
                    <p className="font-medium text-2xl sm:text-5xl">
                        Build your future with 1000+ courses
                    </p>
                    {/* <Link
                        href=""
                        className="text-xs sm:text-2xl flex gap-1 items-center mt-2 text-orange-700"
                    >
                        <PlayCircleOutlined />
                        <span>Start Now</span>
                    </Link> */}
                </div>
                <img
                    src={`/images/main2.jpg`}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="h-[280px] sm:h-[500px] flex gap-2 mt-2">
                <div className="bg-zinc-200 h-full w-1/2 relative rounded-xl overflow-hidden">
                    <div className="absolute w-full h-full bg-zinc-800/70"></div>
                    <img
                        src="/images/sub1.jpg"
                        alt=""
                        className=" w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 sm:top-10 sm:left-10 text-zinc-50">
                        <h1 className="text-xs sm:text-lg text-orange-600">
                            Trending courses
                        </h1>
                        <p className="font-medium text-base sm:text-3xl lg:text-5xl w-36 lg:w-96">
                            Build your future with 1000+ courses
                        </p>
                    </div>
                    {/* <Link
                        href=""
                        className="text-xs sm:text-2xl flex gap-1 items-center mt-2 text-orange-700 absolute left-2 bottom-2 sm:left-10 sm:bottom-5"
                    >
                        <PlayCircleOutlined />
                        <span>Start Now</span>
                    </Link> */}
                </div>
                <div className=" h-full w-1/2 flex flex-col gap-2">
                    <div className="bg-orange-700 h-1/2 flex items-center gap-2 relative rounded-xl overflow-hidden">
                        <Link
                            href=""
                            className="text-3xl sm:text-5xl sm:ml-10 flex gap-1 items-center ml-2 text-zinc-50 "
                        >
                            <PlayCircleOutlined />
                        </Link>
                        <div className="w-36 sm:w-44 flex flex-col justify-center">
                            <h1 className="text-xs sm:text-lg">New courses</h1>
                            <p className="font-medium text-sm sm:text-xl">
                                Build your future
                            </p>
                        </div>
                        <img
                            src="/images/sub2.jpg"
                            alt=""
                            className=" w-full h-full object-cover"
                        />
                    </div>
                    <div className=" h-1/2 flex gap-2 ">
                        <div className="w-1/2  text-zinc-50 flex flex-col items-center justify-center text-center relative rounded-xl overflow-hidden">
                            <div className="absolute w-full h-full bg-zinc-900/80"></div>

                            <img
                                src="/images/sub3.jpg"
                                alt=""
                                className=" w-full h-full object-cover"
                            />
                            <div className="absolute">
                                <h1 className=" text-sm sm:text-xl sm:mt-2 font-medium">
                                    Instructors
                                </h1>
                                <p className=" text-orange-700 text-xs sm:text-sm lg:text-base">
                                    Many instructors come from all over the
                                    world
                                </p>
                            </div>
                        </div>
                        <div className="w-1/2  text-zinc-50 flex flex-col items-center justify-center text-center relative rounded-xl overflow-hidden">
                            <div className="absolute w-full h-full bg-zinc-900/80"></div>

                            <img
                                src="/images/sub4.jpg"
                                alt=""
                                className=" w-full h-full object-cover"
                            />
                            <div className="absolute">
                                <h1 className=" text-sm sm:text-xl sm:mt-2 font-medium">
                                    Affordable
                                </h1>
                                <p className=" text-orange-700 text-xs sm:text-sm lg:text-base text-wrap">
                                    There are both free and paid courses
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
