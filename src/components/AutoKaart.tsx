"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import type { Vehicle } from "@/types/auto";
import { formatPrice } from "@/lib/utils";
import { useAutoSelectie } from "@/lib/useAutoSelectie";

function BelgianFlag() {
  return (
    <span className="inline-flex h-3 w-4 overflow-hidden rounded-[1px]" aria-label="Belgie">
      <span className="h-full flex-1 bg-black" />
      <span className="h-full flex-1 bg-yellow-400" />
      <span className="h-full flex-1 bg-red-600" />
    </span>
  );
}

function SpecPill({ children, large = false }: { children: ReactNode; large?: boolean }) {
  return (
    <span className={`rounded bg-neutral-100 font-medium text-neutral-700 ${large ? "px-2.5 py-1.5 text-sm" : "px-2 py-1 text-xs"}`}>
      {children}
    </span>
  );
}

export default function AutoKaart({ vehicle, size = "default" }: { vehicle: Vehicle; size?: "default" | "large" | "compact" }) {
  const gallery = vehicle.gallery.length > 0 ? vehicle.gallery : [vehicle.image];
  const isLarge = size === "large";
  const isCompact = size === "compact";
  const [activeImage, setActiveImage] = useState(0);
  const favorites = useAutoSelectie("favorites");
  const compare = useAutoSelectie("compare");
  const liked = favorites.ids.includes(vehicle.id);
  const compared = compare.ids.includes(vehicle.id);
  const compactBadge = vehicle.badge ?? "NEM gecontroleerd";
  const isNewBadge = compactBadge.toLowerCase().includes("nieuw");

  function showPreviousImage() {
    setActiveImage((current) => (current - 1 + gallery.length) % gallery.length);
  }

  function showNextImage() {
    setActiveImage((current) => (current + 1) % gallery.length);
  }

  if (isCompact) {
    return (
      <article className="group min-h-full overflow-hidden rounded-sm border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.12)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
          <Link href={`/voorraad/${vehicle.id}`} className="relative block h-full w-full" aria-label={`${vehicle.brand} ${vehicle.model} bekijken`}>
            <Image
              src={gallery[activeImage]}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              sizes="(min-width: 1536px) 25vw, (min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover opacity-90 saturate-[0.92] transition duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          </Link>
          <span
            className={`absolute left-2 top-2 rounded-sm px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white shadow-sm ${
              isNewBadge ? "bg-emerald-600" : "bg-neutral-950"
            }`}
          >
            <span className="mr-1 text-[#ffc20e]">●</span>
            {compactBadge}
          </span>
          <button
            type="button"
            onClick={() => favorites.toggle(vehicle.id)}
            aria-pressed={liked}
            className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-sm bg-white/95 shadow-sm transition hover:bg-white ${
              liked ? "text-red-500" : "text-neutral-700 hover:text-neutral-950"
            }`}
            aria-label={`${vehicle.brand} ${vehicle.model} bewaren`}
          >
            <Heart className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="p-3.5">
          <Link href={`/voorraad/${vehicle.id}`} className="block">
            <h3 className="text-sm font-black leading-tight text-neutral-950">{vehicle.brand} {vehicle.model}</h3>
            <p className="mt-1 line-clamp-1 text-xs font-semibold text-neutral-600">{vehicle.trim}</p>
          </Link>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <SpecPill>{vehicle.mileage.toLocaleString("nl-BE")} km</SpecPill>
            <SpecPill>{vehicle.fuel}</SpecPill>
            <SpecPill>{vehicle.transmission}</SpecPill>
            <SpecPill>{vehicle.year}</SpecPill>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-base font-black text-neutral-950">{formatPrice(vehicle.price)}</span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 border-t border-neutral-100 pt-2.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-neutral-600">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ffc20e] text-[9px] text-neutral-950">✓</span>
              NEM gecontroleerd
            </span>
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-500">
              <input
                type="checkbox"
                checked={compared}
                onChange={() => compare.toggle(vehicle.id)}
                className="h-3.5 w-3.5 rounded-sm border-neutral-300 text-[#ffc20e] focus:ring-[#ffc20e]"
              />
              Vergelijk
            </label>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`group flex min-h-full flex-col overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-950 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${isLarge ? "text-[15px]" : ""}`}>
      <div className={`relative overflow-hidden bg-neutral-100 p-1 ${isLarge ? "aspect-[16/11]" : "aspect-[4/3]"}`}>
        <div className="relative h-full w-full">
          <Image
            src={gallery[activeImage]}
            alt={`${vehicle.brand} ${vehicle.model}`}
            fill
            sizes={isLarge ? "(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
            className="rounded-sm object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <button
          type="button"
          onClick={() => favorites.toggle(vehicle.id)}
          aria-pressed={liked}
          className={`absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-md bg-white/90 shadow-sm transition hover:bg-white ${
            liked ? "text-red-500" : "text-neutral-700 hover:text-neutral-950"
          }`}
          aria-label={`${vehicle.brand} ${vehicle.model} bewaren`}
        >
          <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
        </button>
        <span className="absolute right-4 top-4 bg-black px-3 py-1.5 text-sm font-black tracking-wide text-white">
          NEM Motors
        </span>
        <button
          type="button"
          onClick={showPreviousImage}
          className="absolute left-4 top-1/2 flex h-9 w-8 -translate-y-1/2 items-center justify-center rounded border border-neutral-300 bg-white/90 text-neutral-700 shadow-sm transition hover:bg-white"
          aria-label="Vorige foto"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={showNextImage}
          className="absolute right-4 top-1/2 flex h-9 w-8 -translate-y-1/2 items-center justify-center rounded border border-neutral-300 bg-white/90 text-neutral-700 shadow-sm transition hover:bg-white"
          aria-label="Volgende foto"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className={`flex flex-1 flex-col ${isLarge ? "p-5" : "p-4"}`}>
        <h3 className={`${isLarge ? "text-xl" : "text-lg"} font-black leading-tight`}>{vehicle.brand} {vehicle.model}</h3>
        <p className={`${isLarge ? "mt-2.5 text-[15px]" : "mt-2 text-sm"} line-clamp-1 text-neutral-700`}>{vehicle.trim}</p>
        <div className={`${isLarge ? "mt-4 gap-2" : "mt-3 gap-1.5"} flex flex-wrap`}>
          <SpecPill large={isLarge}>{vehicle.mileage.toLocaleString("nl-BE")} km</SpecPill>
          <SpecPill large={isLarge}>{vehicle.fuel}</SpecPill>
          <SpecPill large={isLarge}>{vehicle.transmission}</SpecPill>
          <SpecPill large={isLarge}>{vehicle.year}</SpecPill>
        </div>
        <p className={`${isLarge ? "mt-4 text-sm" : "mt-3 text-xs"} flex items-center gap-2 font-medium text-neutral-800`}>
          <BelgianFlag /> NEM Motors, Belgie
        </p>
        <label className="mt-5 flex items-center gap-2 text-sm font-bold text-neutral-950">
          <input
            type="checkbox"
            checked={compared}
            onChange={() => compare.toggle(vehicle.id)}
            className="h-6 w-6 rounded border-neutral-300 text-yellow-500 focus:ring-yellow-400"
          />
          Vergelijk
        </label>
        <div className="mt-4 border-t border-neutral-200 pt-4">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-neutral-700">Kopen</span>
            <span className="font-black text-neutral-950">{formatPrice(vehicle.price)}</span>
          </div>
        </div>
        <div className={`${isLarge ? "pt-8" : "pt-7"} mt-auto flex justify-end`}>
          <Link
            href={`/voorraad/${vehicle.id}`}
            className={`inline-flex items-center gap-2 rounded border border-yellow-400 bg-white font-black text-neutral-950 transition hover:bg-yellow-400 ${isLarge ? "px-5 py-3 text-[15px]" : "px-4 py-2.5 text-sm"}`}
          >
            Bekijk voertuig <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
