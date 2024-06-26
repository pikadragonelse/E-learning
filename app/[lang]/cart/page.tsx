"use client";

import { Locale } from "antd/es/locale";
import React, { useEffect, useState } from "react";
import { ConfigProvider, Rate } from "antd";
import { DeleteOutlined, HeartOutlined } from "@ant-design/icons";
import { apiInstance } from "@/plugin/apiInstance";
import { Course } from "../lib/model/course";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Container } from "../ui/container";
import { useBillStore } from "../lib/store/bill";
import { useTokenStore } from "../lib/store/userInfo";
import { getToken } from "../lib/utils/get-token";

export default function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const [listCart, setListCart] = useState<Course[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { userInfo, updateUserInfo } = useTokenStore();
    const { updateBillData, billData } = useBillStore((state) => state);
    const [refreshCart, setRefreshCart] = useState(0);
    const router = useRouter();

    const getListCard = () => {
        apiInstance
            .get("users/carts", {
                headers: {
                    Authorization: "Bear " + userInfo?.accessToken,
                },
            })
            .then((res) => {
                setListCart(
                    res.data.data[0] != null ? res.data.data[0].carts : []
                );
                let totalPrice = 0;
                res.data.data[0].carts.forEach((course: Course) => {
                    totalPrice += Number(
                        (course.price * (1 - course.discount / 100)).toFixed(2)
                    );
                });
                setTotalPrice(totalPrice);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteCourse = (courseId: string) => {
        apiInstance
            .delete("users/carts", {
                headers: {
                    Authorization: "Bear " + userInfo?.accessToken,
                },
                data: {
                    courseIds: [courseId],
                },
            })
            .then((res) => {
                setRefreshCart((prev) => prev + 1);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const createOrder = async () => {
        const listCourseId = listCart.map((cart) => cart.courseId);

        return apiInstance
            .post(
                "payments/create-order/",
                {
                    courseIds: listCourseId,
                },
                {
                    headers: {
                        Authorization: "Bear " + userInfo?.accessToken,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);

                return res.data.id;
            })
            .catch((error) => {
                console.log(error);

                return "error";
            });
    };

    const onApprove = async (data: any) => {
        return apiInstance
            .post(`payments/orders/${data.orderID}/capture`, {
                orderID: data.orderID,
            })
            .then((res) => {
                updateBillData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (userInfo.userId !== 0) {
            getListCard();
        }
    }, [refreshCart, userInfo]);

    useEffect(() => {
        if (billData.id !== 0) {
            router.push(`bill/${billData.id}`);
        }
    }, [billData, router]);

    useEffect(() => {
        updateUserInfo(getToken());
    }, []);

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
                            {listCart.map((course, index) => (
                                <li
                                    key={index}
                                    className="flex gap-4 mb-4 items-center border rounded-md p-4 shadow-md bg-white "
                                >
                                    <img
                                        src={course.posterUrl || ""}
                                        alt=""
                                        className="w-20 h-20 lg:w-32 lg:h-32 rounded-md object-cover"
                                        width={1920}
                                        height={1080}
                                    />
                                    <div
                                        className="flex flex-col cursor-pointer"
                                        onClick={() =>
                                            router.push(
                                                `detail-course/${course.courseId}`
                                            )
                                        }
                                    >
                                        <h2 className="lg:text-lg ">
                                            {course.title}
                                        </h2>
                                        <h2 className="text-xs lg:text-sm text-zinc-500">
                                            {course.introduction}
                                        </h2>
                                        <div className="flex items-center">
                                            <span>{course.averageRating}</span>
                                            <Rate
                                                disabled
                                                defaultValue={
                                                    course.averageRating
                                                }
                                                className="ml-2"
                                            />
                                        </div>
                                        <div className="lg:hidden">
                                            <HeartOutlined className=" cursor-pointer text-lg active:text-red-800 mr-2" />
                                            <DeleteOutlined
                                                className="text-red-700 cursor-pointer text-lg active:text-red-800 mr-10"
                                                onClick={() =>
                                                    deleteCourse(
                                                        course.courseId
                                                    )
                                                }
                                            />
                                            <span className="text-orange-600 text-lg">
                                                ${course.price}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-auto  gap-4 hidden lg:flex">
                                        <HeartOutlined className=" cursor-pointer text-lg active:text-red-800 " />
                                        <DeleteOutlined
                                            className="text-red-700 cursor-pointer text-lg active:text-red-800 mr-10"
                                            onClick={() =>
                                                deleteCourse(course.courseId)
                                            }
                                        />
                                        <span className="text-orange-600 text-2xl">
                                            $
                                            {(
                                                course.price *
                                                (1 - course.discount / 100)
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full order-1 lg:order-2 lg:w-[300px] mt-14 h-fit flex flex-col gap-3 border p-4 bg-zinc-50 rounded-md shadow-md">
                        <div className="flex justify-center items-center mb-10">
                            <img
                                src="/images/logo-main.png"
                                width={120}
                                height={120}
                                alt="Alpha logo"
                            />
                        </div>
                        <div
                            key={1}
                            className="flex justify-between items-center"
                        >
                            <h1 className="text-lg text-zinc-600">Total:</h1>
                            <h2 className="text-lg text-orange-600">
                                ${totalPrice.toFixed(2)}
                            </h2>
                        </div>
                        <div
                            key={3}
                            className="flex justify-between items-center"
                        >
                            <h1 className="text-lg text-zinc-600">VAT:</h1>
                            <h2 className="text-lg text-orange-600">2%</h2>
                        </div>
                        <div
                            key={4}
                            className="flex justify-between items-center"
                        >
                            <h1 className="text-lg text-zinc-600">Summary:</h1>
                            <h2 className="text-lg text-orange-600">
                                ${(totalPrice * (1 + 0.02)).toFixed(2)}
                            </h2>
                        </div>

                        {/* <Select
                            defaultActiveFirstOption
                            options={[{ label: "Paypal", value: "paypal" }]}
                        /> */}
                        {listCart.length > 0 ? (
                            <PayPalScriptProvider
                                options={{
                                    clientId:
                                        "AV548dBEnVBBu_Xwzud-2Dzs26BO5934sbxGkZhkZoHSnvQHEhfZevHpz53DIB_xn-XqAsF4fKiQVvUx",
                                }}
                            >
                                <PayPalButtons
                                    style={{ layout: "vertical" }}
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                />
                            </PayPalScriptProvider>
                        ) : undefined}
                    </div>
                </div>
            </Container>
        </ConfigProvider>
    );
}
