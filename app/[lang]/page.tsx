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

export default function Home({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const [listCategory, setListCategory] = useState<Category[]>([]);
    const [isShowMap, setIsShowMap] = useState<Record<any, boolean>>({});

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

    return (
        <Container>
            <div className="flex flex-col gap-10 ">
                <HeroMainSector />
                <ListTrendingCategory />
                <div className="">
                    <h2 className="text-2xl text-orange-700 font-medium cursor-pointer w-fit mb-3">
                        Recommended courses
                    </h2>
                    <CarouselList typeList="rcm" />
                </div>
                <div className="">
                    <h2 className="text-2xl text-orange-700 font-medium cursor-pointer w-fit mb-3">
                        What to learn next
                    </h2>
                    <CarouselList typeList="rcmColab" />
                </div>
                <div className="">
                    <h2 className="text-2xl text-orange-700 font-medium cursor-pointer w-fit mb-3">
                        Trending courses
                    </h2>
                    <CarouselList />
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
                            />
                        </div>
                    ) : undefined
                )}
            </div>
        </Container>
    );
}
