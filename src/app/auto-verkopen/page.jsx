import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Phone } from "lucide-react";
import SellForm from "@/components/sell/SellForm";

export const metadata = {
  title: "Uw auto verkopen",
  description: "Verkoop uw wagen aan NEM Motors. Bezorg ons de gegevens van uw auto en ontvang eenvoudig meer informatie over de verkoop.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nemmotors.be"}/auto-verkopen`,
  }
};

const benefits = ["Persoonlijk contact", "Vrijblijvend voorstel", "Inruil mogelijk"];

const steps = [
  ["01", "Deel uw wagen", "Vul de gegevens in en voeg foto’s toe."],
  ["02", "Persoonlijk voorstel", "We bespreken uw wagen en de mogelijkheden."],
  ["03", "Afspraak en afhandeling", "Samen regelen we de volgende stappen."],
];

const faqs = [
  [
    "Is mijn aanvraag vrijblijvend?",
    "Ja. U kunt uw wagen vrijblijvend aanbieden. We bekijken de gegevens en nemen persoonlijk contact met u op om de mogelijkheden te bespreken.",
  ],
  [
    "Kan ik een wagen met schade aanbieden?",
    "Ja. Vermeld de schade zo duidelijk mogelijk en voeg indien mogelijk enkele foto’s toe. Zo kunnen we uw aanvraag beter beoordelen voordat we contact opnemen.",
  ],
  [
    "Welke documenten heb ik nodig?",
    "Voor een eerste aanvraag volstaan de gegevens van uw wagen. Bij een verdere afhandeling bespreken we welke voertuigdocumenten, onderhoudsgegevens en sleutels u moet meenemen.",
  ],
  [
    "Moet ik langskomen voor een definitief voorstel?",
    "Een definitief voorstel volgt nadat we de wagen en de verstrekte informatie hebben kunnen beoordelen. We spreken persoonlijk met u af welke volgende stap daarvoor nodig is.",
  ],
  [
    "Hoe verlopen de betaling en overdracht?",
    "Na uw akkoord leggen we de betaling, documenten en overdracht duidelijk met u vast. Zo weet u vooraf welke stappen worden doorlopen.",
  ],
  [
    "Kan ik mijn wagen ook inruilen?",
    "Ja. Wilt u een andere wagen bij NEM Motors kopen, dan kunnen we de inruilmogelijkheden samen met u bespreken.",
  ],
];

export default function AutoVerkopenPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="mx-auto grid w-full max-w-[1180px] gap-7 px-5 py-8 sm:px-7 lg:grid-cols-[minmax(0,1.55fr)_minmax(350px,1fr)] lg:items-stretch lg:px-8 lg:py-10">
        <div className="flex min-w-0 flex-col">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">Uw wagen verkopen</p>
            <h1 className="mt-4 max-w-[590px] text-[42px] font-black leading-[0.98] tracking-[-0.045em] sm:text-[50px] lg:text-[54px]">
              Klaar voor uw<br />volgende hoofdstuk?
            </h1>
            <p className="mt-4 max-w-[555px] text-[15px] leading-[1.35] text-neutral-600 sm:text-base">
              Vertel ons meer over uw wagen. Wij bekijken uw aanvraag<br className="hidden sm:block" /> en nemen persoonlijk contact met u op.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-xs font-medium text-neutral-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-100">
                    <Check className="h-3 w-3 text-neutral-950" strokeWidth={2.4} aria-hidden="true" />
                  </span>
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-6 min-h-[280px] flex-1 overflow-hidden rounded-md sm:min-h-[330px] lg:min-h-0">
            <Image
              src="/images/home/verkopen.png"
              alt="Auto verkopen bij NEM Motors"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <SellForm />
      </section>

      <section className="border-t border-neutral-100 bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1180px] px-5 py-7 sm:px-7 lg:px-8">
          <h2 className="text-[28px] font-black leading-none tracking-[-0.035em] sm:text-[32px]">Zo verkoopt u uw wagen</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3 md:gap-0">
            {steps.map(([number, title, text], index) => (
              <article key={number} className={`flex items-center gap-5 ${index > 0 ? "md:border-l md:border-neutral-200 md:pl-12" : ""} ${index < steps.length - 1 ? "md:pr-12" : ""}`}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-bold">{number}</span>
                <div>
                  <h3 className="text-sm font-bold">{title}</h3>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-[920px] px-5 py-14 sm:px-7 lg:py-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500">Veelgestelde vragen</p>
          <h2 className="mt-3 text-[28px] font-black tracking-[-0.035em] sm:text-[34px]">Goed om te weten</h2>
          <div className="mt-7 border-t border-neutral-200">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group border-b border-neutral-200">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-sm font-bold outline-none marker:hidden focus-visible:ring-2 focus-visible:ring-neutral-400 [&::-webkit-details-marker]:hidden">
                  {question}
                  <ChevronDown className="chevron-motion h-4 w-4 shrink-0 text-neutral-500 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="max-w-3xl pb-5 pr-10 text-sm leading-6 text-neutral-600">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-[#f7f7f6]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6 px-5 py-9 sm:px-7 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500">Persoonlijk contact</p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.025em] sm:text-[28px]">Nog een vraag over de verkoop van uw wagen?</h2>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:+32473563404" className="inline-flex h-11 items-center gap-2 rounded-md bg-neutral-950 px-6 text-xs font-bold text-white transition hover:bg-neutral-800">
              <Phone className="h-4 w-4" aria-hidden="true" /> Bel ons
            </a>
            <Link href="/contact" className="group inline-flex items-center gap-2 text-xs font-bold underline decoration-neutral-400 underline-offset-4">
              Neem contact op <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
