import Image from "next/image";
import { ArrowRight, Clock3, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import GoogleMapEmbed from "@/components/privacy/GoogleMapEmbed";

export const metadata = {
  title: "Contact",
  description: "Neem contact op met NEM Motors in As voor vragen over onze tweedehandswagens, proefritten, verkoop of andere informatie.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nemmotors.be"}/contact`,
  }
};

const phone = "+32 473 56 34 04";
const phoneHref = "tel:+32473563404";
const routeHref = "https://www.google.com/maps/search/?api=1&query=Ambachtslaan+5%2F10%2C+3665+As";

function InfoCard({ icon: Icon, title, children }) {
  return (
    <article className="flex min-h-[108px] gap-5 rounded-md border border-neutral-200 bg-white p-5 shadow-[0_7px_24px_rgba(0,0,0,0.025)]">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
        <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-bold">{title}</h2>
        {children}
      </div>
    </article>
  );
}

export default function ContactPage() {
  return (
    <main className="bg-[#f8f9f9] text-neutral-950">
      <section className="relative overflow-hidden bg-white lg:min-h-[360px]">
        <div className="mx-auto grid max-w-[1180px] lg:grid-cols-[43%_57%]">
          <div className="relative z-10 flex flex-col justify-center px-5 py-10 sm:px-7 lg:min-h-[360px] lg:px-8 lg:py-12">
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-600">
              Contact <span className="h-px w-7 bg-neutral-500" />
            </p>
            <h1 className="mt-5 text-[44px] font-black leading-[0.98] tracking-[-0.05em] sm:text-[54px]">
              Welkom bij<br />NEM Motors.
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-[1.35] text-neutral-600">
              Kom langs, stel uw vraag of plan een proefrit.<br />We nemen graag de tijd voor u.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={phoneHref} className="group flex h-11 min-w-36 items-center justify-center gap-3 rounded-md bg-neutral-950 px-6 text-xs font-bold text-white transition hover:bg-neutral-800">
                Bel ons <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a href="#bericht" className="flex h-11 min-w-44 items-center justify-center rounded-md border border-neutral-500 bg-white px-6 text-xs font-bold transition hover:bg-neutral-50">
                Stuur een bericht
              </a>
            </div>
            <a href={phoneHref} className="mt-3 w-fit text-sm font-medium text-neutral-700 hover:text-black">{phone}</a>
          </div>

          <div className="relative min-h-[310px] lg:min-h-[360px] bg-white p-8">
            <div className="absolute -left-16 top-0 z-10 hidden h-full w-32 -skew-x-[13deg] bg-white lg:block" />
            <Image src="/images/home/nemcontact1.png" alt="NEM Motors" fill priority quality={100} sizes="(min-width: 1024px) 57vw, 100vw" className="object-contain object-center p-8 lg:object-right" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1180px] px-5 py-4 sm:px-7 lg:px-8 lg:py-5">
        <section className="grid gap-4 md:grid-cols-3">
          <InfoCard icon={Phone} title="Bel ons">
            <a href={phoneHref} className="mt-2 block text-xl font-bold tracking-tight">{phone}</a>
            <p className="mt-1 text-xs text-neutral-500">Bespreek uw vraag rechtstreeks.</p>
          </InfoCard>

          <InfoCard icon={MapPin} title="Bezoek onze garage">
            <p className="mt-2 text-sm leading-5">Ambachtslaan 5/10<br />3665 As</p>
            <a href={routeHref} target="_blank" rel="noreferrer" className="group mt-2 inline-flex items-center gap-1 text-xs font-medium underline decoration-neutral-400 underline-offset-4">
              Plan uw route <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </InfoCard>

          <InfoCard icon={Clock3} title="Openingsuren">
            <dl className="mt-2 space-y-3 text-xs">
              <div className="flex justify-between gap-5"><dt>Ma - Do</dt><dd>10:00 - 18:00</dd></div>
              <div className="flex justify-between gap-5 border-t border-neutral-100 pt-3"><dt>Vr - Za</dt><dd>10:00 - 17:00</dd></div>
              <div className="flex justify-between gap-5 border-t border-neutral-100 pt-3"><dt>Zo</dt><dd>Op afspraak</dd></div>
            </dl>
          </InfoCard>
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="relative min-h-[270px] overflow-hidden rounded-md border border-neutral-200 bg-[#eef0f0]">
            <GoogleMapEmbed />
            <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-4 rounded-md bg-white p-4 shadow-md sm:inset-x-auto sm:left-3 sm:min-w-[315px]">
              <div><p className="text-sm font-bold">NEM Motors</p><p className="mt-1 text-xs leading-4 text-neutral-600">Ambachtslaan 5/10<br />3665 As</p></div>
              <a href={routeHref} target="_blank" rel="noreferrer" className="group flex h-10 shrink-0 items-center gap-3 rounded-md bg-neutral-950 px-5 text-xs font-bold text-white">
                Route plannen <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div id="bericht" className="rounded-md border border-neutral-200 bg-white p-5 shadow-[0_7px_24px_rgba(0,0,0,0.025)] sm:p-6">
            <h2 className="text-xl font-black tracking-[-0.025em]">Liever een bericht sturen?</h2>
            <ContactForm />
          </div>
        </section>
      </div>
    </main>
  );
}
