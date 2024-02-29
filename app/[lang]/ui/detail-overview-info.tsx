"use client";

import {
    faCircleInfo,
    faClosedCaptioning,
    faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Rate } from "antd";
import React from "react";

export const DetailOverviewInfo = () => {
    return (
        <div className="bg-zinc-800 p-6 lg:pl-96 mt-2 flex flex-col gap-4">
            <h1 className="text-2xl lg:text-4xl font-medium lg:w-2/3">
                Node.js, Express, MongoDB & More: The Complete Bootcamp 2024
            </h1>
            <p className="text-sm lg:text-base lg:w-2/3">
                Master Node by building a real-world RESTful API and web app
                (with authentication, Node.js security, payments & more)
            </p>
            <div className="flex flex-col lg:flex-row gap-2 lg:items-center text-xs lg:text-base">
                <div className="flex gap-2 items-center">
                    <span>4.6</span>
                    <Rate value={4.6} />
                </div>
                <span>(22,248 ratings)</span>
                <span>(22,248 students)</span>
            </div>
            <p className="text-sm lg:text-base">
                Created by: Jonas Schmedtmann
            </p>
            <ul className="text-xs lg:text-sm mt-2 flex gap-4">
                <li className="flex gap-1 items-center">
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        className="text-xs w-4"
                    />
                    <p className="">Last updated 11/2023</p>
                </li>
                <li className="flex gap-1 items-center">
                    <FontAwesomeIcon icon={faGlobe} className="text-xs w-4" />
                    <p className="">English</p>
                </li>
                <li className="flex gap-1 items-center">
                    <FontAwesomeIcon
                        icon={faClosedCaptioning}
                        className="text-xs w-4"
                    />
                    <p className="">English</p>
                </li>
            </ul>
        </div>
    );
};
