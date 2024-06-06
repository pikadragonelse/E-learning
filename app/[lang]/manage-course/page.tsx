"use client";

import React, { useEffect, useState } from "react";
import { Container } from "../ui/container";
import { Locale } from "antd/es/locale";
import { Button, Rate, Row } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Course } from "../lib/model/course";
import { apiInstance } from "@/plugin/apiInstance";
import { useRouter } from "next/navigation";
import { useTokenStore } from "../lib/store/userInfo";

export default function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const [listCourse, setListCourse] = useState<Course[]>([]);
    const route = useRouter();
    const { userInfo } = useTokenStore();

    const getListCourse = () => {
        apiInstance
            .get("courses/courses-for-instructor", {
                headers: { Authorization: "Bear " + userInfo?.accessToken },
            })
            .then((res) => {
                setListCourse(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editCourse = (courseId: string) => {
        route.push(`/create-course/${courseId}`);
    };

    useEffect(() => {
        getListCourse();
    }, []);

    return (
        <Container>
            <div className="text-zinc-800 px-6 lg:px-20">
                <h1 className="text-3xl font-medium mb-10">List your course</h1>
                <Row justify={"end"}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="mb-4"
                        onClick={() => route.push("/create-course")}
                    >
                        Create course
                    </Button>
                </Row>
                <ul className="max-h-[800px] overflow-auto relative border bg-zinc-100 rounded-md p-6">
                    {listCourse.map((course, index) => (
                        <li
                            key={index}
                            className="flex gap-4 mb-4 items-center border rounded-md p-4 shadow-md bg-white "
                        >
                            <Image
                                src={course.posterUrl || ""}
                                alt=""
                                className="w-20 h-20 lg:w-32 lg:h-32 rounded-md object-cover"
                                width={1920}
                                height={1080}
                            />
                            <div className="flex flex-col cursor-pointer">
                                <h2 className="lg:text-lg ">{course.title}</h2>
                                <h2 className="text-xs lg:text-sm text-zinc-500">
                                    {course.instructor.profile.fullName}
                                </h2>
                                <div className="flex items-center">
                                    <span>{course.averageRating}</span>
                                    <Rate
                                        disabled
                                        defaultValue={course.averageRating}
                                        className="ml-2"
                                    />
                                </div>
                                <div className="lg:hidden">
                                    <EditOutlined
                                        onClick={() =>
                                            editCourse(course.courseId)
                                        }
                                        className=" cursor-pointer text-lg active:text-orange-600 mr-10 p-2"
                                    />
                                    <DeleteOutlined className=" cursor-pointer text-lg active:text-orange-600 mr-10 p-2" />
                                    <span className="text-orange-600 text-lg w-40 text-right">
                                        ${course.price}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-auto  gap-4 hidden lg:flex">
                                <EditOutlined
                                    onClick={() => editCourse(course.courseId)}
                                    className=" cursor-pointer text-lg active:text-orange-600 mr-10 p-2"
                                />
                                <DeleteOutlined className=" cursor-pointer text-lg active:text-orange-600 mr-10 p-2" />
                                <span className="text-orange-600 text-2xl w-40 text-right">
                                    ${course.price}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    );
}
