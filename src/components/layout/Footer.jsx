import Link from "next/link";
export const siteGegevens = {
    name: "NEM Motors",
    description:
        "NEM Motors is uw autodealer in As, Limburg voor zorgvuldig geselecteerde tweedehandswagens. Bekijk ons actuele aanbod, plan een proefrit of verkoop uw wagen.",
    whatsappNumber: "32470000000",
    phoneNumber: "+32 473 56 34 04",
    email: "info@nemmotors.be",
    address: "Ambachtslaan 5/10, 3665 As",
    openingHours:
        "Ma - Do: 10:00 - 18:00\nVr - Za: 10:00 - 17:00\nZo: Op afspraak",
    websiteUrl:
        process.env.NEXT_PUBLIC_SITE_URL || "https://nemmotors.be",
    enterpriseNumber: "",
    vatNumber: "",
    facebookUrl: "",
    instagramUrl: "",
};
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { navigation as quickLinks } from "@/constants/navigation";
import { CookieSettingsButton } from "@/components/privacy/CookieConsent";
export default function Footer() {
    return (<footer className="border-t border-white/10 bg-neutral-950">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo className="w-32 text-white" />
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
              <div className="mt-5 flex items-center gap-3">
                <a href="https://www.autoscout24.be/nl/verkopers/nem-motors" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black" aria-label="Bekijk ons op AutoScout24">
                  <img src="/images/home/autoscout.png" alt="AutoScout24" className="h-7 w-7 object-contain" />
                </a>
                <a href="https://www.instagram.com/nemmotors.be/" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black" aria-label="Volg ons op Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} NEM Motors. Alle rechten voorbehouden.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link href="/privacybeleid" className="hover:text-white">Privacybeleid</Link>
            <Link href="/cookiebeleid" className="hover:text-white">Cookiebeleid</Link>
            <Link href="/algemene-voorwaarden" className="hover:text-white">Algemene Voorwaarden</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </Container>
    </footer>);
}
