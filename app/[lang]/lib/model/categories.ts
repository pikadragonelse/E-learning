export interface Category {
    id: number;
    categoryId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export const defaultCategory: Category = {
    id: 0,
    categoryId: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
};
