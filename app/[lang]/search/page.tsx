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
import { Aggregations, ResSearch } from "../lib/model/search";
import { Language } from "../lib/model/language";
import {
    PlusSquareOutlined,
    UpOutlined,
    DownOutlined,
} from "@ant-design/icons";

const levelMap: Record<string, string> = {
    1: "Beginner",
    2: "Intermediate",
    3: "Advanced",
    4: "All",
};

export default function Page({
    searchParams,
}: {
    searchParams?: {
        search?: string;
        page?: string;
        "levels[]"?: string;
        "languages[]"?: string;
        "prices[]"?: string;
        "durations[]"?: string;
    };
}) {
    const search = searchParams?.search;
    const [listCourse, setListCourse] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalResult, setTotalResult] = useState(0);
    const pathname = usePathname();
    const searchParamsLocal = useSearchParams();
    const { replace } = useRouter();
    const [stateFilter, setStateFilter] = useState<Record<string, string[]>>(
        {}
    );
    const [languageMap, setLanguageMap] = useState<Record<number, string>>({});
    const [listMenuFilter, setListMenuFilter] = useState<MenuProps["items"][]>(
        []
    );
    const [currentPage, setCurrentPage] = useState(
        Number(searchParams?.page || 1)
    );

    const getAllLanguage = () => {
        apiInstance
            .get("languages")
            .then((res) => {
                const languageMapTemp: Record<number, string> = {};
                res.data.data.forEach((language: Language) => {
                    languageMapTemp[language.id] = language.languageName;
                });
                setLanguageMap(languageMapTemp);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const searchCourse = () => {
        setIsLoading(true);
        const paramsObject: Record<string, string[]> = {};
        searchParamsLocal.forEach((value, key) => {
            if (key !== "search" && key !== "page") {
                if (paramsObject[key]) {
                    paramsObject[key].push(value);
                } else {
                    paramsObject[key] = [value];
                }
            }
        });

        apiInstance
            .get(`courses/elasticSearch`, {
                params: {
                    search: search,
                    page: currentPage,
                    pageSize: 10,
                    ...paramsObject,
                },
            })
            .then((res) => {
                console.log(res.data);

                const dataSearch = res.data as ResSearch;
                setTotalResult(dataSearch.hits.total.value);

                const languageMenuTemp =
                    dataSearch.aggregations.language.language_id.buckets.map(
                        (language) => {
                            return getItem(
                                <span>
                                    {languageMap[language.key]}{" "}
                                    <span className="text-zinc-700">{`(${language.doc_count})`}</span>
                                </span>,
                                `${language.key}`,
                                <PlusSquareOutlined />
                            );
                        }
                    );

                const levelMenuTemp =
                    dataSearch.aggregations.level.level_id.buckets.map(
                        (level) => {
                            return getItem(
                                <span>
                                    {levelMap[level.key]}{" "}
                                    <span className="text-zinc-700">{`(${level.doc_count})`}</span>
                                </span>,
                                `${levelMap[level.key]}`,
                                <PlusSquareOutlined />
                            );
                        }
                    );

                const rangePriceMenuTemp =
                    dataSearch.aggregations.price_ranges.buckets.map(
                        (priceRange) => {
                            return getItem(
                                <span>
                                    {priceRange.key}
                                    <span className="text-zinc-700">{` (${priceRange.doc_count})`}</span>
                                </span>,
                                `${priceRange.key.toLocaleLowerCase()}`,
                                <PlusSquareOutlined />
                            );
                        }
                    );

                const videoDurationRangeTemp =
                    dataSearch.aggregations.video_duration_ranges.buckets.map(
                        (videoDuration) => {
                            return getItem(
                                <span>
                                    {videoDuration.to != null
                                        ? `${videoDuration.from.toFixed()} - ${videoDuration.to.toFixed()} `
                                        : `>${videoDuration.from.toFixed()} `}
                                    <span className="text-zinc-700">{`(${videoDuration.doc_count})`}</span>
                                </span>,
                                `${videoDuration.key}`,
                                <PlusSquareOutlined />
                            );
                        }
                    );

                const languageMenu = getItem(
                    "Language",
                    "languages[]",
                    <></>,
                    languageMenuTemp
                );

                const levelMenu = getItem(
                    "Level",
                    "levels[]",
                    <></>,
                    levelMenuTemp
                );

                const rangePriceMenu = getItem(
                    "Price",
                    "prices[]",
                    <></>,
                    rangePriceMenuTemp
                );

                const videoDurationRange = getItem(
                    "Duration (minute)",
                    "durations[]",
                    <></>,
                    videoDurationRangeTemp
                );

                setListMenuFilter([
                    [languageMenu],
                    [levelMenu],
                    [rangePriceMenu],
                    [videoDurationRange],
                ]);

                setListCourse(
                    dataSearch.hits.hits.map((hit) => {
                        if (hit._source != null) {
                            if (hit.highlight?.introduction?.length > 0) {
                                return {
                                    ...(hit._source as any),
                                    introduction: hit.highlight.introduction[0],
                                };
                            } else {
                                return hit._source;
                            }
                        }
                    })
                );
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    };

    useEffect(() => {
        searchCourse();
    }, [search, currentPage, searchParamsLocal, languageMap]);

    const changePage = (page: number) => {
        setCurrentPage(page);
        const params = new URLSearchParams(searchParamsLocal);
        params.set("page", page.toString());
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const changeFilter = (filterType: string, value: string[]) => {
        const newStateFilter = { ...stateFilter, [filterType]: value };
        setStateFilter(newStateFilter);

        const params = new URLSearchParams(searchParamsLocal);
        if (value.length > 0) {
            value.forEach((item, index) => {
                if (index === 0) {
                    params.set(filterType, item);
                } else {
                    params.append(filterType, item);
                }
            });
        } else {
            params.delete(filterType);
        }
        params.set("page", "1"); // Reset the page to 1
        replace(`${pathname}?${params.toString()}`, { scroll: false });
        setCurrentPage(1);
    };

    useEffect(() => {
        getAllLanguage();
    }, []);

    useEffect(() => {
        if (searchParamsLocal != null) {
            const paramsObject: Record<string, string[]> = {};
            searchParamsLocal.forEach((value, key) => {
                if (key !== "search" && key !== "page") {
                    if (paramsObject[key]) {
                        paramsObject[key].push(value);
                    } else {
                        paramsObject[key] = [value];
                    }
                }
            });
            setStateFilter(paramsObject);
        }
    }, [searchParamsLocal]);

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
                            {listMenuFilter.map((menu, index) => (
                                <Menu
                                    key={index}
                                    items={menu}
                                    mode="inline"
                                    className="border-0"
                                    multiple
                                    onSelect={(value) => {
                                        if (
                                            menu != null &&
                                            menu[0]?.key !== null
                                        ) {
                                            const preData = {
                                                ...(stateFilter || {}),
                                            };
                                            if (
                                                preData[menu[0]?.key as any] !=
                                                null
                                            ) {
                                                preData[
                                                    menu[0]?.key as any
                                                ].push(value.key);
                                            } else {
                                                preData[menu[0]?.key as any] = [
                                                    value.key,
                                                ];
                                            }
                                            changeFilter(
                                                menu[0]?.key as any,
                                                preData[menu[0]?.key as any]
                                            );
                                        }
                                    }}
                                    onDeselect={(value) => {
                                        if (
                                            menu != null &&
                                            menu[0]?.key !== null
                                        ) {
                                            const preData = {
                                                ...(stateFilter || {}),
                                            };
                                            preData[menu[0]?.key as any] =
                                                preData[
                                                    menu[0]?.key as any
                                                ].filter(
                                                    (item) => item !== value.key
                                                );
                                            changeFilter(
                                                menu[0]?.key as any,
                                                preData[menu[0]?.key as any]
                                            );
                                        }
                                    }}
                                    selectedKeys={
                                        stateFilter != null && menu != null
                                            ? stateFilter[menu[0]?.key as any]
                                            : []
                                    }
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
                                        key={index}
                                    />
                                ))
                            ) : (
                                <div className="w-[600px] text-xl ">
                                    <h1 className="text-2xl font-semibold">
                                        Sorry, we couldn&apos;t find any results
                                        for &quot;{search}&quot;
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
                            total={totalResult}
                            className="flex flex-row lg:flex-col top-32 sticky"
                            showSizeChanger={false}
                            onChange={changePage}
                            current={currentPage}
                        />
                    </div>
                </div>
            </ConfigProvider>
        </Container>
    );
}
