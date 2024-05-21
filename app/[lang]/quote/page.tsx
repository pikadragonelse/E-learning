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
    const [retrieverInstance, setRetrieverInstance] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [form] = useForm();

    const convertObjectToString: any = (obj: any, parentKey = "") => {
        let result = [];
        for (let [key, value] of Object.entries(obj)) {
            const fullKey = parentKey ? `${parentKey}.${key}` : key;
            if (
                typeof value === "object" &&
                value !== null &&
                !Array.isArray(value)
            ) {
                result.push(convertObjectToString(value, fullKey));
            } else {
                result.push(`${fullKey}: ${value}`);
            }
        }
        return result.join(", ");
    };

    const getDataLearn = () => {
        setIsLoading(true);
        apiInstance
            .get("courses", {
                params: {
                    pageSize: 1000,
                },
            })
            .then(async (res) => {
                const data = res.data.data.map((course: Course) => {
                    return {
                        courseId: course.courseId,
                        title: course.title,
                        description: course.description,
                    };
                });
                const newData: string = data
                    .map((course: Course) => convertObjectToString(course))
                    .join(", ");

                const document = new Document({ pageContent: newData });

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
                setRetrieverInstance(retriever);
                setIsLoading(false);
                // for await (const chunk of await executeWithRetry(() =>
                //     ragChain.stream("How many development course are there?")
                // )) {
                //     console.log(chunk);
                // }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getDataLearn();
    }, []);

    const request = async (value: string) => {
        setIsLoading(true);

        const llm = new ChatOpenAI({
            model: "gpt-3.5-turbo",
            temperature: 0,
            apiKey: process.env.OPEN_AI_API_KEY,
        });

        const template = `You are an advanced AI model designed to provide course information from a given dataset. Whenever a user asks a question, your primary task is to extract and present at least 20 courseId fields from the dataset, regardless of the nature of the query. If the user’s query is not directly related to courses, you should still provide 20 course IDs as part of your response. The dataset you have is an array where each element is a string containing the details of a course. Use the course data to fulfill this requirement. If you don't know the answer, just say that you don't know, don't try to make up an answer.

        {context}

        Question: {question}

        Helpful Answer:`;

        const customRagPrompt = PromptTemplate.fromTemplate(template);

        const ragChain = await createStuffDocumentsChain({
            llm,
            prompt: customRagPrompt as any,
            outputParser: new StringOutputParser(),
        });
        const context = await retrieverInstance.getRelevantDocuments(value);

        const result = await ragChain.invoke({
            question: value,
            context,
        });
        setIsLoading(false);
        console.log(result);
    };

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
                <Form form={form}>
                    <Form.Item<FieldType> name="quantity" label="Quantity">
                        <Select
                            options={[
                                { label: 5, value: 5 },
                                { label: 10, value: 10 },
                                { label: 20, value: 20 },
                            ]}
                            className="w-32"
                        />
                    </Form.Item>
                    <Form.Item<FieldType> name="document" label="Document">
                        <Upload>
                            <Button>Upload document</Button>
                        </Upload>
                    </Form.Item>
                    <Button type="primary" onClick={() => form.submit()}>
                        Create
                    </Button>
                </Form>
            </div>
            <Spin spinning={isLoading}>
                <div className="text-zinc-800">
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
                        />
                    )}
                </div>
            </Spin>
        </Container>
    );
}
