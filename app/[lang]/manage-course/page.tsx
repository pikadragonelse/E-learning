import React from "react";
import { Container } from "../ui/container";
import { Locale } from "antd/es/locale";
import { Button, Rate, Row } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const list = [1, 2, 3, 4, 5];

export default function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    return (
        <Container>
            <div className="text-zinc-800 px-6 lg:px-20">
                <h1 className="text-3xl font-medium mb-10">List your course</h1>
                <Row justify={"end"}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="mb-4"
                    >
                        Create course
                    </Button>
                </Row>
                <ul className="max-h-[800px] overflow-auto relative border bg-zinc-100 rounded-md p-6">
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
                                <h2 className="lg:text-lg ">Name product</h2>
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
                                    <EditOutlined className=" cursor-pointer text-lg active:text-orange-600 mr-10" />
                                    <DeleteOutlined className=" cursor-pointer text-lg active:text-orange-600 mr-10" />
                                    <span className="text-orange-600 text-lg">
                                        $200
                                    </span>
                                </div>
                            </div>
                            <div className="ml-auto  gap-4 hidden lg:flex">
                                <EditOutlined className=" cursor-pointer text-lg active:text-orange-600 mr-10" />
                                <DeleteOutlined className=" cursor-pointer text-lg active:text-orange-600 mr-10" />
                                <span className="text-orange-600 text-2xl">
                                    $200
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    );
}
