"use client";

import {
    Button,
    ConfigProvider,
    Row,
    Tabs,
    Upload,
    UploadProps,
    Image,
    Space,
} from "antd";
import { Locale } from "antd/es/locale";
import React, { useEffect, useRef, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import clsx from "clsx";
import Link from "next/link";
import { apiInstance } from "@/plugin/apiInstance";
import { useRouter } from "next/navigation";
import { Course, defaultCourse } from "../../lib/model/course";
import { useToken } from "../../lib/hooks/useToken";
import { FormCreateSession } from "../../ui/create-course/form-create-session";
import { UploadType, beforeUpload, getBase64 } from "../../lib/utils/upload";
import { FormCreateOverallInfo } from "../../ui/create-course/form-create-overall-info";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function Page({
    params: { lang, id },
}: {
    params: { lang: Locale; id: string };
}) {
    const [course, setCourse] = useState<Course>(defaultCourse);
    const [currentStep, setCurrentStep] = useState(1);
    const [activeKey, setActiveKey] = useState("1");
    const [imageUrl, setImageUrl] = useState<any>();
    const [fileList, setFileList] = useState<any>([]);
    const [fileListTrailer, setFileListTrailer] = useState<any>([]);
    const [trailerUrl, setTrailerUrl] = useState();
    const [items, setItems] = useState<any>([]);
    const newTabIndex = useRef(2);
    const userToken = useToken();
    const [linkUploadPoster, setLinkUploadPoster] = useState("");
    const route = useRouter();

    const getDataCourse = () => {
        apiInstance
            .get(`courses/${id}`)
            .then((res) => {
                setCourse(res.data.data.course);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getDataCourse();
    }, [id]);

    useEffect(() => {
        if (currentStep === 3) {
            if (course.topics.length > 0) {
                newTabIndex.current = course.topics.length;
                const listTopicTab = course.topics.map((topic, index) => {
                    return {
                        label: `Topic ${index + 1}`,
                        children: (
                            <div className="h-[700px] max-h-[700px] overflow-auto">
                                <FormCreateSession
                                    idSession={index + 1}
                                    courseId={course.courseId}
                                />
                            </div>
                        ),
                        key: `${index + 1}`,
                        closable: false,
                    };
                });

                setItems(listTopicTab);
            } else {
                setItems([
                    {
                        label: `Topic 1`,
                        children: (
                            <div className="h-[700px] max-h-[700px] overflow-auto">
                                <FormCreateSession
                                    idSession={1}
                                    courseId={course.courseId}
                                />
                            </div>
                        ),
                        key: `${1}`,
                        closable: false,
                    },
                ]);
            }
        }
        if (currentStep === 2) {
            setImageUrl(course.posterUrl);
        }
    }, [course, currentStep]);

    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    const add = () => {
        const newActiveKey = `${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({
            label: `Topic ${newActiveKey}`,
            children: (
                <div className="h-[700px] max-h-[700px] overflow-auto">
                    <FormCreateSession
                        idSession={Number(newActiveKey)}
                        courseId={course.courseId}
                    />
                </div>
            ),
            key: newActiveKey,
            closable: true,
        });
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: TargetKey) => {
        newTabIndex.current--;
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item: any, i: any) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item: any) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: "add" | "remove"
    ) => {
        if (action === "add") {
            add();
        } else {
            remove(targetKey);
        }
    };

    const handleChange: UploadProps["onChange"] = (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        setFileList(fileList);
        if (info.file.status === "uploading") {
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as UploadType, (url) => {
                setImageUrl(url);
            });
        }
    };

    const getLinkUploadPoster = () => {
        apiInstance
            .get(`courses/${course.courseId}/presigned-url-to-upload-poster`, {
                headers: { Authorization: "Bear " + userToken?.accessToken },
            })
            .then((res) => {
                setLinkUploadPoster(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getLinkUploadPoster();
        if (course.courseId !== "") {
        }
    }, [course]);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#E3311D",
                },
            }}
        >
            <div className="relative bg-orange-600 z-10">
                <Link
                    href="/"
                    className="ml-10 gap-2 py-3 text-white text-xl w-fit  flex items-center hover:text-orange-100 active:text-orange-200 cursor-pointer transition-all"
                >
                    <LeftOutlined className="text-2xl " />
                    Back to home
                </Link>
            </div>
            <div className="text-zinc-800 py-6 md:px-20 flex flex-col gap-4 ">
                <div className="flex relative  overflow-hidden flex-col lg:flex-row">
                    <div className="rounded-md flex flex-col relative flex-1 ">
                        <div
                            className={clsx(" p-4 ", {
                                hidden: currentStep !== 1,
                            })}
                        >
                            <div className="mb-4">
                                <h1 className="font-medium text-xl m-0 mb-2 text-[#E3311D]">
                                    Course landing page
                                </h1>
                                <p className="text-sm">
                                    The information that is given in this form
                                    will be showed in course landing page. Your
                                    course landing page is crucial to your
                                    success on Alpha. If it’s done right, it can
                                    also help you gain visibility in search
                                    engines like Google. As you complete this
                                    section, think about creating a compelling
                                    Course Landing Page that demonstrates why
                                    someone would want to enroll in your course.
                                    Learn more about{" "}
                                    <span className="text-[#E3311D] cursor-pointer">
                                        creating your course landing page
                                    </span>{" "}
                                    and{" "}
                                    <span className="text-[#E3311D] cursor-pointer">
                                        course title standards
                                    </span>
                                    .
                                </p>
                            </div>

                            <FormCreateOverallInfo
                                className="w-full"
                                onNext={() => {
                                    setCurrentStep(2);
                                }}
                                course={course}
                            />
                        </div>
                        <div
                            className={clsx("p-4", {
                                hidden: currentStep !== 2,
                            })}
                        >
                            <div className="mb-12">
                                <h1 className="font-medium text-xl m-0 mb-2 text-[#E3311D]">
                                    Course landing page
                                </h1>
                                <p className="text-sm">
                                    The information that is given in this form
                                    will be showed in course landing page. Your
                                    course landing page is crucial to your
                                    success on Alpha. If it’s done right, it can
                                    also help you gain visibility in search
                                    engines like Google. As you complete this
                                    section, think about creating a compelling
                                    Course Landing Page that demonstrates why
                                    someone would want to enroll in your course.
                                    Learn more about{" "}
                                    <span className="text-[#E3311D] cursor-pointer">
                                        creating your course landing page
                                    </span>{" "}
                                    and{" "}
                                    <span className="text-[#E3311D] cursor-pointer">
                                        course title standards
                                    </span>
                                    .
                                </p>
                            </div>
                            <div className="flex gap-10 mb-6 justify-around flex-wrap">
                                <div className="flex flex-col items-center gap-4 ">
                                    <h1 className="font-medium">Poster</h1>
                                    <div className="w-72 h-72 flex items-center justify-center rounded-lg overflow-hidden">
                                        {imageUrl !== "" && imageUrl != null ? (
                                            <Image
                                                src={imageUrl}
                                                alt="Poster"
                                            />
                                        ) : (
                                            <div className="select-none text-sm w-full h-full border flex items-center justify-center bg-zinc-200 ">
                                                Poster
                                            </div>
                                        )}
                                    </div>
                                    <Upload
                                        fileList={fileList}
                                        action={linkUploadPoster}
                                        name="poster"
                                        onChange={handleChange}
                                        className="flex flex-col items-center"
                                        onRemove={() => setImageUrl("")}
                                        method="PUT"
                                    >
                                        <Button type="primary">
                                            Upload poster
                                        </Button>
                                    </Upload>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <h1 className="font-medium ">Trailer</h1>
                                    <div className="w-72 h-72 flex items-center justify-center rounded-lg overflow-hidden">
                                        {trailerUrl !== "" &&
                                        trailerUrl != null ? (
                                            <Image src={""} alt="Trailer" />
                                        ) : (
                                            <div className="select-none text-sm w-full h-full border flex items-center justify-center bg-zinc-200 ">
                                                Trailer
                                            </div>
                                        )}
                                    </div>
                                    <Upload
                                        fileList={fileListTrailer}
                                        name="trailer"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                        className="flex flex-col items-center"
                                    >
                                        <Button type="primary">
                                            Upload preview video
                                        </Button>
                                    </Upload>
                                </div>
                            </div>
                            <Row justify={"end"}>
                                <Space>
                                    <Button
                                        onClick={() =>
                                            setCurrentStep((prev) => prev - 1)
                                        }
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => setCurrentStep(3)}
                                    >
                                        Next
                                    </Button>
                                </Space>
                            </Row>
                        </div>
                        <div
                            className={clsx("p-4", {
                                hidden: currentStep !== 3,
                            })}
                        >
                            <div className="mb-12">
                                <h1 className="font-medium text-xl m-0 mb-2 text-[#E3311D]">
                                    Course landing page
                                </h1>
                                <p className="text-sm">
                                    The information that is given in this form
                                    will be showed in course landing page. Your
                                    course landing page is crucial to your
                                    success on Alpha. If it’s done right, it can
                                    also help you gain visibility in search
                                    engines like Google. As you complete this
                                    section, think about creating a compelling
                                    Course Landing Page that demonstrates why
                                    someone would want to enroll in your course.
                                    Learn more about{" "}
                                    <span className="text-[#E3311D] cursor-pointer">
                                        creating your course landing page
                                    </span>{" "}
                                    and{" "}
                                    <span className="text-[#E3311D] cursor-pointer">
                                        course title standards
                                    </span>
                                    .
                                </p>
                            </div>
                            <Row justify={"start"} className="gap-2 mb-2">
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        route.push(
                                            `/detail-course/${course.courseId}`
                                        );
                                    }}
                                >
                                    Done
                                </Button>
                            </Row>
                            <Tabs
                                type="editable-card"
                                onChange={onChange}
                                activeKey={activeKey}
                                onEdit={onEdit}
                                items={items}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
}
