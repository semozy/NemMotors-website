import "./globals.css";
import { siteGegevens } from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ComparisonTray from "@/components/cars/ComparisonTray";
import CookieConsent from "@/components/privacy/CookieConsent";
import IntroScreen from "@/components/layout/IntroScreen";
import ChatWidget from "@/components/ui/ChatWidget";
import MobileActionBar from "@/components/layout/MobileActionBar";
export const metadata = {
    icons: { icon: "/iconnem.png" },
    metadataBase: new URL(siteGegevens.websiteUrl),
    alternates: {
        canonical: "/",
    },
    title: {
        default: "NEM Motors | Tweedehandswagens in As, Limburg",
        template: "%s | NEM Motors",
    },
    description: siteGegevens.description,
    applicationName: siteGegevens.name,
    openGraph: {
        type: "website",
        locale: "nl_BE",
        url: "/",
        siteName: "NEM Motors",
        title: "NEM Motors | Tweedehandswagens in As, Limburg",
        description: siteGegevens.description,
        images: [
            {
                url: "/iconnem.png",
                width: 1254,
                height: 1254,
                alt: "NEM Motors - Tweedehandswagens in As",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "NEM Motors | Tweedehandswagens in As, Limburg",
        description: siteGegevens.description,
        images: ["/iconnem.png"],
    },
};
import Script from "next/script";

export default function RootLayout({ children, }) {
    return (<html lang="nl" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `.hide-ssr-black-screen #ssr-black-screen { display: none !important; }` }} />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('nem_intro_garage_final')) {
                  document.documentElement.classList.add('hide-ssr-black-screen');
                }
              } catch(e) {}
            `
          }}
        />
      </head>
      <body className="min-h-screen bg-neutral-950 font-sans text-white" suppressHydrationWarning>
        <div id="ssr-black-screen" className="fixed inset-0 z-[99998] bg-[#050505] pointer-events-none" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "AutoDealer",
                "@id": `${siteGegevens.websiteUrl}/#autodealer`,
                name: siteGegevens.name,
                url: siteGegevens.websiteUrl,
                logo: `${siteGegevens.websiteUrl}/iconnem.png`,
                image: `${siteGegevens.websiteUrl}/iconnem.png`,
                description: siteGegevens.description,
                telephone: siteGegevens.phoneNumber,
                email: siteGegevens.email,
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Ambachtslaan 5/10",
                    postalCode: "3665",
                    addressLocality: "As",
                    addressRegion: "Limburg",
                    addressCountry: "BE",
                },
            }).replace(/</g, "\\u003c"),
        }}/>
        <IntroScreen />
        <Header />
        <main className="lg:pb-0 pb-16">{children}</main>
        <ComparisonTray />
        <ChatWidget />
        <CookieConsent />
        <Footer />
        <MobileActionBar />
      </body>
    </html>);
}
