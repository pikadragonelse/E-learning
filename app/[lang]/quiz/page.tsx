"use client";

import React, { useEffect, useState } from "react";
import "cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";

import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { Button, Form, Modal, Row, Select, Space, Spin, Upload } from "antd";
import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { Course } from "../lib/model/course";
import { Container } from "../ui/container";
import { useForm } from "antd/es/form/Form";

type FieldType = {
    document: any;
    quantity: number;
};

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

const handleDownload = (value: string) => {
    const blob = new Blob([value], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "quiz.txt";

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};

export default function Page({}: { params: { lang: string } }) {
    const [listRecommendedCourse, setListRecommendedCourse] = useState<
        Course[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = useForm();
    const [dataTrain, setDataTrain] = useState("");
    const [quantity, setQuantity] = useState(10);
    const [resultQuote, setResultQuote] = useState<Question[]>([]);
    const [nameFile, setNameFile] = useState("");
    const [resultText, setResultText] = useState("");

    const request = async (value: string) => {
        setIsLoading(true);

        const document = new Document({ pageContent: dataTrain });

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 2000,
            chunkOverlap: 0,
        });
        const allSplits = await textSplitter.splitDocuments([
            document || new Document({ pageContent: "" }),
        ]);

        const vectorStore = await MemoryVectorStore.fromDocuments(
            allSplits,
            new OpenAIEmbeddings({
                apiKey: process.env.OPEN_AI_API_KEY,
            })
        );

        // Retrieve and generate using the relevant snippets of the blog.
        const retriever = vectorStore.asRetriever({
            k: 6,
            searchType: "similarity",
        });

        const llm = new ChatOpenAI({
            model: "gpt-3.5-turbo",
            temperature: 0,
            apiKey: process.env.OPEN_AI_API_KEY,
        });

        const template = `You are an advanced AI model designed to generate multiple-choice questions based on a given document. Your task is to create a list of ${quantity} unique multiple-choice questions with answers from the dataset provided. Each question should have at least 4 answer options, with one correct answer clearly marked. Ensure the questions cover different parts of the document to provide a comprehensive assessment.

        Your output should follow this format:

    1. Question 1?
       a) Option 1
       b) Option 2
       c) Option 3
       d) Option 4
       Correct answer: c

    2. Question 2?
       a) Option 1
       b) Option 2
       c) Option 3
       d) Option 4
       Correct answer: a

    3. Question 3?
       a) Option 1
       b) Option 2
       c) Option 3
       d) Option 4
       Correct answer: b

    ... and so on until ${quantity} questions.


        {context}

        Question: {question}

        Helpful Answer:`;

        const customRagPrompt = PromptTemplate.fromTemplate(template);

        const ragChain = await createStuffDocumentsChain({
            llm,
            prompt: customRagPrompt as any,
            outputParser: new StringOutputParser(),
        });
        const context = await retriever.getRelevantDocuments(value);

        const result = await ragChain.invoke({
            question: value,
            context,
        });
        setResultText(result);

        setResultQuote(formatString(result));
        setIsLoading(false);
    };

    useEffect(() => {
        if (dataTrain !== "") {
            request(
                `Please generate ${quantity} multiple-choice questions from the provided document with 4 answer options for each question, including the correct answer.`
            );
        }
    }, [dataTrain, quantity]);

    const [formModal] = useForm();
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <Container>
            <Modal
                open={isOpenModal}
                onCancel={() => setIsOpenModal(false)}
                title="Save quiz to topic of course"
                footer={() => <></>}
            >
                <Form
                    form={formModal}
                    labelCol={{ span: 4 }}
                    className="mt-6 mr-4"
                >
                    <Form.Item label="Course">
                        <Select placeholder="Select your course" />
                    </Form.Item>
                    <Form.Item label="Topic">
                        <Select placeholder="Select your topic of course" />
                    </Form.Item>
                    <Row justify={"end"}>
                        <Button type="primary">Add quote</Button>
                    </Row>
                </Form>
            </Modal>
            <div className="ml-16  mb-10">
                <h1 className="text-zinc-800 ">Create course quiz </h1>
                <p className="text-xl font-medium text-orange-600 ">
                    Based on the documents you provide, we will create a list of
                    extremely diverse and interesting multiple choice questions.
                </p>
            </div>
            <div className="m-14 mt-6 text-zinc-800 w-96">
                <Form
                    form={form}
                    onFinish={(value) => {
                        const file = value.document.file.originFileObj;
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            if (e != null && e.target != null) {
                                setDataTrain(e.target.result as any);
                            }
                        };
                        reader.readAsText(file);
                    }}
                >
                    <Form.Item<FieldType>
                        name="quantity"
                        label="Quantity"
                        rules={[{ required: true }]}
                    >
                        <Select
                            options={[
                                { label: 5, value: 5 },
                                { label: 10, value: 10 },
                                { label: 20, value: 20 },
                            ]}
                            className="w-32"
                            onChange={(value) => setQuantity(value)}
                        />
                    </Form.Item>
                    <div className="flex gap-4">
                        <Form.Item<FieldType>
                            name="document"
                            label="Document"
                            rules={[{ required: true }]}
                        >
                            <Upload
                                customRequest={() => {}}
                                showUploadList={false}
                                onChange={(file) => setNameFile(file.file.name)}
                            >
                                <Button>Upload document</Button>
                            </Upload>
                        </Form.Item>
                        <div className="text-lg">{nameFile}</div>
                    </div>

                    <Button type="primary" onClick={() => form.submit()}>
                        Create
                    </Button>
                </Form>
            </div>
            <Spin spinning={isLoading}>
                <div className="text-zinc-800 mx-32">
                    {resultQuote.length < 1 ? (
                        <Row justify={"center"}>
                            <p className="text-2xl">
                                Give us your document to create your quiz!
                            </p>
                        </Row>
                    ) : (
                        <>
                            <Row justify={"center"}>
                                <Space>
                                    <Button
                                        onClick={() =>
                                            handleDownload(resultText)
                                        }
                                    >
                                        Save file
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() => setIsOpenModal(true)}
                                    >
                                        Save in topic of course
                                    </Button>
                                </Space>
                            </Row>
                            <div className="mt-4">
                                {resultQuote.map((q, index) => (
                                    <div key={index} className="question mb-4">
                                        <p className="font-medium">
                                            {q.question}
                                        </p>
                                        <ul>
                                            {q.options.map((option, i) => (
                                                <li key={i}>{option}</li>
                                            ))}
                                        </ul>
                                        <p>{q.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </Spin>
        </Container>
    );
}
