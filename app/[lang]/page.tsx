import { Locale } from "@/i18n.config";
import { HeroMainSector } from "./ui/hero-main-sector";
import { ItemCourse } from "./ui/item-course";
import { ListTrendingCategory } from "./ui/list-trending-category";
import { ListInstructor } from "./ui/list-instructor";

export default function Home({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    return (
        <main className="flex flex-col gap-10 ">
            <HeroMainSector />
            <ListTrendingCategory />
            <div className="">
                <h2 className="text-2xl text-orange-600 font-medium cursor-pointer w-fit mb-3">
                    Recommended courses
                </h2>
                <div className="overflow-auto flex justify-center">
                    <div className="grid grid-cols-2 lg:grid-cols-3 ">
                        <ItemCourse />
                        <ItemCourse />
                        <ItemCourse />
                        <ItemCourse />
                        <ItemCourse />
                        <ItemCourse />
                    </div>
                </div>
            </div>
            <div className="">
                <h2 className="text-2xl text-orange-600 font-medium cursor-pointer w-fit mb-3">
                    Trending courses
                </h2>
                <div className="overflow-hidden flex justify-center">
                    <ItemCourse className="hidden lg:block" />
                    <div className="flex overflow-auto lg:grid lg:grid-cols-2">
                        <ItemCourse className="min-w-52 block lg:hidden" />
                        <ItemCourse className="min-w-52" />
                        <ItemCourse className="min-w-52" />
                        <ItemCourse className="min-w-52" />
                        <ItemCourse className="min-w-52" />
                    </div>
                </div>
            </div>
            <div className="">
                <h2 className="text-2xl text-orange-600 font-medium cursor-pointer w-fit mb-3">
                    Top instructors
                </h2>
                <ListInstructor />
            </div>
            <div className="">
                <h2 className="text-2xl text-orange-600 font-medium cursor-pointer w-fit mb-3">
                    Coding courses
                </h2>
                <div className="overflow-hidden">
                    <div className="flex overflow-auto lg:h-80">
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                    </div>
                </div>
            </div>
            <div className="">
                <h2 className="text-2xl text-orange-600 font-medium cursor-pointer w-fit mb-3">
                    Coding courses
                </h2>
                <div className="overflow-hidden">
                    <div className="flex overflow-auto lg:h-80">
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                    </div>
                </div>
            </div>
            <div className="">
                <h2 className="text-2xl text-orange-600 font-medium cursor-pointer w-fit mb-3">
                    Coding courses
                </h2>
                <div className="overflow-hidden">
                    <div className="flex overflow-auto lg:h-80">
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                    </div>
                </div>
            </div>
            <div className="">
                <h2 className="text-2xl text-orange-600 font-medium cursor-pointer w-fit mb-3">
                    Coding courses
                </h2>
                <div className="overflow-hidden">
                    <div className="flex overflow-auto lg:h-80">
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                        <ItemCourse className="aspect-auto h-auto min-w-52" />
                    </div>
                </div>
            </div>
        </main>
    );
}
