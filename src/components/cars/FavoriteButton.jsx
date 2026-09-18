"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const storageKey = "nem-motors-favorites";

export default function FavoriteButton({ carId, name, compact = false }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    function readFavorites(event) {
      if (Array.isArray(event?.detail)) {
        setFavorite(event.detail.map(String).includes(String(carId)));
        return;
      }
      try {
        const ids = JSON.parse(window.localStorage.getItem(storageKey) || "[]").map(String);
        setFavorite(ids.includes(String(carId)));
      } catch {
        setFavorite(false);
      }
    }
    readFavorites();
    window.addEventListener("nem-favorites-change", readFavorites);
    window.addEventListener("storage", readFavorites);
    window.addEventListener("pageshow", readFavorites);
    document.addEventListener("visibilitychange", readFavorites);
    return () => {
      window.removeEventListener("nem-favorites-change", readFavorites);
      window.removeEventListener("storage", readFavorites);
      window.removeEventListener("pageshow", readFavorites);
      document.removeEventListener("visibilitychange", readFavorites);
    };
  }, [carId]);

  function toggleFavorite() {
    let ids = [];
    try {
      ids = JSON.parse(window.localStorage.getItem(storageKey) || "[]").map(String);
    } catch {
      ids = [];
    }
    const nextIds = ids.includes(String(carId)) ? ids.filter((id) => id !== String(carId)) : [...ids, String(carId)];
    window.localStorage.setItem(storageKey, JSON.stringify(nextIds));
    window.dispatchEvent(new CustomEvent("nem-favorites-change", { detail: nextIds }));
  }

  return (
    <button type="button" onClick={toggleFavorite} aria-label={favorite ? `${name} verwijderen uit favorieten` : `${name} toevoegen aan favorieten`} aria-pressed={favorite} className={`${compact ? "h-10 w-10" : "h-9 w-9"} flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-sm transition hover:scale-105`}>
      <Heart className={`h-[18px] w-[18px] ${favorite ? "fill-neutral-950" : "fill-white"}`} aria-hidden="true" />
    </button>
  );
}
