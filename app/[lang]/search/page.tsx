"use client";

import React from "react";
import { NewItemCourse } from "../ui/new-item-course";
import { Container } from "../ui/container";
import { ConfigProvider, Menu, MenuProps, Pagination } from "antd";
import { getItem } from "../lib/utils/others";

const listItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function Page() {
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
        <Container>
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
                    token: {
                        colorPrimary: "#E3311D",
                    },
                }}
            >
                <div className="flex lg:mx-10 gap-6 text-zinc-800">
                    <div className="border-2 p-4 shadow-lg w-[600px] min-w-[300px] hidden lg:block h-fit">
                        <h1 className="text-xl font-medium mb-5 text-orange-700">
                            Filters & categories
                        </h1>

                        <div className="hidden md:flex flex-col mb-5">
                            {listMenu.map((menu) => (
                                <Menu
                                    items={menu}
                                    mode="inline"
                                    className="border-0"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col mx-4 lg:flex-wrap lg:mx-0 lg:justify-around gap-4">
                        {listItem.map((item, index) => (
                            <NewItemCourse key={index} />
                        ))}
                    </div>
                    <div className="hidden lg:block">
                        <Pagination
                            total={200}
                            className="flex flex-col top-32 sticky"
                            showSizeChanger={false}
                        />
                    </div>
                </div>
            </ConfigProvider>
        </Container>
    );
}
