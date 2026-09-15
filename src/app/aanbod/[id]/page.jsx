import { notFound } from "next/navigation";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronDown, GitCompareArrows, Heart, Mail, MapPin } from "lucide-react";
import CarGallery from "@/components/cars/CarGallery";
import CarCard from "@/components/cars/CarCard";
import { siteGegevens } from "@/components/layout/Footer";
import { getCars, getCarById } from "@/lib/cars";
import { formatPrice } from "@/lib/utils";

function BrandLogo({ brand }) {
  if (brand === "Mercedes-Benz") {
    return <svg viewBox="0 0 64 64" role="img" aria-label="Mercedes-Benz" className="h-9 w-9"><circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M32 5 35 30 56 46 32 37 8 46 29 30Z" fill="currentColor" /></svg>;
  }
  if (brand === "BMW") {
    return <svg viewBox="0 0 64 64" role="img" aria-label="BMW" className="h-9 w-9"><circle cx="32" cy="32" r="29" fill="#171717" stroke="#a3a3a3" strokeWidth="1" /><circle cx="32" cy="35" r="19" fill="white" /><path d="M32 16A19 19 0 0 1 51 35H32ZM32 35V54A19 19 0 0 1 13 35Z" fill="#2583c5" /><circle cx="32" cy="35" r="19" fill="none" stroke="#d4d4d4" /><text x="32" y="13" textAnchor="middle" fontSize="9" fontWeight="bold" letterSpacing="3" fill="white">BMW</text></svg>;
  }
  return <span className="text-xl font-black uppercase tracking-wider">{brand}</span>;
}

export async function generateMetadata({ params }) {
  const car = getCarById((await params).id);
  return { title: car ? `${car.brand} ${car.model}` : "Wagen niet gevonden" };
}

