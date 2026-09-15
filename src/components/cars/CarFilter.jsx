"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, ChevronDown, Euro, Search } from "lucide-react";
import Container from "@/components/ui/Container";
import { getCars } from "@/lib/cars";

export default function CarFilter() {
    const router = useRouter();
    const cars = getCars();
    const brands = [...new Set(cars.map((car) => car.brand).filter(Boolean))].sort();
    const [filters, setFilters] = useState({ brand: "", model: "", price: "", body: "" });
    const models = [...new Set(cars.filter((car) => !filters.brand || car.brand === filters.brand).map((car) => car.model).filter(Boolean))].sort();
    const bodies = [...new Set(cars.map((car) => car.body || car.vehicleType).filter(Boolean))].sort();
    const priceChoices = [10000, 15000, 20000, 25000, 30000, 35000, 40000];
    const [priceOpen, setPriceOpen] = useState(false);
    const [openField, setOpenField] = useState("");

    function updateFilter(name, value) {
      setFilters((previous) => ({ ...previous, [name]: value, ...(name === "brand" ? { model: "" } : {}) }));
    }

    function submit(event) {
      event.preventDefault();
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([name, value]) => {
        if (value) params.set(name, value);
      });
      router.push(`/aanbod${params.toString() ? `?${params.toString()}` : ""}`);
    }

    const selectClass = "h-12 w-full appearance-none rounded-sm border border-white/15 bg-neutral-950 pl-12 pr-10 text-xs font-semibold text-white outline-none transition focus:border-white focus:ring-2 focus:ring-white/20";
    const field = (name, label, options, placeholder, Icon, disabled = false) => (
      <label key={name} className="relative block">
        <span className="sr-only">{label}</span>
        <Icon aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        <button type="button" disabled={disabled} onClick={() => setOpenField(openField === name ? "" : name)} aria-haspopup="listbox" aria-expanded={openField === name} className={`${selectClass} flex items-center justify-between text-left ${disabled ? "cursor-not-allowed opacity-50" : ""}`}>
          <span className={filters[name] ? "text-white" : "text-neutral-500"}>{filters[name] || placeholder}</span>
          <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-neutral-500 transition ${openField === name ? "rotate-180" : ""}`} />
        </button>
        <div className={`absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-sm border border-neutral-700 bg-neutral-950 shadow-xl transition-all duration-200 ${openField === name ? "max-h-64 translate-y-0 opacity-100" : "pointer-events-none max-h-0 -translate-y-1 opacity-0"}`} role="listbox" aria-label={label}>
          <button type="button" onClick={() => { updateFilter(name, ""); setOpenField(""); }} className="block w-full px-4 py-2 text-left text-xs font-semibold text-neutral-400 hover:bg-neutral-800 hover:text-white">{placeholder}</button>
          {options.map((value) => <button type="button" key={value} onClick={() => { updateFilter(name, value); setOpenField(""); }} className="block w-full px-4 py-2 text-left text-xs font-semibold text-white hover:bg-neutral-800">{value}</button>)}
        </div>
      </label>
    );

    return (<Container className="relative top-8 z-20 -mt-20 py-0">
      <div className="relative z-20 rounded-sm border border-white bg-black/90 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur md:p-4">
        <h2 className="sr-only">Vind de auto die bij je past</h2>
        <form onSubmit={submit} className="grid gap-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          {field("brand", "Merk", brands, "Alle merken", Car)}
          {field("model", "Model", models, filters.brand ? "Alle modellen" : "Kies eerst een merk", Car, !filters.brand)}
          <label className="relative block">
            <span className="sr-only">Maximale prijs</span>
            <Euro aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input type="text" inputMode="numeric" value={filters.price} onChange={(event) => updateFilter("price", event.target.value.replace(/[^0-9+]/g, ""))} placeholder="Maximale prijs" className={`${selectClass} placeholder:text-neutral-500`} />
            <button type="button" onClick={() => setPriceOpen(!priceOpen)} aria-label="Kies maximale prijs" aria-expanded={priceOpen} className="absolute right-0 top-0 flex h-12 w-11 items-center justify-center text-neutral-500">
              <ChevronDown aria-hidden="true" className={`h-4 w-4 transition ${priceOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-sm border border-neutral-700 bg-neutral-950 py-1 shadow-xl transition-all duration-200 ${priceOpen ? "max-h-64 translate-y-0 opacity-100" : "pointer-events-none max-h-0 -translate-y-1 opacity-0"}`}>
              {priceChoices.map((price) => {
                const value = price === 40000 ? "40000+" : String(price);
                const label = price === 40000 ? "€ 40.000+" : `€ ${price.toLocaleString("nl-BE")}`;
                return <button type="button" key={price} onClick={() => { updateFilter("price", value); setPriceOpen(false); }} className="block w-full px-4 py-2 text-left text-xs font-semibold text-white hover:bg-neutral-800">{label}</button>;
              })}
            </div>
          </label>
          {field("body", "Carrosserietype", bodies, "Alle types", Car)}
          <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-white px-7 text-xs font-black text-neutral-950 transition hover:bg-neutral-200">
            <Search aria-hidden="true" className="h-4 w-4"/> Zoeken
          </button>
        </form>
      </div>
    </Container>);
}


export function InventoryFilters({ cars, filters, onChange, onReset, priceLimit }) {
  const brands = [...new Set(cars.map((car) => car.brand))].sort();
  const models = [...new Set(cars.filter((car) => !filters.brand || car.brand === filters.brand).map((car) => car.model))].sort();
  const bodies = [...new Set(cars.map((car) => car.body || car.vehicleType).filter(Boolean))].sort();
  const years = Array.from({ length: 28 }, (_, index) => 2027 - index);
  const [openField, setOpenField] = useState("");
  const selectClass = "mt-2 h-10 w-full rounded border border-neutral-200 bg-white px-2 text-xs font-normal text-neutral-600 outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/20";
  const field = (name, label, options, placeholder, typeable = false, formatValue = (value) => value) => (
    <label className="relative block text-xs font-bold text-neutral-800">{label}
      {typeable ? <input type="text" inputMode="numeric" value={filters[name]} onChange={(event) => onChange(name, event.target.value.replace(/[^0-9]/g, ""))} placeholder={placeholder} className={`${selectClass} mt-2 pr-10 placeholder:text-neutral-400`} /> : <button type="button" onClick={() => setOpenField(openField === name ? "" : name)} aria-haspopup="listbox" aria-expanded={openField === name} className={`${selectClass} mt-2 flex h-10 items-center justify-between text-left`}>
        <span className={filters[name] !== "" ? "text-neutral-600" : "text-neutral-400"}>{filters[name] !== "" ? formatValue(filters[name]) : placeholder}</span>
      </button>}
      <button type="button" onClick={() => setOpenField(openField === name ? "" : name)} aria-label={`Kies ${label.toLowerCase()}`} aria-expanded={openField === name} className="absolute right-0 top-5 flex h-10 w-10 items-center justify-center text-neutral-500">
        <ChevronDown aria-hidden="true" className={`h-4 w-4 transition ${openField === name ? "rotate-180" : ""}`} />
      </button>
      <div className={`absolute left-0 right-0 top-full z-30 mt-1 max-h-56 overflow-y-auto rounded border border-neutral-200 bg-white shadow-lg transition-all duration-200 ${openField === name ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`} role="listbox" aria-label={label}>
        <button type="button" onClick={() => { onChange(name, ""); setOpenField(""); }} className="block w-full px-3 py-2 text-left text-xs font-normal text-neutral-400 hover:bg-neutral-100 hover:text-neutral-950">{placeholder}</button>
        {options.map((value) => <button type="button" key={value} onClick={() => { onChange(name, String(value)); setOpenField(""); }} className="block w-full px-3 py-2 text-left text-xs font-normal text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950">{formatValue(value)}</button>)}
      </div>
    </label>
  );
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-2"><h2 className="text-sm font-black text-neutral-950">Filters</h2><button type="button" onClick={onReset} className="text-[11px] font-semibold text-neutral-500 underline-offset-4 hover:text-neutral-950 hover:underline">Filters wissen</button></div>
      <div className="space-y-5">
        {field("brand", "Merk", brands, "Alle merken")}
        {field("model", "Model", models, "Alle modellen")}
        {field("body", "Carrosserietype", bodies, "Alle types")}
        <label className="block text-xs font-bold text-neutral-800">Maximale prijs
          <input type="range" min="0" max={priceLimit} step="500" value={filters.price || priceLimit} onChange={(event) => onChange("price", event.target.value)} className="mt-4 block w-full accent-neutral-950" />
          <span className="mt-2 flex justify-between text-[10px] font-normal text-neutral-500"><span>€ 0</span><span>€ {Number(filters.price || priceLimit).toLocaleString("nl-BE")}</span></span>
        </label>
        <fieldset><legend className="text-xs font-bold text-neutral-800">Bouwjaar</legend><div className="mt-2 grid grid-cols-2 gap-2">
          {field("yearFrom", "Van", years, "Alle jaren", true)}
          {field("yearTo", "Tot", years, "Alle jaren", true)}
        </div></fieldset>
        <fieldset><legend className="text-xs font-bold text-neutral-800">Kilometerstand</legend><div className="mt-2 grid grid-cols-2 gap-2">
          {field("kmFrom", "Van", [0, 10000, 25000, 50000, 75000, 100000, 150000, 200000], "Alle km", true, (value) => `${Number(value).toLocaleString("nl-BE")} km`)}
          {field("kmTo", "Tot", [10000, 25000, 50000, 75000, 100000, 150000, 200000, 300000], "Alle km", true, (value) => `${Number(value).toLocaleString("nl-BE")} km`)}
        </div></fieldset>
        {[["fuel", "Brandstof", ["Benzine", "Diesel", "Hybride", "Elektrisch"]], ["transmission", "Transmissie", [...new Set(cars.map((car) => car.transmission).filter(Boolean))]]].map(([name, label, values]) => (
          <fieldset key={name}><legend className="mb-3 text-xs font-bold text-neutral-800">{label}</legend><div className="space-y-2.5">
            {values.map((value) => <label key={value} className="flex items-center gap-2 text-xs text-neutral-600"><input type="checkbox" checked={filters[name].includes(value)} onChange={() => onChange(name, filters[name].includes(value) ? filters[name].filter((item) => item !== value) : [...filters[name], value])} className="h-3.5 w-3.5 accent-neutral-950" />{value}<span className="ml-auto text-[10px] text-neutral-400">{cars.filter((car) => car[name] === value).length}</span></label>)}
          </div></fieldset>
        ))}
      </div>
    </div>
  );
}
