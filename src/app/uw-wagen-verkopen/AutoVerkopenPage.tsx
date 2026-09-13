import PaginaTitel from "@/components/PaginaTitel";
import Sectie from "@/components/Sectie";
import AutoVerkoopFormulier from "@/components/AutoVerkoopFormulier";
import { CheckCircle2, Clock3, FileText, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Uw wagen verkopen",
  description: "Vraag snel en vrijblijvend een eerlijke waardebepaling aan.",
};

const steps = [
  {
    title: "Vul uw gegevens in",
    text: "Bezorg ons de belangrijkste informatie over uw wagen, kilometerstand, uitvoering en staat.",
    icon: FileText,
  },
  {
    title: "Wij bekijken de waarde",
    text: "We maken een eerlijke inschatting op basis van staat, historiek, opties en marktwaarde.",
    icon: ShieldCheck,
  },
  {
    title: "Duidelijke opvolging",
    text: "Bij interesse plannen we een afspraak en begeleiden we de verkoop of inruil netjes verder.",
    icon: Clock3,
  },
];

const benefits = [
  "Vrijblijvende waardebepaling",
  "Eerlijke uitleg zonder druk",
  "Mogelijkheid tot verkoop of inruil",
  "Hulp bij documenten en praktische stappen",
];

export default function AutoVerkopenPage() {
  return (
    <>
      <PaginaTitel title="Verkoop uw wagen aan NEM Motors" subtitle="Vraag snel en vrijblijvend een eerlijke waardebepaling aan." />
      <div className="bg-white text-neutral-950">
        <Sectie className="py-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-700">Waardebepaling</p>
                <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Snel, eerlijk en persoonlijk</h2>
                <p className="mt-6 text-lg leading-8 text-neutral-700">
                  Wilt u uw wagen verkopen of inruilen? Vul het formulier in en wij nemen snel contact met u op met een eerlijk voorstel. Bij NEM Motors krijgt u duidelijke communicatie, correcte afspraken en persoonlijke begeleiding.
                </p>
              </div>

              <div className="grid gap-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div key={step.title} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                      <div className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ffc20e] text-neutral-950">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">Stap {index + 1}</p>
                          <h3 className="mt-1 text-lg font-black">{step.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-neutral-600">{step.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black">Waarom verkopen via NEM Motors?</h3>
                <div className="mt-5 grid gap-3">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3 text-sm font-semibold text-neutral-800">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <AutoVerkoopFormulier />
          </div>
        </Sectie>
      </div>
    </>
  );
}
