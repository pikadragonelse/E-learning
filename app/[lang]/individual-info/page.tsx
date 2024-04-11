"use client";
import React from "react";
import { Container } from "../ui/container";
import { Avatar, ConfigProvider, Tabs, TabsProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IndividualProfile } from "../ui/individual-profile";
import { GridCourse } from "../ui/grid-course";
import { IndividualPayment } from "../ui/individual-payment";

export default function Page() {
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Profile",
            children: <IndividualProfile />,
        },
        {
            key: "2",
            label: "Courses",
            children: <GridCourse />,
        },
        {
            key: "3",
            label: "History",
            children: <GridCourse />,
        },
        {
            key: "4",
            label: "Payment history",
            children: <IndividualPayment />,
        },
        {
            key: "5",
            label: "Payment",
            children: <IndividualPayment />,
        },
    ];

    const onChange = (key: string) => {};

    return (
        <Container>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#E3311D",
                    },
                }}
            >
                <div className="md:px-20 text-zinc-800">
                    <div className="flex items-center mb-20 gap-4">
                        <Avatar size={64} icon={<UserOutlined />} />
                        <div className="">
                            <h1 className="text-xl">Nguyen Ngoc Bao Long</h1>
                            <p className="text-sm text-zinc-400">
                                Chuyen mon nghiep vu
                            </p>
                        </div>
                    </div>
                    <Tabs items={items} defaultActiveKey="1" />
                </div>
            </ConfigProvider>
        </Container>
    );
}
