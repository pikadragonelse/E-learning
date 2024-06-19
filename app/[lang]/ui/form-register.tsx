"use client";

import { Form, Input, Spin, notification } from "antd";
import React, { useState } from "react";
import { CustomButton } from "../ui/button";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import Image from "next/image";
import { apiInstance } from "@/plugin/apiInstance";

type FieldType = {
    username: string;
    password: string;
    email: string;
};

export type FormRegister = {
    className?: string;
    onGoToLogin?: (...props: any) => unknown;
};
export const FormRegister: React.FC<FormRegister> = ({
    className,
    onGoToLogin,
}) => {
    const [form] = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolders] = notification.useNotification();

    const register = async (registerInfo: FieldType) => {
        setIsLoading(true);
        apiInstance
            .post("auth/register", registerInfo)
            .then((response) => {
                setIsLoading(false);
                form.resetFields();
                api.success({
                    message: "Register success",
                    placement: "bottomRight",
                    description:
                        "Please check your email to verify your account!",
                });
            })
            .catch((error) => {
                setIsLoading(false);

                if (error.response.status === 409) {
                    api.error({
                        message: "Register error",
                        placement: "bottomRight",
                        description:
                            "Email or username is exist, please use another username and email!",
                    });
                } else {
                    api.error({
                        message: "Register error",
                        placement: "bottomRight",
                        description:
                            "Please check your information and try again!",
                    });
                }

                console.log("Register error: " + error);
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
                    className="mx-auto z-10"
                    alt="Alpha logo"
                />
                <Form
                    autoComplete="off"
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 24 }}
                    className=""
                    onFinish={(registerInfo: FieldType) => {
                        register(registerInfo);
                    }}
                >
                    <Form.Item<FieldType>
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Username must be filled!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter username"
                            addonBefore={<UserOutlined />}
                        />
                    </Form.Item>
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
                    <Form.Item<FieldType>
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Password must be filled!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter password"
                            type="password"
                            addonBefore={<LockOutlined />}
                        />
                    </Form.Item>
                    <span className="block mb-3 z-20 relative">
                        By signing up, you agree to our{" "}
                        <span className="text-orange-700">Terms of Use</span>{" "}
                        and{" "}
                        <span className="text-orange-700">Privacy Policy</span>.
                    </span>
                    <Form.Item>
                        <div className="flex flex-col gap-2">
                            <CustomButton type="primary" htmlType="submit">
                                Sign up
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
