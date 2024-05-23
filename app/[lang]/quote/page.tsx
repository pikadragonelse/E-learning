"use client";

import React, { useEffect, useState } from "react";
import "cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";

import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { pull } from "langchain/hub";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { apiInstance } from "@/plugin/apiInstance";
import {
    RunnablePassthrough,
    RunnableSequence,
} from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import { Button, Form, Row, Select, Spin, Upload } from "antd";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { Course } from "../lib/model/course";
import { Container } from "../ui/container";
import Search from "antd/es/input/Search";
import { GridCourse } from "../ui/grid-course";
import { useForm } from "antd/es/form/Form";

type FieldType = {
    document: any;
    quantity: number;
};
export default function Page({}: { params: { lang: string } }) {
    const [listRecommendedCourse, setListRecommendedCourse] = useState<
        Course[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = useForm();
    const [dataTrain, setDataTrain] = useState("");
    const [quantity, setQuantity] = useState(10);

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
        console.log(result);
        setIsLoading(false);
    };

    useEffect(() => {
        if (dataTrain !== "") {
            request(
                `Please generate ${quantity} multiple-choice questions from the provided document with at least 2 answer options for each question, including the correct answer.`
            );
        }
    }, [dataTrain]);

    return (
        <Container>
            <div className="ml-16  mb-10">
                <h1 className="text-zinc-800 ">Create quote course</h1>
                <p className="text-xl font-medium text-orange-600 ">
                    Based on the documents you provide, we will create a list of
                    extremely diverse and interesting multiple choice questions.
                </p>
            </div>
            <div className="m-14 mt-6 text-zinc-800 w-96">
                <Form
                    form={form}
                    onFinish={(value) => {
                        console.log(value.document);
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
                    <Form.Item<FieldType> name="quantity" label="Quantity">
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
                    <Form.Item<FieldType> name="document" label="Document">
                        <Upload accept=".txt" customRequest={() => {}}>
                            <Button>Upload document</Button>
                        </Upload>
                    </Form.Item>
                    <Button type="primary" onClick={() => form.submit()}>
                        Create
                    </Button>
                </Form>
            </div>
            <Spin spinning={isLoading}>
                <div className="text-zinc-800 mx-32">
                    {listRecommendedCourse.length < 1 ? (
                        <Row justify={"center"}>
                            <p className="text-2xl">
                                Give us your document to create your quote!
                            </p>
                        </Row>
                    ) : (
                        <GridCourse
                            listCourseFull={listRecommendedCourse}
                            type="full"
                            isHiddenButton={false}
                        />
                    )}
                </div>
            </Spin>
        </Container>
    );
}
