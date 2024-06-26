import { Resource } from "./resource";

export interface Topic {
    id: number;
    name: string;
    lessons: Lesson[];
}

export interface TopicReturnedCreate extends Topic {
    courseId: number;
    createdAt: string;
    deletedAt: string;
    updatedAt: string;
}

export interface Lesson {
    id: number;
    title: string;
    duration: number;
    isPreview: boolean;
    resources: Resource[];
}

export const defaultLesson = {
    id: 0,
    title: "",
    duration: 0,
    isPreview: false,
    resources: [],
};

export const defaultTopic = {
    id: 0,
    name: "",
    lessons: [defaultLesson],
};
