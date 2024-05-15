"use client";

import { apiInstance } from "@/plugin/apiInstance";
import { Button, Row, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useToken } from "../lib/hooks/useToken";
import { NoteInfo } from "../lib/model/note";
import parse from "html-react-parser";
import { formatTime } from "../lib/utils/formatTime";
import dayjs from "dayjs";

export type Note = { lessonId?: number; currTime?: number };
export const Note: React.FC<Note> = ({ lessonId, currTime }) => {
    const [value, setValue] = useState("");
    const [noteList, setNoteList] = useState<NoteInfo[]>([]);
    const [refreshList, setRefreshList] = useState(0);
    const userToken = useToken();

    const getAllNote = () => {
        apiInstance
            .get("notes", {
                params: {
                    lessonId: lessonId,
                },
                headers: { Authorization: "Bear " + userToken?.accessToken },
            })
            .then((res) => setNoteList(res.data.data))
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAllNote();
    }, [refreshList]);

    const addNode = () => {
        apiInstance
            .post(
                "notes",
                {
                    lessonId: lessonId,
                    content: value,
                    time: Number(currTime?.toFixed(0)),
                },
                { headers: { Authorization: "Bear " + userToken?.accessToken } }
            )
            .then((res) => {
                setRefreshList((prev) => prev + 1);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <h1 className="font-medium text-xl mb-2">Note for current time</h1>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            <Row justify={"end"} className="mt-4">
                <Button type="primary" onClick={() => addNode()}>
                    Note
                </Button>
            </Row>
            <h1 className="font-medium text-xl my-2">Note list of lesson</h1>
            <ul>
                {noteList?.map((note, index) => (
                    <li
                        key={index}
                        className="flex flex-col gap-4 p-6  border-zinc-600 border-solid border-b border-0"
                    >
                        <div className="flex justify-between">
                            <h2>Time: {formatTime(note.time)}</h2>
                            <span>
                                {dayjs(note.updatedAt).format(
                                    "HH:MM DD-MM-YYYY"
                                )}
                            </span>
                        </div>
                        <p>{parse(note.content)}</p>
                        <Row justify={"end"}>
                            <Space>
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                            </Space>
                        </Row>
                    </li>
                ))}
            </ul>
        </div>
    );
};
