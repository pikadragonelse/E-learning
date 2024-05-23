"use client";

import React, { useEffect, useState } from "react";
import { ItemInstructor } from "./item-instructor";
import { apiInstance } from "@/plugin/apiInstance";
import { User } from "../lib/model/user";
const url = "https://api.dicebear.com/7.x/miniavs/svg?seed=1";

export const ListInstructor = () => {
    const [listInstructor, setListInstructor] = useState<User[]>([]);
    const getInstructor = () => {
        apiInstance
            .get("users/instructors")
            .then((res) => {
                setListInstructor(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getInstructor();
    }, []);
    return (
        <div className="overflow-hidden">
            <div className="flex gap-4 overflow-auto justify-between py-6">
                {listInstructor.map((instructor, index) =>
                    index < 8 ? (
                        <ItemInstructor
                            srcAvt={instructor.profile.avatar}
                            name={instructor.profile.fullName}
                        />
                    ) : undefined
                )}
            </div>
        </div>
    );
};