export default async function AutoPage({ params }) {
  const car = getCarById((await params).id);
  if (!car) notFound();
  const name = `${car.brand} ${car.model}`;
  const publicRoot = path.resolve("public");
  const images = (car.images || (car.image ? [car.image] : [])).filter((src) => {
    if (!src.startsWith("/images/cars/")) return false;
    const file = path.resolve(publicRoot, `.${src}`);
    return file.startsWith(publicRoot + path.sep) && existsSync(file);
  });
  const similar = getCars().filter((other) => other.id !== car.id && other.status !== "verkocht")
    .sort((a, b) => Number(b.brand === car.brand) - Number(a.brand === car.brand) || Math.abs((a.price || 0) - (car.price || 0)) - Math.abs((b.price || 0) - (car.price || 0))).slice(0, 4);
  const specs = [
    ["Kilometerstand", car.mileage != null ? `${car.mileage.toLocaleString("nl-BE")} km` : null],
    ["Eerste inschrijving", car.firstRegistration],
    ["Brandstof", car.fuel],
    ["Vermogen", car.power ? `${car.power} pk` : null],
    ["Transmissie", car.transmission],
    ["Bouwjaar", car.year],
    ["Accucapaciteit", car.batteryCapacity ? `${car.batteryCapacity} kWh` : null],
    ["Actieradius", car.range ? `${car.range} km` : null],
  ].filter(([, value]) => value != null && value !== "");
  const hasValue = (value) => value !== undefined && value !== null && value !== "";
  const withUnit = (value, unit) => hasValue(value) ? `${Number(value).toLocaleString("nl-BE")} ${unit}` : null;
  const yesNo = (value) => typeof value === "boolean" ? (value ? "Ja" : "Nee") : value;
  const power = [withUnit(car.powerKw, "kW"), withUnit(car.power, "pk")].filter(Boolean).join(" / ");
  const sections = [
    ["Basisgegevens", [
      ["Carrosserietype", car.body], ["Voertuigtype", car.vehicleType],
      ["Aandrijving", car.drivetrain], ["Aantal stoelen", car.seats],
      ["Deuren", car.doors], ["Landversie", car.countryVersion],
      ["Garantie", withUnit(car.warrantyMonths, "maanden")],
    ]],
    ["Voertuiggeschiedenis", [
      ["Kilometerstand", withUnit(car.mileage, "km")], ["Bouwjaar", car.year],
      ["Eerste inschrijving", car.firstRegistration], ["Laatste onderhoudsbeurt", car.lastService],
      ["Vorige eigenaren", car.previousOwners], ["Onderhoudhistoriek", yesNo(car.serviceHistory)],
      ["Niet-rokersauto", yesNo(car.nonSmoker)],
    ]],
    ["Technische gegevens", [
      ["Vermogen", power], ["Transmissie", car.transmission],
      ["Cilinderinhoud", withUnit(car.engineCapacity, "cm?")], ["Cilinders", car.cylinders],
    ]],
    ["Energieverbruik", [
      ["Emissieklasse", car.emissionClass], ["Brandstof", car.fuel],
      ["CO?-emissie", withUnit(car.co2Emission, "g/km")],
      ["Brandstofverbruik", withUnit(car.fuelConsumption, "l/100 km")],
      ["Elektriciteitsverbruik", withUnit(car.electricConsumption, "kWh/100 km")],
      ["Accucapaciteit", withUnit(car.batteryCapacity, "kWh")],
      ["Actieradius", withUnit(car.range, "km")], ["Energielabel", car.energyLabel],
    ]],
    ["Kleur en bekleding", [
      ["Koetswerkkleur", car.color], ["Soort lak", car.paintType],
      ["Kleur interieur", car.interiorColor], ["Interieur", car.upholstery],
    ]],
  ].map(([title, rows]) => [title, rows.filter(([, value]) => hasValue(value))])
    .filter(([, rows]) => rows.length > 0);


  return (
    <div className="bg-white text-neutral-950">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-5 sm:px-8 lg:pt-7">
        <Link href="/aanbod" className="mb-5 inline-flex min-h-9 items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-950"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Terug naar aanbod</Link>
        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1.8fr)_minmax(300px,1fr)] lg:gap-9">
          <CarGallery images={images} name={name} />
          <section aria-label="Voertuig en prijs" className="py-1">
            <div className="mb-4 flex items-center justify-between gap-3">
              <BrandLogo brand={car.brand} />
              <div className="flex items-center gap-2">
                <label className="cursor-pointer"><input type="checkbox" className="peer sr-only" aria-label={`${name} selecteren voor vergelijking`} /><span className="flex min-h-9 items-center gap-1.5 rounded border border-neutral-200 px-2.5 text-[10px] font-semibold text-neutral-500 peer-checked:border-neutral-950 peer-checked:bg-neutral-100 peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-950"><GitCompareArrows className="h-3.5 w-3.5" aria-hidden="true" />Vergelijk</span></label>
                <label className="cursor-pointer"><input type="checkbox" className="peer sr-only" aria-label={`${name} markeren als favoriet`} /><span className="flex h-9 w-9 items-center justify-center rounded border border-neutral-200 text-neutral-500 peer-checked:border-neutral-950 peer-checked:bg-neutral-100 peer-checked:text-neutral-950 peer-checked:[&>svg]:fill-current peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-950"><Heart className="h-4 w-4" aria-hidden="true" /></span></label>
              </div>
            </div>
            <p className="text-xs text-neutral-500">{car.brand}</p>
            <h1 className="mt-1 text-3xl font-black leading-tight tracking-tight">{car.title || name}</h1>
            <p className="mt-2 text-sm text-neutral-600">{car.trim || car.model}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">{[car.fuel, car.transmission, car.year, car.batteryCapacity ? `${car.batteryCapacity} kWh` : null].filter(Boolean).map((value) => <span key={value} className="rounded-sm bg-neutral-100 px-2 py-1.5 text-[10px] font-medium text-neutral-600">{value}</span>)}</div>
            <p className="mt-6 text-4xl font-black tracking-tight">{car.price > 0 ? formatPrice(car.price) : "Prijs op aanvraag"}</p>
            {car.vatLabel && <p className="mt-1 text-[11px] text-neutral-500">{car.vatLabel}</p>}
            <div className="my-6 flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4" aria-hidden="true" /><div><p className="text-xs font-semibold">{siteGegevens.address}</p><p className="mt-1 text-[11px] text-neutral-500">NEM Motors</p></div></div>
            <div className="grid gap-2.5">
              <button type="button" disabled className="flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded bg-neutral-950 px-4 text-xs font-bold text-white"><CalendarDays className="h-4 w-4" aria-hidden="true" />Maak een proefrit</button>
              <button type="button" disabled className="flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded border border-neutral-300 bg-white px-4 text-xs font-bold text-neutral-950"><Mail className="h-4 w-4" aria-hidden="true" />Ik heb interesse</button>
            </div>
          </section>
        </div>

        <section aria-labelledby="car-specifications" className="mt-10 border-t border-neutral-200 pt-7 sm:mt-12">
          <h2 id="car-specifications" className="mb-5 text-2xl font-black tracking-tight">Autogegevens</h2>
          <dl className="grid gap-x-12 md:grid-cols-2">{specs.map(([label, value]) => <div key={label} className="border-b border-neutral-200 py-4"><dt className="text-[11px] text-neutral-500">{label}</dt><dd className="mt-1.5 text-sm font-medium">{value}</dd></div>)}</dl>
          {(sections.length > 0 || car.description || car.options?.length > 0) && (
            <details className="group mt-5">
              <summary className="inline-flex min-h-10 cursor-pointer list-none items-center gap-3 rounded border border-neutral-300 px-4 text-xs font-semibold hover:border-neutral-950 focus-visible:outline-neutral-950 [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">Toon meer</span>
                <span className="hidden group-open:inline">Toon minder</span>
                <ChevronDown className="h-3.5 w-3.5 transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="mt-7 space-y-8">
                {sections.map(([title, rows]) => (
                  <section key={title} aria-label={title}>
                    <h3 className="border-l-4 border-neutral-950 pl-3 text-lg font-bold">{title}</h3>
                    <dl className="mt-3 grid gap-x-12 md:grid-cols-2">
                      {rows.map(([label, value]) => (
                        <div key={label} className="flex items-start justify-between gap-5 border-b border-neutral-100 py-3.5">
                          <dt className="text-xs leading-6 text-neutral-500">{label}</dt>
                          <dd className="text-right text-sm font-semibold leading-6 text-neutral-900">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                ))}
                {car.options?.length > 0 && (
                  <section aria-label="Uitrusting">
                    <h3 className="border-l-4 border-neutral-950 pl-3 text-lg font-bold">Uitrusting</h3>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {car.options.map((option, index) => <li key={`${option}-${index}`} className="flex items-start gap-3 rounded bg-neutral-50 px-4 py-3 text-sm text-neutral-700"><span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-950" />{option}</li>)}
                    </ul>
                  </section>
                )}
                {car.description && (
                  <section aria-label="Beschrijving">
                    <h3 className="border-l-4 border-neutral-950 pl-3 text-lg font-bold">Beschrijving</h3>
                    <p className="mt-4 whitespace-pre-line break-words rounded-lg bg-neutral-50 p-5 text-sm leading-7 text-neutral-600 sm:p-6">{car.description}</p>
                  </section>
                )}
              </div>
            </details>
          )}
        </section>
      </div>
      <section aria-labelledby="similar-cars" className="border-t border-neutral-100 bg-[#f5f5f3] py-9 sm:py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h2 id="similar-cars" className="text-2xl font-black tracking-tight">Vergelijkbare voertuigen</h2><Link href="/aanbod" className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950">Bekijk alle wagens<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link></div>
          {similar.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{similar.map((other) => <CarCard key={other.id} car={other} />)}</div> : <p className="text-sm text-neutral-500">Er zijn momenteel geen andere wagens beschikbaar.</p>}
        </div>
      </section>
    </div>
  );
}
