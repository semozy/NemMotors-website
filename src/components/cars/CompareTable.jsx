"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Check, Trash2, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";

function displayValue(value) {
  if (value === true) return <Check className="mx-auto h-4 w-4 text-green-600" strokeWidth={2.5} aria-label="Ja" />;
  if (value === false) return <X className="mx-auto h-4 w-4 text-red-500" strokeWidth={2.5} aria-label="Nee" />;
  if (value == null || value === "") return <span className="text-neutral-400">—</span>;
  return value;
}

export default function CompareTable({ initialCars }) {
  const [cars, setCars] = useState(initialCars);
  const [differencesOnly, setDifferencesOnly] = useState(false);

  const groups = useMemo(() => {
    const baseGroups = [
      {
        title: "Belangrijkste gegevens",
        rows: [
          ["Bouwjaar", (car) => car.year],
          ["Kilometerstand", (car) => car.mileage == null ? null : `${Number(car.mileage).toLocaleString("nl-BE")} km`],
          ["Brandstof", (car) => car.fuel],
          ["Transmissie", (car) => car.transmission],
          ["Carrosserie", (car) => car.body],
          ["Vermogen", (car) => [car.powerKw ? `${car.powerKw} kW` : null, car.power ? `${car.power} pk` : null].filter(Boolean).join(" / ") || null],
          ["Accucapaciteit", (car) => car.batteryCapacity ? `${car.batteryCapacity} kWh` : null],
          ["Actieradius", (car) => car.range ? `${car.range} km` : null],
        ],
      },
      {
        title: "Voertuigdetails",
        rows: [
          ["Voertuigtype", (car) => car.vehicleType],
          ["Aandrijving", (car) => car.drivetrain],
          ["Aantal stoelen", (car) => car.seats],
          ["Aantal deuren", (car) => car.doors],
          ["Cilinderinhoud", (car) => car.engineCapacity ? `${car.engineCapacity} cm³` : null],
          ["Cilinders", (car) => car.cylinders],
        ],
      },
      {
        title: "Milieu",
        rows: [
          ["Emissieklasse", (car) => car.emissionClass],
          ["CO₂-uitstoot", (car) => car.co2Emission ? `${car.co2Emission} g/km` : null],
        ],
      },
      {
        title: "Kleur & Interieur",
        rows: [
          ["Kleur", (car) => car.color],
          ["Lakkleur", (car) => car.paintType],
          ["Interieurkleur", (car) => car.interiorColor],
          ["Bekleding", (car) => car.upholstery],
        ],
      },
      {
        title: "Staat",
        rows: [
          ["Onderhoudshistoriek", (car) => car.serviceHistory === true ? "Ja" : (car.serviceHistory === false ? "Nee" : null)],
          ["Niet-rokersauto", (car) => car.nonSmoker === true ? "Ja" : (car.nonSmoker === false ? "Nee" : null)],
        ],
      }
    ];

    const allOptions = Array.from(new Set(cars.flatMap(c => c.options || []))).sort();
    if (allOptions.length > 0) {
      baseGroups.push({
        title: "Uitrusting",
        rows: allOptions.map(opt => [
          opt,
          (car) => car.options?.includes(opt) ? true : false
        ])
      });
    }

    return baseGroups.map((group) => ({
      ...group,
      rows: group.rows.filter(([, read]) => {
        if (!differencesOnly) return true;
        const values = cars.map((car) => String(read(car) ?? ""));
        return new Set(values).size > 1;
      }),
    })).filter((group) => group.rows.length > 0);
  }, [cars, differencesOnly]);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Ensure that if a user visits a shared URL directly, local storage is updated.
  // And if they visit without URL parameters, load from local storage.
  useEffect(() => {
    if (initialCars.length > 0) {
      const ids = initialCars.map(c => String(c.id));
      window.localStorage.setItem("nem-motors-comparison", JSON.stringify(ids));
      window.dispatchEvent(new CustomEvent("nem-comparison-change", { detail: ids }));
    } else {
      if (searchParams.has("autos")) {
        // The URL had autos, but they were all invalid/ghosts. Clean up!
        window.localStorage.removeItem("nem-motors-comparison");
        window.dispatchEvent(new CustomEvent("nem-comparison-change", { detail: [] }));
      } else {
        // No autos in URL, load from local storage
        try {
          const ids = JSON.parse(window.localStorage.getItem("nem-motors-comparison") || "[]");
          if (ids.length > 0) {
            router.replace(`/vergelijken?autos=${ids.join(",")}`);
          }
        } catch {}
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function syncUrl(nextCars) {
    const ids = nextCars.map((car) => car.id).join(",");
    const selectedIds = nextCars.map((car) => String(car.id));
    if (selectedIds.length === 0) {
      window.localStorage.removeItem("nem-motors-comparison");
    } else {
      window.localStorage.setItem("nem-motors-comparison", JSON.stringify(selectedIds));
    }
    window.dispatchEvent(new CustomEvent("nem-comparison-change", { detail: selectedIds }));
    window.history.replaceState(null, "", ids ? `/vergelijken?autos=${ids}` : "/vergelijken");
  }

  function removeCar(id) {
    const nextCars = cars.filter((car) => car.id !== id);
    setCars(nextCars);
    syncUrl(nextCars);
  }

  function clearComparison() {
    setCars([]);
    syncUrl([]);
  }

  const columns = `196px repeat(${Math.max(cars.length, 1)}, minmax(245px, 1fr))`;

  return (
    <>
      <div className="flex flex-wrap items-center justify-end gap-7 text-[11px]">
        <button type="button" onClick={clearComparison} disabled={cars.length === 0} className="inline-flex items-center gap-2 underline underline-offset-4 disabled:opacity-40">
          Vergelijking wissen <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
        <label className="flex cursor-pointer items-center gap-3">
          Alleen verschillen tonen
          <input type="checkbox" checked={differencesOnly} onChange={(event) => setDifferencesOnly(event.target.checked)} className="peer sr-only" />
          <span className="relative h-5 w-9 rounded-full bg-neutral-300 transition peer-checked:bg-neutral-950 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" />
        </label>
      </div>

      {cars.length === 0 ? (
        <div className="mt-5 rounded-lg border border-neutral-200 bg-white px-6 py-16 text-center">
          <h2 className="text-2xl font-black">Geen wagens om te vergelijken</h2>
          <p className="mt-2 text-sm text-neutral-500">Ga terug naar het aanbod en kies een wagen om te vergelijken.</p>
          <Link href="/aanbod" className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-neutral-950 px-6 text-xs font-bold text-white">Bekijk het aanbod <ArrowRight className="h-4 w-4" /></Link>
        </div>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
          <div className="min-w-max" style={{ width: cars.length < 3 ? 196 + cars.length * 320 : "100%" }}>
            <div className="grid" style={{ gridTemplateColumns: columns }}>
              <div className="flex flex-col justify-center border-r border-neutral-200 p-5">
                <p className="text-[27px] font-black leading-[1.02] tracking-[-0.04em]">{cars.length} {cars.length === 1 ? "wagen" : "wagens"}<br />vergelijken</p>
                <p className="mt-4 text-xs leading-5 text-neutral-500">Vergelijk specificaties, uitrusting en meer, en maak de juiste keuze.</p>
              </div>
              {cars.map((car) => (
                <article key={car.id} className="relative border-r border-neutral-200 p-2 last:border-r-0">
                  <button type="button" onClick={() => removeCar(car.id)} aria-label={`${car.brand} ${car.model} verwijderen`} className="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-neutral-950 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                  <div className="relative aspect-[1.9/1] overflow-hidden rounded-md bg-neutral-100">
                    <Image src={car.images?.[0] || car.image} alt={`${car.brand} ${car.model}`} fill sizes="320px" className="object-cover" />
                  </div>
                  <div className="px-2 pb-2 pt-2 text-center">
                    <h2 className="text-base font-black tracking-tight">{car.brand} {car.model}</h2>
                    <p className="mt-0.5 min-h-4 text-xs text-neutral-500">{car.trim || ""}</p>
                    <p className="mt-1 text-xl font-black">{car.price > 0 ? formatPrice(car.price) : "Prijs op aanvraag"}</p>
                    <Link href={`/aanbod/${car.id}`} className="group mt-1 inline-flex items-center gap-3 text-xs font-medium underline underline-offset-4">Bekijk wagen <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" /></Link>
                  </div>
                </article>
              ))}
            </div>

            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="border-y border-neutral-200 bg-neutral-100 px-4 py-2 text-xs font-bold">{group.title}</h2>
                {group.rows.map(([label, read]) => (
                  <div key={label} className="grid border-b border-neutral-200 text-xs last:border-b-0" style={{ gridTemplateColumns: columns }}>
                    <div className="border-r border-neutral-200 px-4 py-2 text-neutral-600">{label}</div>
                    {cars.map((car) => <div key={car.id} className="border-r border-neutral-200 px-4 py-2 text-center last:border-r-0">{displayValue(read(car))}</div>)}
                  </div>
                ))}
              </div>
            ))}

            <div className="px-4 py-4 text-[10px] text-neutral-500">
              — Niet opgegeven
            </div>
          </div>
        </div>
      )}
    </>
  );
}
