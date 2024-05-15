export interface Language {
    code: string;
    createdAt: string;
    deletedAt: string;
    id: number;
    languageName: string;
    updatedAt: string;
}

export const defaultLanguage: Language = {
    code: "en",
    createdAt: "2024-05-05T04:36:12.746Z",
    deletedAt: "",
    id: 1,
    languageName: "English",
    updatedAt: "2024-05-05T04:36:12.746Z",
};
