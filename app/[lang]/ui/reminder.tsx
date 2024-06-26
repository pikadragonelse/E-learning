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
import React, { ReactNode, useEffect, useState } from "react";
import { RangePickerProps } from "antd/es/date-picker";
import { gapi } from "gapi-script";
import { GoogleOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useTokenStore } from "../lib/store/userInfo";

const CLIENT_ID =
    "875062300763-f2u53vslbvulf9lrnf5424b0b22f38ra.apps.googleusercontent.com";
const API_KEY = "AIzaSyDsfOLefBTx0A3rFvi5kkZ4bpkPA9u_Pfg";
const SCOPES = "https://www.googleapis.com/auth/calendar";

type FieldType = {
    timeStart: any;
    timeEnd: any;
    date: any;
};

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf("day");
};

export type Reminder = { lessonId?: number };
export const Reminder: React.FC<Reminder> = ({ lessonId }) => {
    const [form] = useForm();
    const [api, contextHolder] = notification.useNotification();
    const [linkEvent, setLinkEvent] = useState("");
    const [isSignIn, setIsSignIn] = useState(false);
    const { userInfo } = useTokenStore();
    const [listEvent, setListEvent] = useState<any>([]);
    const [reloadCalendar, setReloadCalendar] = useState(0);

    useEffect(() => {
        const initClient = () => {
            gapi.client
                .init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: [
                        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
                    ],
                    scope: SCOPES,
                })
                .then(() => {
                    console.log("Google API initialized");
                    listUpcomingEvents();
                });
        };

        gapi.load("client:auth2", initClient);
    }, []);

    const handleAuthClick = () => {
        gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => {
                setIsSignIn(true);
                console.log("User signed in");
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    const setReminder = (value: FieldType) => {
        let dateArr = dayjs(value.date)
            .format("YYYY-MM-DDTHH:mm:ss.sssZ")
            .split("T");
        dateArr[1] = dayjs(value.timeStart)
            .format("YYYY-MM-DDTHH:mm:ss.sssZ")
            .split("T")[1];
        const timeStart = dateArr.join("T");

        let tomorrowArr = dayjs(value.date)
            .format("YYYY-MM-DDTHH:mm:ss.sssZ")
            .split("T");
        tomorrowArr[1] = dayjs(value.timeEnd)
            .format("YYYY-MM-DDTHH:mm:ss.sssZ")
            .split("T")[1];
        const timeEnd = dateArr.join("T");

        const event = {
            summary: "Learn",
            // location: "800 Howard St., San Francisco, CA 94103",
            // description:
            //     "A chance to hear more about Google's developer products.",
            start: {
                dateTime: timeStart,
                timeZone: "Asia/Ho_Chi_Minh",
            },
            end: {
                dateTime: timeEnd,
                timeZone: "Asia/Ho_Chi_Minh",
            },
            // recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            // attendees: [
            //     { email: "lpage@example.com" },
            //     { email: "sbrin@example.com" },
            // ],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: "email", minutes: 24 * 60 },
                    { method: "popup", minutes: 10 },
                ],
            },
        };

        const request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
        });

        request.execute((event: any) => {
            console.log("Event created: ", event.htmlLink);
            setLinkEvent(event.htmlLink);
            listUpcomingEvents();
        });

        apiInstance
            .post(
                "reminds",
                {
                    lessonId: lessonId,
                    time: timeStart,
                },
                {
                    headers: {
                        Authorization: "Bear " + userInfo?.accessToken,
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

    const listUpcomingEvents = () => {
        gapi.client.calendar.events
            .list({
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 10,
                orderBy: "startTime",
            })
            .then((response: any) => {
                const events = response.result.items.map((event: any) => ({
                    id: event.id,
                    title: event.summary,
                    start: event.start.dateTime || event.start.date,
                    end: event.end.dateTime || event.end.date,
                }));
                setListEvent(events);
                setReloadCalendar((prev) => prev + 1);
            })
            .catch((error: any) => {
                console.error("Error fetching events", error);
            });
    };

    const dateCellRender = (value: any) => {
        const dayEvents = listEvent.filter((event: any) =>
            dayjs(event.start).isSame(value, "day")
        );
        return (
            <ul className="events">
                {dayEvents.map((event: any) => (
                    <li key={event.id}>
                        <Badge status="success" text={event.title} />
                    </li>
                ))}
            </ul>
        );
    };

    useEffect(() => {
        if (reloadCalendar > 1) {
            listUpcomingEvents();
        }
    }, [reloadCalendar]);

    return (
        <div className="px-16">
            <Button
                icon={<GoogleOutlined />}
                className={clsx("w-32 m-auto", {
                    hidden: isSignIn,
                })}
                hidden={isSignIn}
                onClick={handleAuthClick}
            >
                Sign in
            </Button>
            <div
                className={clsx("w-[450px] mx-auto mt-20", {
                    hidden: !isSignIn,
                })}
            >
                {contextHolder}
                <Form
                    form={form}
                    onFinish={(value: FieldType) => {
                        setReminder(value);
                    }}
                    labelCol={{ span: 8 }}
                >
                    <Form.Item<FieldType>
                        name="timeStart"
                        label="Time start for learning"
                    >
                        <TimePicker
                            placeholder="Select time start for learning"
                            className="w-full"
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name="timeEnd"
                        label="Time end for learning"
                    >
                        <TimePicker
                            placeholder="Select time end for learning"
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
            <div
                className={clsx("gap-2 flex-wrap items-center", {
                    flex: isSignIn,
                    hidden: !isSignIn,
                })}
            >
                <span>Link event: </span>
                <Button
                    type="link"
                    href={linkEvent}
                    className=""
                    target="_blank"
                >
                    {linkEvent}
                </Button>
            </div>
            <Calendar
                className={clsx({
                    hidden: !isSignIn,
                })}
                cellRender={dateCellRender}
            />
        </div>
    );
};
