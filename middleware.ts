import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;

    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    );

    const locale = matchLocale(languages, locales, i18n.defaultLocale);

    return locale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
    // If you have one
    if (
        [
            "/manifest.json",
            "/favicon.ico",
            "/images/main2.jpg",
            "/images/sub1.jpg",
            "/images/sub2.jpg",
            "/images/sub3.jpg",
            "/images/sub4.jpg",
            "/images/logo-icon.png",
            "/images/logo-main.png",
            "/images/logo-text.png",
            "/images/bg-login.png",
            "/images/bg-login.webp",
            "/images/google.png",
            "/images/create-course.jpg",

            "/sample.vtt",
            "/Download.mp4",
            "/documents/Download_out0001.jpg",
            "/documents/Download_out0002.jpg",
            "/documents/Download_out0003.jpg",
            "/documents/Download_out0004.jpg",
            "/documents/Download_out0005.jpg",
            "/documents/Download_out0006.jpg",
            "/documents/Download_out0007.jpg",
            "/documents/Download_out0008.jpg",
            "/documents/Download_out0009.jpg",
            "/documents/Download_out0010.jpg",
            "/documents/Download_out0011.jpg",
            "/documents/Download_out0012.jpg",
            "/documents/Download_out0013.jpg",
            "/documents/Download_out0014.jpg",
            "/documents/Download_out0015.jpg",
            "/documents/Download_out0016.jpg",
            "/documents/Download_out0017.jpg",
            "/documents/Download_out0018.jpg",
            "/documents/Download_out0019.jpg",
            "/documents/Download_out0020.jpg",
            "/documents/Download_out0021.jpg",
            "/documents/Download_out0022.jpg",
            "/documents/Download_out0023.jpg",
            "/documents/Download_out0024.jpg",
            "/test.txt",
            "/base64_images.txt",
            "/base64_images1.txt",

            // Your other files in `public`
        ].includes(pathname)
    )
        return;

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
                request.url
            )
        );
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
