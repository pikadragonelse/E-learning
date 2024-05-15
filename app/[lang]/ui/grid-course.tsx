import React from "react";
import { NewItemCourse } from "./new-item-course";
import { Course, CourseInfoRes } from "../lib/model/course";

export type GridCourse = { listCourse?: CourseInfoRes[] };
export const GridCourse: React.FC<GridCourse> = ({ listCourse }) => {
    return (
        <div className="flex flex-wrap justify-between">
            {listCourse?.map((courseInfo, index) => (
                <NewItemCourse
                    className="flex-col w-60 min-w-60 mb-6"
                    isHiddenButton
                    course={courseInfo.course}
                    key={index}
                />
            ))}
        </div>
    );
};
