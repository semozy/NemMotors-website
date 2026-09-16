"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, CarFront, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const views = ["Vooraanzicht", "Achteraanzicht", "Interieur", "Dashboard"];

export default function CarGallery({ images = [], name = "Wagen" }) {
  const [selected, setSelected] = useState(0);
  const [failed, setFailed] = useState([]);
  const available = images.filter((src) => !failed.includes(src));
  const active = Math.min(selected, Math.max(0, available.length - 1));
  const thumbnails = available.slice(0, 4);
  const changePhoto = (step) => {
    setSelected((current) => (current + step + available.length) % available.length);
  };

  return (
    <section aria-label={`Foto's van ${name}`}>
      <div className="relative aspect-[1.9/1] overflow-hidden rounded-md bg-[#e8e8e6]">
        {available.length ? (
          <Image
            key={available[active]}
            src={available[active]}
            alt={`${name} – foto ${active + 1}`}
            fill
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="object-cover"
            priority
            onError={() => setFailed((previous) => [...previous, available[active]])}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-neutral-400">
            <CarFront className="h-20 w-20 stroke-1" aria-hidden="true" />
            <p className="mt-3 text-xs font-semibold">Foto&apos;s volgen binnenkort</p>
          </div>
        )}

        {available.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => changePhoto(-1)}
              aria-label="Vorige foto"
              className="group absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-950 shadow-md backdrop-blur-sm transition hover:bg-white"
            >
              <ChevronLeft className="chevron-motion h-5 w-5 group-hover:-translate-x-0.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => changePhoto(1)}
              aria-label="Volgende foto"
              className="group absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-950 shadow-md backdrop-blur-sm transition hover:bg-white"
            >
              <ChevronRight className="chevron-motion h-5 w-5 group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </>
        )}

        {available.length > 0 && (
          <button
            type="button"
            onClick={() => changePhoto(1)}
            className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-neutral-950/80 px-3 py-2 text-[11px] font-semibold text-white backdrop-blur-sm hover:bg-neutral-950"
          >
            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            Alle foto&apos;s
          </button>
        )}
      </div>

      <div className="mt-2.5 grid grid-cols-4 gap-2.5">
        {thumbnails.length ? thumbnails.map((src, index) => (
          <button
            type="button"
            key={src}
            onClick={() => setSelected(index)}
            aria-label={`Toon foto ${index + 1} van ${name}`}
            aria-pressed={index === active}
            className={`relative aspect-[1.75/1] overflow-hidden rounded-md border-2 bg-neutral-200 transition ${index === active ? "border-neutral-950" : "border-transparent hover:border-neutral-400"}`}
          >
            <Image src={src} alt="" fill sizes="(min-width: 1024px) 160px, 25vw" className="object-cover" onError={() => setFailed((previous) => [...previous, src])} />
          </button>
        )) : views.map((view) => (
          <div key={view} className="flex aspect-[1.75/1] flex-col items-center justify-center gap-1.5 rounded border border-dashed border-neutral-300 bg-neutral-100 text-neutral-400">
            <Camera className="h-4 w-4 stroke-1" aria-hidden="true" />
            <span className="text-[9px] font-medium">{view}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
