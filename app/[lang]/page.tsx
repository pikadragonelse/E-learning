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

    const getCategory = async () => {
        try {
            const responseData = await apiInstance.get("categories");
            setListCategory(responseData.data);
            console.log(responseData.data);
        } catch (error) {
            console.log("Get categories failed", error);
        }
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
                    <CarouselList />
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
                {listCategory.map((category, index) => (
                    <div className="" key={index}>
                        <h2 className="text-2xl text-orange-700 font-medium cursor-pointer w-fit mb-3">
                            {category.name}
                        </h2>
                        <CarouselList byCategory={category.categoryId} />
                    </div>
                ))}
            </div>
        </Container>
    );
}
