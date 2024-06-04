"use client";

import { ConfigProvider, Form, Input } from "antd";
import { Locale } from "antd/es/locale";
import React, { useState } from "react";
import { FormLogin } from "../ui/form-login";
import { FormRegister } from "../ui/form-register";
import { FormForgotPass } from "../ui/form-forgot-password";
import Image from "next/image";

export default function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const [isShowLogin, setIsShowLogin] = useState(true);
    const [isShowForgotPass, setIsShowForgotPass] = useState(false);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#E3311D",
                },
            }}
        >
            <div className="flex flex-col gap-4 justify-center h-full items-center relative overflow-hidden">
                <Image
                    className="absolute w-full h-full object-cover"
                    src="/images/bg-login.webp"
                    alt="bg-image"
                    width={1920}
                    height={1080}
                />
                <div className="absolute w-full h-full bg-black/30"></div>
                <FormLogin
                    className={`absolute duration-500  ${
                        isShowLogin && !isShowForgotPass
                            ? "translate-x-0 opacity-100 z-10 -skew-x-0 -skew-y-0"
                            : "-translate-x-[400px] opacity-0 z-0 -skew-x-6 -skew-y-6"
                    }`}
                    onGoToSignUp={() => setIsShowLogin(false)}
                    onForgotPass={() => setIsShowForgotPass(true)}
                />
                <FormRegister
                    className={`absolute duration-500 ${
                        !isShowLogin
                            ? "translate-x-0 opacity-100 z-10 skew-x-0 skew-y-0"
                            : "translate-x-[400px] opacity-0 z-0 skew-x-6 skew-y-6"
                    }`}
                    onGoToLogin={() => setIsShowLogin(true)}
                />
                <FormForgotPass
                    className={`absolute duration-500  ${
                        isShowForgotPass
                            ? "translate-x-0 opacity-100 z-10 -skew-x-0 -skew-y-0"
                            : "-translate-x-[400px] opacity-0 z-0 -skew-x-6 -skew-y-6"
                    }`}
                    onGoToLogin={() => setIsShowForgotPass(false)}
                />
            </div>
        </ConfigProvider>
    );
}
