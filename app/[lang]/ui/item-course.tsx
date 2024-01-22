import React from "react";
import { RightOutlined, PlayCircleOutlined } from "@ant-design/icons";

export const ItemCourse = () => {
    return (
        <div className="w-64 h-[28rem] relative group shadow-xl ">
            <div className="h-full group-hover:h-1/2 transition-all cursor-pointer relative">
                <img
                    src="https://coolwallpapers.me/picsup/3058990-book_computer_design_development_electronics_html_keyboard_laptop_macbook_notebook_pencil_technology_web_web-design_website.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="w-full h-full bg-zinc-800/50 opacity-0 group-hover:opacity-100 transition-all absolute top-0 flex items-center justify-center duration-200">
                    <PlayCircleOutlined className="text-3xl" />
                </div>
            </div>

            <div className="absolute p-4 w-full bottom-0 bg-zinc-800/90 group-hover:bg-white group-hover:text-zinc-800 transition-all">
                <div className="flex flex-col ">
                    <h2 className="font-medium">HTML Full Course</h2>
                    <p className="text-xs mt-2 mb-6">
                        Instructor: Helen Murphy, PikaLong
                    </p>
                    <ul className="text-xs mb-6 opacity-0 group-hover:opacity-100 group-hover:h-24 h-0 overflow-hidden transition-all duration-75">
                        <li className="">
                            Lorem Ipsum is simply dummy text of the
                        </li>
                        <li className="">
                            Lorem Ipsum is simply dummy text of the
                        </li>
                        <li className="">
                            Lorem Ipsum is simply dummy text of the
                        </li>
                    </ul>
                </div>

                <div className="flex justify-between ">
                    <span className="">
                        Price: <span className="text-orange-600">$30</span>
                    </span>
                    <button className="flex gap-1 text-orange-600 items-center text-sm">
                        <span className="">Add to card</span>
                        <RightOutlined />
                    </button>
                </div>
            </div>
        </div>
    );
};
