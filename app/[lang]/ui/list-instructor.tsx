"use client";

import React, { useEffect, useState } from "react";
import { ItemInstructor } from "./item-instructor";
import { apiInstance } from "@/plugin/apiInstance";
import { User } from "../lib/model/user";
import { useRouter } from "next/navigation";
import { encryptUrlSafe } from "../lib/utils/crypt";
const url = "https://api.dicebear.com/7.x/miniavs/svg?seed=1";

export const ListInstructor = () => {
    const [listInstructor, setListInstructor] = useState<User[]>([]);
    const route = useRouter();

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
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                route.push(
                                    `/user/${encryptUrlSafe(
                                        instructor.id?.toString() || "",
                                        process.env.CRYPTO_SECRET_KEY || ""
                                    )}`
                                );
                            }}
                            key={index}
                        >
                            <ItemInstructor
                                key={index}
                                srcAvt={instructor.profile.avatar}
                                name={instructor.profile.fullName}
                            />
                        </div>
                    ) : undefined
                )}
            </div>
        </div>
    );
};
