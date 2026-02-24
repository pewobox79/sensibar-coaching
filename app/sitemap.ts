import type { MetadataRoute } from "next";
import {getAllWorkshops} from "@/lib/strapi/workshopHelper";
import {createWorkshopLink} from "@/utils/helper/formater";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = (process.env.NEXT_PUBLIC_DOMAIN_URL || "https://sensibar-coaching.de").replace(/\/$/, "");

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/workshops`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },{
            url: `${baseUrl}/selbsttest`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        }
    ];

    const workshops= await getAllWorkshops()

    if (!workshops || !Array.isArray(workshops.data)) {
        console.error("Failed to fetch pages:", workshops);
        return [];
    }
    const articleRoutes: MetadataRoute.Sitemap = workshops?.data?.map((ws:{title: string, updatedAt: string, createdAt?: string, documentId: string }) => ({
        url: createWorkshopLink(ws.title, ws.documentId),
        lastModified: ws.updatedAt ? new Date(ws.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
    }));



    return [...staticRoutes, ...articleRoutes];
}