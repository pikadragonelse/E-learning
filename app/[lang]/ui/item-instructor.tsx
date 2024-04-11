import { Avatar } from "antd";
import React from "react";

export type ItemInstructor = {
    className?: string;
    srcAvt?: string;
    name?: string;
    major?: string;
    size?: number;
};
export const ItemInstructor: React.FC<ItemInstructor> = ({
    className,
    srcAvt,
    name,
    major,
    size = 100,
}) => {
    return (
        <div
            className={`min-w-30 group flex flex-col items-center text-zinc-800 cursor-pointer p-2 hover:text-orange-700 transition-all ${className}`}
        >
            <div className="border border-zinc-600 overflow-hidden rounded-full mb-2">
                <Avatar
                    src={srcAvt}
                    className={`border cursor-pointer group-hover:scale-125 transition-all size-16 md:size-20 lg:size-24`}
                    size={"default"}
                />
            </div>

            <h2>{name}</h2>
            <h4 className="text-zinc-600 text-sm font-light group-hover:text-orange-700 transition-all">
                {major}
            </h4>
        </div>
    );
};
