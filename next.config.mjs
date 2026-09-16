import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
const sharedConfig = {
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: "/voorraad/:path*",
                destination: "/aanbod/:path*",
                permanent: true,
            },
        ];
    },
};
export default function nextConfig(phase) {
    return {
        ...sharedConfig,
        distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
    };
}
