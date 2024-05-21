"use client";

import { apiInstance } from "@/plugin/apiInstance";
import {
    Badge,
    BadgeProps,
    Button,
    Calendar,
    CalendarProps,
    DatePicker,
    Form,
    Row,
    TimePicker,
    notification,
} from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { useToken } from "../lib/hooks/useToken";
import { RangePickerProps } from "antd/es/date-picker";

type FieldType = {
    time: any;
    date: any;
};

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf("day");
};

const getListData = (value: Dayjs) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: "warning", content: "This is warning event." },
                { type: "success", content: "This is usual event." },
            ];
            break;
        case 10:
            listData = [
                { type: "warning", content: "This is warning event." },
                { type: "success", content: "This is usual event." },
                { type: "error", content: "This is error event." },
            ];
            break;
        case 15:
            listData = [
                { type: "warning", content: "This is warning event" },
                {
                    type: "success",
                    content: "This is very long usual event......",
                },
                { type: "error", content: "This is error event 1." },
                { type: "error", content: "This is error event 2." },
                { type: "error", content: "This is error event 3." },
                { type: "error", content: "This is error event 4." },
            ];
            break;
        default:
    }
    return listData || [];
};

const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
        return 1394;
    }
};

export type Reminder = { lessonId?: number };
export const Reminder: React.FC<Reminder> = ({ lessonId }) => {
    const [form] = useForm();
    const [api, contextHolder] = notification.useNotification();
    const userToken = useToken();

    const setReminder = (value: FieldType) => {
        let dateArr = dayjs(value.date)
            .format("YYYY-MM-DDTHH:mm:ss.sssZ")
            .split("T");
        dateArr[1] = dayjs(value.time)
            .format("YYYY-MM-DDTHH:mm:ss.sssZ")
            .split("T")[1];
        const date = dateArr.join("T");

        apiInstance
            .post(
                "reminds",
                {
                    lessonId: lessonId,
                    time: date,
                },
                {
                    headers: {
                        Authorization: "Bear " + userToken?.accessToken,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                api.success({
                    message: "Set reminder successful!",
                    placement: "bottomRight",
                });
            })
            .catch((error) => {
                console.log(error);
                api.error({
                    message: "Set reminder fail!",
                    placement: "bottomRight",
                    description: "Please wait few seconds and try again!",
                });
            });
    };

    const onPanelChange = (
        value: Dayjs,
        mode: CalendarProps<Dayjs>["mode"]
    ) => {
        console.log(value.format("YYYY-MM-DD"), mode);
    };

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge
                            status={item.type as BadgeProps["status"]}
                            text={item.content}
                        />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
        if (info.type === "date") return dateCellRender(current);
        if (info.type === "month") return monthCellRender(current);
        return info.originNode;
    };

    return (
        <>
            <div className="w-80 mx-auto mt-20">
                {contextHolder}
                <Form
                    form={form}
                    onFinish={(value: FieldType) => {
                        setReminder(value);
                    }}
                >
                    <Form.Item<FieldType> name="time" label="Time for learning">
                        <TimePicker
                            placeholder="Select time for learning"
                            className="w-full"
                        />
                    </Form.Item>
                    <Form.Item name={"date"} label="Date for learning">
                        <DatePicker
                            format={"DD-MM-YYYY"}
                            placeholder="Select date for learning"
                            className="w-full"
                            disabledDate={disabledDate}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Row justify={"end"}>
                            <Button
                                type="primary"
                                onClick={() => form.submit()}
                            >
                                Set reminder
                            </Button>
                        </Row>
                    </Form.Item>
                </Form>
            </div>
            <Calendar onPanelChange={onPanelChange} cellRender={cellRender} />;
        </>
    );
};
