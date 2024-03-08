import React from "react";
import { FormComment } from "./form-comment";
import { ReplySection } from "./replySection";
import { CommentObject } from "../../lib/utils/comment";

const listComment: CommentObject[] = [
    {
        id: "1",
        avt: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
        content:
            "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
        date: "",
        name: "PikaDragon",
        replies: [
            {
                id: "1",
                avt: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
                content:
                    "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
                date: "",
                name: "PikaDragon",
            },
        ],
    },
    {
        id: "1",
        avt: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
        content:
            "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
        date: "",
        name: "PikaDragon",
        replies: [
            {
                id: "1",
                avt: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
                content:
                    "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
                date: "",
                name: "PikaDragon",
            },
        ],
    },
    {
        id: "1",
        avt: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
        content:
            "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
        date: "",
        name: "PikaDragon",
        replies: [
            {
                id: "1",
                avt: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
                content:
                    "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
                date: "",
                name: "PikaDragon",
            },
        ],
    },
    {
        id: "1",
        avt: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
        content:
            "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
        date: "",
        name: "PikaDragon",
        replies: [
            {
                id: "1",
                avt: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
                content:
                    "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.",
                date: "",
                name: "PikaDragon",
            },
        ],
    },
];

export type Comment = { isHideCommentForm?: boolean; isHideAction?: boolean };
export const Comment: React.FC<Comment> = ({
    isHideCommentForm = false,
    isHideAction = false,
}) => {
    return (
        <section className="bg-white dark:bg-gray-900 antialiased text-orange-600">
            <div className="">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                        Comments (20)
                    </h2>
                </div>
                <FormComment hidden={isHideCommentForm} />
                {listComment.map((comment, index) => (
                    <ReplySection
                        isHideAction={isHideAction}
                        name={comment.name}
                        date={comment.date}
                        avt={comment.avt}
                        content={comment.content}
                        key={index}
                    />
                ))}
            </div>
        </section>
    );
};
