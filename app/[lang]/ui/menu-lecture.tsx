"use client";

import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Button, ConfigProvider, Menu, Popover, Tooltip } from "antd";
import { BorderOutlined } from "@ant-design/icons";
import { Topic } from "../lib/model/topic";
import { usePathname } from "next/navigation";
import { apiInstance } from "@/plugin/apiInstance";
import { Resource } from "../lib/model/resource";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import clsx from "clsx";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export type MenuLecture = {
    className?: string;
    isSetDefault?: boolean;
    dataList?: Topic[];
    onItemClick?: MenuProps["onClick"];
    currentKey?: string;
};
export const MenuLecture: React.FC<MenuLecture> = ({
    className,
    isSetDefault = true,
    dataList = [],
    onItemClick,
    currentKey,
}) => {
    const [officialData, setOfficialData] = useState<MenuProps["items"]>();
    const [resourceMap, setResourceMap] = useState<Record<number, Resource[]>>(
        {}
    );

    const resourceLesson = async (lessonId: number) => {
        const data = await apiInstance
            .get(`lessons/${lessonId}/resources`)
            .then((res) => {
                const lessonResourceMap = {
                    [lessonId]: res.data.data,
                };

                return lessonResourceMap;
            })
            .catch((error) => console.log(error));

        return data;
    };

    const handleDataList = () => {
        const newList = dataList.map((topic, index) => {
            const listLesson = topic.lessons.map((lesson) => {
                return getItem(
                    <div className="flex relative items-center">
                        <Tooltip title={lesson.title}>
                            <h2 className="w-auto overflow-hidden truncate">
                                {lesson.title}
                            </h2>
                        </Tooltip>

                        <Popover
                            content={
                                <ul className="w-40">
                                    {resourceMap[lesson.id]?.map(
                                        (resource, index) => (
                                            <li
                                                className="cursor-pointer group "
                                                key={index}
                                            >
                                                <a
                                                    href={resource.url}
                                                    className="group-hover:text-orange-600 text-zinc-800 "
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                    }}
                                                >
                                                    {resource.name}
                                                </a>
                                            </li>
                                        )
                                    )}
                                </ul>
                            }
                            placement="bottom"
                            arrow={false}
                        >
                            <Button
                                icon={<DownOutlined />}
                                className={clsx(
                                    "absolute right-0 w-40  justify-around items-center",
                                    {
                                        hidden:
                                            resourceMap[lesson.id]?.length < 1,
                                        flex:
                                            resourceMap[lesson.id]?.length > 1,
                                    }
                                )}
                            >
                                Resource
                            </Button>
                        </Popover>
                    </div>,
                    lesson.id,
                    <BorderOutlined />
                );
            });

            return getItem(
                <Tooltip title={topic.name}>
                    <h2
                        key={index}
                        className="font-medium w-auto overflow-hidden truncate"
                    >
                        {topic.name}
                    </h2>
                </Tooltip>,
                topic.id,
                "",
                listLesson
            );
        });

        setOfficialData(newList);
    };

    const getLesson = async (dataList: Topic[]) => {
        let tempMap: Record<number, Resource[]> = {};
        const promises: Promise<void>[] = [];

        dataList.forEach((topic) => {
            topic.lessons.forEach((lesson) => {
                const promise = resourceLesson(lesson.id).then((newMap) => {
                    tempMap = { ...tempMap, ...newMap };
                });
                promises.push(promise);
            });
        });

        await Promise.all(promises);
        setResourceMap(tempMap);
    };

    useEffect(() => {
        getLesson(dataList);
    }, [dataList]);

    useEffect(() => {
        handleDataList();
    }, [resourceMap]);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemActiveBg: "rgb(255 208 183)",
                        itemSelectedBg: "rgb(255 232 219)",
                        itemSelectedColor: "rgb(255 97 15)",
                        // colorText: "#fefefe",
                        colorBgContainer: "#00000",
                        itemBg: "",
                    },
                },
            }}
        >
            <Menu
                onClick={onItemClick}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                items={officialData}
                className={` rounded-lg text-xs py-4 ${className} `}
                selectedKeys={[currentKey || ""]}
            />
        </ConfigProvider>
    );
};
