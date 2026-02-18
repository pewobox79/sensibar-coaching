import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = (process.env.NEXT_PUBLIC_FRONTEND_URL || "https://sensibar-coaching.de").replace(/\/$/, "");

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin", "/login"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}