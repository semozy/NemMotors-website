import { ShieldCheck } from "lucide-react";
import Sectie from "@/components/Sectie";

const highlights = [
  "Zorgvuldig geselecteerde tweedehandswagens",
  "Persoonlijke begeleiding van eerste contact tot aflevering",
  "Duidelijke prijzen en eerlijke uitleg",
  "Transparante informatie over opties en historiek",
  "Hulp bij inruil, verkoop, documenten en proefritten",
];

export default function GarageVerhaal() {
  return (
    <Sectie className="py-10">
      <div className="grid overflow-hidden rounded-lg bg-neutral-100 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="min-h-[420px] bg-[url('https://images.unsplash.com/photo-1562141961-b5d92de784a3?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center" />
        <div className="p-8 md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-700">Over NEM Motors</p>
          <h2 className="mt-4 text-4xl font-black text-neutral-950 md:text-5xl">Een garage met ervaring en een persoonlijke aanpak</h2>
          <p className="mt-6 leading-8 text-neutral-700">
            Bij NEM Motors helpen we klanten bij het vinden van een betrouwbare tweedehandswagen die past bij hun budget, gezin en rijgedrag. We combineren ervaring in de autoverkoop met een eerlijke en duidelijke aanpak: transparante informatie, correcte afspraken en persoonlijk advies op maat.
          </p>
          <p className="mt-5 leading-8 text-neutral-700">
            Elke wagen wordt zorgvuldig geselecteerd en duidelijk voorgesteld, zodat je precies weet waar je aan toe bent. Van je eerste vraag tot de aflevering van de wagen begeleiden we je stap voor stap.
          </p>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-neutral-950">Waar NEM Motors voor staat:</p>
          <div className="mt-8 grid gap-4">
            {highlights.map((highlight) => (
              <div key={highlight} className="flex gap-3 text-sm font-semibold text-neutral-800">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sectie>
  );
}
