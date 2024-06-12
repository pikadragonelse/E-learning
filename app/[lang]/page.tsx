"use client";

import { Locale } from "@/i18n.config";
import { HeroMainSector } from "./ui/hero-main-sector";
import { ListTrendingCategory } from "./ui/list-trending-category";
import { ListInstructor } from "./ui/list-instructor";
import { Container } from "./ui/container";
import { CarouselList } from "./ui/carousel-list";
import { apiInstance } from "@/plugin/apiInstance";
import { Category } from "./lib/model/categories";
import { useEffect, useState } from "react";
import { Course } from "./lib/model/course";
import { useTokenStore } from "./lib/store/userInfo";
import Head from "next/head";

export default function Home({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const [listCategory, setListCategory] = useState<Category[]>([]);
    const [isShowMap, setIsShowMap] = useState<Record<any, boolean>>({});
    const { userInfo } = useTokenStore();

    const [courseInCartMap, setCourseInCartMap] = useState<
        Record<string, boolean>
    >({});

    const getListCart = () => {
        apiInstance
            .get("users/carts", {
                headers: {
                    Authorization: "Bear " + userInfo?.accessToken,
                },
            })
            .then((res) => {
                const listCourse: Course[] = res.data.data[0].carts;

                const courseInCartMap: Record<string, boolean> = {};
                listCourse.forEach((item) => {
                    courseInCartMap[item.courseId] = true;
                });
                setCourseInCartMap(courseInCartMap);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getCategory = async () => {
        try {
            const responseData = await apiInstance.get("categories");
            setListCategory(responseData.data);
            const tempMap: Record<any, boolean> = {};
            responseData.data.forEach((category: Category) => {
                tempMap[category.categoryId] = true;
            });
            setIsShowMap(tempMap);
        } catch (error) {
            console.log("Get categories failed", error);
        }
    };

    const setHiddenList = (categoryId: string) => {
        setIsShowMap((prev) => {
            return {
                ...prev,
                [categoryId]: false,
            };
        });
    };

    useEffect(() => {
        getCategory();
    }, []);
    useEffect(() => {
        if (userInfo.userId != 0) {
            getListCart();
        }
    }, [userInfo]);

    return (
        <Container>
            <Head>
                <title>Trang chủ</title>
                <meta
                    name="description"
                    content="Đây là trang chủ của website chúng tôi."
                />
                <meta property="og:title" content="Trang Chủ" />
                <meta
                    property="og:description"
                    content="Đây là trang chủ của website chúng tôi."
                />
                <meta
                    property="og:image"
                    content="https://example.com/path/to/your/image.jpg"
                />
                <meta property="og:url" content="https://yourwebsite.com" />
                <meta property="og:type" content="website" />
            </Head>
            <div className="flex flex-col gap-10 ">
                <HeroMainSector />
                <ListTrendingCategory />
                <div className="">
                    <h2 className="text-2xl text-orange-700 font-medium cursor-pointer w-fit mb-3">
                        Recommended courses
                    </h2>
                    <CarouselList
                        typeList="rcm"
                        courseInCartMap={courseInCartMap}
                    />
                </div>
                <div className="">
                    <h2 className="text-2xl text-orange-700 font-medium cursor-pointer w-fit mb-3">
                        What to learn next
                    </h2>
                    <CarouselList
                        typeList="rcmColab"
                        courseInCartMap={courseInCartMap}
                    />
                </div>
                <div className="">
                    <h2 className="text-2xl text-orange-700 font-medium cursor-pointer w-fit mb-3">
                        Trending courses
                    </h2>
                    <CarouselList courseInCartMap={courseInCartMap} />
                </div>
                <div className="">
                    <h2 className="text-2xl text-orange-700 font-medium cursor-pointer w-fit mb-3">
                        Instructor
                    </h2>
                    <ListInstructor />
                </div>
                {listCategory.map((category, index) =>
                    isShowMap[category.categoryId] ? (
                        <div className="" key={index}>
                            <h2 className="text-2xl text-orange-700 font-medium cursor-pointer w-fit mb-3">
                                {category.name}
                            </h2>
                            <CarouselList
                                byCategory={category.categoryId}
                                setHiddenList={setHiddenList}
                                courseInCartMap={courseInCartMap}
                            />
                        </div>
                    ) : undefined
                )}
            </div>
        </Container>
    );
}
