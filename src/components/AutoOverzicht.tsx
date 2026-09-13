"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import AutoKaart from "@/components/AutoKaart";
import { vehicles } from "@/lib/autos";
import { vehicleTypes, getVehicleTypeLabel } from "@/lib/auto-categorieen";

export interface VehicleListingFilters {
  brand: string;
  model: string;
  fuel: string;
  type: string;
  maxPrice: string;
  sort: string;
}

const sortOptions = [
  "Recent toegevoegd",
  "Prijs laag naar hoog",
  "Prijs hoog naar laag",
  "Laagste kilometerstand",
  "Bouwjaar nieuwste eerst",
];

const priceOptions = [
  { label: "Geen max.", value: "" },
  { label: "€ 12.500", value: "12500" },
  { label: "€ 17.500", value: "17500" },
  { label: "€ 25.000", value: "25000" },
  { label: "€ 35.000", value: "35000" },
  { label: "€ 50.000", value: "50000" },
];

const yearOptions = [
  { label: "Alle", value: "" },
  { label: "Vanaf 2022", value: "2022" },
  { label: "Vanaf 2021", value: "2021" },
  { label: "Vanaf 2020", value: "2020" },
  { label: "Vanaf 2019", value: "2019" },
  { label: "Vanaf 2018", value: "2018" },
];

const mileageOptions = [
  { label: "Alle", value: "" },
  { label: "Tot 50.000 km", value: "50000" },
  { label: "Tot 75.000 km", value: "75000" },
  { label: "Tot 100.000 km", value: "100000" },
  { label: "Tot 150.000 km", value: "150000" },
];

