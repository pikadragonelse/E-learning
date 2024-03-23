"use client";

import { ConfigProvider, Drawer, DrawerProps, Menu, MenuProps } from "antd";
import React from "react";
import { getItem } from "../lib/utils/others";

export type SidebarDrawer = {};
export const SidebarDrawer: React.FC<SidebarDrawer & DrawerProps> = ({
    ...props
}) => {
    const ratingsMenu: MenuProps["items"] = [
        getItem("Ratings", "sub1", <></>, [
            getItem("Item 1", "g1", null),
            getItem("Item 2", "g2", null),
        ]),
    ];
    const languageMenu: MenuProps["items"] = [
        getItem("Language", "sub1", <></>, [
            getItem("Item 1", "g1", null),
            getItem("Item 2", "g2", null),
        ]),
    ];
    const videoDurationMenu: MenuProps["items"] = [
        getItem("Video duration", "sub1", <></>, [
            getItem("Item 1", "g1", null),
            getItem("Item 2", "g2", null),
        ]),
    ];
    const featuresMenu: MenuProps["items"] = [
        getItem("Features", "sub1", <></>, [
            getItem("Item 1", "g1", null),
            getItem("Item 2", "g2", null),
        ]),
    ];
    const topicMenu: MenuProps["items"] = [
        getItem("Topic", "sub1", <></>, [
            getItem("Item 1", "g1", null),
            getItem("Item 2", "g2", null),
        ]),
    ];
    const levelMenu: MenuProps["items"] = [
        getItem("Level", "sub1", <></>, [
            getItem("Item 1", "g1", null),
            getItem("Item 2", "g2", null),
        ]),
    ];
    const subTitlesMenu: MenuProps["items"] = [
        getItem("Subtitles", "sub1", <></>, [
            getItem("Item 1", "g1", null),
            getItem("Item 2", "g2", null),
        ]),
    ];
    const priceMenu: MenuProps["items"] = [
        getItem("Price", "sub1", <></>, [
            getItem("Item 1", "g1", null),
            getItem("Item 2", "g2", null),
        ]),
    ];

    const listMenu: MenuProps["items"][] = [
        ratingsMenu,
        languageMenu,
        videoDurationMenu,
        featuresMenu,
        topicMenu,
        levelMenu,
        subTitlesMenu,
        priceMenu,
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemActiveBg: "rgb(255 208 183)",
                        itemSelectedBg: "rgb(255 232 219)",
                        itemSelectedColor: "rgb(255 97 15)",
                        itemBorderRadius: 0,
                    },
                },
            }}
        >
            <Drawer {...props} className="text-zinc-800 lg:hidden">
                <h1 className="text-lg font-medium text-orange-600">
                    Filters<span>(6)</span>
                </h1>
                <div className="overflow-auto max-h-[36rem]">
                    {listMenu.map((menu) => (
                        <Menu items={menu} mode="inline" className="border-0" />
                    ))}
                </div>
            </Drawer>
        </ConfigProvider>
    );
};
