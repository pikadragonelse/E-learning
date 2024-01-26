"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import React from "react";

export type Body = { className?: string; children?: any };
export const Body: React.FC<Body> = ({ className, children }) => {
    const pathname = usePathname();
    console.log(pathname.split("/")[1] === undefined);

    return (
        <div
            className={clsx(
                `app-container min-h-screen bg-white p-2 sm:py-5 mt-24 ${className}`,
                {
                    "sm:px-20": pathname.split("/")[1] === undefined,
                }
            )}
        >
            {children}
        </div>
    );
};
