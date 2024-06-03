import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Alpha",
    description: "Be your best version",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <AntdRegistry>
                <body className={`${inter.className} text-gray-100`}>
                    {children}
                </body>
            </AntdRegistry>
        </html>
    );
}
