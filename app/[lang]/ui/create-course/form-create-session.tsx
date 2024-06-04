"use client";

import { Button, Divider, Form, Input, Row, Upload } from "antd";
import React, { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { FormCreateLesson } from "./form-create-lesson";
import clsx from "clsx";
import { apiInstance } from "@/plugin/apiInstance";
import { useToken } from "../../lib/hooks/useToken";
import { Topic, TopicReturnedCreate } from "../../lib/model/topic";
import { Course } from "../../lib/model/course";

type FieldType = {
    name: string;
};

export type FormCreateSession = {
    className?: string;
    idSession?: number;
    courseId?: string;
    course?: Course;
};
export const FormCreateSession: React.FC<FormCreateSession> = ({
    className,
    idSession,
    courseId,
    course,
}) => {
    const [form] = useForm();
    const [listLesson, setListLesson] = useState<number[]>([1]);
    const [isHiddenLesson, setIsHiddenLesson] = useState(true);
    const [newTopicData, setNewTopicData] = useState<TopicReturnedCreate>();
    const userToken = useToken();

    const createTopic = (name: string) => {
        apiInstance
            .post(
                `courses/${courseId}/topics`,
                {
                    names: [name],
                },
                { headers: { Authorization: "Bear " + userToken?.accessToken } }
            )
            .then((res) => {
                setNewTopicData(res.data.data[0]);
                setIsHiddenLesson(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
            <Divider className="select-none">Topic {idSession} </Divider>
            <Form
                layout="vertical"
                form={form}
                onFinish={(info: FieldType) => createTopic(info.name)}
            >
                <Form.Item<FieldType> label="Name" name={"name"}>
                    <Input
                        placeholder="Enter name topic"
                        disabled={!isHiddenLesson}
                    />
                </Form.Item>
            </Form>
            <Row justify={"end"} hidden={!isHiddenLesson}>
                <Button type="primary" onClick={() => form.submit()}>
                    Create topic
                </Button>
            </Row>
            <div
                className={clsx("px-10 pt-2 mb-6", {
                    hidden: isHiddenLesson,
                })}
            >
                {listLesson.map((idLesson, index) => (
                    <FormCreateLesson
                        idForm={idLesson}
                        key={index}
                        onAdd={addLesson}
                        onDelete={(idLesson) => deleteLesson(idLesson)}
                        isShowAddForm={index === listLesson.length - 1}
                        topicId={newTopicData?.id}
                    />
                ))}
            </div>
        </div>
    );
};
