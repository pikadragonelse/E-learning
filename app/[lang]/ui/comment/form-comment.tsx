"use client";

import React from "react";
import { Button, Form, Input, Rate } from "antd";
import { apiInstance } from "@/plugin/apiInstance";
import { useTokenStore } from "../../lib/store/userInfo";

type FieldType = {
    content: string;
    rating: number;
};

export type FormComment = {
    hidden?: boolean;
    type?: "comment" | "review";
    itemId?: string | number;
    onPost?: (content?: string) => void;
};
export const FormComment: React.FC<FormComment> = ({
    hidden = false,
    type = "comment",
    itemId,
    onPost = () => {},
}) => {
    const { userInfo } = useTokenStore();

    const postItem = (
        itemId: string | number,
        rating: number,
        content: string,
        type: "comment" | "review"
    ) => {
        const typeMap: Record<
            "comment" | "review",
            { api: string; data: any }
        > = {
            review: {
                api: "reviews/",
                data: {
                    courseId: itemId,
                    rating: rating,
                    review: content,
                },
            },
            comment: {
                api: "comments/",
                data: {
                    lessonId: itemId,
                    content: content,
                },
            },
        };
        apiInstance
            .post(typeMap[type].api, typeMap[type].data, {
                headers: {
                    Authorization: "Bear " + userInfo?.accessToken,
                },
            })
            .then((res) => {
                console.log(res);

                onPost(content);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Form
            className="mb-6"
            hidden={hidden}
            layout="vertical"
            onFinish={(data: FieldType) => {
                postItem(itemId || 0, data.rating, data.content, type);
            }}
        >
            {type === "review" ? (
                <Form.Item
                    name="rating"
                    label="Rating"
                    rules={[{ required: true }]}
                >
                    <Rate />
                </Form.Item>
            ) : undefined}

            <Form.Item<FieldType> name={"content"} label={`Your ${type}`}>
                <Input.TextArea
                    id="comment"
                    rows={6}
                    placeholder="Write something..."
                ></Input.TextArea>
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center  bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                    Post {type}
                </Button>
            </Form.Item>
        </Form>
    );
};
