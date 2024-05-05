import React from "react";
import { NewItemCourse } from "./new-item-course";

export const GridCourse = () => {
    return (
        <div className="flex flex-wrap justify-between">
            <NewItemCourse
                className="flex-col w-60 min-w-60 mb-6"
                isHiddenButton
            />
            <NewItemCourse
                className="flex-col w-60 min-w-60 mb-6"
                isHiddenButton
            />
            <NewItemCourse
                className="flex-col w-60 min-w-60 mb-6"
                isHiddenButton
            />
            <NewItemCourse
                className="flex-col w-60 min-w-60 mb-6"
                isHiddenButton
            />
            <NewItemCourse
                className="flex-col w-60 min-w-60 mb-6"
                isHiddenButton
            />
            <NewItemCourse
                className="flex-col w-60 min-w-60 mb-6"
                isHiddenButton
            />
        </div>
    );
};
