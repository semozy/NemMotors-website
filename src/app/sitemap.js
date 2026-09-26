import { getCars } from "@/lib/cars";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nemmotors.be";
  
  // Static routes
  const routes = [
    "",
    "/aanbod",
    "/contact",
    "/auto-verkopen"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "/aanbod" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic car routes
  try {
    const cars = await getCars();
    const carRoutes = cars
      .filter((car) => car.status !== "verkocht")
      .map((car) => ({
        url: `${baseUrl}/aanbod/${car.id}`,
        ...(car.updated_at || car.created_at ? { lastModified: new Date(car.updated_at || car.created_at) } : {}),
        changeFrequency: "weekly",
        priority: 0.6,
      }));
    return [...routes, ...carRoutes];
  } catch {
    return routes;
  }
}

