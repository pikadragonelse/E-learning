export interface Resource {
    createdAt: string;
    deletedAt: string;
    id: number;
    lessonId: number;
    name: string;
    updatedAt: string;
    url: string;
}

export const defaultResource: Resource = {
    createdAt: "",
    deletedAt: "",
    id: 0,
    lessonId: 0,
    name: "",
    updatedAt: "",
    url: "",
};
