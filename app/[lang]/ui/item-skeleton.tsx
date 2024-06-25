import { Skeleton } from "antd";
import React from "react";

export const ItemSkeleton = () => {
    return (
        <div className="w-64 min-w-64 sm:w-auto sm-min-w-auto shadow-xl flex flex-col rounded-md overflow-hidden gap-4">
            <Skeleton.Image className="w-full h-52" active />
            <Skeleton paragraph={{ rows: 4 }} active />
        </div>
    );
};
