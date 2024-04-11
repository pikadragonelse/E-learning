"use client";

import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useState } from "react";
import { NewItemCourse } from "./new-item-course";

export const CarouselList = () => {
    const [currPage, setCurrPage] = useState(1);

    return (
        <div className="text-zinc-800 text-2xl relative">
            <LeftOutlined
                className={clsx("absolute -left-8  h-full cursor-pointer", {
                    hidden: currPage === 1,
                })}
                onClick={() => setCurrPage((prev) => prev - 1)}
            />
            <div className="flex">
                <div
                    className={clsx(
                        "flex justify-around bg-white transition-all  overflow-hidden",
                        {
                            "w-full": currPage === 1,
                            "w-0": currPage !== 1,
                        }
                    )}
                >
                    <NewItemCourse
                        className="flex-col w-60 min-w-60 mb-6"
                        img="https://t4.ftcdn.net/jpg/05/64/99/95/360_F_564999540_XdTvqLGDpneB3v4ifz0SZgzxMOFmfoVo.jpg"
                    />
                    <NewItemCourse
                        className="flex-col w-60 min-w-60 mb-6"
                        img="https://prinnieprismworld.files.wordpress.com/2016/03/4k-image-tiger-jumping.jpg"
                    />
                    <NewItemCourse
                        className="flex-col w-60 min-w-60 mb-6"
                        img="https://c4.wallpaperflare.com/wallpaper/11/582/504/winter-1920x1080-images-wallpaper-preview.jpg"
                    />
                    <NewItemCourse
                        className="flex-col w-60 min-w-60 mb-6"
                        img="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
                    />
                    <NewItemCourse
                        className="flex-col w-60 min-w-60 mb-6"
                        img="https://img.pikbest.com/ai/illus_our/20230418/0c45cdac63d556194fd60b2f0f0fd81f.jpg!w700wp"
                    />
                </div>
                <div
                    className={clsx(
                        "overflow-hidden flex justify-around bg-white transition-all ",
                        {
                            "w-0": currPage !== 2,
                            "w-full": currPage === 2,
                        }
                    )}
                >
                    <NewItemCourse
                        className="flex-col w-60 min-w-60 mb-6"
                        img="https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_640.jpg"
                    />
                    <NewItemCourse
                        className="flex-col w-60 min-w-60 mb-6"
                        img="https://www.shutterstock.com/shutterstock/photos/2187158505/display_1500/stock-photo-space-nebula-k-colorful-abstract-background-image-d-illustration-d-render-space-surreal-2187158505.jpg"
                    />
                    <NewItemCourse
                        className="flex-col w-60 min-w-60 mb-6"
                        img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5jUSwDU8zHTzQj1UOWzGjeXXLz6HmexEvcb73AtQJwg&s"
                    />
                    <NewItemCourse
                        className="flex-col w-60 min-w-60 mb-6"
                        img="https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228_640.jpg"
                    />
                    <NewItemCourse
                        className="flex-col w-60 min-w-60 mb-6"
                        img="https://img.freepik.com/free-photo/nature-beauty-reflected-tranquil-mountain-lake-generative-ai_188544-12625.jpg"
                    />
                </div>
                <div
                    className={clsx(
                        "overflow-hidden flex justify-around bg-white transition-all ",
                        {
                            "w-full": currPage === 3,
                            "w-0": currPage !== 3,
                        }
                    )}
                >
                    <NewItemCourse
                        className="flex-col w-60 min-w-60 mb-6"
                        img="https://c4.wallpaperflare.com/wallpaper/11/582/504/winter-1920x1080-images-wallpaper-preview.jpg"
                    />
                    <NewItemCourse
                        className="flex-col w-60 min-w-60 mb-6"
                        img="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
                    />
                    <NewItemCourse
                        className="flex-col w-60 min-w-60 mb-6"
                        img="https://img.pikbest.com/ai/illus_our/20230418/0c45cdac63d556194fd60b2f0f0fd81f.jpg!w700wp"
                    />
                    <NewItemCourse
                        className="flex-col w-60 min-w-60 mb-6"
                        img="https://cdn.pixabay.com/photo/2014/09/14/18/04/dandelion-445228_640.jpg"
                    />
                    <NewItemCourse
                        className="flex-col w-60 min-w-60 mb-6"
                        img="https://img.freepik.com/free-photo/nature-beauty-reflected-tranquil-mountain-lake-generative-ai_188544-12625.jpg"
                    />
                </div>
            </div>

            <RightOutlined
                className={clsx(
                    "absolute -right-8 h-full top-0 cursor-pointer bg-white",
                    {
                        hidden: currPage === 3,
                    }
                )}
                onClick={() => setCurrPage((prev) => prev + 1)}
            />
        </div>
    );
};
