export interface UserInfoToken {
    userId: number;
    role: number;
    username: string;
    email: string;
    iat: number;
    exp: number;
    accessToken: string;
    refreshToken: string;
}

export const defaultUserInfoToken: UserInfoToken = {
    userId: 0,
    role: 0,
    username: "",
    email: "",
    iat: 0,
    exp: 0,
    accessToken: "",
    refreshToken: "",
};
