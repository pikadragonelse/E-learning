import {
    UploadProps,
    Image,
    Upload,
    Button,
    Form,
    Input,
    Row,
    Col,
} from "antd";
import React, { useState } from "react";
import { UploadType, beforeUpload, getBase64 } from "../lib/utils/upload";

export const IndividualProfile = () => {
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
                console.log(url);

                setImageUrl(url);
            });
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center gap-4 ">
                <h1 className="font-medium text-sm text-orange-700">
                    Preview video
                </h1>
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
                    <Button>Upload preview video</Button>
                </Upload>
            </div>
            <div className="mt-6">
                <Form
                    autoComplete="off"
                    layout="vertical"
                    wrapperCol={{ span: 24 }}
                >
                    <Row className="flex-col md:flex-row">
                        <Col xs={{ span: 24 }} md={{ span: 11 }}>
                            <Form.Item label={"First name"}>
                                <Input placeholder="First Name" />
                            </Form.Item>
                            <Form.Item label={"Last name"}>
                                <Input placeholder="Last Name" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 11, offset: 2 }}>
                            <Form.Item label={"Biography"}>
                                <Input placeholder="Biography" />
                            </Form.Item>
                            <Form.Item label={"LinkedIn"}>
                                <Input placeholder="LinkedIn" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Row justify={"end"}>
                    <Button type="primary">Save</Button>
                </Row>
            </div>
        </div>
    );
};
