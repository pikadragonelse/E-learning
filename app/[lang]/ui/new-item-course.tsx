import React from "react";
import { CustomButton } from "./button";
import clsx from "clsx";
import { Course, defaultCourse } from "../lib/model/course";
import Link from "next/link";

export type NewItemCourse = {
    className?: string;
    course?: Course;
    isHiddenButton?: boolean;
    layout?: "horizontal" | "vertical";
};
export const NewItemCourse: React.FC<NewItemCourse> = ({
    className,
    course = defaultCourse,
    isHiddenButton = false,
    layout = "vertical",
}) => {
    return (
        <div
            className={clsx(
                `flex shadow-xl rounded-md overflow-hidden ${className}`,
                {
                    "flex-col": layout === "vertical",
                    "flex-row": layout === "horizontal",
                }
            )}
        >
            <Link
                href={`/detail-course/${course.courseId}`}
                className="block h-52 group overflow-hidden"
            >
                <img
                    src={course?.posterUrl}
                    alt=""
                    className="object-cover w-full h-full transition-all group-hover:scale-110"
                />
            </Link>
            <div className="text-zinc-800 bg-white p-4 pt-2 gap-2 flex flex-col justify-around flex-1">
                <div className="">
                    <Link
                        href={`/detail-course/${course.courseId}`}
                        className="text-sm sm:text-xl hover:text-orange-600 line-clamp-2 h-14 mb-4"
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
                <p className="text-sm line-clamp-2">{course.description}</p>
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
    );
};
