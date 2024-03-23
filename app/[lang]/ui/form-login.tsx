import { Form, Input } from "antd";
import React from "react";
import { CustomButton } from "../ui/button";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import Image from "next/image";

type FieldType = {
    username: string;
    password: string;
};

export type FormLogin = {
    className?: string;
    onGoToSignUp?: (...props: any) => unknown;
};
export const FormLogin: React.FC<FormLogin> = ({ className, onGoToSignUp }) => {
    const [form] = useForm();

    return (
        <div
            className={`w-80 md:w-[450px] mb-20 bg-white px-8 py-8 rounded-md transition-all ${className}`}
        >
            <Image
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
            >
                <Form.Item<FieldType> name="username">
                    <Input
                        placeholder="Enter username"
                        addonBefore={<UserOutlined />}
                    />
                </Form.Item>
                <Form.Item<FieldType> name="password">
                    <Input
                        placeholder="Enter password"
                        type="password"
                        addonBefore={<LockOutlined />}
                    />
                </Form.Item>
                <span className="ml-auto w-fit select-none block mb-3 cursor-pointer text-orange-700 active:text-orange-800 z-20 relative">
                    Forget password?
                </span>
                <Form.Item>
                    <div className="flex flex-col gap-2">
                        <CustomButton type="primary" htmlType="submit">
                            Login
                        </CustomButton>
                        <CustomButton onClick={onGoToSignUp}>
                            Go to sign up
                        </CustomButton>
                        <CustomButton className="flex justify-center items-center gap-2">
                            <div className="w-5">
                                <img
                                    src={"/images/google.png"}
                                    className="w-full h-full"
                                />
                            </div>
                            <span>Login by Google</span>
                        </CustomButton>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};
