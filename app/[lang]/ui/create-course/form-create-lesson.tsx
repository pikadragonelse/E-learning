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
};
export const FormCreateLesson: React.FC<FormCreateLesson> = ({
    idForm,
    onAdd = () => {},
    onDelete = () => {},
    isShowAddForm = true,
    topicId,
}) => {
    const [form] = useForm();
    const [fileVideoList, setFileVideoList] = useState<any>();
    const [videoDuration, setVideoDuration] = useState(0);
    const [createType, setCreateType] = useState<"info" | "source">("info");
    const [infoCreatedLesson, setInfoCreatedLesson] =
        useState<LessonFull>(defaultLessonFull);
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
                return res.data.data.url;
            })
            .catch((error) => {
                console.log(error);
                return "";
            });

        return link;
    };

    useEffect(() => {
        if (infoCreatedLesson.id !== 0) {
            getLinkUploadVideo();
        }
    }, [infoCreatedLesson]);

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
                    createInfoLesson(dataForm);
                }}
            >
                <Form.Item<FieldType> label="Title" name={"title"}>
                    <Input
                        placeholder="Title lesson"
                        disabled={createType === "source"}
                    />
                </Form.Item>
                <Form.Item<FieldType> label="Type lesson" name={"isPreview"}>
                    <Select
                        placeholder="Type lesson"
                        options={[
                            { label: "Preview lesson", value: true },
                            { label: "Normal lesson", value: false },
                        ]}
                        disabled={createType === "source"}
                    />
                </Form.Item>
                <div hidden={createType === "info"}>
                    <Form.Item label="Video">
                        <Upload
                            action={linkUploadVideo || ""}
                            onChange={handleChangeVideoUpload}
                            fileList={fileVideoList}
                            method="PUT"
                            accept=".pdf,.docx,.zip,.xlsx,.txt"
                        >
                            <Button icon={<UploadOutlined />}>
                                Upload video
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Document">
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
                <Button
                    onClick={() => form.submit()}
                    type="primary"
                    className="bg-orange-600"
                >
                    Create lesson
                </Button>
            </Row>
        </>
    );
};
