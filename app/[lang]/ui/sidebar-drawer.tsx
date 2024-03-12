import { Drawer, DrawerProps } from "antd";
import React from "react";

export type SidebarDrawer = {};
export const SidebarDrawer: React.FC<SidebarDrawer & DrawerProps> = ({}) => {
    return <Drawer>SidebarDrawer</Drawer>;
};
