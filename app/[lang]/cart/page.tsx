"use client";

import { Locale } from "antd/es/locale";
import { Container } from "../ui/container";
import React from "react";
import { Button, Checkbox, ConfigProvider, Rate, Select } from "antd";
import { DeleteOutlined, HeartOutlined } from "@ant-design/icons";
import Image from "next/image";

const list = [1, 2, , 3, 4, 5];

export default function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#E3311D",
                },
            }}
        >
            <Container>
                <div className="lg:px-20 px-6 flex flex-col lg:flex-row gap-10 justify-between text-zinc-800">
                    <div className="flex-1 order-2 lg:order-1">
                        <h1 className="text-3xl mb-6">Your cart</h1>
                        <ul className="max-h-[550px] overflow-auto relative border bg-zinc-100 rounded-md p-6">
                            {list.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex gap-4 mb-4 items-center border rounded-md p-4 shadow-md bg-white "
                                >
                                    <img
                                        src="https://t4.ftcdn.net/jpg/05/64/99/95/360_F_564999540_XdTvqLGDpneB3v4ifz0SZgzxMOFmfoVo.jpg"
                                        alt=""
                                        className="w-20 h-20 lg:w-32 lg:h-32 rounded-md"
                                    />
                                    <div className="flex flex-col cursor-pointer">
                                        <h2 className="lg:text-lg ">
                                            Name product
                                        </h2>
                                        <h2 className="text-xs lg:text-sm text-zinc-500">
                                            Instructor
                                        </h2>
                                        <div className="flex items-center">
                                            <span>4.0</span>
                                            <Rate
                                                disabled
                                                defaultValue={4}
                                                className="ml-2"
                                            />
                                        </div>
                                        <div className="lg:hidden">
                                            <HeartOutlined className=" cursor-pointer text-lg active:text-red-800 mr-2" />
                                            <DeleteOutlined className="text-red-700 cursor-pointer text-lg active:text-red-800 mr-10" />
                                            <span className="text-orange-600 text-lg">
                                                $200
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-auto  gap-4 hidden lg:flex">
                                        <HeartOutlined className=" cursor-pointer text-lg active:text-red-800 " />
                                        <DeleteOutlined className="text-red-700 cursor-pointer text-lg active:text-red-800 mr-10" />
                                        <span className="text-orange-600 text-2xl">
                                            $200
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full order-1 lg:order-2 lg:w-[300px] mt-14 h-fit flex flex-col gap-3 border p-4 bg-zinc-50 rounded-md shadow-md">
                        <div className="flex justify-center items-center mb-10">
                            <Image
                                src="/images/logo-main.png"
                                width={120}
                                height={120}
                                alt="Alpha logo"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <h1 className="text-zinc-600">Total:</h1>
                            <h2 className="text-lg text-orange-600">$200</h2>
                        </div>
                        <div className="flex justify-between items-center">
                            <h1 className="text-zinc-600">Discount:</h1>
                            <h2 className="text-lg text-orange-600">20%</h2>
                        </div>
                        <div className="flex justify-between items-center">
                            <h1 className="text-zinc-600">VAT:</h1>
                            <h2 className="text-lg text-orange-600">2%</h2>
                        </div>
                        <div className="flex justify-between items-center">
                            <h1 className="text-zinc-600">Summary:</h1>
                            <h2 className="text-lg text-orange-600">$160</h2>
                        </div>

                        <Select
                            defaultActiveFirstOption
                            options={[{ label: "Paypal", value: "paypal" }]}
                        />

                        <Button type="primary" size="large" className="my-10">
                            Checkout
                        </Button>
                    </div>
                </div>
            </Container>
        </ConfigProvider>
    );
}
