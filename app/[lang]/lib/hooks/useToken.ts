import { getCookie } from "cookies-next";
import { UserInfoToken } from "../model/user-info-token";

export const useToken = () => {
    const accessToken =
        getCookie("accessToken")?.replace(/^"(.*)"$/, "$1") || "";
    const refreshToken =
        getCookie("refreshToken")?.replace(/^"(.*)"$/, "$1") || "";

    let tokenObject: UserInfoToken = {
        exp: 0,
        iat: 0,
        role: 0,
        userId: 0,
        username: "",
        email: "",
        accessToken: "",
        refreshToken: "",
    };

    try {
        if (accessToken != null) {
            tokenObject = JSON.parse(atob(accessToken.split(".")[1]));
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
    }

    tokenObject["accessToken"] = accessToken;
    tokenObject["refreshToken"] = refreshToken;

    return tokenObject;
};
