"use client";

import { Button, ButtonProps } from "antd";
import clsx from "clsx";
import React from "react";

const typeBgMap: Record<
    "link" | "default" | "text" | "primary" | "dashed",
    string
> = {
    link: "",
    default:
        "bg-zinc-50 hover:border-orange-600 text-zinc-800 hover:text-orange-600",
    primary: "bg-orange-500 hover:border-orange-600 text-zinc-50",
    text: "",
    dashed: "bg-transparent hover:border-orange-600 text-zinc-800 hover:text-orange-600",
};

export const CustomButton: React.FC<ButtonProps> = ({
    children,
    type = "default",
    className,
    ...props
}) => {
    return (
        <Button {...props} className={clsx(typeBgMap[type], className)}>
            {children}
        </Button>
    );
};
