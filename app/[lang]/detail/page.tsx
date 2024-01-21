import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import React from "react";
import LocaleSwitcher from "../ui/local-swithcher";

export default async function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);
    return (
        <main className="text-zinc-800">
            <LocaleSwitcher />
            <p>Current locale: {lang}</p>
            <p>
                This text is rendered on the server:{" "}
                {dictionary["server-component"].welcome}
            </p>
        </main>
    );
}
