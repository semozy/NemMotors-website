"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  Maximize2,
  MessageSquare,
} from "lucide-react";
import Sectie from "@/components/Sectie";
import AutoKaart from "@/components/AutoKaart";
import { formatPrice } from "@/lib/utils";
import type { Vehicle } from "@/types/auto";
import { vehicles } from "@/lib/autos";
import { useAutoSelectie } from "@/lib/useAutoSelectie";

function BrandLogo({ brand }: { brand: string }) {
  const parts = brand.split(/[\s-]/).filter(Boolean);
  const initials = (parts.length === 1 ? brand.slice(0, 3) : parts.map((part) => part[0]).join(""))
    .slice(0, 3)
    .toUpperCase();

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-neutral-200 bg-white text-lg font-black text-neutral-950 shadow-sm">
      {initials}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border-b border-neutral-200 pb-4">
      <p className="text-xs font-medium text-neutral-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-neutral-950">{value}</p>
    </div>
  );
}

export default function AutoDetails({ vehicle }: { vehicle: Vehicle }) {
  const [active, setActive] = useState(0);
  const favorites = useAutoSelectie("favorites");
  const compare = useAutoSelectie("compare");
  const liked = favorites.ids.includes(vehicle.id);
  const compared = compare.ids.includes(vehicle.id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeLightboxRef = useRef<HTMLButtonElement>(null);
  const gallery = vehicle.gallery.length > 0 ? vehicle.gallery : [vehicle.image];
  const isReserved = vehicle.badge?.toLowerCase().includes("gereserveerd") ?? false;
  const specs = [
    ["Kilometerstand", `${vehicle.mileage.toLocaleString("nl-BE")} km`],
    ["Eerste registratie", vehicle.firstRegistration],
    ["Brandstof", vehicle.fuel],
    ["Transmissie", vehicle.transmission],
    ["Vermogen", vehicle.power],
    ["Carrosserie", vehicle.body],
    ["Kleur", vehicle.color],
    ["Aantal deuren", vehicle.doors],
    ["Aantal zitplaatsen", vehicle.seats],
    ["Bouwjaar", vehicle.year],
  ];

  useEffect(() => {
    if (!lightboxOpen) return;
    closeLightboxRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setLightboxOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [lightboxOpen]);

  return (
    <div className="bg-white text-neutral-950">
      <Sectie className="py-6">
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-neutral-500">
          <Link href="/" className="hover:text-neutral-950" aria-label="Home">
            <Home className="h-4 w-4" />
          </Link>
          <span>/</span>
          <Link href="/voorraad" className="hover:text-neutral-950">
            Voorraad
          </Link>
          <span>/</span>
          <span className="text-neutral-950">{vehicle.brand} {vehicle.model}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-md bg-neutral-100">
              <Image
                src={gallery[active]}
                alt={`${vehicle.brand} ${vehicle.model}`}
                width={1600}
                height={1024}
                sizes="(min-width: 1024px) 65vw, 100vw"
                className="h-[32rem] w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded bg-neutral-950/80 text-white transition hover:bg-neutral-950"
                aria-label="Foto vergroten"
              >
                <Maximize2 className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 md:gap-3">
              {gallery.map((img, index) => (
                <button
                  key={`${img}-${index}`}
                  onClick={() => setActive(index)}
                  className={`overflow-hidden rounded-md border-2 bg-neutral-100 transition ${
                    active === index ? "border-yellow-400" : "border-transparent hover:border-neutral-300"
                  }`}
                >
                  <Image
                    src={img}
                    width={400}
                    height={224}
                    sizes="(min-width: 768px) 16vw, 25vw"
                    className="h-24 w-full object-cover md:h-28"
                    alt={`${vehicle.brand} ${vehicle.model} foto ${index + 1}`}
                  />
                </button>
              ))}
            </div>
            <div className="mt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActive((active - 1 + gallery.length) % gallery.length)}
                className="flex h-8 w-8 items-center justify-center rounded border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                aria-label="Vorige foto"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setActive((active + 1) % gallery.length)}
                className="flex h-8 w-8 items-center justify-center rounded border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                aria-label="Volgende foto"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <aside className="self-start">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <BrandLogo brand={vehicle.brand} />
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-neutral-950">
                    <input
                      type="checkbox"
                      checked={compared}
                      onChange={() => compare.toggle(vehicle.id)}
                      className="h-5 w-5 rounded border-neutral-300"
                    />
                    Vergelijk
                  </label>
                  <button
                    type="button"
                    onClick={() => favorites.toggle(vehicle.id)}
                    aria-pressed={liked}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition ${
                      liked ? "text-red-500" : "text-neutral-600 hover:text-neutral-950"
                    }`}
                    aria-label="Bewaar deze wagen"
                  >
                    <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>

              <h1 className="mt-7 text-3xl font-black leading-tight">{vehicle.brand} {vehicle.model}</h1>
              <p className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${isReserved ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>{isReserved ? "Gereserveerd" : "Beschikbaar"}</p>

              <div className="mt-7 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <p className="text-sm font-semibold text-neutral-500">Kopen</p>
                <p className="mt-2 text-3xl font-black tracking-tight text-neutral-950">{formatPrice(vehicle.price)}</p>
              </div>

              <div className="mt-4 grid gap-3">
                <Link
                  href={`/contact?actie=proefrit&wagen=${vehicle.id}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#ffc20e] px-4 py-3.5 text-sm font-black text-neutral-950 transition hover:bg-[#e6ad00]"
                >
                  {isReserved ? "Vraag naar beschikbaarheid" : "Maak een proefrit"} <MessageSquare className="h-4 w-4" />
                </Link>
                <Link
                  href={`/contact?actie=interesse&wagen=${vehicle.id}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-neutral-950 bg-white px-4 py-3.5 text-sm font-black text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
                >
                  Ik heb interesse <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-14 max-w-4xl">
          <h2 className="text-3xl font-black">Auto gegevens</h2>
          <h3 className="mt-8 text-xl font-black">Overzicht</h3>
          <div className="mt-5 grid gap-x-10 gap-y-5 md:grid-cols-2">
            {specs.map(([label, value]) => (
              <DetailRow key={label as string} label={label as string} value={value} />
            ))}
          </div>

          <h3 className="mt-12 text-2xl font-black">Opties en accessoires</h3>
          <div className="mt-5 grid gap-x-10 gap-y-4 md:grid-cols-2">
            {vehicle.options.map((option) => (
              <div key={option} className="flex items-center gap-2 border-b border-neutral-200 pb-3 text-sm text-neutral-800">
                <Check className="h-4 w-4 text-emerald-600" />
                {option}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-black">Gerelateerde voertuigen</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vehicles
              .filter((item) => item.id !== vehicle.id)
              .slice(0, 4)
              .map((item) => (
                <AutoKaart key={item.id} vehicle={item} />
              ))}
          </div>
        </div>
      </Sectie>
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${vehicle.brand} ${vehicle.model} foto`}
        >
          <button
            ref={closeLightboxRef}
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-5 top-5 rounded bg-white px-4 py-2 text-sm font-black text-neutral-950"
          >
            Sluiten
          </button>
          <button
            type="button"
            onClick={() => setActive((active - 1 + gallery.length) % gallery.length)}
            className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded bg-white text-neutral-950"
            aria-label="Vorige foto"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="relative h-[85vh] w-[90vw]">
            <Image
              src={gallery[active]}
              alt={`${vehicle.brand} ${vehicle.model} vergrote foto`}
              fill
              sizes="90vw"
              className="rounded object-contain"
            />
          </div>
          <button
            type="button"
            onClick={() => setActive((active + 1) % gallery.length)}
            className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded bg-white text-neutral-950"
            aria-label="Volgende foto"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
