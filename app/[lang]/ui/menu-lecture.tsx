"use client";

import React from "react";
import type { MenuProps } from "antd";
import { ConfigProvider, Menu } from "antd";
import { BorderOutlined } from "@ant-design/icons";

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

export type MenuLecture = { className?: string };
export const MenuLecture: React.FC<MenuLecture> = ({ className }) => {
    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e);
    };

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
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                items={items}
                className={className}
            />
        </ConfigProvider>
    );
};
