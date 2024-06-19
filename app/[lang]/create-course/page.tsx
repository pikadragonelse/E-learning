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
    message,
} from "antd";
import { Locale } from "antd/es/locale";
import React, { useEffect, useRef, useState } from "react";
import { FormCreateOverallInfo } from "../ui/create-course/form-create-overall-info";
import { FormCreateSession } from "../ui/create-course/form-create-session";
import { LeftOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { Course, defaultCourse } from "../lib/model/course";
import { UploadType, getBase64 } from "../lib/utils/upload";
import Link from "next/link";
import { apiInstance } from "@/plugin/apiInstance";
import { useRouter } from "next/navigation";
import { RcFile } from "antd/es/upload";
import { useTokenStore } from "../lib/store/userInfo";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export default function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const [newCourse, setNewCourse] = useState<Course>(defaultCourse);
    const [currentStep, setCurrentStep] = useState(1);
    const [activeKey, setActiveKey] = useState("1");
    const [imageUrl, setImageUrl] = useState<any>();
    const [fileList, setFileList] = useState<any>([]);
    const [trailerUrl, setTrailerUrl] = useState<string | null>();
    const [items, setItems] = useState<any>([]);
    const newTabIndex = useRef(2);
    const { userInfo } = useTokenStore();
    const [linkUploadPoster, setLinkUploadPoster] = useState("");
    const [linkUploadTrailer, setLinkUploadTrailer] = useState("");
    const route = useRouter();

    useEffect(() => {
        setItems([
            {
                label: "Topic 1",
                children: (
                    <div className="h-[700px] max-h-[700px] overflow-auto">
                        <FormCreateSession
                            idSession={1}
                            courseId={newCourse.courseId}
                        />
                    </div>
                ),
                key: "1",
                closable: false,
            },
        ]);
    }, [newCourse]);

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
                        courseId={newCourse.courseId}
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
            .get(
                `courses/${newCourse.courseId}/presigned-url-to-upload-poster`,
                { headers: { Authorization: "Bear " + userInfo?.accessToken } }
            )
            .then((res) => {
                setLinkUploadPoster(res.data.data);
                console.log("Link", res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const uploadPoster = async (option: any) => {
        try {
            const putResponse = await apiInstance.put(
                linkUploadPoster,
                option.file,
                {
                    headers: {
                        "Content-Type": "image/jpeg",
                    },
                    onUploadProgress: (event) => {
                        const percentCompleted = Math.round(
                            (event.loaded * 100) / (event.total || 1)
                        );
                        if (option.onProgress != null) {
                            option.onProgress({
                                percent: percentCompleted,
                            });
                        }
                    },
                }
            );

            console.log("PUT response:", putResponse);
            if (option.onSuccess) option.onSuccess(putResponse.data);
        } catch (error) {
            console.log("PUT error:", error);
            if (option.onError) option.onError(error);
        }

        try {
            const getResponse = await apiInstance.get(
                `courses/${newCourse.courseId}/clear-cache-poster`,
                {
                    headers: {
                        Authorization: "Bearer " + userInfo?.accessToken,
                    },
                }
            );

            console.log("Result clear: ", getResponse.data);
        } catch (error) {
            console.log("GET error:", error);
        }
    };

    const getLinkUploadTrailer = () => {
        apiInstance
            .get(
                `courses/${newCourse.courseId}/presigned-url-to-upload-trailer`,
                { headers: { Authorization: "Bear " + userInfo?.accessToken } }
            )
            .then((res) => {
                setLinkUploadTrailer(res.data.data);
                console.log("Link trailer: ", res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const uploadTrailer = async (option: any) => {
        try {
            // Thực hiện PUT request cho trailer
            const putResponse = await apiInstance.put(
                linkUploadTrailer,
                option.file,
                {
                    headers: {
                        "Content-Type": "video/mp4",
                    },
                    onUploadProgress: (event) => {
                        const percentCompleted = Math.round(
                            (event.loaded * 100) / (event.total || 1)
                        );
                        if (option.onProgress != null) {
                            option.onProgress({
                                percent: percentCompleted,
                            });
                        }
                    },
                }
            );

            // Log PUT response và gọi onSuccess nếu tồn tại
            console.log(putResponse);
            if (option.onSuccess) option.onSuccess(putResponse.data);
        } catch (error) {
            // Log PUT error và gọi onError nếu tồn tại
            console.log(error);
            if (option.onError) option.onError(error);
        }

        try {
            // Thực hiện GET request để clear cache trailer
            const getResponse = await apiInstance.get(
                `courses/${newCourse.courseId}/clear-cache-trailer`,
                {
                    headers: {
                        Authorization: "Bearer " + userInfo?.accessToken,
                    },
                }
            );

            // Log GET response
            console.log("Result clear: ", getResponse.data);
        } catch (error) {
            // Log GET error
            console.log(error);
        }
    };

    useEffect(() => {
        if (currentStep === 2) {
            getLinkUploadPoster();
            getLinkUploadTrailer();
        }
    }, [currentStep]);

    const beforeUpload = (file: RcFile): boolean => {
        const isVideo = file.type.startsWith("video/");
        if (!isVideo) {
            message.error("You can only upload video files!");
            return false;
        }

        // Create a URL for the video file and set it to state
        const videoUrl = URL.createObjectURL(file);
        setTrailerUrl(videoUrl);

        // Prevent the actual upload
        return true;
    };

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
                                onNext={(course) => {
                                    setNewCourse(course);
                                    setCurrentStep(2);
                                }}
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
                                            <img src={imageUrl} alt="Poster" />
                                        ) : (
                                            <div className="select-none text-sm w-full h-full border flex items-center justify-center bg-zinc-200 ">
                                                Poster
                                            </div>
                                        )}
                                    </div>
                                    <Upload
                                        customRequest={async (option) => {
                                            uploadPoster(option);
                                        }}
                                        onChange={handleChange}
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
                                            <div style={{ marginTop: 20 }}>
                                                <video
                                                    className="w-72"
                                                    controls
                                                >
                                                    <source
                                                        src={trailerUrl || ""}
                                                        type="video/mp4"
                                                    />
                                                    Your browser does not
                                                    support the video tag.
                                                </video>
                                            </div>
                                        ) : (
                                            <div className="select-none text-sm w-full h-full border flex items-center justify-center bg-zinc-200 ">
                                                Trailer
                                            </div>
                                        )}
                                    </div>
                                    <Upload
                                        customRequest={async (option) => {
                                            uploadTrailer(option);
                                        }}
                                        beforeUpload={beforeUpload}
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
                                            `detail-course/${newCourse.courseId}`
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
