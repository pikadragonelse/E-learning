"use client";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export type CheckList = { dataList?: string[] };
export const CheckList: React.FC<CheckList> = ({ dataList = [] }) => {
    return (
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-xs lg:text-sm">
            {dataList.map((data, index) =>
                data !== "" ? (
                    <li key={index} className="mr-4 flex items-start">
                        <div className="w-6 h-6">
                            <FontAwesomeIcon icon={faCheck} className="mr-2 " />
                        </div>
                        <p>{data}</p>
                    </li>
                ) : (
                    ""
                )
            )}
        </ul>
    );
};
