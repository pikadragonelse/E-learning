"use client";

import React, { useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useState } from "react";
import { NewItemCourse } from "./new-item-course";
import { apiInstance } from "@/plugin/apiInstance";
import { Course } from "../lib/model/course";
import { useWindowResize } from "../lib/hooks/useWindowResize";

export type CarouselList = { byCategory?: string };
export const CarouselList: React.FC<CarouselList> = ({ byCategory = "" }) => {
    const [currPage, setCurrPage] = useState(1);
    const [listCourse, setListCourse] = useState<Course[]>();
    const windowSize = useWindowResize();
    const [amountPage, setAmountPage] = useState(3);

    const getListCourse = async () => {
        try {
            const response = await apiInstance.get("courses", {
                params: {
                    category: byCategory,
                    page: 1,
                    pageSize: 15,
                },
            });
            const listCourse: Course[] = response.data.data;
            setListCourse(listCourse);
        } catch (error) {
            console.log("Get list courses failed", error);
        }
    };

    useEffect(() => {
        getListCourse();
    }, []);

    useEffect(() => {
        if (windowSize > 1600) {
            setAmountPage(3);
        } else if (windowSize > 1376) {
            setAmountPage(4);
        } else {
            setAmountPage(5);
        }
    }, [windowSize]);

    return (
        <div className="text-zinc-800 text-2xl relative">
            <LeftOutlined
                className={clsx(
                    "absolute -left-8  h-full cursor-pointer z-10 hidden",
                    {
                        "lg:inline-flex": currPage > 1,
                    }
                )}
                onClick={() => setCurrPage((prev) => prev - 1)}
            />
            <div className={"overflow-hidden p-4"}>
                <div
                    className={clsx(
                        "carousel-list transition-all duration-300",
                        {
                            "translate-1": currPage === 2,
                            "translate-2": currPage === 3,
                            "translate-3": currPage === 4,
                            "translate-4": currPage === 5,
                        }
                    )}
                >
                    {listCourse?.map((course) => (
                        <NewItemCourse
                            course={course}
                            layout="vertical"
                            className="w-64 min-w-64 sm:w-auto sm-min-w-auto"
                        />
                    ))}
                </div>
            </div>

            <RightOutlined
                className={clsx(
                    "absolute -right-8 h-full top-0 cursor-pointer bg-white",
                    {
                        hidden: currPage === amountPage,
                    }
                )}
                onClick={() => setCurrPage((prev) => prev + 1)}
            />
        </div>
    );
};
