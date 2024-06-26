"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Search from "./search";
import {
    MenuOutlined,
    ShoppingCartOutlined,
    BellOutlined,
    GlobalOutlined,
    UserOutlined,
    LogoutOutlined,
    AppstoreOutlined,
    FileAddOutlined,
    ContainerOutlined,
} from "@ant-design/icons";
import { Avatar, Button, ConfigProvider, Popover, Tooltip } from "antd";
import clsx from "clsx";
import Link from "next/link";
import { apiInstance } from "@/plugin/apiInstance";
import { Category } from "../lib/model/categories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { User } from "../lib/model/user";
import { useTokenStore } from "../lib/store/userInfo";
import { defaultUserInfoToken } from "../lib/model/user-info-token";
import { setCookie } from "cookies-next";
const listUserFeature: Array<{ title: string; icon: ReactNode; href: string }> =
    [
        {
            title: "My account",
            icon: <UserOutlined />,
            href: "individual-info",
        },
        {
            title: "Instructor",
            icon: <ContainerOutlined />,
            href: "manage-course",
        },
        {
            title: "Recommend course",
            icon: <AppstoreOutlined />,
            href: "recommendation",
        },
        {
            title: "Create quiz",
            icon: <FileAddOutlined />,
            href: "quiz",
        },
        { title: "Logout", icon: <LogoutOutlined />, href: "" },
    ];

export type Header = {
    onClickCategoryIcon?: (props?: any) => unknown;
    userInfo?: User;
    onRefresh?: (props?: any) => void;
};
export const Header: React.FC<Header> = ({
    onClickCategoryIcon,
    userInfo,
    onRefresh = () => {},
}) => {
    const [isScroll, setIsScroll] = useState(false);
    const [listCategory, setListCategory] = useState<Category[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const { updateUserInfo } = useTokenStore();

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
            replace(`/en/?${params.toString()}`);
        } else {
            replace(`/en/search?${params.toString()}`);
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
                                <img
                                    src="/images/logo-main.png"
                                    width={80}
                                    height={80}
                                    className="hidden lg:block cursor-pointer"
                                    alt="Alpha logo"
                                />
                                <img
                                    src="/images/logo-text.png"
                                    width={100}
                                    height={100}
                                    className="hidden sm:block lg:hidden cursor-pointer"
                                    alt="Alpha logo"
                                />
                                <img
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
                            <Tooltip title="Your cart">
                                <ShoppingCartOutlined
                                    className="hidden sm:block text-2xl cursor-pointer"
                                    onClick={() =>
                                        userInfo != null
                                            ? router.push("/cart")
                                            : router.push("/login")
                                    }
                                />
                            </Tooltip>
                            <Tooltip title="Notification">
                                <BellOutlined className="hidden sm:block text-xl cursor-pointer" />
                            </Tooltip>
                            <Tooltip title="Languages">
                                <GlobalOutlined className="hidden sm:block text-xl cursor-pointer" />
                            </Tooltip>
                            {userInfo != null ? (
                                <Popover
                                    content={
                                        <ul className="flex flex-col gap-4 w-64">
                                            {listUserFeature.map(
                                                (feature, index) => (
                                                    <li
                                                        onClick={() => {
                                                            if (
                                                                feature.title ===
                                                                "Logout"
                                                            ) {
                                                                onRefresh();
                                                                updateUserInfo(
                                                                    defaultUserInfoToken
                                                                );
                                                                setCookie(
                                                                    "accessToken",
                                                                    "",
                                                                    {
                                                                        secure: true,
                                                                    }
                                                                );
                                                                setCookie(
                                                                    "refreshToken",
                                                                    "",
                                                                    {
                                                                        secure: true,
                                                                    }
                                                                );
                                                            }
                                                            router.push(
                                                                `/${feature.href}`
                                                            );
                                                        }}
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
