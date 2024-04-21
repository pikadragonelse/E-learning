"use client";

import {
    faCircleInfo,
    faClosedCaptioning,
    faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Rate } from "antd";
import dayjs from "dayjs";
import React from "react";

export type DetailOverviewInfo = {
    title?: string;
    desc?: string;
    instructor?: string;
    rating?: number;
    latestUpdate?: string;
    language?: string;
};
export const DetailOverviewInfo: React.FC<DetailOverviewInfo> = ({
    title,
    desc,
    instructor,
    rating,
    latestUpdate,
    language,
}) => {
    return (
        <div className="bg-zinc-800 p-6 lg:pl-96 mt-2 flex flex-col gap-4">
            <h1 className="text-2xl lg:text-4xl font-medium lg:w-2/3">
                {title}
            </h1>
            <p className="text-sm lg:text-base lg:w-2/3">{desc}</p>
            <div className="flex flex-col lg:flex-row gap-2 lg:items-center text-xs lg:text-base">
                <div className="flex gap-2 items-center">
                    <span>{rating}</span>
                    <Rate value={rating} disabled />
                </div>
                <span>(22,248 ratings)</span>
                <span>(22,248 students)</span>
            </div>
            <p className="text-sm lg:text-base">Created by: {instructor}</p>
            <ul className="text-xs lg:text-sm mt-2 flex gap-4">
                <li className="flex gap-1 items-center">
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        className="text-xs w-4"
                    />
                    <p className="">
                        {dayjs(latestUpdate).format("DD/MM/YYYY")}
                    </p>
                </li>
                <li className="flex gap-1 items-center">
                    <FontAwesomeIcon icon={faGlobe} className="text-xs w-4" />
                    <p className="">{language}</p>
                </li>
                <li className="flex gap-1 items-center">
                    <FontAwesomeIcon
                        icon={faClosedCaptioning}
                        className="text-xs w-4"
                    />
                    <p className="">{language}</p>
                </li>
            </ul>
        </div>
    );
};
