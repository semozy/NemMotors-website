"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function InteresseGallery({ images, name }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const mainImage = images[currentIndex] || "/images/placeholder.jpg";

  // Visible thumbnails logic
  const thumbnailCount = 4;
  const maxThumbnailStart = Math.max(0, images.length - thumbnailCount);
  // Ensure we show the current thumbnail if it's out of view
  const thumbStart = Math.min(
    Math.max(0, currentIndex - Math.floor(thumbnailCount / 2)),
    maxThumbnailStart
  );
  
  const visibleThumbnails = images.slice(thumbStart, thumbStart + thumbnailCount);

  return (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100 group">
        <Image src={mainImage} alt={name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 400px" priority />
        
        {images.length > 1 && (
          <>
            <button 
              type="button" 
              onClick={prev} 
              className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm backdrop-blur transition hover:scale-105 opacity-0 group-hover:opacity-100"
              aria-label="Vorige foto"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button 
              type="button" 
              onClick={next} 
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm backdrop-blur transition hover:scale-105 opacity-0 group-hover:opacity-100"
              aria-label="Volgende foto"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md">
              {currentIndex + 1}/{images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {visibleThumbnails.map((img, idx) => {
            const actualIndex = thumbStart + idx;
            return (
              <button 
                key={actualIndex} 
                type="button"
                onClick={() => setCurrentIndex(actualIndex)}
                className={`relative aspect-[4/3] overflow-hidden rounded-md bg-neutral-100 transition ${currentIndex === actualIndex ? "ring-2 ring-neutral-950" : "opacity-70 hover:opacity-100"}`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="100px" />
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

