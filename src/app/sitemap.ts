import type { MetadataRoute } from "next";
import { vehicles } from "@/lib/autos";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/voorraad", "/over-ons", "/uw-wagen-verkopen", "/reviews", "/faq", "/contact", "/verkochte-wagens", "/privacy", "/cookiebeleid", "/wettelijke-vermeldingen", "/voorwaarden"];
  return [
    ...routes.map((route) => ({ url: `${siteConfig.websiteUrl}${route}`, lastModified: new Date(), changeFrequency: route === "/voorraad" ? "daily" as const : "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...vehicles.map((vehicle) => ({ url: `${siteConfig.websiteUrl}/voorraad/${vehicle.id}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
