import React, { useEffect } from "react";
import { useTokenStore } from "../lib/store/userInfo";
import { getToken } from "../lib/utils/get-token";

export const GetToken = () => {
    const { updateUserInfo } = useTokenStore();

    useEffect(() => {
        updateUserInfo(getToken());
    }, []);
    return <></>;
};
