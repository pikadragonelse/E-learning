"use client";

import React from "react";
import { SubInfoDetailCourse } from "../ui/sub-info-detail-course";
import { DetailOverviewInfo } from "../ui/detail-overview-info";
import { CheckList } from "../ui/check-list";
import { MenuLecture } from "../ui/menu-lecture";
import { CaretRightOutlined } from "@ant-design/icons";
import { CustomButton } from "../ui/button";

export default function Page() {
    return (
        <main className="relative">
            <div className="h-64 md:h-96 lg:hidden relative group overflow-hidden">
                <div className="absolute flex flex-col gap-2 items-center justify-center w-full h-full bg-zinc-800/40  transition-all cursor-pointer">
                    <CaretRightOutlined
                        className={
                            "text-xl sm:text-3xl text-zinc-50  bg-zinc-700 rounded-full py-3 px-3"
                        }
                    />
                    Preview this course
                </div>
                <img
                    src="https://coolwallpapers.me/picsup/3058990-book_computer_design_development_electronics_html_keyboard_laptop_macbook_notebook_pencil_technology_web_web-design_website.jpg"
                    alt=""
                    className="w-full h-full object-cover "
                />
            </div>
            <SubInfoDetailCourse />
            <div className="h-3 hidden lg:block"></div>
            <DetailOverviewInfo />
            <div className="mt-4 lg:hidden">
                <p className="text-zinc-800 font-medium text-2xl">$200</p>
                <div className="mt-2 flex flex-col">
                    <CustomButton type="primary" className="mb-2 h-10">
                        Add to cart
                    </CustomButton>
                    <CustomButton type="dashed" className=" h-10">
                        Buy now
                    </CustomButton>
                </div>
            </div>
            <div className="lg:ml-96 lg:mr-60 mx-2 mt-10 text-zinc-800">
                <div className="p-5 border border-zinc-400">
                    <h1 className="font-medium text-2xl mb-4">
                        What you'll learn
                    </h1>
                    <CheckList />
                </div>
                <div className="mt-14">
                    <h1 className="font-medium text-2xl mb-4">Content</h1>
                    <MenuLecture className="bg-zinc-50" isSetDefault={false} />
                </div>
                <div className="mt-14">
                    <h1 className="font-medium text-2xl mb-4">Requirements</h1>
                    <ul className="list-disc text-sm lg:text-base flex flex-col gap-2">
                        <li className="ml-10">
                            Basic computer skills: surfing websites, running
                            programs, saving and opening documents, etc.
                        </li>
                        <li className="ml-10">
                            Basic computer skills: surfing websites, running
                            programs, saving and opening documents, etc.
                        </li>
                        <li className="ml-10">
                            Basic computer skills: surfing websites, running
                            programs, saving and opening documents, etc.
                        </li>
                    </ul>
                </div>
                <div className="mt-14">
                    <h1 className="font-medium text-2xl mb-4">Description</h1>
                    <p className="text-sm lg:text-base">
                        If you're an office worker, student, administrator, or
                        just want to become more productive with your computer,
                        programming will allow you write code that can automate
                        tedious tasks. This course follows the popular (and
                        free!) book, Automate the Boring Stuff with Python.
                        Automate the Boring Stuff with Python was written for
                        people who want to get up to speed writing small
                        programs that do practical tasks as soon as possible.
                        You don't need to know sorting algorithms or
                        object-oriented programming, so this course skips all
                        the computer science and concentrates on writing code
                        that gets stuff done. This course is for complete
                        beginners and covers the popular Python programming
                        language. You'll learn basic concepts as well as: Web
                        scraping Parsing PDFs and Excel spreadsheets Automating
                        the keyboard and mouse Sending emails and texts And
                        several other practical topics By the end of this
                        course, you'll be able to write code that not only
                        dramatically increases your productivity, but also be
                        able to list this fun and creative skill on your resume.
                    </p>
                </div>
                <div className="mt-14">
                    <h1 className="font-medium text-2xl mb-4">
                        Who this course is for:
                    </h1>
                    <ul className="list-disc text-sm lg:text-base flex flex-col gap-2">
                        <li className="ml-10">
                            Office workers, students, small/home business
                            workers, and administrators would want to improve
                            their productivity.
                        </li>
                        <li className="ml-10">
                            Office workers, students, small/home business
                            workers, and administrators would want to improve
                            their productivity.
                        </li>
                        <li className="ml-10">
                            Office workers, students, small/home business
                            workers, and administrators would want to improve
                            their productivity.
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
