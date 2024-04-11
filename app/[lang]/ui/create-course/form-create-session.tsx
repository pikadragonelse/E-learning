"use client";

import { Button, Divider, Form, Input, Row, Upload } from "antd";
import React, { useState } from "react";
import { CustomButton } from "../button";
import { LessonInfo } from "../../lib/model/create-course";
import { useForm } from "antd/es/form/Form";
import { FormCreateLesson } from "./form-create-lesson";
import { DeleteOutlined } from "@ant-design/icons";
import clsx from "clsx";

export type FormCreateSession = {
    className?: string;
    idSession?: number;
    onDelete?: (idSession: number) => unknown;
};
export const FormCreateSession: React.FC<FormCreateSession> = ({
    className,
    idSession,
    onDelete = () => {},
}) => {
    const [form] = useForm();
    const [listLesson, setListLesson] = useState<number[]>([1]);

    const addLesson = () => {
        const nextId = listLesson[listLesson.length - 1] + 1;
        const newListLesson = [...listLesson, nextId];
        setListLesson(newListLesson);
    };

    const deleteLesson = (idLesson: number) => {
        const newListSession = listLesson.filter((value) => value !== idLesson);
        setListLesson(newListSession);
    };

    return (
        <div className={`bg-zinc-100 p-4 rounded-lg mb-6 ${className}`}>
            <Divider className="select-none">
                Session {idSession}{" "}
                <DeleteOutlined
                    className={clsx(
                        "ml-2 p-2 cursor-pointer text-red-600 active:text-red-700",
                        { hidden: idSession === 1 }
                    )}
                    onClick={() => onDelete(idSession || -1)}
                />
            </Divider>
            <Form
                layout="vertical"
                form={form}
                onFinish={(info) => console.log(info)}
            >
                <Form.Item label="Target" name={[`part${idSession}`, "desc"]}>
                    <Input placeholder="Enter target part" />
                </Form.Item>
            </Form>
            <div className="px-10 pt-2 mb-6">
                {listLesson.map((idLesson, index) => (
                    <FormCreateLesson
                        idForm={idLesson}
                        key={index}
                        onAdd={addLesson}
                        onDelete={(idLesson) => deleteLesson(idLesson)}
                        isShowAddForm={index === listLesson.length - 1}
                    />
                ))}
            </div>

            <Row justify={"end"}>
                <Button type="primary" onClick={() => form.submit()}>
                    Create session
                </Button>
            </Row>
        </div>
    );
};
