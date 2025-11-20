import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "thispersondoesnotexist.com",
                port: "",
                pathname: "/**", // allow all paths
            },
        ],
    },
};

export default nextConfig;
