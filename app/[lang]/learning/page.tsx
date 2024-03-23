"use client";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import React, { useEffect, useRef, useState } from "react";
import LocaleSwitcher from "../ui/local-swithcher";
import { VideoCustom } from "../ui/video-custom";
import { MenuLecture } from "../ui/menu-lecture";
import { ConfigProvider, Tabs, TabsProps } from "antd";
import { Container } from "../ui/container";

const items: TabsProps["items"] = [
    {
        key: "1",
        label: "Courses content",
        children: <MenuLecture className="w-full" />,
    },
    {
        key: "2",
        label: "Overview",
        children: "Content of Tab Pane 2",
    },
    {
        key: "3",
        label: "Notes",
        children: "Content of Tab Pane 3",
    },
    {
        key: "4",
        label: "Reviews",
        children: "Content of Tab Pane 3",
    },
    {
        key: "5",
        label: "Reminders",
        children: "Content of Tab Pane 3",
    },
];

const itemsDesktop: TabsProps["items"] = items.map((item, index) => {
    if (index > 0) return item;
}) as TabsProps["items"];

export default function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const onChange = (key: string) => {
        console.log(key);
    };
    return (
        <Container>
            <div className="text-zinc-800 flex lg:flex-row flex-col ">
                <div className="">
                    <VideoCustom />
                    <ConfigProvider
                        theme={{
                            components: {
                                Tabs: {
                                    inkBarColor: "rgb(255 97 15)",
                                    itemHoverColor: "rgb(255 145 88)",
                                    itemSelectedColor: "rgb(255 97 15)",
                                    itemActiveColor: "rgb(255 87 0)",
                                },
                            },
                        }}
                    >
                        <Tabs
                            defaultActiveKey="1"
                            items={items}
                            onChange={onChange}
                            className="lg:hidden"
                        />
                        <Tabs
                            defaultActiveKey="1"
                            items={itemsDesktop}
                            onChange={onChange}
                            className="hidden lg:flex"
                        />
                    </ConfigProvider>
                </div>

                <MenuLecture className="hidden lg:block w-1/3" />
            </div>
        </Container>
    );
}
