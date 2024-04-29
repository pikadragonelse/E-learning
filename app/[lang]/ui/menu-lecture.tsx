"use client";

import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { ConfigProvider, Menu } from "antd";
import { BorderOutlined } from "@ant-design/icons";
import { Topic } from "../lib/model/topic";
import { usePathname, useRouter } from "next/navigation";

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

    const handleDataList = () => {
        const newList = dataList.map((topic) => {
            const listLesson = topic.lessons.map((lesson) => {
                return getItem(lesson.title, lesson.id, <BorderOutlined />);
            });
            return getItem(
                <h2 className="font-medium">{topic.name}</h2>,
                topic.id,
                "",
                listLesson
            );
        });

        setOfficialData(newList);
    };

    useEffect(() => {
        if (dataList.length > 0) {
            handleDataList();
        }
    }, [dataList]);

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
