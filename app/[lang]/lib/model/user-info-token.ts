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
