"use client";

import React, { useEffect, useState } from "react";
import { SubInfoDetailCourse } from "../../ui/sub-info-detail-course";
import { DetailOverviewInfo } from "../../ui/detail-overview-info";
import { CheckList } from "../../ui/check-list";
import { MenuLecture } from "../../ui/menu-lecture";
import { CaretRightOutlined } from "@ant-design/icons";
import { Comment } from "../../ui/comment/comment";
import { InstructorBriefInfo } from "../../ui/instructor-brief-info";
import { ItemCourseSub } from "../../ui/item-course-sub";
import { Container } from "../../ui/container";
import { apiInstance } from "@/plugin/apiInstance";
import { Course, defaultCourse } from "../../lib/model/course";
import { Button, Modal, notification } from "antd";
import { VideoCustom } from "../../ui/video-custom";
import parse from "html-react-parser";
import { useToken } from "../../lib/hooks/useToken";

export default function Page({ params }: { params: { id: string } }) {
    const [courseData, setCourseData] = useState<Course>(defaultCourse);
    const [openModalPreview, setOpenModalPreview] = useState(false);
    const [refreshVideo, setRefreshVideo] = useState(0);
    const userToken = useToken();
    const [api, contextHolder] = notification.useNotification();
    const [listFavoriteCourseId, setListFavoriteCourseId] = useState<string[]>(
        []
    );
    const [refreshFavoriteList, setRefreshFavoriteList] = useState(0);

    const getCourseData = () => {
        apiInstance
            .get(`courses/${params.id}`)
            .then((res) => {
                setCourseData(res.data.data.course);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addFavoriteCourse = () => {
        apiInstance
            .post(
                "users/favorite-courses",
                {
                    courseId: courseData.courseId,
                },
                { headers: { Authorization: "Bear " + userToken?.accessToken } }
            )
            .then((res) => {
                console.log(res);
                api.success({
                    message: "Add favorite course successful!",
                    placement: "bottomRight",
                });
                setRefreshFavoriteList((prev) => prev + 1);
            })
            .catch((error) => {
                console.log(error);
                api.error({
                    message: "Add favorite course fail!",
                    placement: "bottomRight",
                    description: "Please wait few seconds and try again!",
                });
            });
    };

    const removeFavoriteCourse = () => {
        apiInstance
            .delete(
                "users/favorite-courses",

                {
                    headers: {
                        Authorization: "Bear " + userToken?.accessToken,
                    },
                    params: {
                        courseId: courseData.courseId,
                    },
                }
            )
            .then((res) => {
                api.success({
                    message: "Remove favorite course successful!",
                    placement: "bottomRight",
                });
                setRefreshFavoriteList((prev) => prev + 1);
            })
            .catch((error) => {
                console.log(error);
                api.error({
                    message: "Remove favorite course fail!",
                    placement: "bottomRight",
                    description: "Please wait few seconds and try again!",
                });
            });
    };

    const getFavoriteCourse = () => {
        apiInstance
            .get("users/favorite-courses", {
                headers: { Authorization: "Bear " + userToken?.accessToken },
            })
            .then((res) => {
                setListFavoriteCourseId(
                    res.data.data[0].favorites.map(
                        (item: Course) => item.courseId
                    )
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getCourseData();
    }, []);

    useEffect(() => {
        getFavoriteCourse();
    }, [refreshFavoriteList]);

    return (
        <Container>
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
                <VideoCustom
                    refresh={refreshVideo}
                    videoSource={courseData.trailerUrl}
                />
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
                        src="https://coolwallpapers.me/picsup/3058990-book_computer_design_development_electronics_html_keyboard_laptop_macbook_notebook_pencil_technology_web_web-design_website.jpg"
                        alt=""
                        className="w-full h-full object-cover "
                    />
                </div>
                <SubInfoDetailCourse
                    price={courseData.price}
                    discount={courseData.discount}
                    duration={courseData.duration}
                    onClickPreview={() => setOpenModalPreview(true)}
                    poster={courseData.posterUrl}
                    onAddFavorite={
                        listFavoriteCourseId.indexOf(courseData.courseId) !== -1
                            ? addFavoriteCourse
                            : removeFavoriteCourse
                    }
                    isFavoriteCourse={
                        listFavoriteCourseId.indexOf(courseData.courseId) !== -1
                    }
                />
                <div className="h-3 hidden lg:block"></div>
                <DetailOverviewInfo
                    title={courseData?.title}
                    instructor={courseData?.instructor.profile.fullName}
                    rating={Number(courseData?.averageRating.toFixed(1))}
                    latestUpdate={courseData?.updatedAt}
                    language={courseData?.language.languageName}
                    desc={courseData?.introduction}
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
                            <Button type="dashed" className=" h-10">
                                Buy now
                            </Button>
                        </div>
                    </div>
                    <div className=" mx-2 mt-10 text-zinc-800">
                        <div className="p-5 border border-zinc-400 border-solid">
                            <h1 className="font-medium text-2xl mb-4">
                                What you'll learn
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
                                courseId={courseData.courseId}
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
                        <Comment
                            isHideCommentForm
                            isHideAction
                            listReview={courseData.reviews}
                        />
                        <div className="">
                            <h1 className="font-medium text-2xl mb-4">
                                Recommended course
                            </h1>
                            <ItemCourseSub />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
