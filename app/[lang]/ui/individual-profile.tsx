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
import React, { useEffect, useState } from "react";
import { UploadType, beforeUpload, getBase64 } from "../lib/utils/upload";
import { User } from "../lib/model/user";
import { useForm } from "antd/es/form/Form";

type FieldType = {
    firstName: string;
    lastName: string;
    desc: string;
};

export type IndividualProfile = { userInfo?: User };
export const IndividualProfile: React.FC<IndividualProfile> = ({
    userInfo,
}) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<any>();
    const [fileList, setFileList] = useState<any>([]);
    const [form] = useForm();

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

    useEffect(() => {
        form.setFieldsValue({
            firstName: userInfo?.profile.firstName,
            lastName: userInfo?.profile.lastName,
            desc: userInfo?.profile.description,
        });
        setImageUrl(userInfo?.profile.avatar);
    }, [userInfo]);

    return (
        <div>
            <div className="flex flex-col items-center gap-4 ">
                <h1 className="font-medium text-sm text-orange-700">Avatar</h1>
                <div className="w-52 h-52 flex items-center justify-center rounded-lg overflow-hidden">
                    {imageUrl !== "" && imageUrl != null ? (
                        <Image src={imageUrl} />
                    ) : (
                        <div className="select-none text-sm w-full h-full border flex items-center justify-center bg-zinc-200 ">
                            Avatar
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
                    <Button>Upload avatar</Button>
                </Upload>
            </div>
            <div className="mt-6">
                <Form
                    autoComplete="off"
                    layout="vertical"
                    wrapperCol={{ span: 24 }}
                    form={form}
                >
                    <Row className="flex-col md:flex-row">
                        <Col xs={{ span: 24 }} md={{ span: 11 }}>
                            <Form.Item name="firstName" label={"First name"}>
                                <Input placeholder="First Name" />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 11, offset: 2 }}>
                            <Form.Item name="lastName" label={"Last name"}>
                                <Input placeholder="Last Name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="desc" label={"Description"}>
                        <Input.TextArea placeholder="Description" />
                    </Form.Item>
                    <Form.Item name="linked" label={"LinkedIn"}>
                        <Input placeholder="LinkedIn" />
                    </Form.Item>
                </Form>
                <Row justify={"end"}>
                    <Button type="primary">Save</Button>
                </Row>
            </div>
        </div>
    );
};
