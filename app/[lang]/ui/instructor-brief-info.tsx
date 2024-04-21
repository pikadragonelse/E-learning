"use client";

import {
    faCirclePlay,
    faRankingStar,
    faStar,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "antd";
import React from "react";
import { Instructor } from "../lib/model/instructor";

const infoList = [
    { icon: <FontAwesomeIcon icon={faStar} />, info: "4.6 Instructor Rating" },
    {
        icon: <FontAwesomeIcon icon={faRankingStar} />,
        info: "1,144,720 Reviews",
    },
    { icon: <FontAwesomeIcon icon={faUsers} />, info: "3,762,715 Students" },
    { icon: <FontAwesomeIcon icon={faCirclePlay} />, info: "83 Courses" },
];

export type InstructorBriefInfo = {
    instructor?: Instructor;
    className?: string;
};
export const InstructorBriefInfo: React.FC<InstructorBriefInfo> = ({
    instructor,
    className,
}) => {
    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            <div className="">
                <a className="text-lg font-medium cursor-pointer text-orange-500 hover:text-orange-400 hover:underline">
                    {instructor?.profile.fullName}
                </a>
                <h2>{instructor?.profile.description}</h2>
            </div>
            <div className="flex gap-6 items-center">
                <Avatar size={140} src={instructor?.profile.avatar} />
                <ul className="">
                    {infoList.map((info, index) => (
                        <li key={index} className="flex gap-2 items-center">
                            <div className="w-6">{info.icon}</div>
                            <span className="text-sm">{info.info}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="">{instructor?.profile.description}</div>
        </div>
    );
};
