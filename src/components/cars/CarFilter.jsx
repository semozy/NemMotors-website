"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";

const priceOptions = [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000];

function formatPrice(value) {
  return `€ ${Number(value).toLocaleString("nl-BE")}`;
}

function PriceField({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const options = [...priceOptions.map((price) => ({ value: String(price), label: formatPrice(price) })), { value: "50000+", label: "€ 50.000+" }];

  return (
    <div className="relative block text-[11px] font-semibold text-neutral-700">
      Maximumprijs
      <div className="relative mt-2">
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(event) => onChange(event.target.value.replace(/[^0-9]/g, ""))}
          placeholder="Alle prijzen"
          aria-label="Maximumprijs"
          className="h-11 w-full rounded-md border border-neutral-200 bg-white pl-3 pr-10 text-xs text-neutral-600 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
        />
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label="Kies een maximumprijs"
          aria-expanded={open}
          className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-neutral-500 hover:text-neutral-950"
        >
          <ChevronDown className={`chevron-motion h-4 w-4 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        <div className={`absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg transition-all ${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`} role="listbox" aria-label="Maximumprijs kiezen">
          {options.map((option) => (
            <button
              role="option"
              aria-selected={value === option.value}
              type="button"
              key={option.value}
              onClick={() => { onChange(option.value); setOpen(false); }}
              className="block w-full px-3 py-2 text-left text-xs font-normal text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, placeholder, options, disabled = false }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  return (
    <div className="relative block text-[11px] font-semibold text-neutral-700">
      {label}
      <div className="relative mt-2">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex h-11 w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-3 text-left text-xs font-normal text-neutral-600 outline-none transition hover:border-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400"
        >
          <span>{value || placeholder}</span>
          <ChevronDown className={`chevron-motion h-4 w-4 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        <div className={`absolute left-0 right-0 top-full z-30 mt-1 max-h-56 overflow-y-auto rounded-md border border-neutral-200 bg-white shadow-lg transition-all ${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`} role="listbox" aria-label={`${label} kiezen`}>
          <button role="option" aria-selected={value === ""} type="button" onClick={() => { onChange(""); setOpen(false); }} className="block w-full px-3 py-2 text-left text-xs font-normal text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950">{placeholder}</button>
          {options.map((option) => (
            <button role="option" aria-selected={value === option} type="button" key={option} onClick={() => { onChange(option); setOpen(false); }} className="block w-full px-3 py-2 text-left text-xs font-normal text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950">{option}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CarFilter({ cars = [] }) {
  const router = useRouter();
  const [filters, setFilters] = useState({ brand: "", model: "", price: "", body: "" });
  const brands = useMemo(() => [...new Set(cars.map((car) => car.brand).filter(Boolean))].sort(), [cars]);
  const models = useMemo(() => filters.brand ? [...new Set(cars.filter((car) => car.brand === filters.brand).map((car) => car.model).filter(Boolean))].sort() : [], [cars, filters.brand]);
  const bodies = useMemo(() => [...new Set(cars.map((car) => (car.body || car.vehicleType)?.trim()).filter(Boolean))].sort(), [cars]);

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value, ...(name === "brand" ? { model: "" } : {}) }));
  }

  function submit(event) {
    event.preventDefault();
    const params = new URLSearchParams(Object.entries(filters).filter(([, value]) => value));
    router.push(`/aanbod${params.size ? `?${params}` : ""}`);
  }

  const fields = [
    { name: "brand", label: "Merk", placeholder: "Alle merken", options: brands },
    { name: "model", label: "Model", placeholder: filters.brand ? "Alle modellen" : "Kies eerst een merk", options: models, disabled: !filters.brand },
    { name: "body", label: "Carrosserie", placeholder: "Alle carrosserieën", options: bodies },
  ];

  return (
    <div className="relative z-20 mx-auto -mt-[66px] max-w-[1320px] px-5 lg:px-8">
      <form onSubmit={submit} className="grid gap-3 rounded-lg bg-white p-4 text-neutral-950 shadow-[0_16px_40px_rgba(0,0,0,.16)] sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_180px] lg:p-5">
        {fields.map(({ name, label, placeholder, options, disabled = false }) => (
          <SelectField key={name} label={label} value={filters[name]} onChange={(value) => updateFilter(name, value)} placeholder={placeholder} options={options} disabled={disabled} />
        ))}
        <PriceField value={filters.price} onChange={(value) => updateFilter("price", value)} />
        <button type="submit" className="mt-auto inline-flex h-11 items-center justify-center gap-3 rounded-md bg-neutral-950 px-6 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 sm:col-span-2 lg:col-span-1"><Search className="h-4 w-4" /> Zoeken</button>
      </form>
    </div>
  );
}

export function InventoryFilters({ cars, filters, onChange, onReset, priceLimit }) {
  const brands = [...new Set(cars.map((car) => car.brand).filter(Boolean))].sort();
  const models = [...new Set(cars.filter((car) => !filters.brand || car.brand === filters.brand).map((car) => car.model).filter(Boolean))].sort();
  const bodies = [...new Set(cars.map((car) => (car.body || car.vehicleType)?.trim()).filter(Boolean))].sort();
  const transmissions = [...new Set(cars.map((car) => car.transmission).filter(Boolean))].sort();
  const selectClass = "mt-1.5 h-9 w-full rounded border border-neutral-300 bg-white px-2.5 text-[11px] font-normal text-neutral-700 outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950/10";

  const selectField = (name, label, options, placeholder, disabled = false) => (
    <SelectField
      label={label}
      value={filters[name]}
      onChange={(value) => onChange(name, value)}
      placeholder={placeholder}
      options={options}
      disabled={disabled}
    />
  );

  const numberField = (name, label, placeholder) => (
    <label className="block text-[11px] font-bold text-neutral-800">
      {label}
      <input type="text" inputMode="numeric" value={filters[name]} onChange={(event) => onChange(name, event.target.value.replace(/[^0-9]/g, ""))} placeholder={placeholder} className={selectClass} />
    </label>
  );

  const checkboxGroup = (name, label, values) => (
    <fieldset>
      <legend className="mb-2 text-[11px] font-bold text-neutral-800">{label}</legend>
      <div className="space-y-1.5">
        {values.map((value) => {
          const checked = filters[name].includes(value);
          return <label key={value} className="flex items-center gap-2 text-[11px] text-neutral-700"><input type="checkbox" checked={checked} onChange={() => onChange(name, checked ? filters[name].filter((item) => item !== value) : [...filters[name], value])} className="h-3.5 w-3.5 accent-neutral-950" />{value}</label>;
        })}
      </div>
    </fieldset>
  );

  return (
    <div className="rounded-md bg-white p-4 shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
      <div className="mb-4 flex items-center justify-between gap-2"><h2 className="text-sm font-black text-neutral-950">Filters</h2><button type="button" onClick={onReset} className="text-[9px] font-medium text-neutral-500 underline hover:text-neutral-950">Wis alles</button></div>
      <div className="space-y-3.5">
        {selectField("brand", "Merk", brands, "Alle merken")}
        {selectField("model", "Model", models, filters.brand ? "Alle modellen" : "Kies eerst een merk", !filters.brand)}
        {selectField("body", "Carrosserietype", bodies, "Alle types")}
        <label className="block text-[11px] font-bold text-neutral-800">Maximumprijs<input type="range" min="0" max={priceLimit} step="500" value={filters.price || priceLimit} onChange={(event) => onChange("price", event.target.value)} className="mt-3 block w-full accent-neutral-950" /><span className="mt-2 block rounded border border-neutral-300 px-2.5 py-2 text-[10px] font-normal">€ {Number(filters.price || priceLimit).toLocaleString("nl-BE")}</span></label>
        <fieldset><legend className="text-[11px] font-bold text-neutral-800">Bouwjaar</legend><div className="mt-1.5 grid grid-cols-2 gap-2">{numberField("yearFrom", "Van", "Van")}{numberField("yearTo", "Tot", "Tot")}</div></fieldset>
        <fieldset><legend className="text-[11px] font-bold text-neutral-800">Kilometerstand</legend><div className="mt-1.5 grid grid-cols-2 gap-2">{numberField("kmFrom", "Van", "Van")}{numberField("kmTo", "Tot", "Tot")}</div></fieldset>
        {checkboxGroup("fuel", "Brandstof", ["Benzine", "Diesel", "Elektrisch/Benzine", "Elektrisch/Diesel", "Elektrisch", "LPG"])}
        {checkboxGroup("transmission", "Transmissie", transmissions)}
      </div>
    </div>
  );
}
