export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nemmotors.be";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/beheer/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

