import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppKnop from "@/components/WhatsAppKnop";
import AutoSelectieBalk from "@/components/AutoSelectieBalk";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.websiteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "nl_BE",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/logo/nemmotors.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: ["/logo/nemmotors.png"] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className="min-h-screen bg-neutral-950 font-sans text-white" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: siteConfig.name,
              url: siteConfig.websiteUrl,
              image: `${siteConfig.websiteUrl}/logo/nemmotors.png`,
              telephone: siteConfig.phoneNumber,
              email: siteConfig.email,
              address: { "@type": "PostalAddress", streetAddress: "Ambachtslaan 5/10", postalCode: "3665", addressLocality: "As", addressCountry: "BE" },
            }).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main>{children}</main>
        <WhatsAppKnop />
        <AutoSelectieBalk />
        <Footer />
      </body>
    </html>
  );
}
