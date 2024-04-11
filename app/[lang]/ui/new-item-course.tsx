import React from "react";
import { CustomButton } from "./button";
import clsx from "clsx";

export type NewItemCourse = {
    className?: string;
    img?: string;
    isHiddenButton?: boolean;
};
export const NewItemCourse: React.FC<NewItemCourse> = ({
    className,
    img,
    isHiddenButton = false,
}) => {
    return (
        <div
            className={`flex shadow-xl rounded-md overflow-hidden ${className}`}
        >
            <div className="w-[100px] min-w-[100px] sm:w-[200px] sm:min-w-[200px] lg:w-[280px] lg:min-w-[280px] h-44">
                <img src={img} alt="" className="object-cover w-full h-full" />
            </div>
            <div className="text-zinc-800 bg-white p-4 pt-2 gap-2 flex flex-col justify-around ">
                <div className="">
                    <h1 className=" lg:text-xl">New course</h1>
                    <div className="flex items-center gap-2 text-orange-700">
                        <p className="text-sm">Price: $20</p>
                        <p className="text-xs lg:text-sm line-through text-orange-300">
                            $39
                        </p>
                    </div>
                </div>
                <p className="text-xs line-clamp-2">
                    Very straight-to-point article. Really worth time reading.
                    Thank you! But tools are just the instruments for the UX
                    designers. The knowledge of the design tools are as
                    important as the creation of the design strategy
                </p>
                <div
                    className={clsx(" justify-end gap-2 ", {
                        hidden: isHiddenButton,
                        flex: !isHiddenButton,
                    })}
                >
                    <CustomButton type="primary" className="px-2 py-1">
                        Buy now
                    </CustomButton>
                    <CustomButton className="px-2 py-1">
                        Add to cart
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};
