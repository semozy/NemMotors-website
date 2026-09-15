"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, CalendarDays, CarFront, Fuel, Gauge, Settings2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function CarCard({ car }) {
  const router = useRouter();
  const name = `${car.brand} ${car.model}`;
  const specs = [
    [CalendarDays, car.year, "Bouwjaar"],
    [Gauge, car.mileage != null ? `${car.mileage.toLocaleString("nl-BE")} km` : null, "Kilometerstand"],
    [Fuel, car.fuel, "Brandstof"],
    [Settings2, car.transmission, "Transmissie"],
  ];

  return (
    <article onClick={() => router.push(`/aanbod/${car.id}`)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); router.push(`/aanbod/${car.id}`); } }} tabIndex={0} role="link" aria-label={`Bekijk ${name}`} className="group cursor-pointer overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-neutral-950/60 hover:shadow-xl hover:shadow-black/5 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2">
      <Link href={`/aanbod/${car.id}`} className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#eeefec]" aria-label={`Bekijk ${name}`}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_30%,rgba(0,0,0,0.025)_30%,rgba(0,0,0,0.025)_60%,transparent_60%)]" />
        <div className="absolute left-4 top-4 rounded-sm bg-neutral-950 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">{car.status === "gereserveerd" ? "Gereserveerd" : "Beschikbaar"}</div>
        <div className="relative text-center text-neutral-400">
          <CarFront className="mx-auto h-16 w-16 stroke-1" aria-hidden="true" />
          <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.2em]">Foto volgt</span>
        </div>
        <span className="absolute bottom-3 right-4 text-[9px] font-black tracking-[0.22em] text-neutral-400">NEM MOTORS</span>
      </Link>
      <div className="p-5">
        <h2 className="text-lg font-black tracking-tight text-neutral-950"><Link href={`/aanbod/${car.id}`} className="hover:text-neutral-500">{name}</Link></h2>
        <p className="mt-1 min-h-5 text-xs text-neutral-500">{car.trim || `${car.fuel || ""} ? ${car.transmission || ""}`}</p>
        <dl className="my-5 grid grid-cols-2 gap-x-3 gap-y-2.5">
          {specs.filter(([, value]) => value != null).map(([Icon, value, label]) => (
            <div key={label} className="flex items-center gap-2 text-[11px] text-neutral-600"><dt><span className="sr-only">{label}</span><Icon className="h-3.5 w-3.5 text-neutral-400" aria-hidden="true" /></dt><dd>{value}</dd></div>
          ))}
        </dl>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4">
          <p className="text-xl font-black tracking-tight text-neutral-950">{car.price > 0 ? formatPrice(car.price) : "Prijs op aanvraag"}</p>
          <Link href={`/aanbod/${car.id}`} className="inline-flex min-h-9 items-center gap-2 rounded-sm bg-neutral-950 px-3 text-[11px] font-bold text-white transition hover:bg-neutral-700">Bekijk details <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
        </div>
      </div>
    </article>
  );
}
