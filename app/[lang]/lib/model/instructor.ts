export interface Instructor {
    userName: string;
    profile: {
        fullName: string;
        firstName: string;
        lastName: string;
        avatar: string;
        description: string;
    };
}

export const defaultInstructor = {
    userName: "",
    profile: {
        fullName: "",
        firstName: "",
        lastName: "",
        avatar: "",
        description: "",
    },
};
