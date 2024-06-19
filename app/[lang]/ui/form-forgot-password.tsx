"use client";

import { Form, Input, Spin, notification } from "antd";
import React, { useState } from "react";
import { CustomButton } from "../ui/button";
import { MailOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import Image from "next/image";
import { apiInstance } from "@/plugin/apiInstance";

type FieldType = {
    email: string;
};

export type FormForgotPass = {
    className?: string;
    onGoToLogin?: (...props: any) => unknown;
};
export const FormForgotPass: React.FC<FormForgotPass> = ({
    className,
    onGoToLogin,
}) => {
    const [form] = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolders] = notification.useNotification();

    const login = (loginData: FieldType) => {
        setIsLoading(true);
        apiInstance
            .post("auth/login", loginData)
            .then((response) => {
                setIsLoading(false);
                form.resetFields();
                api.success({
                    message: "Login success",
                    placement: "bottomRight",
                    description:
                        "Please check your email to verify your account!",
                });
            })
            .catch((error) => {
                setIsLoading(false);
                api.error({
                    message: "Login error",
                    placement: "bottomRight",
                    description: "Please check your information and try again!",
                });
                console.log("Login error", error);
            });
    };

    return (
        <div
            className={`w-80 md:w-[450px] mb-20 bg-white px-8 py-8 rounded-md transition-all ${className}`}
        >
            {contextHolders}
            <Spin spinning={isLoading}>
                <img
                    src="/images/logo-main.png"
                    width={200}
                    height={200}
                    className="mx-auto"
                    alt="Alpha logo"
                />
                <Form
                    autoComplete="off"
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 24 }}
                    className=""
                    onFinish={(loginData: FieldType) => {
                        login(loginData);
                    }}
                >
                    <Form.Item<FieldType>
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Invalid email!",
                                type: "email",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter email"
                            addonBefore={<MailOutlined />}
                        />
                    </Form.Item>

                    <Form.Item>
                        <div className="flex flex-col gap-2">
                            <CustomButton type="primary" htmlType="submit">
                                Send code
                            </CustomButton>
                            <CustomButton onClick={onGoToLogin}>
                                Go to login
                            </CustomButton>
                        </div>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
};
