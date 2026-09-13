import PaginaTitel from "@/components/PaginaTitel";
import Sectie from "@/components/Sectie";
import SectieTitel from "@/components/SectieTitel";
import KenmerkKaart from "@/components/KenmerkKaart";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Over ons",
  description: "Leer meer over NEM Motors, onze ervaring en persoonlijke aanpak.",
};

const strengths = [
  "Zorgvuldig geselecteerde tweedehandswagens",
  "Persoonlijke begeleiding van eerste contact tot aflevering",
  "Duidelijke prijzen en eerlijke uitleg",
  "Transparante informatie over opties en historiek",
  "Hulp bij inruil, verkoop, documenten en proefritten",
];

export default function OverOnsPage() {
  return (
    <>
      <PaginaTitel title="Over NEM Motors" subtitle="Een garage met ervaring en een persoonlijke aanpak." />
      <Sectie>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectieTitel eyebrow="Ons verhaal" title="Een garage met ervaring en een persoonlijke aanpak" />
            <p className="mt-6 text-lg leading-8 text-neutral-300">
              Bij NEM Motors helpen we klanten bij het vinden van een betrouwbare tweedehandswagen die past bij hun budget, gezin en rijgedrag. We combineren ervaring in de autoverkoop met een eerlijke en duidelijke aanpak: transparante informatie, correcte afspraken en persoonlijk advies op maat.
            </p>
            <p className="mt-5 text-lg leading-8 text-neutral-300">
              Elke wagen wordt zorgvuldig geselecteerd en duidelijk voorgesteld, zodat je precies weet waar je aan toe bent. Van je eerste vraag tot de aflevering van de wagen begeleiden we je stap voor stap.
            </p>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-red-400">Waar NEM Motors voor staat:</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {strengths.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-neutral-900 p-4">
                  <CheckCircle2 className="text-red-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <Image
            className="rounded-[2rem] object-cover"
            src="https://images.unsplash.com/photo-1597007030739-6d2e7172ee30?auto=format&fit=crop&w=1400&q=80"
            alt="Garage"
            width={1400}
            height={933}
          />
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-5">
          {["Eerlijkheid", "Kwaliteit", "Service", "Vertrouwen", "Passie"].map((value) => (
            <KenmerkKaart key={value} icon={<ShieldCheck />} title={value} text="Een kernwaarde die elke klant in onze aanpak voelt." />
          ))}
        </div>
      </Sectie>
    </>
  );
}
