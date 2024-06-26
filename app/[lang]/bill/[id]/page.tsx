"use client";

import React from "react";
import { Container } from "../../ui/container";
import { Locale } from "antd/es/locale";
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";
import { useBillStore } from "../../lib/store/bill";
import dayjs from "dayjs";

export default function Page({
    params: { lang, id },
}: {
    params: { lang: Locale; id: string };
}) {
    const billData = useBillStore((state) => state.billData);

    return (
        <Container>
            <div className="text-zinc-800 flex justify-center">
                <div className=" order-1 lg:order-2 lg:w-[400px] mt-6 h-fit flex flex-col gap-3 border p-4 bg-zinc-50 rounded-md shadow-md">
                    <div className="flex justify-center items-center mb-10">
                        <img
                            src="/images/logo-main.png"
                            width={120}
                            height={120}
                            alt="Alpha logo"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-zinc-600 text-lg">ID:</h1>
                        <h2 className=" ">{billData.id}</h2>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-zinc-600 text-lg">Total:</h1>
                        <h2 className=" ">${billData.price.toFixed(2)}</h2>
                    </div>
                    {/* <div className="flex justify-between items-center">
                        <h1 className="text-zinc-600 text-lg">Discount:</h1>
                        <h2 className=" ">20%</h2>
                    </div> */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-zinc-600 text-lg">VAT:</h1>
                        <h2 className=" ">2%</h2>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-zinc-600 text-lg">Summary:</h1>
                        <h2 className=" ">
                            ${(billData.price * 1.02).toFixed(2)}
                        </h2>
                    </div>
                    <div className="flex justify-between ">
                        <h1 className="text-zinc-600 text-lg">Created at:</h1>
                        <div className="flex flex-col">
                            {dayjs(billData.createdAt).format("DD/MM/YYYY")}
                        </div>
                    </div>
                    <Link href="/">
                        <Button type="primary" className="w-full">
                            Back to home
                        </Button>
                    </Link>
                </div>
            </div>
        </Container>
    );
}
