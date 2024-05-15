"use client";

import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Button, ConfigProvider, Menu, Popover } from "antd";
import { BorderOutlined } from "@ant-design/icons";
import { Topic } from "../lib/model/topic";
import { usePathname, useRouter } from "next/navigation";
import { apiInstance } from "@/plugin/apiInstance";
import { Resource } from "../lib/model/resource";
import { DownOutlined } from "@ant-design/icons";
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
    courseId?: string;
};
export const MenuLecture: React.FC<MenuLecture> = ({
    className,
    isSetDefault = true,
    dataList = [],
    courseId,
}) => {
    const [officialData, setOfficialData] = useState<MenuProps["items"]>();
    const [currLessonKey, setCurrLessonKey] = useState("");
    const [resourceMap, setResourceMap] = useState<Record<number, Resource[]>>(
        {}
    );
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const listPathname = pathname.split("/");
        const lessonKey = listPathname[listPathname.length - 1];
        setCurrLessonKey(lessonKey);
    }, [pathname]);

    const onClick: MenuProps["onClick"] = (e) => {
        router.push(`/learning/${courseId}/${e.key}`);
    };

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
                        <h2>{lesson.title}</h2>
                        <Popover
                            content={
                                <ul className="w-40">
                                    {resourceMap[lesson.id]?.map((resource) => (
                                        <li className="cursor-pointer w-full group">
                                            <a
                                                href={resource.url}
                                                className="group-hover:text-orange-600 text-zinc-800"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                }}
                                            >
                                                {resource.name}
                                            </a>
                                        </li>
                                    ))}
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
                <h2 key={index} className="font-medium">
                    {topic.name}
                </h2>,
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
                        itemBorderRadius: 0,
                    },
                },
            }}
        >
            <Menu
                onClick={onClick}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                items={officialData}
                className={className}
                selectedKeys={[currLessonKey]}
            />
        </ConfigProvider>
    );
};
