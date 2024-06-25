/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        // DEVELOP_ENDPOINT: "http://localhost:8000/api/",
        INDEX_PINECONE: "db-recommendation-course",
        DEVELOP_ENDPOINT:
            "http://elearning-server.eastasia.cloudapp.azure.com/api/",
        OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
        CRYPTO_SECRET_KEY: "helouahsnhdf",
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
