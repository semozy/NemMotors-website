"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, CarFront, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const views = ["Vooraanzicht", "Achteraanzicht", "Interieur", "Dashboard"];

export default function CarGallery({ images = [], name = "Wagen" }) {
  const [selected, setSelected] = useState(0);
  const [failed, setFailed] = useState([]);
  const [thumbnailStart, setThumbnailStart] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const available = images.filter((src) => !failed.includes(src));
  const active = Math.min(selected, Math.max(0, available.length - 1));
  const thumbnailCount = 4;
  const maxThumbnailStart = Math.max(0, available.length - thumbnailCount);
  const visibleThumbnailStart = Math.min(thumbnailStart, maxThumbnailStart);
  const thumbnails = available.slice(visibleThumbnailStart, visibleThumbnailStart + thumbnailCount);

  // Zorg ervoor dat het scrollen stopt als de lightbox open is
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLightboxOpen]);

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

  // Keyboard navigation voor de lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") changePhoto(-1);
      if (e.key === "ArrowRight") changePhoto(1);
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, active, available.length]);

  return (
    <>
      <section aria-label={`Foto's van ${name}`}>
        <div className="relative aspect-[1.9/1] overflow-hidden rounded-md bg-[#e8e8e6] group">
          {available.length ? (
            <button 
              onClick={() => setIsLightboxOpen(true)}
              className="absolute inset-0 w-full h-full cursor-zoom-in"
              aria-label="Vergroot foto"
            >
              <Image
                key={available[active]}
                src={available[active]}
                alt={`${name} – foto ${active + 1}`}
                fill
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="object-cover transition duration-300"
                priority
                onError={() => setFailed((previous) => [...previous, available[active]])}
              />
            </button>
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
                onClick={(e) => { e.stopPropagation(); changePhoto(-1); }}
                aria-label="Vorige foto"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-950 shadow-md backdrop-blur-sm transition hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); changePhoto(1); }}
                aria-label="Volgende foto"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-950 shadow-md backdrop-blur-sm transition hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}

          {available.length > 0 && (
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-neutral-950/80 px-3 py-2 text-[11px] font-semibold text-white backdrop-blur-sm hover:bg-neutral-950"
            >
              <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              Vergroten
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
                className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-950 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setThumbnailStart((current) => Math.min(maxThumbnailStart, current + 1))}
                disabled={visibleThumbnailStart === maxThumbnailStart}
                className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-950 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </section>

      {/* LIGHTBOX / FULLSCREEN ZOOM MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999999] flex flex-col bg-black/95 backdrop-blur-xl"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Header met sluitknop en teller */}
            <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:p-6 text-white bg-gradient-to-b from-black/60 to-transparent">
              <span className="text-sm font-semibold tracking-wider">
                {active + 1} / {available.length}
              </span>
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className="rounded-full bg-white/10 p-2 transition hover:bg-white/20 hover:scale-110"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Hoofdfoto in het midden, klikken om te voorkomen dat modal sluit */}
            <div className="relative flex-1 w-full h-full p-4 sm:p-12" onClick={(e) => e.stopPropagation()}>
              <Image
                key={available[active]}
                src={available[active]}
                alt={`${name} – fullscreen foto`}
                fill
                className="object-contain" // object-contain zorgt ervoor dat je de volledige foto ziet
                sizes="100vw"
                priority
              />

              {/* Navigatie knoppen */}
              {available.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); changePhoto(-1); }}
                    className="absolute left-2 sm:left-6 top-1/2 flex h-12 w-12 sm:h-16 sm:w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/30 hover:scale-105"
                  >
                    <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); changePhoto(1); }}
                    className="absolute right-2 sm:right-6 top-1/2 flex h-12 w-12 sm:h-16 sm:w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/30 hover:scale-105"
                  >
                    <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10" />
                  </button>
                </>
              )}
            </div>
            
            {/* Fotolijst / Thumbnails onderaan de lightbox */}
            <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 bg-gradient-to-t from-black/80 to-transparent flex justify-center gap-2 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
              {available.map((src, idx) => (
                <button
                  key={src}
                  onClick={() => setSelected(idx)}
                  className={`relative h-12 w-20 shrink-0 overflow-hidden rounded border-2 transition ${idx === active ? 'border-white opacity-100 scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
