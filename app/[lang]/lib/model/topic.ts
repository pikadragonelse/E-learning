export interface Topic {
    id: number;
    name: string;
    lessons: Lesson[];
}

export interface Lesson {
    id: number;
    title: string;
    duration: number;
    isPreview: boolean;
}

export const defaultLesson = {
    id: 0,
    title: "",
    duration: 0,
    isPreview: false,
};

export const defaultTopic = {
    id: 0,
    name: "",
    lessons: [defaultLesson],
};
