"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Search from "./search";
import {
    MenuOutlined,
    ShoppingCartOutlined,
    BellOutlined,
    GlobalOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import clsx from "clsx";
const url = "https://api.dicebear.com/7.x/miniavs/svg?seed=1";

export const Header = () => {
    const [isScroll, setIsScroll] = useState(false);

    // useEffect(() => {
    //     const handleScroll = (event: any) => {
    //         if (document.getElementsByTagName("html")[0].scrollTop > 150) {
    //             setIsScroll(true);
    //         } else {
    //             setIsScroll(false);
    //         }
    //     };

    //     window.addEventListener("scroll", handleScroll);

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    return (
        <header
            className={clsx("transition-all mb-1", {
                "bg-zinc-500/50": isScroll,
            })}
        >
            <nav className=" border-gray-200 px-4 lg:px-6 py-1 dark:bg-gray-800 border-b">
                <div className="flex flex-wrap items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logo-main.png"
                            width={80}
                            height={80}
                            className="hidden lg:block cursor-pointer"
                            alt="Alpha logo"
                        />
                        <Image
                            src="/logo-text.png"
                            width={100}
                            height={100}
                            className="hidden sm:block lg:hidden cursor-pointer"
                            alt="Alpha logo"
                        />
                        <Image
                            src="/logo-icon.png"
                            width={30}
                            height={30}
                            className="block sm:hidden cursor-pointer"
                            alt="Alpha logo"
                        />
                        <div className="flex text-zinc-700 gap-1 items-center cursor-pointer hover:bg-zinc-500/20 rounded-md px-2 py-1 transition-all">
                            <MenuOutlined />
                            <span className="hidden sm:block">Category</span>
                        </div>
                    </div>

                    <Search placeholder="Learning" className="max-w-xl" />
                    <div className="flex text-zinc-700 items-center gap-7">
                        <ShoppingCartOutlined className="hidden sm:block text-2xl cursor-pointer" />
                        <BellOutlined className="hidden sm:block text-xl cursor-pointer" />
                        <GlobalOutlined className="hidden sm:block text-xl cursor-pointer" />
                        <div className="px-4 py-1 rounded-md border border-zinc-800 cursor-pointer">
                            Login
                        </div>
                        {/* <Avatar
                        src={url}
                        className="border border-zinc-600 cursor-pointer"
                        size={40}
                    /> */}
                    </div>
                </div>
            </nav>
        </header>
    );
};
