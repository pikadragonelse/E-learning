import React, { useState } from "react";
import { CustomButton } from "../button";
import clsx from "clsx";
import { FormComment } from "./form-comment";
import { Rate } from "antd";

export type ReplySection = {
    isHideAction?: boolean;
    avt?: string;
    name?: string;
    date?: string;
    content?: string;
};
export const ReplySection: React.FC<ReplySection> = ({
    isHideAction = false,
    avt,
    name,
    date,
    content,
}) => {
    const [isReplying, setIsReplying] = useState(false);

    return (
        <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                            className="mr-2 w-10 h-10 rounded-full"
                            src={avt}
                            alt="Michael Gough"
                        />
                        <div className="flex flex-col items-start ml-2">
                            <span className="text-base mb-1">{name}</span>
                            <Rate className="" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span title="February 8th, 2022">{date}</span>
                    </p>
                </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">{content}</p>
            <div
                className={clsx("flex items-center mt-4 space-x-4", {
                    hidden: isHideAction,
                })}
            >
                <CustomButton
                    onClick={() => setIsReplying(true)}
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                    </svg>
                    Reply
                </CustomButton>
            </div>
            <FormComment hidden={!isReplying} />
        </article>
    );
};
