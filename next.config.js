/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        DEVELOP_ENDPOINT: "http://localhost:8000/api/",
    },
};

module.exports = nextConfig;
