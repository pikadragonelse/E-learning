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
            <ItemCourse />
        </main>
    );
}
function useStaticQuery(arg0: any): { images: any } {
    throw new Error("Function not implemented.");
}
