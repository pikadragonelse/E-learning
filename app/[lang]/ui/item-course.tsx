import React from "react";
import { RightOutlined, PlayCircleOutlined } from "@ant-design/icons";

export const ItemCourse = () => {
    return (
        <div className="aspect-video relative group shadow-xl text-zinc-50 m-1">
            <div className="sm:h-full transition-all overflow-hidden relative cursor-pointer">
                <img
                    src="https://coolwallpapers.me/picsup/3058990-book_computer_design_development_electronics_html_keyboard_laptop_macbook_notebook_pencil_technology_web_web-design_website.jpg"
                    alt=""
                    className="w-full h-full object-cover lg:group-hover:scale-125 transition-all"
                />
                <div className="w-full h-full transition-all absolute top-0 flex items-center justify-center duration-200 to-black from-transparent bg-gradient-to-b "></div>
                <div className="flex flex-col absolute bottom-0 p-3 w-full">
                    <h2 className="font-medium text-sm line-clamp-1 overflow-hidden">
                        HTML Full Course
                    </h2>
                    <p className="text-[0.6rem] sm:text-xs mb-6 line-clamp-1 overflow-hidden">
                        Instructor: Helen Murphy, PikaLong
                    </p>
                    <div className="text-xs mb-3 h-0 max-h-16 md:opacity-0 md:group-hover:opacity-100 md:group-hover:h-16  overflow-hidden transition-all duration-300 line-clamp-3 ">
                        Lorem Ipsum is simply dummy text of the Lorem Ipsum is
                        simply dummy text of the Lorem Ipsum is simply dummy
                        text of the
                    </div>
                </div>
                <div className="flex justify-between items-center absolute bottom-1 w-full px-3">
                    <span className="text-xs sm:text-base">
                        Price: <span className="text-orange-600">$30</span>
                    </span>
                    <button className="flex gap-1 text-orange-600 items-center text-xs sm:text-sm hover:text-orange-400 py-1">
                        <span className="">Add to card</span>
                        <RightOutlined />
                    </button>
                </div>
            </div>

            {/* <div className="absolute p-2 sm:p-4 w-full bottom-0 text-zinc-800 sm:text-zinc-50 bg-white sm:bg-zinc-800/90 sm:group-hover:bg-white sm:group-hover:text-zinc-800 transition-all">
                <div className="flex flex-col ">
                    <h2 className="font-medium sm:text-2xl">
                        HTML Full Course
                    </h2>
                    <p className="text-xs mt-2 mb-3 sm:mb-6">
                        Instructor: Helen Murphy, PikaLong
                    </p>
                    
                </div>


            </div> */}
        </div>
    );
};
