import { create } from "zustand";
import { UserInfoToken, defaultUserInfoToken } from "../model/user-info-token";

type UserInfoStore = {
    userInfo: UserInfoToken;
    updateUserInfo: any;
};

export const useTokenStore = create<UserInfoStore>((set) => ({
    userInfo: defaultUserInfoToken,
    updateUserInfo: (newUserInfo: UserInfoToken) =>
        set({ userInfo: newUserInfo }),
}));
