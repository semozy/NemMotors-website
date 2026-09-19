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
  Mail,
  MapPin,
  Settings2,
} from "lucide-react";
import CarGallery from "@/components/cars/CarGallery";
import CarDetailTabs from "@/components/cars/CarDetailTabs";
import CarCard from "@/components/cars/CarCard";
import FavoriteButton from "@/components/cars/FavoriteButton";
import TestDriveModal from "@/components/cars/TestDriveModal";
import VehicleStatusBadge from "@/components/cars/VehicleStatusBadge";
import { siteGegevens } from "@/components/layout/Footer";
import { getCarById, getCars } from "@/lib/cars";
import { formatPrice } from "@/lib/utils";

const hasValue = (value) => value !== undefined && value !== null && value !== "";
const withUnit = (value, unit) => hasValue(value) ? `${Number(value).toLocaleString("nl-BE")} ${unit}` : null;
const yesNo = (value) => typeof value === "boolean" ? (value ? "Ja" : "Nee") : value;

export async function generateMetadata({ params }) {
  const car = await getCarById((await params).id);
  if (!car) return { title: "Wagen niet gevonden" };
  
  const title = `${car.brand} ${car.model} ${car.trim || ""}`.trim();
  const description = car.description?.substring(0, 160) || `Koop een tweedehands ${title} bij ${siteGegevens.name}. Bekijk alle foto's en specificaties online.`;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://nemmotors.be"}/aanbod/${car.id}`;
  const image = car.images?.[0] || car.image || "/images/logo/nemmotors.png";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function AutoPage({ params }) {
  const car = await getCarById((await params).id);
  if (!car) notFound();

  const name = `${car.brand} ${car.model}`;
  const relatedCars = (await getCars())
    .filter((other) => other.id !== car.id && other.status !== "verkocht")
    .sort((a, b) => {
      const brandDifference = Number(b.brand === car.brand) - Number(a.brand === car.brand);
      if (brandDifference !== 0) return brandDifference;
      return Math.abs((a.price || 0) - (car.price || 0)) - Math.abs((b.price || 0) - (car.price || 0));
    })
    .slice(0, 4);
  const publicRoot = path.resolve("public");
  const images = (car.images || (car.image ? [car.image] : [])).filter((src) => {
    if (src.startsWith("/images/cars/")) {
      const file = path.resolve(publicRoot, `.${src}`);
      return file.startsWith(publicRoot + path.sep) && existsSync(file);
    }
    try {
      const imageUrl = new URL(src);
      const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL);
      return imageUrl.origin === supabaseUrl.origin && imageUrl.pathname.startsWith("/storage/v1/object/public/vehicle-images/");
    } catch {
      return false;
    }
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

  const interestLink = `/aanbod/${car.id}/interesse`;

  return (
    <div className="bg-[#fafaf9] text-neutral-950">
      <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-4 sm:px-8 lg:px-12">
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Car",
            "name": name,
            "description": car.description || `Koop een tweedehands ${name} bij ${siteGegevens.name}.`,
            "image": images[0] || `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo/nemmotors.png`,
            "brand": { "@type": "Brand", "name": car.brand },
            "model": car.model,
            "vehicleConfiguration": car.trim || undefined,
            "bodyType": car.body,
            "fuelType": car.fuel,
            "vehicleTransmission": car.transmission,
            "productionDate": car.year,
            "mileageFromOdometer": { "@type": "QuantitativeValue", "value": car.mileage, "unitCode": "KMT" },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "EUR",
              "price": car.price,
              "itemCondition": "https://schema.org/UsedCondition",
              "availability": car.status === "verkocht" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
              "seller": { "@type": "AutoDealer", "name": siteGegevens.name }
            }
          })
        }} />
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

        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.85fr)_minmax(320px,1fr)] lg:gap-6">
          
          {/* Linker kolom (Galerij + Details) */}
          <div className="flex flex-col gap-5">
            <CarGallery images={images} name={name} />
            
            <CarDetailTabs
              overview={overview}
              specifications={specifications}
              options={car.options || []}
              description={car.description || ""}
            />
          </div>

          {/* Rechter kolom (Sticky Info Kaart) */}
          <aside className="rounded-lg border border-neutral-200 bg-white p-5 shadow-[0_4px_18px_rgba(0,0,0,0.04)] lg:sticky lg:top-[90px]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2"><p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-neutral-500">{car.brand}</p><VehicleStatusBadge status={car.status} compact /></div>
                <h1 className="mt-2 text-3xl font-black leading-none tracking-[-0.045em]">{car.title || name}</h1>
                <p className="mt-1 text-base font-semibold text-neutral-500">{car.trim || car.model}</p>
              </div>
              <div className="flex gap-2">
                <FavoriteButton carId={car.id} name={name} compact />
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
              <TestDriveModal car={car} />
              <Link href={interestLink} className="flex h-11 items-center justify-center gap-3 rounded-md border border-neutral-300 bg-white text-xs font-bold transition hover:border-neutral-950">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Ik heb interesse
              </Link>
            </div>

            <div className="mt-4 border-t border-neutral-200 pt-4 text-[10px] text-neutral-500">
              <p>Vragen over deze wagen? Neem contact op.</p>
              <p className="mt-2 flex items-center gap-2 text-neutral-700"><MapPin className="h-4 w-4" aria-hidden="true" />{siteGegevens.address}</p>
            </div>
          </aside>
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
