"use client";

import React from "react";
import { FormComment } from "./form-comment";
import { ReplySection } from "./replySection";
import { Review } from "../../lib/model/review";

export type Comment = {
    isHideCommentForm?: boolean;
    isHideAction?: boolean;
    listReview?: Review[];
    title?: string;
    type?: "comment" | "review";
    itemId?: string | number;
    onPost?: (content?: string) => void;
    onDeleteCmt?: () => void;
};
export const Comment: React.FC<Comment> = ({
    isHideCommentForm = false,
    isHideAction = false,
    listReview = [],
    title = "Comments",
    type = "comment",
    itemId,
    onPost = () => {},
    onDeleteCmt = () => {},
}) => {
    return (
        <section className="bg-white dark:bg-gray-900 antialiased text-orange-700">
            <div className="">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                        {title} ({listReview.length})
                    </h2>
                </div>
                <FormComment
                    hidden={isHideCommentForm}
                    type={type}
                    itemId={itemId}
                    onPost={onPost}
                />
                {listReview.map((comment, index) => (
                    <ReplySection
                        isHideAction={isHideAction}
                        name={comment.user.profile.fullName}
                        date={comment.createdAt}
                        avt={comment.user.profile.avatar}
                        content={comment.review}
                        key={index}
                        rating={Number(comment.rating)}
                        id={comment.id}
                        onDeleteCmt={onDeleteCmt}
                    />
                ))}
            </div>
        </section>
    );
};
