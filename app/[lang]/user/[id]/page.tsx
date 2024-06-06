"use client";
import React, { useEffect, useState } from "react";
import { Container } from "../../ui/container";
import { Avatar, ConfigProvider, Tabs, TabsProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IndividualProfile } from "../../ui/individual-profile";
import { GridCourse } from "../../ui/grid-course";
import { IndividualPayment } from "../../ui/individual-payment";
import { apiInstance } from "@/plugin/apiInstance";
import { useToken } from "../../lib/hooks/useToken";
import { Instructor, User, defaultUser } from "../../lib/model/user";
import { Course } from "../../lib/model/course";
import parse from "html-react-parser";

export default function Page({ params: { id } }: { params: { id: number } }) {
    const userToken = useToken();
    const [userInfo, setUserInfo] = useState<Instructor>();
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
            .get(`users/instructors/${id}`, {
                headers: { Authorization: "Bear " + userToken?.accessToken },
            })
            .then((res) => {
                setUserInfo(res.data.data);
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
                            src={userInfo?.avatar}
                            alt=""
                            className="border border-solid border-zinc-800"
                        />
                        <div className="">
                            <h1 className="text-xl">{userInfo?.fullName}</h1>
                            <p className="text-sm text-zinc-400">
                                {userInfo?.createdAt}
                            </p>
                        </div>
                    </div>
                    <p className="my-20">
                        {parse(userInfo?.description || "")}
                    </p>
                    <Tabs items={items} defaultActiveKey="1" />
                </div>
            </ConfigProvider>
        </Container>
    );
}
