import Link from "next/link";
export const siteGegevens = {
    name: "NEM Motors",
    description: "Betrouwbare tweedehandswagens met ervaring en passie",
    whatsappNumber: "32470000000",
    phoneNumber: "+32 473 56 34 04",
    email: "info@nemmotors.be",
    address: "Ambachtslaan 5/10, 3665 As",
    openingHours: "Ma – za: 10:00 – 18:00\nZo: 10:00 – 15:00",
    websiteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://nemmotors.be",
    enterpriseNumber: "",
    vatNumber: "",
    facebookUrl: "",
    instagramUrl: "",
};
import Container from "@/components/ui/Container";
import { navigation as quickLinks } from "@/constants/navigation";
import { CookieSettingsButton } from "@/components/privacy/CookieConsent";
export default function Footer() {
    return (<footer className="border-t border-white/10 bg-neutral-950">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-2xl font-black tracking-[0.18em]">
              NEM MOTORS
            </h3>
            <p className="mt-4 text-sm leading-6 text-neutral-400">
              {siteGegevens.description}.
            </p>
          </div>
          <div>
            <h4 className="font-bold">Snelle links</h4>
            <div className="mt-4 grid gap-2 text-sm text-neutral-400">
              {quickLinks.map((link) => (<Link key={link.name} href={link.href} className="text-left hover:text-red-400">
                  {link.name}
                </Link>))}
            </div>
          </div>
          <div>
            <h4 className="font-bold">Contact</h4>
            <div className="mt-4 space-y-2 text-sm text-neutral-400">
              <p>{siteGegevens.phoneNumber}</p>
              <p>{siteGegevens.email}</p>
              <p>{siteGegevens.address}</p>
              {siteGegevens.enterpriseNumber && (<p>Ondernemingsnummer: {siteGegevens.enterpriseNumber}</p>)}
              {siteGegevens.vatNumber && <p>Btw: {siteGegevens.vatNumber}</p>}
            </div>
          </div>
          <div>
            <h4 className="font-bold">Openingsuren</h4>
            <p className="mt-4 whitespace-pre-line text-sm text-neutral-400">
              {siteGegevens.openingHours}
            </p>
            {(siteGegevens.facebookUrl || siteGegevens.instagramUrl) && (<div className="mt-5 flex gap-3">
                {siteGegevens.facebookUrl && (<a href={siteGegevens.facebookUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-3 py-2 text-xs hover:border-white">
                    Facebook
                  </a>)}
                {siteGegevens.instagramUrl && (<a href={siteGegevens.instagramUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-3 py-2 text-xs hover:border-white">
                    Instagram
                  </a>)}
              </div>)}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} NEM Motors. Alle rechten voorbehouden.
          </p>
          <CookieSettingsButton />
        </div>
      </Container>
    </footer>);
}
