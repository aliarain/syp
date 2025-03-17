/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@shipyourapp/data", "@shipyourapp/kv"],
    reactStrictMode: true,
}

module.exports = nextConfig