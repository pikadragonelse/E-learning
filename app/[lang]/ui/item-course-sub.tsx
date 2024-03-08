import React from "react";
import { CustomButton } from "./button";

export const ItemCourseSub = () => {
    return (
        <div className="flex gap-4">
            <div className="w-[28rem] rounded overflow-hidden">
                <img
                    src="https://coolwallpapers.me/picsup/3058990-book_computer_design_development_electronics_html_keyboard_laptop_macbook_notebook_pencil_technology_web_web-design_website.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className="">
                    <h1 className="text-xl font-medium text-orange-500">
                        Name course
                    </h1>
                    <h2 className="text-sm">
                        Instructor: aklsdfjas df kjla hsdf
                    </h2>
                    <span>
                        Price: <span className="text-orange-500">$200</span>
                    </span>
                </div>
                <div className="">
                    <div className="">
                        Very straight-to-point article. Really worth time
                        reading. Thank you! But tools are just the instruments
                        for the UX designers. The knowledge of the design tools
                        are as important as the creation of the design strategy.
                    </div>
                </div>
                <div className="flex gap-2">
                    <CustomButton>Add to card</CustomButton>
                    <CustomButton type="primary">Buy now</CustomButton>
                </div>
            </div>
        </div>
    );
};
