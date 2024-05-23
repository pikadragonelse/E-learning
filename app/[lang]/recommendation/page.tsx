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
import { Button, Row, Spin } from "antd";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { Course } from "../lib/model/course";
import { Container } from "../ui/container";
import Search from "antd/es/input/Search";
import { GridCourse } from "../ui/grid-course";

export default function Page({}: { params: { lang: string } }) {
    const [listRecommendedCourse, setListRecommendedCourse] = useState<
        Course[]
    >([]);
    const [retrieverInstance, setRetrieverInstance] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [listCourseId, setListCourseId] = useState<string[]>([]);

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
                        category: course.category.name,
                        updatedAt: course.updatedAt,
                    };
                });

                const newData: string = data
                    .map((course: Course) => convertObjectToString(course))
                    .join(", ");

                console.log(newData);

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

        const template = `You are an advanced AI model designed to provide course information from a given dataset, with each course's information separated by ";". Your primary task is to:

        Field courseId in dataset is the id of the course, Field title is the name of the course, field category is the category of the course, field updatedAt is the latest update date of the course.

        1. Identify the course category the user is interested in from their query.
        2. Extract and present at least 10 unique course IDs from that category in the dataset, ensuring that no duplicate course IDs are included in your response. If no courses from the specified category are found, default to presenting 10 unique course IDs from any category in the dataset.
        
        The dataset you have is an array where each element is a string containing the details of a course. Use the course data to fulfill this requirement. If the user's query is not directly related to courses, you should still provide 10 unique course IDs from any category as part of your response. If you don't know the answer, just say that you don't know, and do not try to make up an answer. Find all of your dataset and return the closest answer.
        
        result format example:
        1. complete-introduction-to-microsoft-power-bi-9d2ce194-1714883817359
        2. complete-introduction-to-microsoft-power-bi-9d2ce194-1714883817359
        ...

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
        const listId = result.split("\n");
        console.log(listId);

        const finalResult = listId.map((id) => {
            return id.trim().split(".")[1];
        });
        console.log(finalResult);

        setListCourseId(finalResult);
    };

    const getListCourse = () => {
        console.log(listCourseId);

        apiInstance
            .get("courses/others/get-courses-by-courseIds", {
                params: {
                    courseIds: listCourseId.join(","),
                },
            })
            .then((res) => {
                setListRecommendedCourse(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (listCourseId.length > 1) {
            getListCourse();
        }
    }, [listCourseId]);

    return (
        <Container>
            <div className="ml-16  mb-10">
                <h1 className="text-zinc-800 ">Recommend course</h1>
                <p className="text-xl font-medium text-orange-600 ">
                    We will recommend for you 10 courses that is closest with
                    your idea!
                </p>
            </div>
            <div className="m-14 mt-6 text-zinc-800">
                <Row className="mx-40">
                    <Search
                        size="large"
                        placeholder="Type something to find your course"
                        onSearch={(value) => {
                            request(value);
                        }}
                        className="shadow-md"
                    />
                </Row>
            </div>
            <Spin spinning={isLoading}>
                <div className="text-zinc-800 ">
                    {listRecommendedCourse.length < 1 ? (
                        <Row justify={"center"}>
                            <p className="text-2xl">
                                Give us your idea to find your interested
                                course!
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
