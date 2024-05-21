"use client";

import React, { useEffect, useState } from "react";
import "cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
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
import { Button } from "antd";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

export default function Page({}: { params: { lang: string } }) {
    const [dataLearn, setDataLearn] = useState([]);

    const getDataLearn = () => {
        apiInstance
            .get("courses", {
                params: {
                    pageSize: 100,
                },
            })
            .then(async (res) => {
                console.log(res.data.data);
                const textSplitter = new RecursiveCharacterTextSplitter({
                    chunkSize: 5000,
                    chunkOverlap: 200,
                });
                const allSplits = await textSplitter.splitDocuments(
                    res.data.data
                );
                console.log(process.env.OPEN_AI_API_KEY);

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

                const template = `Use the following pieces of context to answer the question at the end.
                Always recommend at least 20 courseIds with the answer.
                If your data don't have enough course related with context, you can find some course have similar characteristics, categories related to context.
                If you don't know the answer, just say that you don't know, don't try to make up an answer.
                Use three sentences maximum and keep the answer as concise as possible.
                Always say "thanks for asking!" at the end of the answer.
                
                {context}
                
                Question: {question}
                
                Helpful Answer:`;

                const customRagPrompt = PromptTemplate.fromTemplate(template);

                const ragChain = await createStuffDocumentsChain({
                    llm,
                    prompt: customRagPrompt as any,
                    outputParser: new StringOutputParser(),
                });
                const context = await retriever.getRelevantDocuments(
                    "Can you give me some courseId of yours?"
                );

                const result = await ragChain.invoke({
                    question: "Can you give me some courseId of yours?",
                    context,
                });
                console.log(result);

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

    const getDocument = async () => {
        const pTagSelector = "p";
        const loader = new CheerioWebBaseLoader(
            "https://lilianweng.github.io/posts/2023-06-23-agent/",
            {
                selector: pTagSelector,
            }
        );

        const docs = await loader.load();

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 5000,
            chunkOverlap: 200,
        });
        const allSplits = await textSplitter.splitDocuments(docs);
        console.log(process.env.OPEN_AI_API_KEY);

        const vectorStore = await MemoryVectorStore.fromDocuments(
            allSplits,
            new OpenAIEmbeddings({ apiKey: process.env.OPEN_AI_API_KEY })
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

        const template = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use three sentences maximum and keep the answer as concise as possible.
Always say "thanks for asking!" at the end of the answer.

{context}

Question: {question}

Helpful Answer:`;

        const customRagPrompt = PromptTemplate.fromTemplate(template);

        const ragChain = await createStuffDocumentsChain({
            llm,
            prompt: customRagPrompt as any,
            outputParser: new StringOutputParser(),
        });
        const context = await retriever.getRelevantDocuments(
            "what is task decomposition"
        );

        const result = await ragChain.invoke({
            question: "What is Task Decomposition?",
            context,
        });

        console.log(result);
    };

    return (
        <Button onClick={() => getDataLearn()} type="primary">
            Ask
        </Button>
    );
}
