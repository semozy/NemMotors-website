"use client";

import Link from "next/link";
import Sectie from "@/components/Sectie";
import AutoKaart from "@/components/AutoKaart";
import { vehicles } from "@/lib/autos";
import { useAutoSelectie } from "@/lib/useAutoSelectie";

export default function FavorieteAutos() {
  const favorites = useAutoSelectie("favorites");
  const selected = vehicles.filter((vehicle) => favorites.ids.includes(vehicle.id));
  return <main className="min-h-[70vh] bg-neutral-100 text-neutral-950"><Sectie className="py-12"><p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-700">Favorieten</p><h1 className="mt-2 text-4xl font-black">Uw bewaarde wagens</h1>{selected.length ? <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{selected.map((vehicle) => <AutoKaart key={vehicle.id} vehicle={vehicle} size="compact" />)}</div> : <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-10 text-center"><h2 className="text-2xl font-black">Nog geen wagens bewaard</h2><p className="mt-3 text-neutral-600">Gebruik het hartje bij een wagen om deze hier te bewaren.</p><Link href="/voorraad" className="mt-6 inline-flex rounded-lg bg-[#ffc20e] px-5 py-3 font-black">Bekijk het aanbod</Link></div>}</Sectie></main>;
}
