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

export type Container = { children?: any; className?: string };
export const Container: React.FC<Container> = ({ children, className }) => {
    const [openSidebarDrawer, setOpenSidebarDrawer] = useState(false);
    const [billData, setBillData] = useState<BillInfo>(defaultBillInfo);
    const [userProfile, setUserProfile] = useState<User>();
    const { userInfo } = useTokenStore();
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
            });
    };

    useEffect(() => {
        getDataUser();
    }, [userInfo]);

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
