"use client";

import { Avatar, Button, Col, Form, Input, InputRef, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { apiInstance } from "@/plugin/apiInstance";
import { useForm } from "antd/es/form/Form";
import { FlashingDot } from "./flashing-dot";

type FieldType = {
    query?: string;
};

export type ChatBot = { courseId?: string };
export const ChatBot: React.FC<ChatBot> = ({ courseId }) => {
    const [form] = useForm();
    const [isRendering, setIsRendering] = useState(false);
    const [messageList, setMessageList] = useState<
        { object: "bot" | "person"; message: any }[]
    >([]);
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputRef.current != null) {
            inputRef.current.focus();
        }
    }, []);

    const chatbot = (question: string) => {
        setIsRendering(true);

        setMessageList((prev) => {
            return [
                ...prev,
                {
                    message: question,
                    object: "person",
                },
                {
                    message: <FlashingDot />,
                    object: "bot",
                },
            ];
        });
        apiInstance
            .post("chat", {
                question: question,
                history: [],
                courseId: courseId,
            })
            .then((res) => {
                setMessageList((prev) => {
                    prev.pop();
                    return [
                        ...prev,
                        {
                            message: res.data.response,
                            object: "bot",
                        },
                    ];
                });
                setIsRendering(false);
            })
            .catch((error) => {
                console.log(error);
                setIsRendering(false);
            });
        form.setFieldValue("query", "");
    };

    const isStartOfSequence = (
        messages: { object: "bot" | "person"; message: string }[],
        index: number
    ) => {
        if (index === messages.length - 1) return false;
        if (index === 0)
            return messages[index]?.object === messages[index + 1]?.object;
        return (
            messages[index]?.object !== messages[index - 1]?.object &&
            messages[index]?.object === messages[index + 1]?.object
        );
    };

    const isEndOfSequence = (
        messages: { object: "bot" | "person"; message: string }[],
        index: number
    ) => {
        if (index === 0) return false;
        if (index === messages.length - 1)
            return messages[index]?.object !== messages[index + 1]?.object;
        return (
            messages[index]?.object !== messages[index + 1]?.object &&
            messages[index]?.object === messages[index - 1]?.object
        );
    };

    const isMiddleOfSequence = (
        messages: { object: "bot" | "person"; message: string }[],
        index: number
    ) => {
        if (index === 0 || index === messages.length - 1) return false;
        return (
            messages[index]?.object === messages[index - 1]?.object &&
            messages[index]?.object === messages[index + 1]?.object
        );
    };

    return (
        <div className="h-[410px] relative w-full">
            <div className="max-h-80 overflow-auto">
                <div className="flex flex-col gap-[0.1rem]">
                    {messageList.map((message, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <Avatar
                                className={clsx({
                                    hidden: message.object === "person",
                                })}
                            ></Avatar>
                            <div className="flex-grow flex flex-col gap-1 ">
                                <div
                                    className={clsx(
                                        "text-sm w-fit max-w-52 py-2 px-4 font-medium rounded-3xl mb-2",
                                        {
                                            "text-zinc-50 bg-gradient-to-r from-orange-500 to-red-600 ml-auto   ":
                                                message.object === "person",
                                            "text-zinc-800 bg-zinc-200 ":
                                                message.object === "bot",
                                            "rounded-tr-md rounded-br-md mb-0":
                                                isMiddleOfSequence(
                                                    messageList,
                                                    index
                                                ) &&
                                                message.object === "person",
                                            "rounded-tr-3xl rounded-br-md mb-0":
                                                isStartOfSequence(
                                                    messageList,
                                                    index
                                                ) &&
                                                message.object === "person",
                                            "rounded-br-3xl rounded-tr-md":
                                                isEndOfSequence(
                                                    messageList,
                                                    index
                                                ) &&
                                                message.object === "person",
                                            "rounded-tl-md rounded-bl-md mb-0":
                                                isMiddleOfSequence(
                                                    messageList,
                                                    index
                                                ) && message.object === "bot",
                                            "rounded-tl-3xl rounded-bl-md mb-0":
                                                isStartOfSequence(
                                                    messageList,
                                                    index
                                                ) && message.object === "bot",
                                            "rounded-bl-3xl rounded-tl-md":
                                                isEndOfSequence(
                                                    messageList,
                                                    index
                                                ) && message.object === "bot",
                                        }
                                    )}
                                >
                                    {message.message}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 w-full">
                <Form
                    form={form}
                    onFinish={(data: FieldType) => {
                        chatbot(data.query || "");
                    }}
                >
                    <Row>
                        <Col span={20}>
                            <Form.Item name={"query"}>
                                <Input
                                    placeholder="Ask something..."
                                    ref={inputRef}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3} offset={1}>
                            <Form.Item>
                                <div
                                    onClick={() =>
                                        isRendering ? undefined : form.submit()
                                    }
                                    className={clsx(
                                        "hover:bg-zinc-100 px-1 py-2 flex justify-center rounded-lg cursor-pointer active:bg-zinc-200 group",
                                        {
                                            "cursor-default": isRendering,
                                        }
                                    )}
                                >
                                    <SendOutlined
                                        className={clsx(
                                            "text-orange-700 text-lg group-active:text-orange-500 select-none",
                                            {
                                                "text-zinc-500 group-active-zinc-500":
                                                    isRendering,
                                            }
                                        )}
                                    />
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};
