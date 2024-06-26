"use client";

import { Locale } from "@/i18n.config";
import React, { Suspense, useEffect, useRef, useState } from "react";
const VideoCustom = React.lazy(() => import("../../../ui/video-custom"));
import { MenuLecture } from "../../../ui/menu-lecture";
import {
    Button,
    ConfigProvider,
    Drawer,
    MenuProps,
    Skeleton,
    Tabs,
    TabsProps,
} from "antd";
import { Container } from "../../../ui/container";
import { apiInstance } from "@/plugin/apiInstance";
import { LessonFull, defaultLessonFull } from "../../../lib/model/lesson";
import { Course, defaultCourse } from "../../../lib/model/course";
import { OverviewLearning } from "@/app/[lang]/ui/overview-learning";
import { Comment } from "../../../ui/comment/comment";
import { Note } from "@/app/[lang]/ui/note";
import { Reminder } from "@/app/[lang]/ui/reminder";
import { useWindowResize } from "@/app/[lang]/lib/hooks/useWindowResize";
import { useTokenStore } from "@/app/[lang]/lib/store/userInfo";
import { getToken } from "@/app/[lang]/lib/utils/get-token";
import { ChatBot } from "@/app/[lang]/ui/chatbot";
import { useRouter } from "next/navigation";

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
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const { userInfo, updateUserInfo } = useTokenStore();
    const windowSize = useWindowResize();
    const onChange = (key: string) => {};
    const route = useRouter();
    const countLogin = useRef(0);

    const [currLessonKey, setCurrLessonKey] = useState(id);

    const onClick: MenuProps["onClick"] = (e) => {
        window.history.pushState(null, "", `/en/learning/${courseId}/${e.key}`);
        setCurrLessonKey(e.key);
    };

    const setProcessing = (time: number) => {
        apiInstance
            .post(
                "users/processing",
                {
                    lessonId: dataLesson.id,
                    time: time,
                    isDone: false,
                },
                { headers: { Authorization: "Bear " + userInfo.accessToken } }
            )
            .then((res) => {
                console.log("Set processing...", res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getDataLesson = () => {
        setIsLoading(true);
        apiInstance
            .get(`lessons/${currLessonKey}`, {
                headers: {
                    Authorization: "Bearer " + userInfo?.accessToken,
                },
            })
            .then((data) => {
                setDataLesson(data.data.data.lesson);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 403) {
                    route.push("/");
                }
                setIsLoading(false);
            });
    };

    const getDataCourse = () => {
        setIsLoading(true);
        apiInstance
            .get(`courses/${courseId}`, {
                headers: {
                    Authorization: "Bearer " + userInfo?.accessToken,
                },
            })
            .then((res) => {
                setDataCourse(res.data.data.course);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    route.push("/");
                }
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (userInfo.userId !== 0) {
            getDataLesson();
        }
    }, [reloadLesson, currLessonKey, userInfo]);

    useEffect(() => {
        countLogin.current += 1;
        if (countLogin.current > 2 && userInfo.userId === 0) {
            route.push("/");
        }
        console.log(countLogin.current);
    }, [userInfo]);

    useEffect(() => {
        if (userInfo.userId !== 0) {
            getDataCourse();
        }
    }, [reloadCourse, userInfo]);

    useEffect(() => {
        updateUserInfo(getToken());
    }, []);

    useEffect(() => {
        if (userInfo.userId !== 0 && dataLesson.id !== 0) {
            setProcessing(currentTime);
            const timer = setInterval(() => {
                setProcessing(currentTime);
            }, 30000);
            return () => {
                clearInterval(timer);
            };
        }
    }, [userInfo, dataLesson]);

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Courses content",
            children: (
                <MenuLecture
                    className="w-full"
                    dataList={dataCourse.topics}
                    onItemClick={onClick}
                    currentKey={currLessonKey}
                    isShowResource
                />
            ),
        },
        {
            key: "2",
            label: "Overview",
            children: (
                <div className="">
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
                <div className="">
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
                <div className="">
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
            children: <Reminder lessonId={dataLesson?.id} />,
        },
    ];

    const itemsDesktop: TabsProps["items"] = items.map((item, index) => {
        if (index > 0) return item;
    }) as TabsProps["items"];

    return (
        <Container className="">
            <Drawer
                title={`Chatbot`}
                open={isOpenDrawer}
                onClose={() => setIsOpenDrawer(false)}
                className="w-96"
            >
                <div className="text-zinc-800">
                    <h1 className="text-base">
                        <p className="text-lg font-medium">Ask something!</p>
                        This chatbot will provide you with information about the
                        course:&nbsp;
                        <span className="text-orange-700">
                            {dataCourse.title}
                        </span>
                    </h1>
                    <div className="mt-24">
                        <ChatBot courseId={dataCourse.courseId} />
                    </div>
                </div>
            </Drawer>
            <div className="text-zinc-800 flex lg:flex-row flex-col gap-8 ">
                <div className="lg:w-2/3">
                    <Suspense
                        fallback={
                            <Skeleton
                                active
                                paragraph={{ rows: 12 }}
                                className="my-auto"
                            />
                        }
                    >
                        {isLoading === true ? (
                            <Skeleton
                                active
                                paragraph={{ rows: 12 }}
                                className="my-auto"
                            />
                        ) : (
                            <VideoCustom
                                videoSource={dataLesson?.lessonUrl}
                                onProgress={(time) => {
                                    setCurrentTime(time);
                                }}
                            />
                        )}
                    </Suspense>
                </div>
                <div className="hidden lg:block w-1/3">
                    <h1 className="text-2xl text-orange-600 font-medium mb-5">
                        Course structure
                        <Button
                            type="primary"
                            onClick={() => setIsOpenDrawer(true)}
                            className="ml-6"
                        >
                            Open Chatbot
                        </Button>
                    </h1>
                    <div className="max-h-[450px] overflow-auto">
                        <MenuLecture
                            dataList={dataCourse.topics}
                            onItemClick={onClick}
                            currentKey={currLessonKey}
                            isShowResource
                        />
                    </div>
                </div>
            </div>
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
                    items={
                        windowSize > 1024 || windowSize === 0
                            ? itemsDesktop
                            : items
                    }
                    onChange={onChange}
                    centered
                />
            </ConfigProvider>
        </Container>
    );
}
