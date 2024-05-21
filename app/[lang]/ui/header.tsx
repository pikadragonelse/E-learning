"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Search from "./search";
import {
    MenuOutlined,
    ShoppingCartOutlined,
    BellOutlined,
    GlobalOutlined,
    AppstoreOutlined,
    HeartOutlined,
    WalletOutlined,
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Button, ConfigProvider, Popover } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { apiInstance } from "@/plugin/apiInstance";
import { Category } from "../lib/model/categories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { User } from "../lib/model/user";

const listUserFeature: Array<{ title: string; icon: ReactNode; href: string }> =
    [
        {
            title: "My account",
            icon: <UserOutlined />,
            href: "individual-info",
        },
        { title: "Logout", icon: <LogoutOutlined />, href: "login" },
    ];

export type Header = {
    onClickCategoryIcon?: (props?: any) => unknown;
    userInfo?: User;
};
export const Header: React.FC<Header> = ({ onClickCategoryIcon, userInfo }) => {
    const [isScroll, setIsScroll] = useState(false);
    const [listCategory, setListCategory] = useState<Category[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const logout = () => {};

    const userFeatureMap: Record<string, any> = {
        Logout: "",
    };

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

    const getCategory = async () => {
        try {
            const responseData = await apiInstance.get("categories");
            setListCategory(responseData.data);
        } catch (error) {
            console.log("Get categories failed", error);
        }
    };

    const searchPage = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value !== "") {
            params.set("category", value);
        } else {
            params.delete("category");
        }
        if (pathname.split("/")[2] === "search") {
            replace(`${pathname}?${params.toString()}`);
        } else {
            replace(`${pathname}/search?${params.toString()}`);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#E3311D",
                },
            }}
        >
            <header
                className={clsx(
                    " fixed w-full bg-white transition-all mb-1 top-0 z-20"
                )}
            >
                <nav className=" border-gray-200 px-4 lg:px-6 py-1 border-b border-solid">
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
                            <Popover
                                content={
                                    <ul className="flex flex-col gap-2 w-80 text-lg h-[600px] max-h-[600px] overflow-auto">
                                        {listCategory.map((category, index) => (
                                            <li
                                                key={index}
                                                className="cursor-pointer p-2 hover:text-orange-600"
                                                onClick={() =>
                                                    searchPage(
                                                        category.categoryId
                                                    )
                                                }
                                            >
                                                {category.name}
                                            </li>
                                        ))}
                                    </ul>
                                }
                                title="Categories"
                                placement="bottomRight"
                                className="hidden lg:flex"
                                trigger={"click"}
                            >
                                <div className="flex text-zinc-700 gap-1 items-center cursor-pointer hover:bg-zinc-500/20 rounded-md px-2 py-1 transition-all">
                                    <MenuOutlined className="hidden lg:block" />
                                    <span className="hidden lg:block">
                                        Category
                                    </span>
                                </div>
                            </Popover>

                            <div className="flex text-zinc-700 gap-1 items-center cursor-pointer hover:bg-zinc-500/20 rounded-md px-2 py-1 transition-all lg:hidden">
                                <MenuOutlined onClick={onClickCategoryIcon} />
                            </div>
                        </div>
                        <Search placeholder="Learning" className="max-w-xl" />

                        <div className="flex text-zinc-700 items-center gap-7">
                            <ShoppingCartOutlined
                                className="hidden sm:block text-2xl cursor-pointer"
                                onClick={() => router.push("/cart")}
                            />
                            <BellOutlined className="hidden sm:block text-xl cursor-pointer" />
                            <GlobalOutlined className="hidden sm:block text-xl cursor-pointer" />
                            {userInfo != null ? (
                                <Popover
                                    content={
                                        <ul className="flex flex-col gap-4 w-64">
                                            {listUserFeature.map(
                                                (feature, index) => (
                                                    <li
                                                        onClick={() =>
                                                            router.push(
                                                                feature.href
                                                            )
                                                        }
                                                        key={index}
                                                        className="p-4 hover:bg-zinc-100 transition-all cursor-pointer flex gap-4 items-center rounded-md active:bg-orange-100"
                                                    >
                                                        <span className="text-xl">
                                                            {feature.icon}
                                                        </span>
                                                        <span className="text-lg">
                                                            {feature.title}
                                                        </span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    }
                                    placement="bottomLeft"
                                >
                                    <Avatar
                                        src={userInfo.profile.avatar}
                                        className="border border-zinc-600 cursor-pointer"
                                        size={40}
                                    />
                                </Popover>
                            ) : (
                                <Button
                                    className=""
                                    onClick={() => {
                                        router.push("/login");
                                    }}
                                >
                                    Login
                                </Button>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </ConfigProvider>
    );
};
