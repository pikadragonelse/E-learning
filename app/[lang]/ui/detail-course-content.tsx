"use client";

import React, { Suspense, useEffect, useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { apiInstance } from "@/plugin/apiInstance";
import {
    Button,
    Drawer,
    Form,
    Input,
    MenuProps,
    Modal,
    notification,
} from "antd";
const VideoCustom = React.lazy(() => import("./video-custom"));
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTokenStore } from "../lib/store/userInfo";
import { Course, defaultCourse } from "../lib/model/course";
import { InstructorBriefInfo } from "./instructor-brief-info";
import { SubInfoDetailCourse } from "./sub-info-detail-course";
import { DetailOverviewInfo } from "./detail-overview-info";
import { CheckList } from "./check-list";
import { MenuLecture } from "./menu-lecture";
import { Comment } from "./comment/comment";
import { ChatBot } from "./chatbot";
import { getToken } from "../lib/utils/get-token";

export default function DetailCourseContent({
    params,
}: {
    params: { id: string };
}) {
    const [courseData, setCourseData] = useState<Course>(defaultCourse);
    const [openModalPreview, setOpenModalPreview] = useState(false);
    const [refreshVideo, setRefreshVideo] = useState(0);
    const { userInfo, updateUserInfo } = useTokenStore();
    const [api, contextHolder] = notification.useNotification();
    const [stateCourse, setStateCourse] = useState<{
        isCourseFavorite: boolean;
        percentCompleteCourse: number;
        isAddedToCart: boolean;
        isUserEnrollmentCourse: boolean;
    }>({
        isCourseFavorite: false,
        percentCompleteCourse: 0,
        isAddedToCart: false,
        isUserEnrollmentCourse: false,
    });
    const [isLoadingAddCart, setIsLoadingAddCart] = useState(false);

    const route = useRouter();
    const onClickMenuItem: MenuProps["onClick"] = (e) => {
        if (userInfo.userId !== 0) {
            if (stateCourse.isUserEnrollmentCourse === true) {
                route.push(`/en/learning/${courseData.courseId}/${e.key}`);
            } else {
                api.info({
                    message: "Please buy this course to see detail lesson!",
                    placement: "bottomRight",
                });
            }
        } else {
            api.info({
                message: "Please buy this course to see detail lesson!",
                placement: "bottomRight",
            });
        }
    };

    const getCourseData = () => {
        apiInstance
            .get(`courses/${params.id}`, {
                headers: userInfo?.accessToken
                    ? { Authorization: "Bearer " + userInfo?.accessToken }
                    : {},
            })
            .then((res) => {
                setCourseData(res.data.data.course);

                setStateCourse({
                    isCourseFavorite: res.data.data.isCourseFavorite,
                    percentCompleteCourse: res.data.data.percentCompleteCourse,
                    isAddedToCart: res.data.data.isAddedToCart,
                    isUserEnrollmentCourse:
                        res.data.data.isUserEnrollmentCourse,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addFavoriteCourse = () => {
        setStateCourse((prev) => {
            return {
                ...prev,
                isCourseFavorite: true,
            };
        });
        apiInstance
            .post(
                "users/favorite-courses",
                {
                    courseId: courseData.courseId,
                },
                { headers: { Authorization: "Bear " + userInfo?.accessToken } }
            )
            .then((res) => {
                api.success({
                    message: "Add favorite course successful!",
                    placement: "bottomRight",
                });
            })
            .catch((error) => {
                console.log(error);
                api.error({
                    message: "Add favorite course fail!",
                    placement: "bottomRight",
                    description: "Please wait few seconds and try again!",
                });
                setStateCourse((prev) => {
                    return {
                        ...prev,
                        isCourseFavorite: false,
                    };
                });
            });
    };

    const removeFavoriteCourse = () => {
        setStateCourse((prev) => {
            return {
                ...prev,
                isCourseFavorite: false,
            };
        });
        apiInstance
            .delete(
                "users/favorite-courses",

                {
                    headers: {
                        Authorization: "Bear " + userInfo?.accessToken,
                    },
                    data: {
                        courseId: courseData.courseId,
                    },
                }
            )
            .then((res) => {
                api.success({
                    message: "Remove favorite course successful!",
                    placement: "bottomRight",
                });
            })
            .catch((error) => {
                console.log(error);
                api.error({
                    message: "Remove favorite course fail!",
                    placement: "bottomRight",
                    description: "Please wait few seconds and try again!",
                });
                setStateCourse((prev) => {
                    return {
                        ...prev,
                        isCourseFavorite: true,
                    };
                });
            });
    };

    const addToCart = () => {
        setIsLoadingAddCart(true);
        apiInstance
            .post(
                "users/carts",
                {
                    courseId: courseData.courseId,
                },
                {
                    headers: {
                        Authorization: "Bear " + userInfo?.accessToken,
                    },
                }
            )
            .then((res) => {
                api.success({
                    message: "Add cart successful!",
                    placement: "bottomRight",
                });
                setIsLoadingAddCart(false);
                setStateCourse((prev) => {
                    return {
                        ...prev,
                        isAddedToCart: true,
                    };
                });
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

    useEffect(() => {
        getCourseData();
    }, [userInfo]);

    useEffect(() => {
        updateUserInfo(getToken());
    }, []);

    return (
        <div>
            {contextHolder}

            <Modal
                title="Preview course"
                open={openModalPreview}
                onCancel={() => {
                    setRefreshVideo((prev) => prev + 1);
                    setOpenModalPreview(false);
                }}
                footer={<></>}
                className="w-[800px]"
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <VideoCustom
                        refresh={refreshVideo}
                        videoSource={courseData.trailerUrl}
                    />
                </Suspense>
            </Modal>
            <div className="relative">
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
                        src={courseData.posterUrl || ""}
                        alt=""
                        className="w-full h-full object-cover "
                        width={1920}
                        height={1080}
                    />
                </div>
                <SubInfoDetailCourse
                    price={courseData.price}
                    discount={courseData.discount}
                    duration={courseData.duration}
                    onClickPreview={() => setOpenModalPreview(true)}
                    poster={courseData.posterUrl}
                    onAddFavorite={
                        stateCourse.isCourseFavorite === true
                            ? removeFavoriteCourse
                            : addFavoriteCourse
                    }
                    isFavoriteCourse={stateCourse.isCourseFavorite}
                    onClickCartBtn={() =>
                        stateCourse.isAddedToCart
                            ? route.push("/cart")
                            : addToCart()
                    }
                    isBought={stateCourse.isUserEnrollmentCourse}
                    isLoadingCart={isLoadingAddCart}
                    isHaveInCart={stateCourse.isAddedToCart}
                />
                <div className="h-3 hidden lg:block"></div>
                <DetailOverviewInfo
                    title={courseData?.title}
                    instructor={courseData?.instructor?.profile.fullName}
                    rating={Number(courseData?.averageRating.toFixed(1))}
                    latestUpdate={courseData?.updatedAt}
                    language={courseData?.language.languageName}
                    desc={courseData?.introduction}
                    totalStudent={courseData.totalStudents}
                />
                <div className="lg:ml-[500px] lg:mr-60">
                    <div className="mt-4 lg:hidden">
                        <p className="text-zinc-800 font-medium text-2xl">
                            $200
                        </p>
                        <div className="mt-2 flex flex-col">
                            <Button type="primary" className="mb-2 h-10">
                                Add to cart
                            </Button>
                            <Button type="dashed" className="h-10">
                                Buy now
                            </Button>
                        </div>
                    </div>
                    <div className=" mx-2 mt-10 text-zinc-800">
                        <div className="p-5 border border-zinc-400 border-solid">
                            <h1 className="font-medium text-2xl mb-4">
                                What you&apos;ll learn
                            </h1>
                            <CheckList
                                dataList={courseData.learnsDescription
                                    .trim()
                                    .split(".")}
                            />
                        </div>
                        <div className="mt-14">
                            <h1 className="font-medium text-2xl mb-4">
                                Content
                            </h1>
                            <MenuLecture
                                className="bg-zinc-50"
                                isSetDefault={false}
                                dataList={courseData.topics}
                                onItemClick={onClickMenuItem}
                            />
                        </div>
                        <div className="mt-14">
                            <h1 className="font-medium text-2xl mb-4">
                                Requirements
                            </h1>
                            <ul className="list-disc text-sm lg:text-base flex flex-col gap-2">
                                {courseData.requirementsDescription
                                    .split(".")
                                    .map((value, index) =>
                                        value !== "" ? (
                                            <li className="ml-10" key={index}>
                                                {value}
                                            </li>
                                        ) : (
                                            ""
                                        )
                                    )}
                            </ul>
                        </div>
                        <div className="mt-14">
                            <h1 className="font-medium text-2xl mb-4">
                                Description
                            </h1>
                            <div className="text-sm lg:text-base">
                                {parse(courseData.description)}
                            </div>
                        </div>
                        <div className="mt-14">
                            <h1 className="font-medium text-2xl mb-4">
                                Who this course is for:
                            </h1>
                            <ul className="list-disc text-sm lg:text-base flex flex-col gap-2">
                                <li className="ml-10">
                                    Office workers, students, small/home
                                    business workers, and administrators would
                                    want to improve their productivity.
                                </li>
                                <li className="ml-10">
                                    Office workers, students, small/home
                                    business workers, and administrators would
                                    want to improve their productivity.
                                </li>
                                <li className="ml-10">
                                    Office workers, students, small/home
                                    business workers, and administrators would
                                    want to improve their productivity.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mx-2 mt-10 text-zinc-800">
                        <InstructorBriefInfo
                            className="mb-6"
                            instructor={courseData.instructor}
                        />
                        <div className="-ml-16">
                            <Comment
                                isHideCommentForm
                                isHideAction
                                listReview={courseData.reviews}
                                type="review"
                                title="Reviews"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
