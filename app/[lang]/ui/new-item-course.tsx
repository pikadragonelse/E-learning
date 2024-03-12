import React from "react";
import { CustomButton } from "./button";

export const NewItemCourse = () => {
    return (
        <div className="flex w-auto lg:w-64 shadow-xl rounded-md overflow-hidden">
            <div className=" w-40">
                <img
                    src="https://coolwallpapers.me/picsup/3058990-book_computer_design_development_electronics_html_keyboard_laptop_macbook_notebook_pencil_technology_web_web-design_website.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="text-zinc-800 bg-white p-4 pt-2 flex flex-col gap-2 w-64">
                <div className="">
                    <h1 className=" lg:text-xl">New course</h1>
                    <div className="flex items-center gap-2 text-orange-600">
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
                <div className="flex justify-end gap-2 lg:justify-between">
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
