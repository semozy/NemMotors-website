"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, CarFront, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const views = ["Vooraanzicht", "Achteraanzicht", "Interieur", "Dashboard"];

export default function CarGallery({ images = [], name = "Wagen" }) {
  const [selected, setSelected] = useState(0);
  const [failed, setFailed] = useState([]);
  const [thumbnailStart, setThumbnailStart] = useState(0);
  const available = images.filter((src) => !failed.includes(src));
  const active = Math.min(selected, Math.max(0, available.length - 1));
  const thumbnailCount = 4;
  const maxThumbnailStart = Math.max(0, available.length - thumbnailCount);
  const visibleThumbnailStart = Math.min(thumbnailStart, maxThumbnailStart);
  const thumbnails = available.slice(visibleThumbnailStart, visibleThumbnailStart + thumbnailCount);

  const changePhoto = (step) => {
    const next = (active + step + available.length) % available.length;
    setSelected(next);
    setThumbnailStart((current) => {
      const visibleStart = Math.min(current, maxThumbnailStart);
      if (next < visibleStart) return next;
      if (next >= visibleStart + thumbnailCount) return Math.min(next - thumbnailCount + 1, maxThumbnailStart);
      return visibleStart;
    });
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

      <div className="relative mt-2.5">
        <div className="grid grid-cols-4 gap-2.5">
        {thumbnails.length ? thumbnails.map((src, index) => {
          const photoIndex = visibleThumbnailStart + index;
          return (
          <button
            type="button"
            key={src}
            onClick={() => setSelected(photoIndex)}
            aria-label={`Toon foto ${photoIndex + 1} van ${name}`}
            aria-pressed={photoIndex === active}
            className={`relative aspect-[1.75/1] overflow-hidden rounded-md border-2 bg-neutral-200 transition ${photoIndex === active ? "border-neutral-950" : "border-transparent hover:border-neutral-400"}`}
          >
            <Image src={src} alt="" fill sizes="(min-width: 1024px) 160px, 25vw" className="object-cover" onError={() => setFailed((previous) => [...previous, src])} />
          </button>
          );
        }) : views.map((view) => (
          <div key={view} className="flex aspect-[1.75/1] flex-col items-center justify-center gap-1.5 rounded border border-dashed border-neutral-300 bg-neutral-100 text-neutral-400">
            <Camera className="h-4 w-4 stroke-1" aria-hidden="true" />
            <span className="text-[9px] font-medium">{view}</span>
          </div>
        ))}
        </div>

        {available.length > thumbnailCount && (
          <>
            <button
              type="button"
              onClick={() => setThumbnailStart((current) => Math.max(0, current - 1))}
              disabled={visibleThumbnailStart === 0}
              aria-label="Vorige kleine foto's"
              className="group absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-950 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="chevron-motion h-4 w-4 group-hover:-translate-x-0.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setThumbnailStart((current) => Math.min(maxThumbnailStart, current + 1))}
              disabled={visibleThumbnailStart === maxThumbnailStart}
              aria-label="Volgende kleine foto's"
              className="group absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-950 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="chevron-motion h-4 w-4 group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
