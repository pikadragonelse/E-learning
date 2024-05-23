"use client";

import React from "react";

import { Container } from "../../ui/container";
import { Button, Form, Radio, Row } from "antd";
import { useForm } from "antd/es/form/Form";

interface Question {
    question: string;
    options: string[];
    answer: string;
}

const formatString = (input: string): Question[] => {
    const questions: Question[] = [];
    input.split("\n\n").forEach((questionSet) => {
        const question = questionSet.split("\n");
        questions.push({
            question: question[0],
            options: question.slice(1, -1),
            answer: question[question.length - 1],
        });
    });

    return questions;
};

const string = `1. What is the primary function of Chain of Thought (CoT) in enhancing model performance on complex tasks?
   a) Transforming big tasks into multiple manageable tasks
   b) Generating reasoning traces in natural language
   c) Utilizing external classical planners for planning
   d) Interacting with the environment using task-specific actions
   Correct answer: a

2. Which type of memory provides the ability to retain sensory information after the original stimuli have ended?
   a) Sensory Memory
   b) Short-Term Memory
   c) Long-Term Memory
   d) Iconic Memory
   Correct answer: a

3. What is the key aspect of Self-Reflection in autonomous agents to improve iteratively?
   a) Generating reasoning traces in natural language
   b) Refining past action decisions and correcting mistakes
   c) Utilizing external classical planners for planning
   d) Interacting with the environment using task-specific actions
   Correct answer: b

4. How does Algorithm Distillation (AD) apply the idea of sequentially improved outputs in reinforcement learning tasks?
   a) By utilizing external classical planners for planning
   b) By refining past action decisions and correcting mistakes
   c) By presenting a history of improved outputs in context
   d) By generating reasoning traces in natural language
   Correct answer: c

5. What is the purpose of presenting a history of sequentially improved outputs in Chain of Hindsight (CoH)?
   a) To maximize the log-likelihood of the pre-training dataset
   b) To avoid overfitting and copying during training
   c) To improve the model's performance based on feedback
   d) To interact with the environment using task-specific actions
   Correct answer: c`;

export default function Page({}: { params: { lang: string; id: any } }) {
    const [form] = useForm();
    return (
        <Container>
            <h1 className="text-3xl ml-32 my-10 font-medium text-orange-700">
                Quiz for topics 123
            </h1>
            <div className="text-zinc-800 w-2/3 mx-auto ">
                <Form
                    form={form}
                    onFinish={(value) => {
                        console.log(value);
                    }}
                >
                    {formatString(string).map((q, index) => (
                        <div key={index} className="question mb-4">
                            <p className="font-semibold text-xl">
                                {q.question}
                            </p>
                            <ul>
                                <Form.Item name={`question${index}`}>
                                    <Radio.Group>
                                        {q.options.map((option, i) => (
                                            <li key={i} className=" p-2">
                                                <Radio
                                                    value={option
                                                        .split(")")[0]
                                                        .trim()}
                                                    className="text-lg"
                                                >
                                                    {option}
                                                </Radio>
                                            </li>
                                        ))}
                                    </Radio.Group>
                                </Form.Item>
                            </ul>
                        </div>
                    ))}
                    <Row justify={"end"}>
                        <Button type="primary" onClick={() => form.submit()}>
                            Submit
                        </Button>
                    </Row>
                </Form>
            </div>
        </Container>
    );
}
