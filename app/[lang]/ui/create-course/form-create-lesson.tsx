import { Button, Divider, Form, Input, Row, Upload, UploadProps } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import {
    UploadOutlined,
    PlusOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import clsx from "clsx";

export type FormCreateLesson = {
    idForm?: number;
    onAdd?: (...props: any) => unknown;
    onDelete?: (idLesson: number) => unknown;
    isShowAddForm?: boolean;
};
export const FormCreateLesson: React.FC<FormCreateLesson> = ({
    idForm,
    onAdd = () => {},
    onDelete = () => {},
    isShowAddForm = true,
}) => {
    const [form] = useForm();
    const [fileVideoList, setFileVideoList] = useState<any>();
    const handleChangeVideoUpload: UploadProps["onChange"] = (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        setFileVideoList(fileList);
    };

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
            >
                <Form.Item
                    label="Title"
                    name={[`lesson${idForm}`, "title", "lesson", "title"]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name={[`lesson${idForm}`, "title", "lesson", "desc"]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="Video">
                    <Upload
                        onChange={handleChangeVideoUpload}
                        fileList={fileVideoList}
                    >
                        <Button icon={<UploadOutlined />}>Upload video</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Document">
                    <Upload>
                        <Button icon={<UploadOutlined />}>
                            Upload document
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Subtitle">
                    <Upload>
                        <Button icon={<UploadOutlined />}>
                            Upload document
                        </Button>
                    </Upload>
                </Form.Item>
            </Form>
            <Row className="gap-4" justify={"end"}>
                <Button
                    icon={<PlusOutlined />}
                    onClick={() => onAdd()}
                    className={clsx({ hidden: !isShowAddForm })}
                >
                    Add lesson
                </Button>
                <Button type="primary">Create lesson</Button>
            </Row>
        </>
    );
};
