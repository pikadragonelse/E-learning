"use client";
import React, { useEffect, useState } from "react";
import { Container } from "../../ui/container";
import { Avatar, ConfigProvider, Tabs, TabsProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { GridCourse } from "../../ui/grid-course";
import { apiInstance } from "@/plugin/apiInstance";
import { Instructor } from "../../lib/model/user";
import { Course } from "../../lib/model/course";
import parse from "html-react-parser";
import { useTokenStore } from "../../lib/store/userInfo";
import { decryptUrlSafe } from "../../lib/utils/crypt";

export default function Page({ params: { id } }: { params: { id: number } }) {
    const { userInfo } = useTokenStore();
    const [userProfile, setUserProfile] = useState<Instructor>();
    const [listCourse, setListCourse] = useState<Course[]>([]);

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Courses",
            children: (
                <GridCourse
                    listCourseFull={listCourse}
                    type="full"
                    isHiddenButton={false}
                />
            ),
        },
    ];

    const getUserInfo = () => {
        apiInstance
            .get(
                `users/instructors/${decryptUrlSafe(
                    id.toString(),
                    process.env.CRYPTO_SECRET_KEY || ""
                )}`,
                {
                    headers: { Authorization: "Bear " + userInfo?.accessToken },
                }
            )
            .then((res) => {
                setUserProfile(res.data.data);
                setListCourse(res.data.courses.rows);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getUserInfo();
    }, []);

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
                    <div className="flex items-center gap-4">
                        <Avatar
                            size={64}
                            icon={<UserOutlined />}
                            src={userProfile?.avatar}
                            alt=""
                            className="border border-solid border-zinc-800"
                        />
                        <div className="">
                            <h1 className="text-xl">{userProfile?.fullName}</h1>
                        </div>
                    </div>
                    <p className="my-20">
                        {parse(userProfile?.description || "")}
                    </p>
                    <Tabs items={items} defaultActiveKey="1" />
                </div>
            </ConfigProvider>
        </Container>
    );
}
