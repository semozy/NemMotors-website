import PaginaTitel from "@/components/PaginaTitel";
import Sectie from "@/components/Sectie";
import { soldVehicles } from "@/lib/verkochte-autos";
import Image from "next/image";

export const metadata = {
  title: "Reeds verkocht",
  description: "Een selectie van wagens die recent via NEM Motors verkocht zijn.",
};

export default function VerkochteAutosPage() {
  return (
    <>
      <PaginaTitel title="Reeds verkocht" subtitle="Een selectie van wagens die recent via NEM Motors verkocht zijn." />
      <Sectie>
        <div className="grid gap-6 md:grid-cols-3">
          {soldVehicles.map((v) => (
            <article key={v.model} className="overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900">
              <div className="relative h-60">
                <Image
                  src={v.image}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover grayscale"
                  alt={`${v.brand} ${v.model}`}
                />
                <span className="absolute left-4 top-4 rounded-full bg-red-600 px-4 py-2 text-sm font-black">
                  Verkocht
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black">{v.brand} {v.model}</h3>
                <p className="mt-3 text-neutral-400">
                  {v.year} | {v.mileage.toLocaleString("nl-BE")} km
                </p>
              </div>
            </article>
          ))}
        </div>
      </Sectie>
    </>
  );
}
