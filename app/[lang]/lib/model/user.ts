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
    userName: string;
}

export const defaultUser: User = {
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
    userName: "",
};
