import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Course, defaultCourse } from "../lib/model/course";
import { Button, ConfigProvider, Modal, notification } from "antd";
import { apiInstance } from "@/plugin/apiInstance";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import { useTokenStore } from "../lib/store/userInfo";
import { getToken } from "../lib/utils/get-token";

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
    const { userInfo, updateUserInfo } = useTokenStore();
    const [api, contextHolder] = notification.useNotification();
    const [isLoadingAddCart, setIsLoadingAddCart] = useState(false);
    const [isInCartLocal, setIsInCartLocal] = useState(false);
    const [isOpenModalLogin, setIsOpenModalLogin] = useState(false);
    const [isLoadingBuyNow, setIsLoadingBuyNow] = useState(false);
    const router = useRouter();

    useEffect(() => {
        updateUserInfo(getToken());
        console.log(userInfo);
    }, []);

    const getProcessingUser = () => {
        apiInstance
            .get("users/newest-processing", {
                headers: { Authorization: "Bear " + userInfo.accessToken },
                params: {
                    courseId: course.courseId,
                },
            })
            .then((res) => {
                if (res.data.data != null) {
                    router.push(
                        `/learning/${course.courseId}/${res.data.data.lessonId}`,
                        { scroll: true }
                    );
                } else {
                    router.push(`/detail-course/${course.courseId}`, {
                        scroll: true,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addToCart = (type: "buyNow" | "addToCart" = "addToCart") => {
        if (type === "addToCart") {
            setIsLoadingAddCart(true);
        } else {
            setIsLoadingBuyNow(true);
        }
        apiInstance
            .post(
                "users/carts",
                {
                    courseId: course.courseId,
                },
                {
                    headers: {
                        Authorization: "Bear " + userInfo?.accessToken,
                    },
                }
            )
            .then((res) => {
                if (type === "buyNow") {
                    router.push("/cart");
                    setIsLoadingBuyNow(false);
                } else {
                    api.success({
                        message: "Add cart successful!",
                        placement: "bottomRight",
                    });
                    setIsLoadingAddCart(false);
                    setIsInCartLocal(true);
                }
            })
            .catch((error) => {
                console.log(error);
                if (type === "addToCart") {
                    api.error({
                        message: "Add cart error!",
                        placement: "bottomRight",
                        description: "Please wait few seconds and try again",
                    });
                    setIsLoadingAddCart(false);
                } else {
                    setIsLoadingBuyNow(false);
                    api.error({
                        message: "Something is wrong, please try later!",
                        placement: "bottomRight",
                    });
                }
            });
    };

    const handleBuyNow = () => {
        if (userInfo.userId === 0) {
            setIsOpenModalLogin(true);
        } else {
            addToCart("buyNow");
        }
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
            <Modal
                title="Login remind"
                okText="Login"
                cancelText="Cancel"
                open={isOpenModalLogin}
                onCancel={() => setIsOpenModalLogin(false)}
                onOk={() => {
                    setIsOpenModalLogin(false);
                    router.push("/login");
                }}
            >
                You need to login to add to cart or buy now!
            </Modal>
            <div
                className={clsx(
                    `flex rounded-md overflow-hidden ${className}`,
                    {
                        "flex-col": layout === "vertical",
                        "flex-row h-56 items-center": layout === "horizontal",
                    }
                )}
            >
                <div
                    onClick={() => {
                        if (userInfo.userId === 0) {
                            router.push(`/detail-course/${course.courseId}`);
                        } else {
                            getProcessingUser();
                        }
                    }}
                    className={clsx(
                        "cursor-pointer block group overflow-hidden h-full",
                        {
                            "w-1/3 ": layout === "horizontal",
                            "w-auto": layout === "vertical",
                        }
                    )}
                >
                    <img
                        src={course?.posterUrl || ""}
                        alt=""
                        className="object-cover w-full h-full transition-all group-hover:scale-110"
                        width={1920}
                        height={1080}
                    />
                </div>
                <div className="text-zinc-800 bg-white p-4 pt-2 gap-4 flex flex-col justify-around flex-1">
                    <div className="">
                        <div
                            onClick={() => {
                                if (userInfo.userId === 0) {
                                    router.push(
                                        `/detail-course/${course.courseId}`
                                    );
                                } else {
                                    getProcessingUser();
                                }
                            }}
                            className={clsx(
                                " text-zinc-800 cursor-pointer text-sm sm:text-lg hover:text-orange-600 line-clamp-2 h-14 mb-4"
                            )}
                        >
                            {course?.title}
                        </div>
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
                    <div
                        className={clsx("text-sm line-clamp-2", {
                            hidden: isHiddenDesc,
                        })}
                    >
                        {parse(course.introduction)}
                    </div>
                    <div
                        className={clsx(" justify-end gap-2 ", {
                            hidden: isHiddenButton,
                            flex: !isHiddenButton,
                        })}
                    >
                        <Button
                            type="primary"
                            className="px-2 py-1"
                            onClick={handleBuyNow}
                            icon={
                                isLoadingBuyNow ? (
                                    <LoadingOutlined />
                                ) : undefined
                            }
                        >
                            Buy now
                        </Button>
                        <Button
                            className="px-2 py-1"
                            onClick={() => {
                                userInfo.userId !== 0
                                    ? isInCart === true ||
                                      isInCartLocal === true
                                        ? router.push("/cart")
                                        : addToCart()
                                    : setIsOpenModalLogin(true);
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
