"use client";

import React, { useState } from "react";
import { Header } from "./header";
import { Body } from "./body";
import { Footer } from "./footer";
import { SidebarDrawer } from "./sidebar-drawer";

export type Container = { children?: any };
export const Container: React.FC<Container> = ({ children }) => {
    const [openSidebarDrawer, setOpenSidebarDrawer] = useState(false);

    return (
        <main>
            <SidebarDrawer
                title={"Category & Filter"}
                open={openSidebarDrawer}
                onClose={() => setOpenSidebarDrawer(false)}
            />
            <Header onClickCategoryIcon={() => setOpenSidebarDrawer(true)} />
            <Body>{children}</Body>
            <Footer />
        </main>
    );
};
