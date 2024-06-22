"use client";
import React, { useEffect, useState } from "react";
import { Container } from "../ui/container";
import { Avatar, ConfigProvider, Tabs, TabsProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IndividualProfile } from "../ui/individual-profile";
import { GridCourse } from "../ui/grid-course";
import { IndividualPayment } from "../ui/individual-payment";
import { apiInstance } from "@/plugin/apiInstance";
import { User, defaultUser } from "../lib/model/user";
import { CourseInfoRes } from "../lib/model/course";
import { useTokenStore } from "../lib/store/userInfo";

export default function Page() {
    const { userInfo } = useTokenStore();
    const [userProfile, setUserProfile] = useState<User>(defaultUser);
    const [currKey, setCurrKey] = useState("");
    const [listEnrollmentCourse, setListEnrollmentCourse] = useState<
        CourseInfoRes[]
    >([]);

    const getEnrollmentCourse = () => {
        apiInstance
            .get("users/enrollment-courses", {
                headers: { Authorization: "Bear " + userInfo?.accessToken },
            })
            .then((res) => {
                setListEnrollmentCourse(res.data.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (currKey === "2") {
            getEnrollmentCourse();
        }
    }, [currKey]);

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Profile",
            children: <IndividualProfile userInfo={userProfile} />,
        },
        {
            key: "2",
            label: "Courses",
            children: <GridCourse listCourse={listEnrollmentCourse} />,
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

    const onChange = (key: string) => {
        setCurrKey(key);
    };

    const getUserInfo = () => {
        apiInstance
            .get("users/profile", {
                headers: { Authorization: "Bear " + userInfo?.accessToken },
            })
            .then((res) => {
                setUserProfile(res.data.data);
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
                    <div className="flex items-center mb-20 gap-4">
                        <Avatar
                            size={64}
                            icon={<UserOutlined />}
                            src={userProfile.profile.avatar}
                            alt=""
                        />
                        <div className="">
                            <h1 className="text-xl">{userProfile.userName}</h1>
                            <p className="text-sm text-zinc-400">
                                {userProfile.email}
                            </p>
                        </div>
                    </div>
                    <Tabs
                        items={items}
                        defaultActiveKey="1"
                        onChange={onChange}
                    />
                </div>
            </ConfigProvider>
        </Container>
    );
}
