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
import Link from "next/link";
const url = "https://api.dicebear.com/7.x/miniavs/svg?seed=1";

export type Header = { onClickCategoryIcon?: (props?: any) => unknown };
export const Header: React.FC<Header> = ({ onClickCategoryIcon }) => {
    const [isScroll, setIsScroll] = useState(false);

    useEffect(() => {
        const handleScroll = (event: any) => {
            if (document.getElementsByTagName("html")[0].scrollTop > 0) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={clsx(
                " fixed w-full bg-white transition-all mb-1 top-0 z-20"
            )}
        >
            <nav className=" border-gray-200 px-4 lg:px-6 py-1 border-b">
                <div className="flex flex-wrap items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={"/"}>
                            <Image
                                src="/images/logo-main.png"
                                width={80}
                                height={80}
                                className="hidden lg:block cursor-pointer"
                                alt="Alpha logo"
                            />
                            <Image
                                src="/images/logo-text.png"
                                width={100}
                                height={100}
                                className="hidden sm:block lg:hidden cursor-pointer"
                                alt="Alpha logo"
                            />
                            <Image
                                src="/images/logo-icon.png"
                                width={30}
                                height={30}
                                className="block sm:hidden cursor-pointer"
                                alt="Alpha logo"
                            />
                        </Link>

                        <div className="flex text-zinc-700 gap-1 items-center cursor-pointer hover:bg-zinc-500/20 rounded-md px-2 py-1 transition-all">
                            <MenuOutlined
                                className="lg:hidden"
                                onClick={onClickCategoryIcon}
                            />
                            <MenuOutlined className="hidden lg:block" />
                            <span className="hidden lg:block">Category</span>
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
