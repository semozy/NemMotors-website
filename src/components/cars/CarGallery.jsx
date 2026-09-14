"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, CarFront, ChevronLeft, ChevronRight } from "lucide-react";

const views = ["Vooraanzicht", "Zijaanzicht", "Achteraanzicht", "Interieur"];

export default function CarGallery({ images = [], name = "Wagen" }) {
  const [selected, setSelected] = useState(0);
  const [failed, setFailed] = useState([]);
  const available = images.filter((src) => !failed.includes(src));
  const count = available.length;
  const active = Math.min(selected, Math.max(0, count - 1));
  const change = (step) => setSelected((active + step + count) % count);

  return (
    <section aria-label={`Foto's van ${name}`}>
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-[#e9eae7]" onKeyDown={(event) => {
        if (count > 1 && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
          event.preventDefault(); change(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}>
        {count ? <Image key={available[active]} src={available[active]} alt={`${name} ? foto ${active + 1}`} fill sizes="(min-width: 1440px) 750px, (min-width: 1024px) 58vw, 100vw" className="object-contain" priority onError={() => setFailed((previous) => [...previous, available[active]])} /> : <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.8),transparent_70%)]" />
          <div className="relative px-8 text-center"><CarFront className="mx-auto h-24 w-24 stroke-[0.8] text-neutral-400" aria-hidden="true" /><h2 className="mt-5 text-sm font-bold text-neutral-600">Uw volgende wagen, van alle kanten</h2><p className="mt-2 text-xs text-neutral-400">De foto?s van deze wagen volgen binnenkort.</p></div>
        </>}
        <span className="absolute left-4 top-4 rounded-sm bg-neutral-950 px-3 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#ffc20e]">NEM Motors</span>
        {count > 1 && <><button type="button" onClick={() => change(-1)} aria-label="Vorige foto" className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-950 shadow-sm hover:bg-[#ffc20e]"><ChevronLeft className="h-5 w-5" /></button><button type="button" onClick={() => change(1)} aria-label="Volgende foto" className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-950 shadow-sm hover:bg-[#ffc20e]"><ChevronRight className="h-5 w-5" /></button></>}
        <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-neutral-600" aria-live="polite"><Camera className="h-3.5 w-3.5" aria-hidden="true" />{count ? `${active + 1} / ${count}` : "Foto?s volgen"}</div>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
        {count ? available.map((src, index) => <button type="button" key={src} onClick={() => setSelected(index)} aria-label={`Toon foto ${index + 1} van ${name}`} aria-pressed={index === active} className={`relative aspect-[4/3] overflow-hidden rounded border-2 bg-[#e9eae7] transition ${index === active ? "border-[#ffc20e]" : "border-transparent hover:border-neutral-400"}`}><Image src={src} alt="" fill sizes="(min-width: 1024px) 180px, 25vw" className="object-cover" onError={() => setFailed((previous) => [...previous, src])} /></button>) : views.map((view) => <div key={view} className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded border border-dashed border-neutral-300 bg-[#eeefec] text-neutral-400"><Camera className="h-4 w-4 stroke-1" aria-hidden="true" /><span className="text-[9px] font-medium sm:text-[11px]">{view}</span></div>)}
      </div>
    </section>
  );
}
