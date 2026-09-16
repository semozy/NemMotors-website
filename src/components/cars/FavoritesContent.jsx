"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Heart, Search } from "lucide-react";
import CarCard from "./CarCard";

const storageKey = "nem-motors-favorites";
const sortOptions = [
  ["saved", "Laatst bewaard"],
  ["year", "Nieuwste eerst"],
  ["price-low", "Prijs laag–hoog"],
  ["price-high", "Prijs hoog–laag"],
];

export default function FavoritesContent({ cars }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [sort, setSort] = useState("saved");

  useEffect(() => {
    function readFavorites(event) {
      if (Array.isArray(event?.detail)) {
        setFavoriteIds(event.detail.map(String));
        return;
      }
      try {
        setFavoriteIds(JSON.parse(window.localStorage.getItem(storageKey) || "[]").map(String));
      } catch {
        setFavoriteIds([]);
      }
    }
    readFavorites();
    window.addEventListener("nem-favorites-change", readFavorites);
    window.addEventListener("storage", readFavorites);
    return () => {
      window.removeEventListener("nem-favorites-change", readFavorites);
      window.removeEventListener("storage", readFavorites);
    };
  }, []);

  const favorites = useMemo(() => {
    const selected = favoriteIds.map((id) => cars.find((car) => String(car.id) === id)).filter(Boolean);
    if (sort === "price-low") return [...selected].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...selected].sort((a, b) => b.price - a.price);
    if (sort === "year") return [...selected].sort((a, b) => b.year - a.year);
    return [...selected].reverse();
  }, [cars, favoriteIds, sort]);

  function chooseSort(event, value) {
    setSort(value);
    event.currentTarget.closest("details")?.removeAttribute("open");
  }

  return (
    <div className="mx-auto max-w-[1180px] px-5 py-6 sm:px-7 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-black tracking-[-0.035em]">{favorites.length} bewaarde {favorites.length === 1 ? "wagen" : "wagens"}</h2>
        <div className="flex items-center gap-3">
          <Link href="/aanbod" className="group inline-flex h-10 items-center gap-3 rounded-md border border-neutral-400 px-5 text-xs font-bold transition hover:border-neutral-950">
            Verder zoeken <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <details className="group relative">
            <summary className="flex h-10 min-w-36 cursor-pointer list-none items-center justify-between gap-3 rounded-md border border-neutral-300 bg-white px-4 text-xs outline-none marker:hidden focus:border-neutral-600 [&::-webkit-details-marker]:hidden">
              {sortOptions.find(([value]) => value === sort)?.[1]}
              <ChevronDown className="chevron-motion h-3.5 w-3.5 group-open:rotate-180" />
            </summary>
            <div className="absolute right-0 top-full z-30 mt-1 min-w-full overflow-hidden rounded-md border border-neutral-200 bg-white py-1 shadow-lg">
              {sortOptions.map(([value, label]) => (
                <button key={value} type="button" onClick={(event) => chooseSort(event, value)} className="block w-full whitespace-nowrap px-4 py-2 text-left text-xs text-neutral-700 hover:bg-neutral-100">
                  {label}
                </button>
              ))}
            </div>
          </details>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      ) : (
        <div className="mt-5 flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white px-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100"><Heart className="h-6 w-6" /></span>
          <h2 className="mt-5 text-2xl font-black">Nog geen favoriete wagens</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">Bewaar een wagen via het hartje op de kaart. Uw favorieten verschijnen daarna automatisch op deze pagina.</p>
          <Link href="/aanbod" className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-neutral-950 px-6 text-xs font-bold text-white">Bekijk het aanbod <ArrowRight className="h-4 w-4" /></Link>
        </div>
      )}

      <section className="mt-5 flex flex-col gap-5 rounded-lg border border-neutral-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100"><Search className="h-5 w-5" /></span>
          <div><h2 className="text-sm font-black">Nog niet gevonden wat u zoekt?</h2><p className="mt-1 text-xs text-neutral-500">Ontdek ook de andere wagens in ons aanbod.</p></div>
        </div>
        <Link href="/aanbod" className="group inline-flex h-10 items-center justify-center gap-3 rounded-md border border-neutral-400 px-5 text-xs font-bold transition hover:border-neutral-950">
          Bekijk het aanbod <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </section>
    </div>
  );
}
