/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        DEVELOP_ENDPOINT: "http://localhost:8000/api/",
        INDEX_PINECONE: "db-recommendation-course",
        // DEVELOP_ENDPOINT:
        //     "http://alpha-elearning.southeastasia.cloudapp.azure.com/api/",
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
