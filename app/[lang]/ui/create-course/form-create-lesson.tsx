"use client";

import {
    Button,
    Divider,
    Form,
    Input,
    Row,
    Select,
    Upload,
    UploadProps,
    message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import {
    UploadOutlined,
    PlusOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import clsx from "clsx";
import { apiInstance } from "@/plugin/apiInstance";
import { useToken } from "../../lib/hooks/useToken";
import { LessonFull, defaultLessonFull } from "../../lib/model/lesson";
import axios from "axios";
import { Lesson } from "../../lib/model/topic";

type FieldType = {
    title: string;
    isPreview: boolean;
};

export type FormCreateLesson = {
    idForm?: number;
    onAdd?: (...props: any) => unknown;
    onDelete?: (idLesson: number) => unknown;
    isShowAddForm?: boolean;
    topicId?: number;
    lesson?: Lesson;
};
export const FormCreateLesson: React.FC<FormCreateLesson> = ({
    idForm,
    onAdd = () => {},
    onDelete = () => {},
    isShowAddForm = true,
    topicId,
    lesson,
}) => {
    const [form] = useForm();
    const [fileVideoList, setFileVideoList] = useState<any>();
    const [videoDuration, setVideoDuration] = useState(0);
    const [createType, setCreateType] = useState<"info" | "source">("info");
    const [infoCreatedLesson, setInfoCreatedLesson] = useState<
        LessonFull | Lesson
    >(defaultLessonFull);
    const userToken = useToken();
    const [linkUploadVideo, setLinkUploadVideo] = useState("");

    const getVideoDuration = (videoFile: File) => {
        const videoElement = document.createElement("video");
        videoElement.preload = "metadata";
        videoElement.onloadedmetadata = () => {
            window.URL.revokeObjectURL(videoElement.src);

            const duration = videoElement.duration;
            setVideoDuration(duration);
        };
        videoElement.src = URL.createObjectURL(videoFile);
    };

    const handleChangeVideoUpload: UploadProps["onChange"] = (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        setFileVideoList(fileList);

        getVideoDuration(info.file.originFileObj as File);
    };

    const createInfoLesson = (infoForm: FieldType) => {
        apiInstance
            .post(
                "lessons",
                {
                    lessons: [
                        {
                            title: infoForm.title,
                            isPreview: infoForm.isPreview,
                            duration: 1,
                            topicId: topicId,
                        },
                    ],
                },
                { headers: { Authorization: "Bear " + userToken?.accessToken } }
            )
            .then((res) => {
                setInfoCreatedLesson(res.data.data[0]);
                setCreateType("source");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateInfoLesson = (infoForm: FieldType) => {
        apiInstance
            .put(
                `lessons/${lesson?.id}`,
                {
                    lessons: [
                        {
                            title: infoForm.title,
                            isPreview: infoForm.isPreview,
                            duration: 1,
                        },
                    ],
                },
                { headers: { Authorization: "Bear " + userToken?.accessToken } }
            )
            .then((res) => {
                message.success("Update lesson successful!");
            })
            .catch((error) => {
                console.log(error);
                message.error(
                    "Update lesson error, please wait few seconds and try again!"
                );
            });
    };

    const getLinkUploadVideo = () => {
        apiInstance
            .get("lessons/presign-url/upload-video", {
                headers: { Authorization: "Bear " + userToken?.accessToken },
                params: {
                    lessonId: infoCreatedLesson.id,
                },
            })
            .then((res) => {
                setLinkUploadVideo(res.data.data);
            })
            .catch((error) => console.log(error));
    };

    const uploadResource = async (file: File) => {
        const link = await apiInstance
            .post(
                "lessons/resources",
                {
                    lessonId: infoCreatedLesson.id,
                    name: file.name,
                },
                { headers: { Authorization: "Bear " + userToken?.accessToken } }
            )
            .then((res) => {
                console.log(res);

                return res.data.data.url;
            })
            .catch((error) => {
                console.log(error);
                return "";
            });

        return link;
    };

    const uploadVideo = (option: any) => {
        apiInstance
            .put(linkUploadVideo, option.file, {
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
            })
            .then((res) => {
                console.log(res);
                if (option.onSuccess) option.onSuccess(res.data);
            })
            .catch((error) => {
                console.log(error);
                if (option.onError) option.onError(error);
            });
    };

    useEffect(() => {
        if (infoCreatedLesson.id !== 0) {
            getLinkUploadVideo();
        }
    }, [infoCreatedLesson]);

    useEffect(() => {
        if (lesson != null) {
            form.setFieldsValue({
                title: lesson.title,
                isPreview: lesson.isPreview,
            });
            setCreateType("source");
            setInfoCreatedLesson(lesson);
            getLinkUploadVideo();
        }
    }, [lesson]);

    return (
        <>
            <Divider orientation="left">
                Lesson {idForm}{" "}
                <DeleteOutlined
                    className={clsx(
                        "ml-2 p-2 cursor-pointer text-red-600 active:text-red-700",
                        { hidden: idForm === 1 }
                    )}
                    onClick={() => onDelete(idForm || -1)}
                />
            </Divider>
            <Form
                className=""
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                labelAlign="left"
                layout="vertical"
                onFinish={(dataForm: FieldType) => {
                    lesson != null
                        ? updateInfoLesson(dataForm)
                        : createInfoLesson(dataForm);
                }}
            >
                <Form.Item<FieldType> label="Title" name={"title"}>
                    <Input
                        placeholder="Title lesson"
                        disabled={
                            lesson != null ? false : createType === "source"
                        }
                    />
                </Form.Item>
                <Form.Item<FieldType> label="Type lesson" name={"isPreview"}>
                    <Select
                        placeholder="Type lesson"
                        options={[
                            { label: "Preview lesson", value: true },
                            { label: "Normal lesson", value: false },
                        ]}
                        disabled={
                            lesson != null ? false : createType === "source"
                        }
                    />
                </Form.Item>
                <div hidden={createType === "info"}>
                    <Form.Item label="Video">
                        <Upload
                            customRequest={async (option) => {
                                uploadVideo(option);
                            }}
                            onChange={handleChangeVideoUpload}
                        >
                            <Button icon={<UploadOutlined />}>
                                Upload video
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Resource">
                        <Upload
                            customRequest={async (option) => {
                                const link = await uploadResource(
                                    option.file as File
                                );
                                const formData = new FormData();
                                formData.append("file", option.file);
                                apiInstance
                                    .put(link, formData, {
                                        headers: {
                                            "Content-Type":
                                                "multipart/form-data",
                                        },
                                        onUploadProgress: (event) => {
                                            const percentCompleted = Math.round(
                                                (event.loaded * 100) /
                                                    (event.total || 1)
                                            );
                                            if (option.onProgress != null) {
                                                option.onProgress({
                                                    percent: percentCompleted,
                                                });
                                            }
                                        },
                                    })
                                    .then((res) => {
                                        console.log(res);
                                        if (option.onSuccess)
                                            option.onSuccess(res.data);
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                        if (option.onError)
                                            option.onError(error);
                                    });
                            }}
                        >
                            <Button icon={<UploadOutlined />}>
                                Upload document
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Subtitle">
                        <Upload>
                            <Button icon={<UploadOutlined />}>
                                Upload subtitle
                            </Button>
                        </Upload>
                    </Form.Item>
                </div>
            </Form>
            <Row className="gap-4" justify={"end"}>
                <Button
                    icon={<PlusOutlined />}
                    onClick={() => onAdd()}
                    className={clsx({ hidden: !isShowAddForm })}
                >
                    Add lesson
                </Button>
                <Button onClick={() => form.submit()} type="primary">
                    {lesson != null ? "Update" : "Create"} lesson
                </Button>
            </Row>
        </>
    );
};
