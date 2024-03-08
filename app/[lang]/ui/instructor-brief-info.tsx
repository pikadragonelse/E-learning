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
    name?: string;
    job?: string;
    avt?: string;
    subInfo?: string[];
    desc?: string;
    className?: string;
};
export const InstructorBriefInfo: React.FC<InstructorBriefInfo> = ({
    name,
    job,
    avt,
    desc,
    subInfo,
    className,
}) => {
    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            <div className="">
                <a className="text-lg font-medium cursor-pointer text-orange-500 hover:text-orange-400 hover:underline">
                    Jose Portilla
                </a>
                <h2>Head of Data Science at Pierian Training</h2>
            </div>
            <div className="flex gap-6 items-center">
                <Avatar size={140} />
                <ul className="">
                    {infoList.map((info) => (
                        <li className="flex gap-2 items-center">
                            <div className="w-6">{info.icon}</div>
                            <span className="text-sm">{info.info}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="">
                Jose Marcial Portilla has a BS and MS in Mechanical Engineering
                from Santa Clara University and years of experience as a
                professional instructor and trainer for Data Science, Machine
                Learning and Python Programming. He has publications and patents
                in various fields such as microfluidics, materials science, and
                data science. Over the course of his career he has developed a
                skill set in analyzing data and he hopes to use his experience
                in teaching and data science to help other people learn the
                power of programming, the ability to analyze data, and the
                skills needed to present the data in clear and beautiful
                visualizations. Currently he works as the Head of Data Science
                for Pierian Training and provides in-person data science and
                python programming training courses to employees working at top
                companies, including General Electric, Cigna, SalesForce,
                Starbucks, McKinsey and many more. Feel free to check out the
                website link to find out more information about training
                offerings.
            </div>
        </div>
    );
};
