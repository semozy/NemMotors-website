"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CarFront, ChevronLeft, ChevronRight, Search, ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import CarCard from "./CarCard";
import { filterCars } from "@/lib/cars";
import { InventoryFilters } from "./CarFilter";

const initialFilters = { brand: "", model: "", price: "", yearFrom: "", yearTo: "", kmFrom: "", kmTo: "", fuel: [], transmission: [] };
const pageSize = 6;

export default function CarList({ cars = [], catalog = false }) {
  const [filters, setFilters] = useState(initialFilters);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("relevant");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const priceLimit = Math.max(50000, Math.ceil(Math.max(0, ...cars.map((car) => car.price || 0)) / 10000) * 10000);

  function updateFilter(name, value) {
    setFilters((previous) => ({ ...previous, [name]: value, ...(name === "brand" ? { model: "" } : {}) }));
    setPage(1);
  }
  function reset() {
    setFilters(initialFilters);
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
    <div className="min-h-screen bg-[#f5f5f3] text-neutral-950">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#111211] text-white">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(120deg,transparent,rgba(255,194,14,0.07))]" />
        <div className="relative mx-auto grid max-w-[1440px] gap-7 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-12 lg:py-12">
          <div>
            <div className="mb-4 flex items-center gap-2 text-[10px] font-semibold text-neutral-500"><Link href="/" className="hover:text-white">Home</Link><ChevronRight className="h-3 w-3" aria-hidden="true" /><span className="text-neutral-300">Aanbod</span></div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffc20e]">Zorgvuldig geselecteerd</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl xl:text-[44px]">Vind uw volgende wagen<span className="text-[#ffc20e]">.</span></h1>
            <p className="mt-3 text-sm text-neutral-400">Sterke wagens. Eerlijke prijzen. Persoonlijke service.</p>
          </div>
          <div>
            <form onSubmit={(event) => { event.preventDefault(); setQuery(search.trim()); setPage(1); }} className="flex rounded-md border border-white/15 bg-white p-1.5 shadow-lg">
              <label className="flex min-w-0 flex-1 items-center gap-3 pl-3"><Search className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" /><span className="sr-only">Zoek op merk, model of trefwoord</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Zoek op merk, model of trefwoord..." className="h-10 w-full min-w-0 bg-transparent text-xs text-neutral-900 outline-none placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-yellow-500" /></label>
              <button className="ml-2 rounded-sm bg-[#ffc20e] px-4 text-xs font-bold text-neutral-950 transition hover:bg-yellow-300 sm:px-7">Zoeken</button>
            </form>
            <p className="mt-3 flex items-center gap-2 text-[11px] text-neutral-400"><ShieldCheck className="h-3.5 w-3.5 text-[#ffc20e]" aria-hidden="true" />Met vertrouwen op weg bij NEM Motors</p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1440px] gap-6 px-5 py-7 sm:px-8 lg:grid-cols-[230px_minmax(0,1fr)] lg:px-12 lg:py-9">
        <aside aria-label="Aanbodfilters">
          <button type="button" onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen} aria-controls="inventory-filters" className="mb-3 flex w-full items-center justify-between rounded-md border border-neutral-200 bg-white p-4 text-sm font-bold lg:hidden"><span className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" />Filters {activeCount > 0 && `(${activeCount})`}</span>{filtersOpen ? <X className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</button>
          <div id="inventory-filters" className={`${filtersOpen ? "block" : "hidden"} lg:block`}><InventoryFilters cars={cars} filters={filters} onChange={updateFilter} onReset={reset} priceLimit={priceLimit} /></div>
        </aside>
        <section aria-label="Beschikbare wagens" className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <p role="status" className="text-sm font-bold">{results.length} {results.length === 1 ? "wagen gevonden" : "wagens gevonden"}{query && <span className="ml-1 font-normal text-neutral-500">voor ?{query}?</span>}</p>
            <label className="flex items-center gap-3 text-[11px] text-neutral-500">Sorteren op<select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }} className="h-10 rounded border border-neutral-200 bg-white pl-3 pr-7 text-xs text-neutral-700 focus:border-yellow-500 focus:outline-none"><option value="relevant">Meest relevant</option><option value="price-low">Prijs: laag naar hoog</option><option value="price-high">Prijs: hoog naar laag</option><option value="year">Bouwjaar: nieuwste eerst</option><option value="mileage">Laagste kilometerstand</option></select></label>
          </div>
          {visible.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{visible.map((car) => <CarCard key={car.id} car={car} />)}</div> : <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-white px-6 py-12 text-center"><CarFront className="mb-5 h-12 w-12 stroke-1 text-neutral-400" aria-hidden="true" /><h2 className="text-xl font-bold">{cars.length ? "Geen wagens gevonden" : "Ons aanbod wordt aangevuld"}</h2><p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">{cars.length ? "Pas uw zoekopdracht of filters aan om meer wagens te bekijken." : "Neem gerust contact op. We helpen u graag bij het vinden van uw volgende wagen."}</p>{cars.length ? <button onClick={reset} className="mt-6 rounded bg-[#ffc20e] px-5 py-3 text-xs font-bold">Zoekopdracht wissen</button> : <Link href="/contact" className="mt-6 flex items-center gap-2 rounded bg-[#ffc20e] px-5 py-3 text-xs font-bold">Contact opnemen<ArrowRight className="h-4 w-4" /></Link>}</div>}
          {results.length > 0 && <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-5"><p className="text-[11px] text-neutral-500">Resultaten {(currentPage - 1) * pageSize + 1} ? {Math.min(currentPage * pageSize, results.length)} van {results.length}</p><nav aria-label="Paginering" className="flex gap-1.5"><button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1} aria-label="Vorige pagina" className="flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white disabled:opacity-30"><ChevronLeft className="h-4 w-4" /></button><span aria-current="page" aria-label={`Pagina ${currentPage} van ${pageCount}`} className="flex h-8 min-w-8 items-center justify-center rounded bg-neutral-950 px-2 text-xs font-bold text-[#ffc20e]">{currentPage}</span><button onClick={() => setPage(currentPage + 1)} disabled={currentPage === pageCount} aria-label="Volgende pagina" className="flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white disabled:opacity-30"><ChevronRight className="h-4 w-4" /></button></nav></div>}
        </section>
      </div>
    </div>
  );
}
