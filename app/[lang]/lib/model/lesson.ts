export interface LessonFull {
    duration: number;
    id: number;
    isPreview: boolean;
    lessonUrl: string;
    title: string;
    topicId: number;
}

export const defaultLessonFull = {
    duration: 0,
    id: 0,
    isPreview: false,
    lessonUrl: "",
    title: "",
    topicId: 0,
};