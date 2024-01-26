import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Header } from "./ui/header";
import { Footer } from "./ui/footer";
import { Body } from "./ui/body";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Alpha",
    description: "Be your best version",
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
                    <Header />
                    <Body>{children}</Body>
                    <Footer />
                </body>
            </AntdRegistry>
        </html>
    );
}
