import { notFound } from "next/navigation";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import {
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  CalendarDays,
  Fuel,
  Gauge,
  GitCompareArrows,
  Heart,
  Mail,
  MapPin,
  Settings2,
} from "lucide-react";
import CarGallery from "@/components/cars/CarGallery";
import CarDetailTabs from "@/components/cars/CarDetailTabs";
import CarCard from "@/components/cars/CarCard";
import { siteGegevens } from "@/components/layout/Footer";
import { getCarById, getCars } from "@/lib/cars";
import { formatPrice } from "@/lib/utils";

const hasValue = (value) => value !== undefined && value !== null && value !== "";
const withUnit = (value, unit) => hasValue(value) ? `${Number(value).toLocaleString("nl-BE")} ${unit}` : null;
const yesNo = (value) => typeof value === "boolean" ? (value ? "Ja" : "Nee") : value;

export async function generateMetadata({ params }) {
  const car = getCarById((await params).id);
  return { title: car ? `${car.brand} ${car.model}` : "Wagen niet gevonden" };
}

export default async function AutoPage({ params }) {
  const car = getCarById((await params).id);
  if (!car) notFound();

  const name = `${car.brand} ${car.model}`;
  const relatedCars = getCars()
    .filter((other) => other.id !== car.id && other.status !== "verkocht")
    .sort((a, b) => {
      const brandDifference = Number(b.brand === car.brand) - Number(a.brand === car.brand);
      if (brandDifference !== 0) return brandDifference;
      return Math.abs((a.price || 0) - (car.price || 0)) - Math.abs((b.price || 0) - (car.price || 0));
    })
    .slice(0, 4);
  const publicRoot = path.resolve("public");
  const images = (car.images || (car.image ? [car.image] : [])).filter((src) => {
    if (!src.startsWith("/images/cars/")) return false;
    const file = path.resolve(publicRoot, `.${src}`);
    return file.startsWith(publicRoot + path.sep) && existsSync(file);
  });

  const power = [withUnit(car.powerKw, "kW"), withUnit(car.power, "pk")].filter(Boolean).join(" / ");
  const overview = [
    ["Eerste inschrijving", car.firstRegistration || car.year],
    ["Kilometerstand", withUnit(car.mileage, "km")],
    ["Vermogen", power],
    ["Brandstof", car.fuel],
    ["Transmissie", car.transmission],
    ["Accucapaciteit", withUnit(car.batteryCapacity, "kWh")],
  ].filter(([, value]) => hasValue(value));

  const specifications = [
    ["Carrosserietype", car.body],
    ["Voertuigtype", car.vehicleType],
    ["Aandrijving", car.drivetrain],
    ["Aantal stoelen", car.seats],
    ["Aantal deuren", car.doors],
    ["Bouwjaar", car.year],
    ["Actieradius", withUnit(car.range, "km")],
    ["Cilinderinhoud", withUnit(car.engineCapacity, "cm³")],
    ["Cilinders", car.cylinders],
    ["Emissieklasse", car.emissionClass],
    ["CO₂-uitstoot", withUnit(car.co2Emission, "g/km")],
    ["Energielabel", car.energyLabel],
    ["Kleur", car.color],
    ["Lakkleur", car.paintType],
    ["Interieurkleur", car.interiorColor],
    ["Bekleding", car.upholstery],
    ["Onderhoudshistoriek", yesNo(car.serviceHistory)],
    ["Niet-rokersauto", yesNo(car.nonSmoker)],
  ].filter(([, value]) => hasValue(value));

  const highlights = [
    [Gauge, "Kilometerstand", withUnit(car.mileage, "km")],
    [CalendarDays, "Bouwjaar", car.year],
    [Fuel, "Brandstof", car.fuel],
    [Settings2, "Transmissie", car.transmission],
  ].filter(([, , value]) => hasValue(value));

  const interestLink = `mailto:${siteGegevens.email}?subject=${encodeURIComponent(`Interesse in ${name}`)}`;
  const testDriveLink = `mailto:${siteGegevens.email}?subject=${encodeURIComponent(`Proefrit aanvragen voor ${name}`)}`;

  return (
    <div className="bg-[#fafaf9] text-neutral-950">
      <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-4 sm:px-8 lg:px-12">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-[11px] text-neutral-600">
          <Link href="/aanbod" className="inline-flex items-center gap-2 font-medium hover:text-neutral-950">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Terug naar aanbod
          </Link>
          <nav aria-label="Broodkruimel" className="flex items-center gap-2">
            <Link href="/aanbod" className="hover:text-neutral-950">Aanbod</Link>
            <span>/</span>
            <span>{car.brand}</span>
            <span>/</span>
            <span className="font-medium text-neutral-950">{car.model}</span>
          </nav>
        </div>

        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.85fr)_minmax(320px,1fr)]">
          <CarGallery images={images} name={name} />

          <aside className="rounded-lg border border-neutral-200 bg-white p-5 shadow-[0_4px_18px_rgba(0,0,0,0.04)] lg:sticky lg:top-[86px]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-neutral-500">{car.brand}</p>
                <h1 className="mt-2 text-3xl font-black leading-none tracking-[-0.045em]">{car.title || name}</h1>
                <p className="mt-1 text-base font-semibold text-neutral-500">{car.trim || car.model}</p>
              </div>
              <div className="flex gap-2">
                <label className="cursor-pointer">
                  <input type="checkbox" className="peer sr-only" aria-label={`${name} markeren als favoriet`} />
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 peer-checked:bg-neutral-950 peer-checked:text-white peer-checked:[&>svg]:fill-current">
                    <Heart className="h-4 w-4" aria-hidden="true" />
                  </span>
                </label>
                <label className="cursor-pointer">
                  <input type="checkbox" className="peer sr-only" aria-label={`${name} vergelijken`} />
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 peer-checked:bg-neutral-950 peer-checked:text-white">
                    <GitCompareArrows className="h-4 w-4" aria-hidden="true" />
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {[car.fuel, car.transmission, car.year, car.batteryCapacity ? `${car.batteryCapacity} kWh` : null]
                .filter(hasValue)
                .map((value) => <span key={value} className="rounded-full bg-neutral-100 px-3 py-1.5 text-[10px] font-medium">{value}</span>)}
            </div>

            <p className="mt-4 text-4xl font-black tracking-[-0.04em]">
              {car.price > 0 ? formatPrice(car.price) : "Prijs op aanvraag"}
            </p>
            {car.vatLabel && <p className="mt-1 text-[10px] text-neutral-500">{car.vatLabel}</p>}

            <dl className="my-4 grid grid-cols-2 border-y border-neutral-200 py-3">
              {highlights.map(([Icon, label, value], index) => (
                <div key={label} className={`flex items-center gap-3 px-1 py-2 ${index % 2 === 1 ? "border-l border-neutral-200 pl-5" : ""}`}>
                  <Icon className="h-5 w-5 shrink-0 stroke-[1.5]" aria-hidden="true" />
                  <div>
                    <dt className="text-[10px] text-neutral-500">{label}</dt>
                    <dd className="mt-0.5 text-xs font-bold">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="grid gap-2">
              <a href={testDriveLink} className="flex h-11 items-center justify-center gap-3 rounded-md bg-neutral-950 text-xs font-bold text-white transition hover:bg-neutral-800">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Plan een proefrit
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={interestLink} className="flex h-11 items-center justify-center gap-3 rounded-md border border-neutral-300 bg-white text-xs font-bold transition hover:border-neutral-950">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Ik heb interesse
              </a>
            </div>

            <div className="mt-4 border-t border-neutral-200 pt-4 text-[10px] text-neutral-500">
              <p>Vragen over deze wagen? Neem contact op.</p>
              <p className="mt-2 flex items-center gap-2 text-neutral-700"><MapPin className="h-4 w-4" aria-hidden="true" />{siteGegevens.address}</p>
            </div>
          </aside>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.85fr)_minmax(320px,1fr)]">
          <CarDetailTabs
            overview={overview}
            specifications={specifications}
            options={car.options || []}
            description={car.description || ""}
          />
          <div aria-hidden="true" />
        </div>

        {relatedCars.length > 0 && (
          <section aria-labelledby="related-cars-heading" className="mt-14 border-t border-neutral-200 pt-9">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Misschien ook interessant</p>
                <h2 id="related-cars-heading" className="mt-2 text-2xl font-black tracking-tight">Gerelateerde voertuigen</h2>
              </div>
              <Link href="/aanbod" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-700 hover:text-neutral-950 hover:underline">
                Bekijk het volledige aanbod
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCars.map((relatedCar) => <CarCard key={relatedCar.id} car={relatedCar} />)}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
