import "cheerio";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

const main = async () => {
    const loader = new CheerioWebBaseLoader(
        "https://lilianweng.github.io/posts/2023-06-23-agent/"
    );

    const docs = await loader.load();

    console.log(docs);
};

main();
