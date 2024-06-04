import React, { useState } from "react";
import clsx from "clsx";
import { Course, defaultCourse } from "../lib/model/course";
import Link from "next/link";
import { Button, ConfigProvider, notification } from "antd";
import { apiInstance } from "@/plugin/apiInstance";
import { useToken } from "../lib/hooks/useToken";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Image from "next/image";

export type NewItemCourse = {
    className?: string;
    course?: Course;
    isHiddenButton?: boolean;
    layout?: "horizontal" | "vertical";
    isHiddenDesc?: boolean;
    onAddCart?: (courseId?: string) => void;
    isInCart?: boolean;
};
export const NewItemCourse: React.FC<NewItemCourse> = ({
    className,
    course = defaultCourse,
    isHiddenButton = false,
    layout = "vertical",
    isHiddenDesc = false,
    isInCart = false,
}) => {
    const userTokenData = useToken();
    const [api, contextHolder] = notification.useNotification();
    const [isLoadingAddCart, setIsLoadingAddCart] = useState(false);
    const [isInCartLocal, setIsInCartLocal] = useState(false);
    const router = useRouter();
    const addToCart = () => {
        setIsLoadingAddCart(true);
        apiInstance
            .post(
                "users/carts",
                {
                    courseId: course.courseId,
                },
                {
                    headers: {
                        Authorization: "Bear " + userTokenData?.accessToken,
                    },
                }
            )
            .then((res) => {
                api.success({
                    message: "Add cart successful!",
                    placement: "bottomRight",
                });
                setIsLoadingAddCart(false);
                setIsInCartLocal(true);
            })
            .catch((error) => {
                console.log(error);
                api.error({
                    message: "Add cart error!",
                    placement: "bottomRight",
                    description: "Please wait few seconds and try again",
                });
                setIsLoadingAddCart(false);
            });
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemActiveBg: "rgb(255 208 183)",
                        itemSelectedBg: "rgb(255 232 219)",
                        itemSelectedColor: "rgb(255 97 15)",
                        itemBorderRadius: 0,
                    },
                },
                token: {
                    colorPrimary: "#E3311D",
                },
            }}
        >
            {contextHolder}
            <div
                className={clsx(
                    `flex rounded-md overflow-hidden ${className}`,
                    {
                        "flex-col": layout === "vertical",
                        "flex-row h-56 items-center": layout === "horizontal",
                    }
                )}
            >
                <Link
                    href={`/detail-course/${course.courseId}`}
                    className={clsx("block group overflow-hidden h-full", {
                        "w-1/3 ": layout === "horizontal",
                        "w-auto": layout === "vertical",
                    })}
                >
                    <Image
                        src={course?.posterUrl || ""}
                        alt=""
                        className="object-cover w-full h-full transition-all group-hover:scale-110"
                        width={1920}
                        height={1080}
                    />
                </Link>
                <div className="text-zinc-800 bg-white p-4 pt-2 gap-4 flex flex-col justify-around flex-1">
                    <div className="">
                        <Link
                            href={`/detail-course/${course.courseId}`}
                            className={clsx(
                                " text-zinc-800 text-sm sm:text-lg hover:text-orange-600 line-clamp-2 h-14 mb-4"
                            )}
                        >
                            {course?.title}
                        </Link>
                        <div className="flex items-end gap-2 text-orange-700">
                            <p className="text-sm lg:text-base">
                                Price: $
                                {(
                                    course?.price -
                                    (course?.price * course?.discount) / 100
                                ).toFixed(2)}
                            </p>
                            <p className="text-xs lg:text-sm line-through text-orange-300">
                                ${course?.price}
                            </p>
                        </div>
                    </div>
                    <p
                        className={clsx("text-sm line-clamp-2", {
                            hidden: isHiddenDesc,
                        })}
                    >
                        {course.introduction}
                    </p>
                    <div
                        className={clsx(" justify-end gap-2 ", {
                            hidden: isHiddenButton,
                            flex: !isHiddenButton,
                        })}
                    >
                        <Button type="primary" className="px-2 py-1">
                            Buy now
                        </Button>
                        <Button
                            className="px-2 py-1"
                            onClick={() => {
                                isInCart === true || isInCartLocal === true
                                    ? router.push("/cart")
                                    : addToCart();
                            }}
                            icon={
                                isLoadingAddCart ? (
                                    <LoadingOutlined />
                                ) : undefined
                            }
                        >
                            {isInCart === true || isInCartLocal === true
                                ? "View in cart"
                                : "Add to cart"}
                        </Button>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
};
