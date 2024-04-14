import React from "react";
import { Container } from "../ui/container";
import { Locale } from "antd/es/locale";
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";

export default function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    return (
        <Container>
            <div className="text-zinc-800 flex justify-center">
                <div className=" order-1 lg:order-2 lg:w-[400px] mt-6 h-fit flex flex-col gap-3 border p-4 bg-zinc-50 rounded-md shadow-md">
                    <div className="flex justify-center items-center mb-10">
                        <Image
                            src="/images/logo-main.png"
                            width={120}
                            height={120}
                            alt="Alpha logo"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-zinc-600">ID:</h1>
                        <h2 className=" ">001</h2>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-zinc-600">Total:</h1>
                        <h2 className=" ">$200</h2>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-zinc-600">Discount:</h1>
                        <h2 className=" ">20%</h2>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-zinc-600">VAT:</h1>
                        <h2 className=" ">2%</h2>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-zinc-600">Summary:</h1>
                        <h2 className=" ">$160</h2>
                    </div>
                    <div className="flex justify-between ">
                        <h1 className="text-zinc-600">Name courses:</h1>
                        <div className="flex flex-col">
                            <h2 className=" ">Name course</h2>
                            <h2 className=" ">Name course</h2>
                            <h2 className=" ">Name course</h2>
                            <h2 className=" ">Name course</h2>
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
