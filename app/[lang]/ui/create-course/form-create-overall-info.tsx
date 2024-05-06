"use client";

import { Form, Image, Input, Row, Select, Upload, UploadProps } from "antd";
import React, { useState } from "react";
import { CustomButton } from "../button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UploadType, beforeUpload, getBase64 } from "../../lib/utils/upload";

export type FormCreateOverallInfo = {
    className?: string;
    onNext?: (...props: any) => unknown;
};
export const FormCreateOverallInfo: React.FC<FormCreateOverallInfo> = ({
    className,
    onNext,
}) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<any>();
    const [fileList, setFileList] = useState<any>([]);

    const handleChange: UploadProps["onChange"] = (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        setFileList(fileList);
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as UploadType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    return (
        <div className={`${className}`}>
            <div className="flex gap-10 mb-6 justify-around">
                <div className="flex flex-col items-center gap-4 ">
                    <h1 className="font-medium text-sm">Preview video</h1>
                    <div className="w-52 h-52 flex items-center justify-center rounded-lg overflow-hidden">
                        {imageUrl !== "" && imageUrl != null ? (
                            <Image src={imageUrl} />
                        ) : (
                            <div className="select-none text-sm w-full h-full border flex items-center justify-center bg-zinc-200 ">
                                Preview image
                            </div>
                        )}
                    </div>
                    <Upload
                        fileList={fileList}
                        name="avatar"
                        customRequest={(e) => {
                            setImageUrl(URL.createObjectURL(e.file as any));
                        }}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        className="flex flex-col items-center"
                        onRemove={() => setImageUrl("")}
                    >
                        <CustomButton>Upload preview video</CustomButton>
                    </Upload>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <h1 className="font-medium text-sm">Preview Image</h1>
                    <div className="w-52 h-52 flex items-center justify-center rounded-lg overflow-hidden">
                        {imageUrl !== "" && imageUrl != null ? (
                            <Image src={imageUrl} />
                        ) : (
                            <div className="select-none text-sm w-full h-full border flex items-center justify-center bg-zinc-200 ">
                                Preview image
                            </div>
                        )}
                    </div>
                    <Upload
                        fileList={fileList}
                        name="avatar"
                        customRequest={(e) => {
                            setImageUrl(URL.createObjectURL(e.file as any));
                        }}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        className="flex flex-col items-center"
                    >
                        <CustomButton>Upload preview video</CustomButton>
                    </Upload>
                </div>
            </div>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                labelAlign="left"
                layout="vertical"
            >
                <Form.Item label="Title">
                    <Input
                        size="middle"
                        placeholder="Enter title of course"
                        maxLength={120}
                        showCount
                    />
                </Form.Item>
                <Form.Item label="Description"></Form.Item>
                <Form.Item label="Category">
                    <Select
                        size="middle"
                        placeholder="Select category of course"
                    />
                </Form.Item>
                <Form.Item label="Language">
                    <Select
                        size="middle"
                        placeholder="Select language of course"
                    />
                </Form.Item>
                <Form.Item>
                    <Row justify={"end"} className="gap-4">
                        <CustomButton
                            type={"primary"}
                            className="w-60 "
                            onClick={onNext}
                        >
                            Next
                        </CustomButton>
                    </Row>
                </Form.Item>
            </Form>
        </div>
    );
};
