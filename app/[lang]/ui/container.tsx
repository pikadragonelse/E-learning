"use client";

import React, { useEffect, useState } from "react";
import { Header } from "./header";
import { Body } from "./body";
import { Footer } from "./footer";
import { SidebarDrawer } from "./sidebar-drawer";
import { ConfigProvider } from "antd";
import { apiInstance } from "@/plugin/apiInstance";
import { useToken } from "../lib/hooks/useToken";
import { User, defaultUser } from "../lib/model/user";

export type Container = { children?: any };
export const Container: React.FC<Container> = ({ children }) => {
    const [openSidebarDrawer, setOpenSidebarDrawer] = useState(false);
    const [userInfo, setUserInfo] = useState<User>();
    const userDataToken = useToken();
    const getDataUser = () => {
        apiInstance
            .get("users/profile", {
                headers: {
                    Authorization: "Bear " + userDataToken?.accessToken,
                },
            })
            .then((res) => {
                setUserInfo(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getDataUser();
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
                userInfo={userInfo}
            />
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#E3311D",
                    },
                }}
            >
                <Body className="">{children}</Body>
            </ConfigProvider>
            <Footer />
        </main>
    );
};
