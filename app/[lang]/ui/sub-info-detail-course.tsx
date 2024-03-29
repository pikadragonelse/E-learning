"use client";

import React, { useEffect, useState } from "react";
import { CaretRightOutlined, HeartOutlined } from "@ant-design/icons";
import { CustomButton } from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDownload,
    faInfinity,
    faMobileScreen,
    faTrophy,
    faTv,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

export const SubInfoDetailCourse = () => {
    const [isAbsolute, setIsAbsolute] = useState(false);

    useEffect(() => {
        const handleScroll = (event: any) => {
            console.log(
                document.getElementsByTagName("html")[0].scrollHeight -
                    document.getElementsByTagName("html")[0].scrollTop
            );

            if (
                document.getElementsByTagName("html")[0].scrollHeight -
                    document.getElementsByTagName("html")[0].scrollTop <
                1000
            ) {
                console.log(123);
                setIsAbsolute(true);
            } else {
                setIsAbsolute(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={clsx(
                "shadow-xl w-max rounded-lg hidden lg:block fixed text-zinc-800 ml-20 bg-zinc-50",
                {
                    absolute: isAbsolute,
                    "bottom-40": isAbsolute,
                }
            )}
        >
            <div className="w-60 h-52 relative group overflow-hidden rounded-tl-lg rounded-tr-lg">
                <div className="absolute flex items-center justify-center w-full h-full opacity-0 bg-zinc-800/40 group-hover:opacity-100 transition-all cursor-pointer">
                    <CaretRightOutlined
                        className={
                            "text-xl sm:text-3xl text-zinc-50  bg-zinc-700 rounded-full py-3 px-3"
                        }
                    />
                </div>
                <img
                    src="https://coolwallpapers.me/picsup/3058990-book_computer_design_development_electronics_html_keyboard_laptop_macbook_notebook_pencil_technology_web_web-design_website.jpg"
                    alt=""
                    className="w-full h-full object-cover "
                />
            </div>
            <div className="p-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 ">
                    <p className="text-2xl font-medium">$230</p>
                    <p className="text-sm line-through text-zinc-400">$230</p>
                </div>
                <div className="">
                    <div className="flex gap-2">
                        <CustomButton type="primary" className="w-36 flex-1">
                            Add to cart
                        </CustomButton>
                        <CustomButton icon={<HeartOutlined />}></CustomButton>
                    </div>
                    <CustomButton className="mt-1 w-full">Buy Now</CustomButton>
                </div>
            </div>
            <div className="p-2 mb-4">
                <h3 className="font-medium">This course includes:</h3>
                <ul className="text-sm mt-2 flex flex-col gap-2">
                    <li className="flex gap-1 items-center">
                        <FontAwesomeIcon icon={faTv} className="text-xs w-6" />
                        <p className="">10 hours on-demand video</p>
                    </li>
                    <li className="flex gap-1 items-center">
                        <FontAwesomeIcon
                            icon={faDownload}
                            className="text-xs w-6"
                        />
                        <p className="">20 downloadable resources</p>
                    </li>
                    <li className="flex gap-1 items-center">
                        <FontAwesomeIcon
                            icon={faMobileScreen}
                            className="text-xs w-6"
                        />
                        <p className="">Access on mobile and PC</p>
                    </li>
                    <li className="flex gap-1 items-center">
                        <FontAwesomeIcon
                            icon={faInfinity}
                            className="text-xs w-6"
                        />
                        <p className="">Full lifetime access</p>
                    </li>
                    <li className="flex gap-1 items-center">
                        <FontAwesomeIcon
                            icon={faTrophy}
                            className="text-xs w-6"
                        />
                        <p className="">Certificate of completion</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};
