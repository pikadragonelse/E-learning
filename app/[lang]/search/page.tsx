"use client";

import React, { useEffect, useState } from "react";
import { NewItemCourse } from "../ui/new-item-course";
import { Container } from "../ui/container";
import { ConfigProvider, Menu, MenuProps, Pagination, Spin } from "antd";
import { getItem } from "../lib/utils/others";
import { Course } from "../lib/model/course";
import { apiInstance } from "@/plugin/apiInstance";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

export default function Page({
    searchParams,
}: {
    searchParams?: {
        search?: string;
        page?: string;
    };
}) {
    const search = searchParams?.search;
    const currentPage = searchParams?.page;
    const [listCourse, setListCourse] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const { replace } = useRouter();

    const searchCourse = () => {
        setIsLoading(true);
        apiInstance
            .get("courses", { params: { search: search, page: currentPage } })
            .then((res) => {
                setListCourse(res.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    };

    useEffect(() => {
        searchCourse();
    }, [search, currentPage]);

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        replace(`${pathname}?${params.toString()}`);
    };

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
                <div className="flex flex-col lg:flex-row lg:mx-10 gap-6 text-zinc-800">
                    <div className="border-2 p-4 shadow-lg min-w-[300px] hidden lg:block h-fit w-1/4">
                        <h1 className="text-xl font-medium mb-5 text-orange-700">
                            Filters & categories
                        </h1>

                        <div className="hidden lg:flex flex-col mb-5">
                            {listMenu.map((menu, index) => (
                                <Menu
                                    key={index}
                                    items={menu}
                                    mode="inline"
                                    className="border-0"
                                />
                            ))}
                        </div>
                    </div>
                    <Spin spinning={isLoading}>
                        <div className="flex flex-col mx-4 lg:flex-wrap lg:mx-0 lg:justify-around gap-4">
                            {listCourse.length > 0 ? (
                                listCourse.map((course, index) => (
                                    <NewItemCourse
                                        course={course}
                                        className="shadow-xl"
                                        layout="horizontal"
                                    />
                                ))
                            ) : (
                                <div className="w-[600px] text-xl ">
                                    <h1 className="text-2xl font-semibold">
                                        Sorry, we couldn't find any results for
                                        "{search}"
                                    </h1>

                                    <h2>
                                        Try adjusting your search. Here are some
                                        ideas:
                                    </h2>
                                    <ul className="text-base list-disc ml-10">
                                        <li>
                                            Make sure all words are spelled
                                            correctly
                                        </li>
                                        <li>Try different search terms</li>
                                        <li>Try more general search terms</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </Spin>
                    <div
                        className={clsx(
                            "w-96 ml-auto mt-8 lg:w-auto lg:ml-0 lg:mt-0",
                            {
                                hidden: listCourse.length <= 0,
                                block: listCourse.length > 0,
                            }
                        )}
                    >
                        <Pagination
                            total={200}
                            className="flex flex-row lg:flex-col top-32 sticky"
                            showSizeChanger={false}
                            onChange={changePage}
                        />
                    </div>
                </div>
            </ConfigProvider>
        </Container>
    );
}
