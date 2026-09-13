import Link from "next/link";
import { siteConfig } from "@/lib/site";
import Sectie from "@/components/Sectie";

const quickLinks = [
  { name: "Aanbod", href: "/voorraad" },
  { name: "Over ons", href: "/over-ons" },
  { name: "Uw wagen verkopen", href: "/uw-wagen-verkopen" },
  { name: "Reviews", href: "/reviews" },
  { name: "Favorieten", href: "/favorieten" },
  { name: "Vergelijken", href: "/vergelijken" },
  { name: "Contact", href: "/contact" },
];

const legalLinks = [
  { name: "Privacy", href: "/privacy" },
  { name: "Cookies", href: "/cookiebeleid" },
  { name: "Wettelijke vermeldingen", href: "/wettelijke-vermeldingen" },
  { name: "Verkoopvoorwaarden", href: "/voorwaarden" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <Sectie className="py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-2xl font-black tracking-[0.18em]">NEM MOTORS</h3>
            <p className="mt-4 text-sm leading-6 text-neutral-400">
              {siteConfig.description}.
            </p>
          </div>
          <div>
            <h4 className="font-bold">Snelle links</h4>
            <div className="mt-4 grid gap-2 text-sm text-neutral-400">
              {quickLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-left hover:text-red-400">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold">Contact</h4>
            <div className="mt-4 space-y-2 text-sm text-neutral-400">
              <p>{siteConfig.phoneNumber}</p>
              <p>{siteConfig.email}</p>
              <p>{siteConfig.address}</p>
              {siteConfig.enterpriseNumber && <p>Ondernemingsnummer: {siteConfig.enterpriseNumber}</p>}
              {siteConfig.vatNumber && <p>Btw: {siteConfig.vatNumber}</p>}
            </div>
          </div>
          <div>
            <h4 className="font-bold">Openingsuren</h4>
            <p className="mt-4 text-sm text-neutral-400">{siteConfig.openingHours}</p>
            {(siteConfig.facebookUrl || siteConfig.instagramUrl) && <div className="mt-5 flex gap-3">{siteConfig.facebookUrl && <a href={siteConfig.facebookUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-3 py-2 text-xs hover:border-[#ffc20e]">Facebook</a>}{siteConfig.instagramUrl && <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-3 py-2 text-xs hover:border-[#ffc20e]">Instagram</a>}</div>}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between"><p>© {new Date().getFullYear()} NEM Motors. Alle rechten voorbehouden.</p><nav aria-label="Juridische links" className="flex flex-wrap gap-x-5 gap-y-2">{legalLinks.map((link) => <Link key={link.href} href={link.href} className="hover:text-white">{link.name}</Link>)}</nav></div>
      </Sectie>
    </footer>
  );
}
