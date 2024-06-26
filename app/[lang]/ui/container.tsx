"use client";

import React, { createContext, useEffect, useState } from "react";
import { Header } from "./header";
import { Body } from "./body";
import { Footer } from "./footer";
import { SidebarDrawer } from "./sidebar-drawer";
import { ConfigProvider } from "antd";
import { apiInstance } from "@/plugin/apiInstance";
import { User } from "../lib/model/user";
import { BillInfo, defaultBillInfo } from "../lib/model/bill";
import { useTokenStore } from "../lib/store/userInfo";
import { getToken } from "../lib/utils/get-token";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export type Container = { children?: any; className?: string };
export const Container: React.FC<Container> = ({ children, className }) => {
    const [openSidebarDrawer, setOpenSidebarDrawer] = useState(false);
    const [userProfile, setUserProfile] = useState<User>();
    const { userInfo, updateUserInfo } = useTokenStore();
    const [refreshUser, setRefreshUser] = useState(0);
    const route = useRouter();
    const getDataUser = () => {
        apiInstance
            .get("users/profile", {
                headers: {
                    Authorization: "Bear " + userInfo?.accessToken,
                },
            })
            .then((res) => {
                setUserProfile(res.data.data);
            })
            .catch((error) => {
                console.log(error);
                setUserProfile(undefined);
            });
    };

    useEffect(() => {
        getDataUser();
    }, [userInfo, refreshUser]);

    useEffect(() => {
        updateUserInfo(getToken());
    }, []);

    const refreshToken = () => {
        apiInstance
            .post(
                "auth/get-access-token",
                {
                    refreshToken: userInfo.refreshToken,
                },
                {
                    headers: {
                        Authorization: "Bear " + userInfo.accessToken,
                    },
                }
            )
            .then((res) => {
                setCookie("accessToken", res.data.data.token.accessToken, {
                    secure: true,
                });
                updateUserInfo(getToken());
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        refreshToken();
        const timer = setInterval(() => {
            refreshToken();
        }, 15 * 60000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <main>
            <SidebarDrawer
                title={"Category & Filter"}
                open={openSidebarDrawer}
                onClose={() => setOpenSidebarDrawer(false)}
            />
            <Header
                onClickCategoryIcon={() => setOpenSidebarDrawer(true)}
                userInfo={userProfile}
                onRefresh={() => setRefreshUser((prev) => prev + 1)}
            />
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#E3311D",
                    },
                }}
            >
                <Body className={className}>{children}</Body>
            </ConfigProvider>
            <Footer />
        </main>
    );
};
