"use client";

import { apiInstance } from "@/plugin/apiInstance";
import { Button, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export type Note = { lessonId?: number; currTime?: number };
export const Note: React.FC<Note> = ({ lessonId, currTime }) => {
    const [value, setValue] = useState("");
    const [noteList, setNoteList] = useState<string[]>([""]);
    const [refreshList, setRefreshList] = useState(0);

    const getAllNote = () => {
        apiInstance
            .get("notes", {
                params: {
                    lessonId: lessonId,
                },
            })
            .then((res) => console.log(res.data))
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAllNote;
    }, [refreshList]);

    const addNode = (value: string) => {
        apiInstance
            .post("notes", {
                lessonId: lessonId,
                content: value,
                time: currTime,
            })
            .then((res) => {
                setValue("");
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
                <Button type="primary" onClick={() => addNode(value)}>
                    Note
                </Button>
            </Row>
            <h1 className="font-medium text-xl my-2">Note list of lesson</h1>
            <ul>
                {noteList.map((note) => (
                    <li>
                        <h2></h2>
                    </li>
                ))}
            </ul>
        </div>
    );
};
