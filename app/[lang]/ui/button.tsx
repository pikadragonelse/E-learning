"use client";

import { Button, ButtonProps, ConfigProvider } from "antd";
import clsx from "clsx";
import React from "react";

// const typeBgMap: Record<
//     "link" | "default" | "text" | "primary" | "dashed",
//     string
// > = {
//     link: "",
//     default:
//         "bg-zinc-50 hover:border-orange-700 text-zinc-800 hover:text-orange-700",
//     primary: "bg-orange-500 hover:border-orange-700 text-zinc-50",
//     text: "",
//     dashed: "bg-transparent hover:border-orange-700 text-zinc-800 hover:text-orange-700",
// };

export const CustomButton: React.FC<ButtonProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#E3311D",
                },
            }}
        >
            <Button {...props} className={className}>
                {children}
            </Button>
        </ConfigProvider>
    );
};
