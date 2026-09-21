import "./globals.css";
import { siteGegevens } from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ComparisonTray from "@/components/cars/ComparisonTray";
import CookieConsent from "@/components/privacy/CookieConsent";
import IntroScreen from "@/components/layout/IntroScreen";
import ChatWidget from "@/components/ui/ChatWidget";
export const metadata = {
    icons: { icon: "/faviconnem.png" },
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
        <IntroScreen />
        <Header />
        <main>{children}</main>
        <ComparisonTray />
        <ChatWidget />
        <CookieConsent />
        <Footer />
      </body>
    </html>);
}
