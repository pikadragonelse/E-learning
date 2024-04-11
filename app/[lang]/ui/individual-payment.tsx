import { Table, TableProps } from "antd";
import React from "react";

const columns: TableProps<any>["columns"] = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
    },
    {
        title: "Action",
        key: "action",
    },
];

export const IndividualPayment = () => {
    return (
        <div className="">
            <Table columns={columns} />
        </div>
    );
};
