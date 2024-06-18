/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        // DEVELOP_ENDPOINT: "http://localhost:8000/api/",
        INDEX_PINECONE: "db-recommendation-course",
        DEVELOP_ENDPOINT:
            "http://alpha-elearning.southeastasia.cloudapp.azure.com/api/",
        OPEN_AI_API_KEY:
            "sk-proj-asIfvCSeYEA97Nl4Ce4OT3BlbkFJRUhBavw5xsZDulUZ17XO",
        // LANGCHAIN_TRACING_V2: "true",
        // LANGCHAIN_API_KEY:
        //     "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",
    },
    webpack(config) {
        config.externals = config.externals || [];
        config.externals = [...config.externals, "hnswlib-node"];
        config.resolve.alias["fs"] = false;
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "d3lil866y4zpm5.cloudfront.net",
            },
        ],
        unoptimized: false,
    },
};

module.exports = nextConfig;
