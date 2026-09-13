"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Car, ChevronDown, Euro, Search } from "lucide-react";
import Sectie from "@/components/Sectie";
import { vehicles } from "@/lib/autos";
import { vehicleTypes } from "@/lib/auto-categorieen";

const priceOptions = [
  { label: "€ 10.000", value: "10000" },
  { label: "€ 25.000", value: "25000" },
  { label: "€ 50.000", value: "50000" },
  { label: "€ 100.000", value: "100000" },
  { label: "€ 150.000", value: "150000" },
  { label: "€ 200.000", value: "200000" },
  { label: "€ 300.000", value: "300000" },
  { label: "€ 400.000", value: "400000" },
  { label: "€ 500.000", value: "500000" },
];

function FilterComboInput({
  icon,
  label,
  placeholder,
  value,
  onChange,
  options,
  inputMode = "text",
  disabled = false,
}: {
  icon: ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  inputMode?: "text" | "numeric";
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLLabelElement>(null);

  const filteredOptions = useMemo(() => {
    const query = value.toLowerCase().replace(/\D/g, "");
    const textQuery = value.toLowerCase();
    const hasNumberQuery = query.length > 0;

    return options.filter((option) => {
      const optionDigits = option.value.toLowerCase().replace(/\D/g, "");
      return option.label.toLowerCase().includes(textQuery) || (hasNumberQuery && optionDigits.includes(query));
    });
  }, [options, value]);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  function selectOption(nextValue: string) {
    onChange(nextValue);
    setOpen(false);
  }

  return (
    <label ref={wrapperRef} className="relative block">
      <span className="sr-only">{label}</span>
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">{icon}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => !disabled && setOpen(true)}
        onClick={() => !disabled && setOpen(true)}
        inputMode={inputMode}
        placeholder={placeholder}
        disabled={disabled}
        className="h-12 w-full rounded-sm border border-white/15 bg-neutral-950 pl-12 pr-10 text-xs font-semibold text-white outline-none transition placeholder:text-neutral-400 focus:border-[#ffc20e] focus:ring-1 focus:ring-[#ffc20e] disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:text-neutral-500 disabled:placeholder:text-neutral-500"
      />
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
      {open && !disabled && filteredOptions.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+2px)] z-30 overflow-hidden rounded-b-sm border border-white/15 bg-neutral-950 py-2 shadow-2xl shadow-black/40">
          {filteredOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectOption(option.label)}
              className="block w-full px-12 py-2.5 text-left text-sm font-semibold text-neutral-200 transition hover:bg-white/10 focus:bg-white/10 focus:outline-none"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </label>
  );
}

function normaliseVehicleType(value: string) {
  const search = value.trim().toLowerCase();
  if (!search) return "";

  const exactMatch = vehicleTypes.find((type) => type.slug === search || type.label.toLowerCase() === search);
  if (exactMatch) return exactMatch.slug;

  return vehicleTypes.find((type) => type.slug.includes(search) || type.label.toLowerCase().includes(search))?.slug ?? "";
}

export default function SnelZoeken() {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [type, setType] = useState("");

  const brands = useMemo(
    () => Array.from(new Set(vehicles.map((vehicle) => vehicle.brand))).sort(),
    []
  );

  const models = useMemo(() => {
    const source = brand
      ? vehicles.filter((vehicle) => vehicle.brand.toLowerCase().includes(brand.toLowerCase()))
      : [];
    return Array.from(new Set(source.map((vehicle) => vehicle.model))).sort();
  }, [brand]);

  function searchVehicles() {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (brand && model) params.set("model", model);
    if (maxPrice) params.set("price", maxPrice.replace(/\D/g, ""));
    const typeSlug = normaliseVehicleType(type);
    if (typeSlug) params.set("type", typeSlug);
    const query = params.toString();
    router.push(query ? `/voorraad?${query}` : "/voorraad");
  }

  function updateBrand(value: string) {
    setBrand(value);
    setModel("");
  }

  return (
    <Sectie className="-mt-14 py-0">
      <div className="relative z-20 rounded-sm border border-[#ffc20e] bg-black/90 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur md:p-4">
        <h2 className="sr-only">Vind de auto die bij je past</h2>
        <div className="grid gap-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          <FilterComboInput
            icon={<Car className="h-4 w-4" />}
            label="Zoek merk"
            placeholder="Zoek merk"
            value={brand}
            onChange={updateBrand}
            options={brands.map((item) => ({ label: item, value: item }))}
          />
          <FilterComboInput
            icon={<Car className="h-4 w-4" />}
            label="Zoek model"
            placeholder={brand ? "Zoek model" : "Kies eerst merk"}
            value={model}
            onChange={setModel}
            options={models.map((item) => ({ label: item, value: item }))}
            disabled={!brand.trim()}
          />
          <FilterComboInput
            icon={<Euro className="h-4 w-4" />}
            label="Prijs tot"
            placeholder="Prijs tot"
            value={maxPrice}
            onChange={setMaxPrice}
            options={priceOptions}
            inputMode="numeric"
          />
          <FilterComboInput
            icon={<Car className="h-4 w-4" />}
            label="Type"
            placeholder="Type"
            value={type}
            onChange={setType}
            options={vehicleTypes.map((item) => ({ label: item.label, value: item.slug }))}
          />
          <button
            onClick={searchVehicles}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-[#ffc20e] px-7 text-xs font-black text-neutral-950 transition hover:bg-yellow-300"
          >
            <Search className="h-4 w-4" /> Zoeken ({vehicles.length})
          </button>
        </div>
      </div>
    </Sectie>
  );
}
