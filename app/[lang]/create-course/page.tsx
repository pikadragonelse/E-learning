"use client";

import { Button, ConfigProvider, Form, Input, Row, Steps } from "antd";
import { Locale } from "antd/es/locale";
import React, { useState } from "react";
import { FormCreateOverallInfo } from "../ui/create-course/form-create-overall-info";
import { FormCreateSession } from "../ui/create-course/form-create-session";
import { LeftOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { SessionInfo } from "../lib/model/create-course";
import { CustomButton } from "../ui/button";
import { PlusOutlined } from "@ant-design/icons";

export default function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const [listSession, setListSession] = useState<number[]>([1]);
    const [currentStep, setCurrentStep] = useState(1);

    const addSession = () => {
        const nextId = listSession[0] + 1;
        const newListSession = [nextId, ...listSession];
        setListSession(newListSession);
    };

    const deleteSession = (idSession: number) => {
        const newListSession = listSession.filter(
            (value) => value !== idSession
        );
        setListSession(newListSession);
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Form: {},
                },
                token: {
                    colorPrimary: "#E3311D",
                },
            }}
        >
            <div className="relative  bg-orange-600 z-10">
                <span className="ml-10 gap-2 py-3 text-white text-xl w-fit  flex items-center hover:text-orange-100 active:text-orange-200 cursor-pointer transition-all">
                    <LeftOutlined className="text-2xl " />
                    Back to home
                </span>
            </div>
            <div className="text-zinc-800 py-6 md:px-20 flex flex-col gap-4 ">
                <div className="flex relative  overflow-hidden flex-col lg:flex-row">
                    <div className="rounded-md flex flex-col relative flex-1 ">
                        <div
                            className={clsx(" p-4 ", {
                                hidden: currentStep !== 1,
                            })}
                        >
                            <div className="mb-4">
                                <h1 className="font-medium text-xl m-0 mb-2 text-[#E3311D]">
                                    Course landing page
                                </h1>
                                <p className="text-sm">
                                    The information that is given in this form
                                    will be showed in course landing page. Your
                                    course landing page is crucial to your
                                    success on Alpha. If it’s done right, it can
                                    also help you gain visibility in search
                                    engines like Google. As you complete this
                                    section, think about creating a compelling
                                    Course Landing Page that demonstrates why
                                    someone would want to enroll in your course.
                                    Learn more about{" "}
                                    <span className="text-[#E3311D] cursor-pointer">
                                        creating your course landing page
                                    </span>{" "}
                                    and{" "}
                                    <span className="text-[#E3311D] cursor-pointer">
                                        course title standards
                                    </span>
                                    .
                                </p>
                            </div>

                            <FormCreateOverallInfo
                                className="w-full"
                                onNext={() => setCurrentStep(2)}
                            />
                        </div>
                        <div
                            className={clsx("  p-4 ", {
                                hidden: currentStep !== 2,
                            })}
                        >
                            <div className="mb-12">
                                <h1 className="font-medium text-xl m-0 mb-2 text-[#E3311D]">
                                    Course landing page
                                </h1>
                                <p className="text-sm">
                                    The information that is given in this form
                                    will be showed in course landing page. Your
                                    course landing page is crucial to your
                                    success on Alpha. If it’s done right, it can
                                    also help you gain visibility in search
                                    engines like Google. As you complete this
                                    section, think about creating a compelling
                                    Course Landing Page that demonstrates why
                                    someone would want to enroll in your course.
                                    Learn more about{" "}
                                    <span className="text-[#E3311D] cursor-pointer">
                                        creating your course landing page
                                    </span>{" "}
                                    and{" "}
                                    <span className="text-[#E3311D] cursor-pointer">
                                        course title standards
                                    </span>
                                    .
                                </p>
                            </div>
                            <Row justify={"start"} className="gap-2 mb-2">
                                <Button
                                    icon={<PlusOutlined />}
                                    onClick={addSession}
                                >
                                    Add session
                                </Button>

                                <Button type="primary">Done</Button>
                            </Row>
                            <div className="h-[700px] max-h-[700px] overflow-auto">
                                {listSession.map((idSession, index) => (
                                    <FormCreateSession
                                        idSession={idSession}
                                        key={index}
                                        onDelete={(idSession) =>
                                            deleteSession(idSession)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
}
