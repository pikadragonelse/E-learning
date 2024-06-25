export interface Review {
    id: number;
    userId: number;
    courseId: number;
    rating: string;
    review: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    user: ReviewUser;
    content?: string;
}

export interface ReviewUser {
    userName: string;
    profile: {
        fullName: string;
        avatar: string;
    };
}

export const defaultReviewUser: ReviewUser = {
    userName: "",
    profile: {
        fullName: "",
        avatar: "",
    },
};

export const defaultReview: Review = {
    id: 0,
    userId: 0,
    courseId: 0,
    rating: "",
    review: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
    user: defaultReviewUser,
};
