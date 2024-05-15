"use client";

import { Locale } from "@/i18n.config";
import React, { useEffect, useState } from "react";
import { VideoCustom } from "../../../ui/video-custom";
import { MenuLecture } from "../../../ui/menu-lecture";
import { ConfigProvider, Tabs, TabsProps } from "antd";
import { Container } from "../../../ui/container";
import { apiInstance } from "@/plugin/apiInstance";
import { LessonFull, defaultLessonFull } from "../../../lib/model/lesson";
import { Course, defaultCourse } from "../../../lib/model/course";
import { OverviewLearning } from "@/app/[lang]/ui/overview-learning";
import { Comment } from "../../../ui/comment/comment";
import { Note } from "@/app/[lang]/ui/note";
import { useToken } from "@/app/[lang]/lib/hooks/useToken";

export default function Page({
    params: { lang, id, courseId },
}: {
    params: { lang: Locale; id: string; courseId: string };
}) {
    const [dataLesson, setDataLesson] = useState<LessonFull>(defaultLessonFull);
    const [dataCourse, setDataCourse] = useState<Course>(defaultCourse);
    const [currentTime, setCurrentTime] = useState(0);
    const [reloadCourse, setReloadCourse] = useState(0);
    const [reloadLesson, setReloadLesson] = useState(0);
    const userDataToken = useToken();
    const onChange = (key: string) => {};

    const getDataLesson = () => {
        apiInstance
            .get(`lessons/${id}`, {
                headers: {
                    Authorization: "Bearer " + userDataToken?.accessToken,
                },
            })
            .then((data) => {
                setDataLesson(data.data.data.lesson);
                console.log(data.data.data.lesson);
            })
            .catch((err) => console.log(err));
    };

    const getDataCourse = () => {
        apiInstance
            .get(`courses/${courseId}`, {
                headers: {
                    Authorization: "Bearer " + userDataToken?.accessToken,
                },
            })
            .then((res) => {
                setDataCourse(res.data.data.course);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getDataLesson();
    }, [reloadLesson]);

    useEffect(() => {
        getDataCourse();
    }, [reloadCourse]);

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Courses content",
            children: (
                <MenuLecture
                    className="w-full"
                    dataList={dataCourse.topics}
                    courseId={dataCourse.courseId}
                />
            ),
        },
        {
            key: "2",
            label: "Overview",
            children: (
                <div className="h-[600px] p-6 max-h-[600px] overflow-auto">
                    <OverviewLearning courseData={dataCourse} />,
                </div>
            ),
        },
        {
            key: "3",
            label: "Notes",
            children: <Note lessonId={dataLesson?.id} currTime={currentTime} />,
        },
        {
            key: "4",
            label: "Comments",
            children: (
                <div className="h-[600px] p-6 max-h-[600px] overflow-auto">
                    <Comment
                        listReview={dataLesson?.comments}
                        type="comment"
                        itemId={dataLesson?.id}
                        onPost={() => setReloadLesson((prev) => prev + 1)}
                        onDeleteCmt={() => setReloadLesson((prev) => prev + 1)}
                    />
                </div>
            ),
        },
        {
            key: "5",
            label: "Reviews",
            children: (
                <div className="h-[600px] p-6 max-h-[600px] overflow-auto">
                    <Comment
                        listReview={dataCourse.reviews}
                        title="Reviews"
                        type="review"
                        itemId={dataCourse.courseId}
                        onPost={() => setReloadCourse((prev) => prev + 1)}
                        onDeleteCmt={() => setReloadCourse((prev) => prev + 1)}
                    />
                    ,
                </div>
            ),
        },
        {
            key: "6",
            label: "Reminders",
            children: "Content of Tab Pane 3",
        },
    ];

    const itemsDesktop: TabsProps["items"] = items.map((item, index) => {
        if (index > 0) return item;
    }) as TabsProps["items"];

    return (
        <Container>
            <div className="text-zinc-800 flex lg:flex-row flex-col gap-8">
                <div className="lg:w-2/3">
                    <VideoCustom
                        videoSource={dataLesson?.lessonUrl}
                        onProgress={(time) => {
                            setCurrentTime(time);
                        }}
                    />
                    <ConfigProvider
                        theme={{
                            components: {
                                Tabs: {
                                    inkBarColor: "rgb(255 97 15)",
                                    itemHoverColor: "rgb(255 145 88)",
                                    itemSelectedColor: "rgb(255 97 15)",
                                    itemActiveColor: "rgb(255 87 0)",
                                },
                            },
                        }}
                    >
                        <Tabs
                            defaultActiveKey="1"
                            items={items}
                            onChange={onChange}
                            className="lg:hidden"
                        />
                        <Tabs
                            defaultActiveKey="1"
                            items={itemsDesktop}
                            onChange={onChange}
                            className="hidden lg:flex"
                        />
                    </ConfigProvider>
                </div>
                <div className="hidden lg:block w-1/3">
                    <h1 className="text-2xl text-orange-600 font-medium">
                        Course structure
                    </h1>
                    <MenuLecture
                        dataList={dataCourse.topics}
                        courseId={dataCourse.courseId}
                    />
                </div>
            </div>
        </Container>
    );
}
