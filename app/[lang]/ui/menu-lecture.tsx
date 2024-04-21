"use client";

import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { ConfigProvider, Menu } from "antd";
import { BorderOutlined } from "@ant-design/icons";
import { Topic } from "../lib/model/topic";

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

const items: MenuProps["items"] = [
    getItem("Navigation One", "sub1", "", [
        getItem("Item 1", "1", <BorderOutlined />),
        getItem("Item 2", "2", <BorderOutlined />),
    ]),

    getItem("Navigation Two", "sub2", "", [
        getItem("Option 5", "5", <BorderOutlined />),
        getItem("Option 6", "6", <BorderOutlined />),
    ]),
    getItem("Navigation Three", "sub4", "", [
        getItem("Option 9", "9", <BorderOutlined />),
        getItem("Option 10", "10", <BorderOutlined />),
        getItem("Option 11", "11", <BorderOutlined />),
        getItem("Option 12", "12", <BorderOutlined />),
    ]),
];

export type MenuLecture = {
    className?: string;
    isSetDefault?: boolean;
    dataList?: Topic[];
};
export const MenuLecture: React.FC<MenuLecture> = ({
    className,
    isSetDefault = true,
    dataList = [],
}) => {
    const [officialData, setOfficialData] = useState<MenuProps["items"]>();

    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e);
    };

    const handleDataList = () => {
        const newList = dataList.map((topic, index) => {
            const listLesson = topic.lessons.map((lesson, index) => {
                return getItem(
                    lesson.title,
                    lesson.title + index,
                    <BorderOutlined />
                );
            });
            return getItem(topic.name, topic.name + index, "", listLesson);
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
                defaultSelectedKeys={isSetDefault ? ["1"] : [""]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                items={officialData}
                className={className}
            />
        </ConfigProvider>
    );
};
