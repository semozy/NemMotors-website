import "./globals.css";
import { siteGegevens } from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/utils";
export const metadata = {
    icons: { icon: "/favicon.ico" },
    metadataBase: new URL(siteGegevens.websiteUrl),
    title: {
        default: siteGegevens.name,
        template: `%s | ${siteGegevens.name}`,
    },
    description: siteGegevens.description,
    applicationName: siteGegevens.name,
    openGraph: {
        type: "website",
        locale: "nl_BE",
        siteName: siteGegevens.name,
        title: siteGegevens.name,
        description: siteGegevens.description,
        images: [
            {
                url: "/images/logo/nemmotors.png",
                width: 1200,
                height: 630,
                alt: siteGegevens.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteGegevens.name,
        description: siteGegevens.description,
        images: ["/images/logo/nemmotors.png"],
    },
};
export default function RootLayout({ children, }) {
    return (<html lang="nl" suppressHydrationWarning>
      <body className="min-h-screen bg-neutral-950 font-sans text-white" suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "AutoDealer",
                name: siteGegevens.name,
                url: siteGegevens.websiteUrl,
                image: `${siteGegevens.websiteUrl}/images/logo/nemmotors.png`,
                telephone: siteGegevens.phoneNumber,
                email: siteGegevens.email,
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Ambachtslaan 5/10",
                    postalCode: "3665",
                    addressLocality: "As",
                    addressCountry: "BE",
                },
            }).replace(/</g, "\\u003c"),
        }}/>
        <Header />
        <main>{children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>);
}

function WhatsAppButton() {
    return (<a href={whatsappLink("Hallo NEM Motors, ik heb een vraag over jullie wagens.")} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-950/50 transition hover:scale-110" aria-label="WhatsApp NEM Motors">
      <MessageCircle />
    </a>);
}
