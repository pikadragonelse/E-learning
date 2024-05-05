import React from "react";
import { CustomButton } from "./button";
import clsx from "clsx";
import { Course, defaultCourse } from "../lib/model/course";
import Link from "next/link";
import { ConfigProvider } from "antd";

export type NewItemCourse = {
    className?: string;
    course?: Course;
    isHiddenButton?: boolean;
    layout?: "horizontal" | "vertical";
    isHiddenDesc?: boolean;
};
export const NewItemCourse: React.FC<NewItemCourse> = ({
    className,
    course = defaultCourse,
    isHiddenButton = false,
    layout = "vertical",
    isHiddenDesc = false,
}) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemActiveBg: "rgb(255 208 183)",
                        itemSelectedBg: "rgb(255 232 219)",
                        itemSelectedColor: "rgb(255 97 15)",
                        itemBorderRadius: 0,
                    },
                },
                token: {
                    colorPrimary: "#E3311D",
                },
            }}
        >
            <div
                className={clsx(
                    `flex items-center rounded-md overflow-hidden ${className}`,
                    {
                        "flex-col": layout === "vertical",
                        "flex-row h-56": layout === "horizontal",
                    }
                )}
            >
                <Link
                    href={`/detail-course/${course.courseId}`}
                    className={clsx("block group overflow-hidden h-full", {
                        "w-1/3 ": layout === "horizontal",
                        "w-auto": layout === "vertical",
                    })}
                >
                    <img
                        src={course?.posterUrl}
                        alt=""
                        className="object-cover w-full h-full transition-all group-hover:scale-110"
                    />
                </Link>
                <div className="text-zinc-800 bg-white p-4 pt-2 gap-4 flex flex-col justify-around flex-1">
                    <div className="">
                        <Link
                            href={`/detail-course/${course.courseId}`}
                            className={clsx(
                                " text-zinc-800 text-sm sm:text-lg hover:text-orange-600 line-clamp-2 h-14 mb-4"
                            )}
                        >
                            {course?.title}
                        </Link>
                        <div className="flex items-end gap-2 text-orange-700">
                            <p className="text-sm lg:text-base">
                                Price: $
                                {(
                                    course?.price -
                                    (course?.price * course?.discount) / 100
                                ).toFixed(2)}
                            </p>
                            <p className="text-xs lg:text-sm line-through text-orange-300">
                                ${course?.price}
                            </p>
                        </div>
                    </div>
                    <p
                        className={clsx("text-sm line-clamp-2", {
                            hidden: isHiddenDesc,
                        })}
                    >
                        {course.introduction}
                    </p>
                    <div
                        className={clsx(" justify-end gap-2 ", {
                            hidden: isHiddenButton,
                            flex: !isHiddenButton,
                        })}
                    >
                        <CustomButton type="primary" className="px-2 py-1">
                            Buy now
                        </CustomButton>
                        <CustomButton className="px-2 py-1">
                            Add to cart
                        </CustomButton>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};
