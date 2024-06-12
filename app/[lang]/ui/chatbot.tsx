"use client";

import { Avatar, Button, Col, Form, Input, InputRef, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import clsx from "clsx";

type FieldType = {
    query?: string;
};

export const ChatBot = () => {
    const [messageList, setMessageList] = useState<
        { object: "bot" | "person"; message: string }[]
    >([
        { message: "Hello", object: "person" },
        { message: "Hi, What can I help you?", object: "bot" },
        { message: "Hello", object: "person" },
        { message: "Hello", object: "person" },
        { message: "Hi, What can I help you?", object: "bot" },
        { message: "Hi, What can I help you?", object: "bot" },
        { message: "Hi, What can I help you?", object: "bot" },
        {
            message:
                "Can you give me some detail information about this course?",
            object: "person",
        },
        { message: "Of course! This course is ...", object: "bot" },
        { message: "Thank you!", object: "person" },
        { message: "Thank you!", object: "person" },
        { message: "Thank you!", object: "person" },
    ]);
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputRef.current != null) {
            inputRef.current.focus();
        }
    }, []);

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
                <Form>
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
                                <div className="hover:bg-zinc-100 px-1 py-2 flex justify-center rounded-lg cursor-pointer active:bg-zinc-200 group">
                                    <SendOutlined className="text-orange-700 text-lg group-active:text-orange-500 select-none" />
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};
