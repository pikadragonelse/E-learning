export interface User {
    email: string;
    profile: {
        avatar: string;
        description: string;
        firstName: string;
        fullName: string;
        id: number;
        lastName: string;
        userId: number;
    };
    username: string;
}

export const defaultUser = {
    email: "",
    profile: {
        avatar: "",
        description: "",
        firstName: "",
        fullName: "",
        id: 0,
        lastName: "",
        userId: 0,
    },
    username: "",
};
