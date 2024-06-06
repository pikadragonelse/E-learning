"use client";

import { Button, Divider, Form, Input, Row, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { FormCreateLesson } from "./form-create-lesson";
import clsx from "clsx";
import { apiInstance } from "@/plugin/apiInstance";
import { Lesson, Topic, TopicReturnedCreate } from "../../lib/model/topic";
import { Course } from "../../lib/model/course";
import { useTokenStore } from "../../lib/store/userInfo";

type FieldType = {
    name: string;
};

export type FormCreateSession = {
    className?: string;
    idSession?: number;
    courseId?: string;
    topic?: Topic;
};
export const FormCreateSession: React.FC<FormCreateSession> = ({
    className,
    idSession,
    courseId,
    topic,
}) => {
    const [form] = useForm();
    const [listLesson, setListLesson] = useState<number[]>([1]);
    const [listDataLesson, setListDataLesson] = useState<Lesson[]>([]);
    const [isHiddenLesson, setIsHiddenLesson] = useState(true);
    const [newTopicData, setNewTopicData] = useState<
        TopicReturnedCreate | Topic
    >();
    const { userInfo } = useTokenStore();

    const createTopic = (name: string) => {
        apiInstance
            .post(
                `courses/${courseId}/topics`,
                {
                    names: [name],
                },
                { headers: { Authorization: "Bear " + userInfo?.accessToken } }
            )
            .then((res) => {
                setNewTopicData(res.data.data[0]);
                setIsHiddenLesson(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateTopic = (name: string) => {
        apiInstance
            .put(
                `courses/topics/${topic?.id}`,
                {
                    name: name,
                },
                { headers: { Authorization: "Bear " + userInfo?.accessToken } }
            )
            .then((res) => {
                message.success("Update topic successful!");
            })
            .catch((error) => {
                console.log(error);
                message.error(
                    "Update topic fail, please wait few seconds and try again!"
                );
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

    useEffect(() => {
        if (topic != null) {
            const listLessonCount: number[] = [];
            setListDataLesson(
                topic.lessons.map((lesson, index) => {
                    listLessonCount.push(index + 1);
                    return lesson;
                })
            );
            setListLesson(listLessonCount);
            setIsHiddenLesson(false);
            setNewTopicData(topic);
            form.setFieldsValue({
                name: topic.name,
            });
        }
    }, [topic]);

    return (
        <div className={`bg-zinc-100 p-4 rounded-lg mb-6 ${className}`}>
            <Divider className="select-none">Topic {idSession} </Divider>
            <Form
                layout="vertical"
                form={form}
                onFinish={(info: FieldType) =>
                    topic != null
                        ? updateTopic(info.name)
                        : createTopic(info.name)
                }
            >
                <Form.Item<FieldType> label="Name" name={"name"}>
                    <Input
                        placeholder="Enter name topic"
                        disabled={topic != null ? false : !isHiddenLesson}
                    />
                </Form.Item>
            </Form>
            <Row justify={"end"} hidden={!isHiddenLesson}>
                <Button type="primary" onClick={() => form.submit()}>
                    {topic != null ? "Update" : "Create"} topic
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
                        lesson={listDataLesson[index]}
                    />
                ))}
            </div>
        </div>
    );
};
