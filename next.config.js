/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        DEVELOP_ENDPOINT: "http://localhost:8000/api/",
        // DEVELOP_ENDPOINT:
        //     "http://alpha-elearning.southeastasia.cloudapp.azure.com:8000/api/",
        OPEN_AI_API_KEY:
            "sk-proj-JsLGlMX43ls0OX6DFo6qT3BlbkFJKzAIIFkQf3077LSZ0oSk",
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
    },
};

module.exports = nextConfig;
