"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import Sectie from "@/components/Sectie";
import { vehicles } from "@/lib/autos";
import { formatPrice } from "@/lib/utils";
import { useAutoSelectie } from "@/lib/useAutoSelectie";

export default function AutoVergelijking() {
  const compare = useAutoSelectie("compare");
  const selected = compare.ids.map((id) => vehicles.find((vehicle) => vehicle.id === id)).filter(Boolean);
  const rows = [
    ["Prijs", (id: number) => formatPrice(id)], ["Bouwjaar", String], ["Kilometerstand", (value: number) => `${value.toLocaleString("nl-BE")} km`],
  ] as const;

  return <main className="min-h-[70vh] bg-neutral-100 text-neutral-950"><Sectie className="py-12"><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-700">Vergelijken</p><h1 className="mt-2 text-4xl font-black">Uw geselecteerde wagens</h1></div>{selected.length > 0 && <button type="button" onClick={compare.clear} className="inline-flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-red-600"><Trash2 className="h-4 w-4" />Alles wissen</button>}</div>
    {selected.length === 0 ? <div className="mt-10 rounded-xl border border-neutral-200 bg-white p-10 text-center"><h2 className="text-2xl font-black">Nog geen wagens geselecteerd</h2><p className="mt-3 text-neutral-600">Selecteer maximaal vier wagens in het aanbod.</p><Link href="/voorraad" className="mt-6 inline-flex rounded-lg bg-[#ffc20e] px-5 py-3 font-black">Bekijk het aanbod</Link></div> : <div className="mt-10 overflow-x-auto"><div className="grid min-w-[720px] gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200" style={{ gridTemplateColumns: `180px repeat(${selected.length}, minmax(220px, 1fr))` }}><div className="bg-neutral-950 p-4 text-white">Voertuig</div>{selected.map((vehicle) => vehicle && <div key={vehicle.id} className="bg-white p-4"><div className="relative aspect-[16/10] overflow-hidden rounded-lg"><Image src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} fill sizes="25vw" className="object-cover" /></div><h2 className="mt-3 font-black">{vehicle.brand} {vehicle.model}</h2><p className="text-sm text-neutral-600">{vehicle.trim}</p><button type="button" onClick={() => compare.toggle(vehicle.id)} className="mt-3 text-xs font-bold text-red-600">Verwijderen</button></div>)}
      {rows.map(([label, formatter], rowIndex) => <div key={label} className="contents"><div className="bg-neutral-50 p-4 text-sm font-black">{label}</div>{selected.map((vehicle) => vehicle && <div key={`${label}-${vehicle.id}`} className="bg-white p-4 text-sm font-semibold">{rowIndex === 0 ? formatter(vehicle.price) : rowIndex === 1 ? formatter(vehicle.year) : formatter(vehicle.mileage)}</div>)}</div>)}
      <div className="bg-neutral-50 p-4 text-sm font-black">Specificaties</div>{selected.map((vehicle) => vehicle && <div key={`spec-${vehicle.id}`} className="bg-white p-4 text-sm leading-7">{vehicle.fuel}<br />{vehicle.transmission}<br />{vehicle.power}<br />{vehicle.body}</div>)}
      <div className="bg-neutral-50 p-4" />{selected.map((vehicle) => vehicle && <div key={`link-${vehicle.id}`} className="bg-white p-4"><Link href={`/voorraad/${vehicle.id}`} className="inline-flex rounded-lg bg-neutral-950 px-4 py-2 text-sm font-black text-white">Bekijk wagen</Link></div>)}</div></div>}
  </Sectie></main>;
}
