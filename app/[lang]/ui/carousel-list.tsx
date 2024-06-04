"use client";

import React, { useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useState } from "react";
import { NewItemCourse } from "./new-item-course";
import { apiInstance } from "@/plugin/apiInstance";
import { Course } from "../lib/model/course";
import { useWindowResize } from "../lib/hooks/useWindowResize";
import { useToken } from "../lib/hooks/useToken";

const urlMap: Record<"category" | "rcm" | "rcmColab", string> = {
    category: "courses",
    rcm: "courses/recommends/recommend-courses-based-on-tags",
    rcmColab: "courses/recommends/collaborative-filtering",
};

export type CarouselList = {
    byCategory?: string;
    typeList?: "rcm" | "category" | "rcmColab";
    setHiddenList?: (categoryId: string) => void;
};
export const CarouselList: React.FC<CarouselList> = ({
    byCategory = "",
    typeList = "category",
    setHiddenList = () => {},
}) => {
    const [currPage, setCurrPage] = useState(1);
    const [listCourse, setListCourse] = useState<Course[]>();
    const windowSize = useWindowResize();
    const [amountPage, setAmountPage] = useState(3);
    const userTokenInfo = useToken();
    const [courseInCartMap, setCourseInCartMap] = useState<
        Record<string, boolean>
    >({});

    const getListCart = () => {
        apiInstance
            .get("users/carts", {
                headers: {
                    Authorization: "Bear " + userTokenInfo?.accessToken,
                },
            })
            .then((res) => {
                const listCourse: Course[] = res.data.data[0].carts;

                const courseInCartMap: Record<string, boolean> = {};
                listCourse.forEach((item) => {
                    courseInCartMap[item.courseId] = true;
                });
                setCourseInCartMap(courseInCartMap);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getListCourse = async () => {
        try {
            const response = await apiInstance.get(urlMap[typeList], {
                params:
                    typeList === "category"
                        ? {
                              category: byCategory,
                              page: 1,
                              pageSize: 15,
                          }
                        : {
                              page: 1,
                              pageSize: 15,
                          },
                headers: userTokenInfo?.accessToken
                    ? {
                          Authorization: "Bear " + userTokenInfo?.accessToken,
                      }
                    : {},
            });

            const listCourse: Course[] = response.data.data;
            if (listCourse.length < 1) {
                setHiddenList(byCategory);
                return;
            }
            setListCourse(listCourse);
        } catch (error) {
            console.log("Get list courses failed", error);
        }
    };

    useEffect(() => {
        getListCourse();
        getListCart();
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
            <div className={"overflow-hidden px-4 py-8"}>
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
                    {listCourse?.map((course, index) => (
                        <NewItemCourse
                            key={index}
                            course={course}
                            layout="vertical"
                            className="w-64 min-w-64 sm:w-auto sm-min-w-auto shadow-xl"
                            isInCart={courseInCartMap[course.courseId]}
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