function normaliseType(value: string) {
  const search = value.trim().toLowerCase();
  if (!search || search === "alle") return "";

  const exactMatch = vehicleTypes.find((type) => type.slug === search || type.label.toLowerCase() === search);
  if (exactMatch) return exactMatch.slug;

  return vehicleTypes.find((type) => type.slug.includes(search) || type.label.toLowerCase().includes(search))?.slug ?? "";
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  const controlId = `filter-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <label htmlFor={controlId} className="grid min-w-0 gap-1 text-[11px] font-black text-neutral-700">{label}<select id={controlId} value={value} onChange={(event) => onChange(event.target.value)} className="h-12 w-full rounded-sm border border-white/15 bg-neutral-950 px-4 text-xs font-semibold text-white outline-none transition hover:border-[#ffc20e]/70 focus:border-[#ffc20e] focus:ring-1 focus:ring-[#ffc20e]">{options.map((option) => <option key={`${label}-${option.value || option.label}`} value={option.value}>{option.label}</option>)}</select></label>
  );
}

export default function AutoOverzicht({ initialFilters }: { initialFilters: VehicleListingFilters }) {
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const [query, setQuery] = useState(`${initialFilters.brand} ${initialFilters.model}`.trim());
  const [fuel, setFuel] = useState(initialFilters.fuel || "Alle");
  const initialType = normaliseType(initialFilters.type);
  const [type, setType] = useState(initialType ? getVehicleTypeLabel(initialType) : "Alle");
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || "");
  const [minYear, setMinYear] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [sort, setSort] = useState(initialFilters.sort === "Nieuwste eerst" ? "Recent toegevoegd" : initialFilters.sort || "Recent toegevoegd");

  const fuels = useMemo(() => Array.from(new Set(vehicles.map((vehicle) => vehicle.fuel))).sort(), []);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    const priceLimit = Number(maxPrice.replace(/\D/g, ""));
    const yearLimit = Number(minYear);
    const mileageLimit = Number(maxMileage);
    const typeSlug = normaliseType(type);

    let list = vehicles.filter((vehicle) => {
      const typeLabels = vehicle.typeSlugs.map(getVehicleTypeLabel).join(" ");
      const haystack = `${vehicle.brand} ${vehicle.model} ${vehicle.trim} ${vehicle.fuel} ${vehicle.body} ${typeLabels}`.toLowerCase();
      const matchesSearch = !search || haystack.includes(search);
      const matchesFuel = fuel === "Alle" || vehicle.fuel === fuel;
      const matchesPrice = !priceLimit || vehicle.price <= priceLimit;
      const matchesYear = !yearLimit || vehicle.year >= yearLimit;
      const matchesMileage = !mileageLimit || vehicle.mileage <= mileageLimit;
      const matchesType = !typeSlug || vehicle.typeSlugs.includes(typeSlug);
      return matchesSearch && matchesFuel && matchesPrice && matchesYear && matchesMileage && matchesType;
    });

    if (sort === "Prijs laag naar hoog") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Prijs hoog naar laag") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Laagste kilometerstand") list = [...list].sort((a, b) => a.mileage - b.mileage);
    if (sort === "Bouwjaar nieuwste eerst") list = [...list].sort((a, b) => b.year - a.year);
    return list;
  }, [fuel, maxMileage, maxPrice, minYear, query, sort, type]);

  function clearFilters() {
    setQuery("");
    setFuel("Alle");
    setType("Alle");
    setMaxPrice("");
    setMinYear("");
    setMaxMileage("");
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-950">
      <section className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="rounded-sm border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[minmax(230px,1.55fr)_minmax(130px,0.75fr)_minmax(140px,0.75fr)_minmax(140px,0.75fr)_minmax(150px,0.8fr)_auto_auto] lg:items-end">
            <label className="grid min-w-0 gap-1 text-[11px] font-black text-neutral-700">
              <span className="sr-only">Zoeken</span>
              <span className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Zoek merk of model"
                  className="h-11 w-full rounded-sm border border-neutral-200 bg-white pl-10 pr-3 text-xs font-bold text-neutral-950 outline-none transition placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950"
                />
              </span>
            </label>

            <SelectField
              label="Brandstof"
              value={fuel}
              onChange={setFuel}
              options={[{ label: "Alle", value: "Alle" }, ...fuels.map((item) => ({ label: item, value: item }))]}
            />
            <SelectField label="Prijs tot" value={maxPrice} onChange={setMaxPrice} options={priceOptions} />
            <SelectField label="Bouwjaar vanaf" value={minYear} onChange={setMinYear} options={yearOptions} />
            <SelectField label="Kilometerstand tot" value={maxMileage} onChange={setMaxMileage} options={mileageOptions} />

            <button
              type="button"
              onClick={() => setMoreFiltersOpen((current) => !current)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-neutral-200 bg-white px-4 text-xs font-black text-neutral-950 transition hover:border-neutral-950"
            >
              Meer filters
              <SlidersHorizontal className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="h-11 rounded-sm px-3 text-xs font-black text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
            >
              Wis filters
            </button>
          </div>

          {moreFiltersOpen && (
            <div className="mt-3 grid max-w-xs gap-1 border-t border-neutral-100 pt-3">
              <SelectField
                label="Type"
                value={type}
                onChange={setType}
                options={[
                  { label: "Alle", value: "Alle" },
                  ...vehicleTypes.map((item) => ({ label: item.label, value: item.label })),
                ]}
              />
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-black text-neutral-600 sm:mr-auto">{filtered.length} wagens gevonden</p>

          <label className="grid grid-cols-[auto_minmax(150px,190px)] items-center gap-3 text-xs font-black text-neutral-700">
            Sorteren op
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-10 rounded-sm border border-neutral-200 bg-white px-3 text-xs font-bold text-neutral-950 outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((vehicle) => (
              <AutoKaart key={vehicle.id} vehicle={vehicle} size="compact" />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-sm border border-neutral-200 bg-white p-8 text-center">
            <h2 className="text-2xl font-black">Geen wagens gevonden</h2>
            <p className="mt-3 text-neutral-600">Pas je filters aan of neem contact op, dan zoeken we graag mee.</p>
          </div>
        )}
      </section>
    </div>
  );
}
