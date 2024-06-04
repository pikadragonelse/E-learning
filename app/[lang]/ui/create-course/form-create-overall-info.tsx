"use client";

import { Button, Col, Form, Input, Row, Select, SelectProps, Spin } from "antd";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { apiInstance } from "@/plugin/apiInstance";
import { Category } from "../../lib/model/categories";
import { Language } from "../../lib/model/language";
import { useToken } from "../../lib/hooks/useToken";
import { Course } from "../../lib/model/course";
import { useForm } from "antd/es/form/Form";

type FieldType = {
    title: string;
    introduction: string;
    description: string;
    learnsDescription: string;
    requirementsDescription: string;
    price: number;
    discount: number;
    categoryId: string;
    languageId: number;
    levelId: number;
};

export type FormCreateOverallInfo = {
    className?: string;
    onNext?: (course: Course) => unknown;
    course?: Course;
};
export const FormCreateOverallInfo: React.FC<FormCreateOverallInfo> = ({
    className,
    onNext = () => {},
    course,
}) => {
    const [loading, setLoading] = useState(false);
    const [form] = useForm();

    const [optionCategory, setOptionCategory] = useState<
        SelectProps["options"]
    >([]);
    const [optionLanguage, setOptionLanguage] = useState<
        SelectProps["options"]
    >([]);
    const userToken = useToken();

    const createCourse = (data: FieldType) => {
        setLoading(true);

        apiInstance
            .post("courses", data, {
                headers: { Authorization: "Bear " + userToken?.accessToken },
            })
            .then((response) => {
                setLoading(false);
                onNext(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const editCourse = (data: FieldType) => {
        setLoading(true);

        apiInstance
            .put(
                `courses/${course?.courseId}`,
                { ...course, ...data },
                {
                    headers: {
                        Authorization: "Bear " + userToken?.accessToken,
                    },
                }
            )
            .then((res) => {
                onNext(res.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (course != null) {
            form.setFieldsValue({
                title: course.title,
                introduction: course.introduction,
                description: course.description,
                learnsDescription: course.learnsDescription,
                requirementsDescription: course.requirementsDescription,
                price: course.price,
                discount: course.discount,
                categoryId: course.category?.categoryId,
                languageId: course.languageId,
                levelId: course.levelId,
            });
        }
    }, [course]);

    const getCategory = () => {
        apiInstance
            .get("categories")
            .then((res) => {
                const newList = res.data.map((category: Category) => {
                    return {
                        label: category.name,
                        value: category.categoryId,
                    };
                });
                setOptionCategory(newList);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getLanguage = () => {
        apiInstance
            .get("languages")
            .then((res) => {
                const newList = res.data.data.map((language: Language) => {
                    return {
                        label: language.languageName,
                        value: language.id,
                    };
                });
                setOptionLanguage(newList);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getCategory();
        getLanguage();
    }, []);

    return (
        <div className={`${className}`}>
            <Spin spinning={loading}>
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 24 }}
                    labelAlign="left"
                    layout="vertical"
                    onFinish={(value: FieldType) => {
                        course != null
                            ? editCourse(value)
                            : createCourse(value);
                    }}
                >
                    <Form.Item<FieldType> name="title" label="Title">
                        <Input
                            size="middle"
                            placeholder="Enter title of course"
                            maxLength={120}
                            showCount
                        />
                    </Form.Item>
                    <Row>
                        <Col span={10}>
                            <Form.Item<FieldType>
                                name="categoryId"
                                label="Category"
                            >
                                <Select
                                    size="middle"
                                    placeholder="Select category of course"
                                    options={optionCategory}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={10} offset={4}>
                            <Form.Item<FieldType>
                                name="languageId"
                                label="Language"
                            >
                                <Select
                                    size="middle"
                                    placeholder="Select language of course"
                                    options={optionLanguage}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                            <Form.Item<FieldType> name="price" label="Price">
                                <Input prefix="$" />
                            </Form.Item>
                        </Col>
                        <Col span={10} offset={4}>
                            <Form.Item<FieldType>
                                name="discount"
                                label="Discount"
                            >
                                <Input prefix="%" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item<FieldType> name="levelId" label="Level">
                        <Select
                            options={[
                                { label: "Basic", value: 1 },
                                { label: "Medium", value: 2 },
                                { label: "Advance", value: 3 },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name="introduction"
                        label="Introduction"
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name="description"
                        label="Description"
                    >
                        <ReactQuill theme="snow" />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name="learnsDescription"
                        label="Learn description"
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name="requirementsDescription"
                        label="Requirements description"
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Row justify={"end"} className="gap-4">
                            <Button
                                type={"primary"}
                                htmlType="submit"
                                className="w-60"
                            >
                                Next
                            </Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
};
