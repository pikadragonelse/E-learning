"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { FormComment } from "./form-comment";
import { Button, Rate } from "antd";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";
import { apiInstance } from "@/plugin/apiInstance";
import Image from "next/image";
import { useTokenStore } from "../../lib/store/userInfo";

export type ReplySection = {
    isHideAction?: boolean;
    avt?: string;
    name?: string;
    date?: string;
    content?: string;
    rating?: number;
    id?: number;
    onDeleteCmt?: () => void;
    isDeletable?: boolean;
    canReply?: boolean;
};
export const ReplySection: React.FC<ReplySection> = ({
    isHideAction = false,
    avt,
    name,
    date,
    content,
    rating,
    id,
    onDeleteCmt = () => {},
    isDeletable = false,
    canReply = true,
}) => {
    const [isReplying, setIsReplying] = useState(false);
    const { userInfo } = useTokenStore();

    const deleteComment = () => {
        apiInstance
            .delete(`reviews/${id}`, {
                headers: { Authorization: "Bear " + userInfo?.accessToken },
            })
            .then(() => {
                onDeleteCmt();
            })
            .catch((error) => console.log(error));
    };

    return (
        <article className="p-6 text-base bg-white rounded-lg ">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                        <img
                            className="mr-2 w-10 h-10 rounded-full object-cover"
                            src={avt || ""}
                            alt={name || ""}
                            width={1920}
                            height={1080}
                        />
                        <div className="flex flex-col items-start ml-2">
                            <span className="text-base mb-1 text-zinc-800">
                                {name}
                            </span>
                            <div className="">
                                <span className="mr-2 text-zinc-800">
                                    {rating}
                                </span>
                                <Rate className="" value={rating} disabled />
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-800 ">
                        <span title="February 8th, 2022">
                            {dayjs(date).format("DD/MM/YYYY")}
                        </span>
                    </p>
                </div>
            </footer>
            <p className="text-gray-800 ">{content}</p>
            <div
                className={clsx("flex items-center mt-4 space-x-4 gap-2", {
                    hidden: isHideAction,
                })}
            >
                <Button
                    onClick={() => setIsReplying(true)}
                    className={clsx(
                        "flex items-center text-sm text-gray-800 hover:underline  font-medium",
                        {
                            hidden: !canReply,
                        }
                    )}
                >
                    <svg
                        className="mr-1.5 w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                    </svg>
                    Reply
                </Button>
                <Button
                    icon={<DeleteOutlined />}
                    onClick={deleteComment}
                    className={clsx({ hidden: !isDeletable })}
                >
                    Delete
                </Button>
            </div>
            <FormComment hidden={!isReplying} />
        </article>
    );
};
