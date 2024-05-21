import React from "react";
import { NewItemCourse } from "./new-item-course";
import { Course, CourseInfoRes } from "../lib/model/course";

export type GridCourse = {
    listCourse?: CourseInfoRes[];
    listCourseFull?: Course[];
    isHiddenButton?: boolean;
    type?: "full" | "basic";
};
export const GridCourse: React.FC<GridCourse> = ({
    listCourse,
    isHiddenButton = true,
    listCourseFull,
    type = "basic",
}) => {
    return (
        <div className="flex flex-wrap justify-between">
            {type === "basic"
                ? listCourse?.map((courseInfo, index) => (
                      <NewItemCourse
                          className="flex-col w-60 min-w-60 mb-6"
                          isHiddenButton={isHiddenButton}
                          course={courseInfo.course}
                          key={index}
                      />
                  ))
                : listCourseFull?.map((course, index) => (
                      <NewItemCourse
                          className="flex-col w-60 min-w-60 mb-6"
                          isHiddenButton={isHiddenButton}
                          course={course}
                          key={index}
                      />
                  ))}
        </div>
    );
};
