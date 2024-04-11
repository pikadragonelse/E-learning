"use client";

import { Locale } from "@/i18n.config";
import { HeroMainSector } from "./ui/hero-main-sector";
import { ListTrendingCategory } from "./ui/list-trending-category";
import { ListInstructor } from "./ui/list-instructor";
import { Container } from "./ui/container";
import { CarouselList } from "./ui/carousel-list";

export default function Home({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
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
                        Top instructors
                    </h2>
                    <ListInstructor />
                </div>
                <div className="">
                    <h2 className="text-2xl text-orange-700 font-medium cursor-pointer w-fit mb-3">
                        Trending courses
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
                        Trending courses
                    </h2>
                    <CarouselList />
                </div>
            </div>
        </Container>
    );
}
