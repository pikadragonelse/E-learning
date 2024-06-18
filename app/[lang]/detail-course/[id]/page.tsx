import React from "react";
import { Container } from "../../ui/container";
import { apiInstance } from "@/plugin/apiInstance";
import { Metadata, ResolvingMetadata } from "next";
import DetailCourseContent from "../../ui/detail-course-content";

export async function generateMetadata(
    { params }: { params: { id: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params

    // fetch data
    const response = await apiInstance.get(`courses/${params.id}`, {
        headers: {},
    });

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: response.data.data.course.title,
        openGraph: {
            images: [
                response.data.data.course.posterUrl || "",
                ...previousImages,
            ],
        },
        metadataBase: new URL("https://alpha-education.vercel.app"),
    };
}

export default function Page({ params }: { params: { id: string } }) {
    return (
        <Container>
            <DetailCourseContent params={params} />
        </Container>
    );
}
