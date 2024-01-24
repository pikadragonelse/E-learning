import { Locale } from "@/i18n.config";
import { HeroMainSector } from "./ui/hero-main-sector";
import { ItemCourse } from "./ui/item-course";

export default function Home({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    return (
        <main className="flex flex-col gap-10 ">
            <HeroMainSector />
            <div className="">
                <h2 className="text-2xl text-orange-600 font-medium cursor-pointer w-fit mb-3">
                    Recommended Courses
                </h2>
                <div className="overflow-auto flex justify-center">
                    <div className="grid grid-cols-2 lg:grid-cols-4 ">
                        <ItemCourse />
                        <ItemCourse />
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
                    Recommended Courses
                </h2>
                <div className="overflow-auto flex justify-center">
                    <div className="grid grid-cols-2 lg:grid-cols-4 ">
                        <ItemCourse />
                        <ItemCourse />
                        <ItemCourse />
                        <ItemCourse />
                        <ItemCourse />
                        <ItemCourse />
                        <ItemCourse />
                        <ItemCourse />
                    </div>
                </div>
            </div>
        </main>
    );
}
