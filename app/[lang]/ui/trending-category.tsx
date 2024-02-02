import React from "react";

export type TrendingCategory = {
    className?: string;
    icon?: JSX.Element;
    text?: string;
};
export const TrendingCategory: React.FC<TrendingCategory> = ({
    className,
    icon,
    text,
}) => {
    return (
        <div
            className={`min-w-28 text-zinc-300 flex gap-1 flex-col items-center p-2 cursor-pointer hover:text-orange-600 transition-all ${className}`}
        >
            <div>{icon}</div>
            <span className="text-xs lg:text-base">{text}</span>
        </div>
    );
};
