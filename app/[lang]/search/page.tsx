"use client";

import React from "react";
import { ItemCourse } from "../ui/item-course";
import { NewItemCourse } from "../ui/new-item-course";

const listItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function Page() {
    return (
        <div className="flex flex-col mx-4 lg:flex-wrap lg:mx-32 lg:justify-around gap-4">
            {listItem.map((item, index) => (
                <NewItemCourse key={index} />
            ))}
        </div>
    );
}
