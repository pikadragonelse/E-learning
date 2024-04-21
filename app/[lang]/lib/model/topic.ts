export interface Topic {
    name: string;
    lessons: Lesson[];
}

export interface Lesson {
    title: string;
    duration: number;
    isPreview: boolean;
}

export const defaultLesson = {
    title: "",
    duration: 0,
    isPreview: false,
};

export const defaultTopic = {
    name: "",
    lessons: [defaultLesson],
};
