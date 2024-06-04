"use client";

import React from "react";
import { Course, defaultCourse } from "../lib/model/course";
import { DetailOverviewInfo } from "./detail-overview-info";
import { Rate } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleInfo,
    faClosedCaptioning,
    faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { InstructorBriefInfo } from "./instructor-brief-info";
import parse from "html-react-parser";
import Image from "next/image";

export type OverviewLearning = { courseData?: Course };
export const OverviewLearning: React.FC<OverviewLearning> = ({
    courseData = defaultCourse,
}) => {
    return (
        <div className="px-16">
            <div className="w-2/3 mx-auto">
                <Image
                    src={courseData.posterUrl || ""}
                    alt=""
                    className="w-full h-full object-cover"
                    width={1920}
                    height={1080}
                />
            </div>
            <div className="">
                <div className=" my-6 flex flex-col gap-4">
                    <h1 className="text-2xl lg:text-4xl font-medium ">
                        {courseData.title}
                    </h1>

                    <div className="flex flex-col lg:flex-row gap-2 lg:items-center text-xs lg:text-base">
                        <div className="flex gap-2 items-center">
                            <span>{courseData.averageRating}</span>
                            <Rate value={courseData.averageRating} disabled />
                        </div>
                        <span>(22,248 ratings)</span>
                        <span>(22,248 students)</span>
                    </div>

                    <p className="text-sm lg:text-base">
                        Created by: {courseData.instructor.profile.fullName}
                    </p>

                    <ul className="text-xs lg:text-sm mt-2 flex gap-4">
                        <li className="flex gap-1 items-center">
                            <FontAwesomeIcon
                                icon={faCircleInfo}
                                className="text-xs w-4"
                            />
                            <p className="">
                                {dayjs(courseData.updatedAt).format(
                                    "DD/MM/YYYY"
                                )}
                            </p>
                        </li>
                        <li className="flex gap-1 items-center">
                            <FontAwesomeIcon
                                icon={faGlobe}
                                className="text-xs w-4"
                            />
                            <p className="">
                                {courseData.language.languageName}
                            </p>
                        </li>
                        <li className="flex gap-1 items-center">
                            <FontAwesomeIcon
                                icon={faClosedCaptioning}
                                className="text-xs w-4"
                            />
                            <p className="">
                                {courseData.language.languageName}
                            </p>
                        </li>
                    </ul>
                </div>
                <p className="text-sm lg:text-base ">
                    {parse(courseData.description)}
                </p>
            </div>

            <InstructorBriefInfo
                className="mb-6"
                instructor={courseData.instructor}
            />
        </div>
    );
};
