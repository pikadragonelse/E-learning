"use client";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import React, { useEffect, useRef, useState } from "react";
import LocaleSwitcher from "../ui/local-swithcher";
import { VideoCustom } from "../ui/video-custom";
import { MenuLecture } from "../ui/menu-lecture";

export default function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    return (
        <main className="text-zinc-800 flex lg:flex-row flex-col ">
            <VideoCustom />
            <MenuLecture className="w-1/3" />
        </main>
    );
}
