import Image from "next/image";
import { Check } from "lucide-react";
import SellForm from "@/components/sell/SellForm";

export const metadata = {
  title: "Auto verkopen",
  description: "Vraag vrijblijvend een persoonlijk voorstel aan voor uw auto.",
};

const benefits = ["Persoonlijk contact", "Vrijblijvend voorstel", "Inruil mogelijk"];

const steps = [
  ["01", "Deel uw wagen", "Vul de gegevens in en voeg foto’s toe."],
  ["02", "Persoonlijk voorstel", "We bespreken uw wagen en de mogelijkheden."],
  ["03", "Afspraak en afhandeling", "Samen regelen we de volgende stappen."],
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
              src="/images/sell/sell-your-car.png"
              alt="Een autosleutel voor een wagen bij de showroom van NEM Motors"
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
    </main>
  );
}
