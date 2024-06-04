"use client";

import { Button, Form, Input, Spin, notification } from "antd";
import React, { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import Image from "next/image";
import { apiInstance } from "@/plugin/apiInstance";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

type FieldType = {
    email: string;
    password: string;
};

export type FormLogin = {
    className?: string;
    onGoToSignUp?: (...props: any) => unknown;
    onForgotPass?: (...props: any) => unknown;
};
export const FormLogin: React.FC<FormLogin> = ({
    className,
    onGoToSignUp,
    onForgotPass,
}) => {
    const [form] = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolders] = notification.useNotification();
    const router = useRouter();

    const login = (loginData: FieldType) => {
        setIsLoading(true);
        apiInstance
            .post("auth/login", loginData)
            .then((response) => {
                let accessToken = JSON.stringify(
                    response.data.result.token.accessToken
                );
                let refreshToken = JSON.stringify(
                    response.data.result.token.refreshToken
                );
                setCookie("accessToken", accessToken, {
                    secure: true,
                });
                setCookie("refreshToken", refreshToken, {
                    secure: true,
                });
                setIsLoading(false);
                form.resetFields();
                router.push("/");
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
                <Image
                    src="/images/logo-main.png"
                    width={200}
                    height={200}
                    className="block mx-auto"
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
                    <Form.Item<FieldType> name="password">
                        <Input
                            placeholder="Enter password"
                            type="password"
                            addonBefore={<LockOutlined />}
                        />
                    </Form.Item>
                    <span
                        onClick={onForgotPass}
                        className="ml-auto w-fit select-none block mb-3 cursor-pointer text-orange-700 active:text-orange-800 z-20 relative"
                    >
                        Forget password?
                    </span>
                    <Form.Item>
                        <div className="flex flex-col gap-2">
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                            <Button onClick={onGoToSignUp}>
                                Go to sign up
                            </Button>
                            <Button className="flex justify-center items-center gap-2">
                                <div className="w-5">
                                    <Image
                                        src={"/images/google.png"}
                                        alt="google icon"
                                        className="w-full h-full"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                                <span>Login by Google</span>
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
};
