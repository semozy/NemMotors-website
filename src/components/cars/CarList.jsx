"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CarFront,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import CarCard from "./CarCard";
import { filterCars } from "@/lib/cars";
import { InventoryFilters } from "./CarFilter";

const defaultFilters = { brand: "", model: "", price: "", body: "", yearFrom: "", yearTo: "", kmFrom: "", kmTo: "", fuel: [], transmission: [] };
const pageSize = 20;
const sortOptions = [
  ["year", "Nieuwste eerst"],
  ["relevant", "Meest relevant"],
  ["price-low", "Prijs: laag naar hoog"],
  ["price-high", "Prijs: hoog naar laag"],
  ["mileage", "Laagste kilometerstand"],
];

export default function CarList({ cars = [], catalog = false, initialFilters = defaultFilters, initialQuery = "" }) {
  const [filters, setFilters] = useState(initialFilters);
  const [search, setSearch] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("year");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const priceLimit = Math.max(50000, Math.ceil(Math.max(0, ...cars.map((car) => car.price || 0)) / 10000) * 10000);

  function updateFilter(name, value) {
    setFilters((previous) => ({ ...previous, [name]: value, ...(name === "brand" ? { model: "" } : {}) }));
    setPage(1);
  }

  function reset() {
    setFilters(defaultFilters);
    setSearch("");
    setQuery("");
    setPage(1);
  }

  const results = filterCars(cars, filters, query, sort);
  const pageCount = Math.max(1, Math.ceil(results.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = results.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const activeCount = Object.values(filters).reduce((total, value) => total + (Array.isArray(value) ? value.length : Number(value !== "")), 0);

  if (!catalog) {
    if (!cars.length) return <p>Er zijn nog geen wagens toegevoegd.</p>;
    return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{cars.map((car) => <CarCard key={car.id} car={car} />)}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f4f5f5] text-neutral-950">
      <section className="relative isolate overflow-hidden bg-[#202427] text-white">
        <Image
          src="/images/home/service-verkoop.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-neutral-950/75" />

        <div className="mx-auto grid max-w-[1440px] gap-6 px-6 py-5 sm:px-8 lg:grid-cols-[1fr_470px] lg:items-center lg:px-9 lg:py-6">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[10px] text-white/70">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="chevron-motion h-3 w-3" aria-hidden="true" />
              <span className="text-white">Aanbod</span>
            </div>
            <h1 className="text-3xl font-black tracking-[-0.035em] sm:text-4xl">
              Vind uw volgende wagen.
            </h1>
            <p className="mt-1 text-sm text-white/75">
              Sterke wagens. Eerlijke prijzen. Persoonlijke service.
            </p>
          </div>

          <form
            onSubmit={(event) => { event.preventDefault(); setQuery(search.trim()); setPage(1); }}
            className="flex h-12 rounded-md bg-white px-4 shadow-lg"
          >
            <label className="flex min-w-0 flex-1 items-center gap-3">
              <Search className="h-5 w-5 shrink-0 text-neutral-500" aria-hidden="true" />
              <span className="sr-only">Zoek op merk, model of trefwoord</span>
              <input
                type="search"
                value={search}
                onChange={(event) => { const value = event.target.value; setSearch(value); setQuery(value.trim()); setPage(1); }}
                placeholder="Zoek op merk, model of trefwoord"
                className="h-full w-full min-w-0 bg-transparent text-xs text-neutral-900 outline-none placeholder:text-neutral-500"
              />
            </label>
          </form>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1440px] gap-4 px-6 py-3 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-7">
        <aside aria-label="Aanbodfilters">
          <button
            type="button"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
            aria-controls="inventory-filters"
            className="mb-3 flex w-full items-center justify-between rounded-md border border-neutral-200 bg-white p-4 text-sm font-bold lg:hidden"
          >
            <span className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" />Filters {activeCount > 0 && `(${activeCount})`}</span>
            <ChevronDown className={`chevron-motion h-4 w-4 ${filtersOpen ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
          <div id="inventory-filters" className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
            <InventoryFilters cars={cars} filters={filters} onChange={updateFilter} onReset={reset} priceLimit={priceLimit} />
          </div>
        </aside>

        <section aria-label="Beschikbare wagens" className="min-w-0">
          <div className="mb-3 flex min-h-10 flex-wrap items-center justify-between gap-3">
            <p role="status" className="text-sm font-black">
              {results.length} {results.length === 1 ? "wagen gevonden" : "wagens gevonden"}
              {query && <span className="ml-1 font-normal text-neutral-500">voor &quot;{query}&quot;</span>}
            </p>

            <div className="flex items-center gap-3 text-[10px] text-neutral-600">
              Sorteer op:
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortOpen(!sortOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={sortOpen}
                  className="flex h-9 min-w-36 items-center justify-between gap-3 rounded border border-neutral-200 bg-white px-3 text-left text-[10px] text-neutral-800"
                >
                  {sortOptions.find(([value]) => value === sort)?.[1]}
                  <ChevronDown aria-hidden="true" className={`chevron-motion h-3.5 w-3.5 ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`absolute right-0 top-full z-30 mt-1 min-w-full overflow-hidden rounded border border-neutral-200 bg-white shadow-lg transition ${sortOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`} role="listbox" aria-label="Sorteerresultaten">
                  {sortOptions.map(([value, label]) => (
                    <button role="option" aria-selected={sort === value} type="button" key={value} onClick={() => { setSort(value); setPage(1); setSortOpen(false); }} className="block w-full whitespace-nowrap px-3 py-2 text-left text-[11px] text-neutral-700 hover:bg-neutral-100">
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {visible.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((car) => <CarCard key={car.id} car={car} />)}
            </div>
          ) : (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-white px-6 py-12 text-center">
              <CarFront className="mb-5 h-12 w-12 stroke-1 text-neutral-400" aria-hidden="true" />
              <h2 className="text-xl font-bold">{cars.length ? "Geen wagens gevonden" : "Ons aanbod wordt aangevuld"}</h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">{cars.length ? "Pas uw zoekopdracht of filters aan om meer wagens te bekijken." : "Neem gerust contact op. We helpen u graag bij het vinden van uw volgende wagen."}</p>
              {cars.length ? <button onClick={reset} className="mt-6 rounded bg-neutral-950 px-5 py-3 text-xs font-bold text-white">Zoekopdracht wissen</button> : <Link href="/contact" className="mt-6 flex items-center gap-2 rounded bg-neutral-950 px-5 py-3 text-xs font-bold text-white">Contact opnemen<ArrowRight className="h-4 w-4" /></Link>}
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4 border-t border-neutral-200 pt-5">
              <nav aria-label="Paginering" className="flex gap-1.5">
                <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1} aria-label="Vorige pagina" className="group flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white disabled:opacity-30"><ChevronLeft className="chevron-motion h-4 w-4 group-hover:-translate-x-0.5" /></button>
                <span aria-current="page" aria-label={`Pagina ${currentPage} van ${pageCount}`} className="flex h-8 min-w-8 items-center justify-center rounded bg-neutral-950 px-2 text-xs font-bold text-white">{currentPage}</span>
                <button onClick={() => setPage(currentPage + 1)} disabled={currentPage === pageCount} aria-label="Volgende pagina" className="group flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white disabled:opacity-30"><ChevronRight className="chevron-motion h-4 w-4 group-hover:translate-x-0.5" /></button>
              </nav>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
