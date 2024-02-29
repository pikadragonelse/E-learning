"use client";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const dataMap = [
    "Automate tasks on their computer by writing simple Python programs.",
    "Crawl web sites and pull information from online sources.",
    "Crawl web sites and pull information from online sources.",
    "Automate tasks on their computer by writing simple Python programs.",
    "Automate tasks on their computer by writing simple Python programs.",
    "Automate tasks on their computer by writing simple Python programs.",
    "Automate tasks on their computer by writing simple Python programs.",
    "Automate tasks on their computer by writing simple Python programs.",
    "Automate tasks on their computer by writing simple Python programs.",
    "Automate tasks on their computer by writing simple Python programs.",
    "Automate tasks on their computer by writing simple Python programs.",
    "Automate tasks on their computer by writing simple Python programs.",
    "Automate tasks on their computer by writing simple Python programs.",
];

export const CheckList = () => {
    return (
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-xs lg:text-sm">
            {dataMap.map((data) => (
                <li className="mr-4 flex items-start">
                    <div className="w-6 h-6">
                        <FontAwesomeIcon icon={faCheck} className="mr-2 " />
                    </div>
                    <p>{data}</p>
                </li>
            ))}
        </ul>
    );
};
