"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Fuel,
  Gauge,
  Settings2,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import CompareButton from "./CompareButton";
import FavoriteButton from "./FavoriteButton";
import VehicleStatusBadge from "./VehicleStatusBadge";

export default function CarCard({ car }) {
  const name = `${car.brand} ${car.model}`;
  const image = car.images?.[0];
  const specs = [
    [CalendarDays, car.year, "Bouwjaar"],
    [Gauge, car.mileage != null ? `${car.mileage.toLocaleString("nl-BE")} km` : null, "Kilometerstand"],
    [Fuel, car.fuel, "Brandstof"],
    [Settings2, car.transmission, "Transmissie"],
  ];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200">
        <Link href={`/aanbod/${car.id}`} aria-label={`Bekijk ${name}`} className="absolute inset-0">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.025]"
            />
          ) : null}
        </Link>

        <div className="absolute left-3 top-3 flex flex-col items-start gap-2">
          {car.newArrival && (
            <span className="rounded bg-neutral-900 px-2.5 py-1.5 text-[10px] font-semibold text-white">Nieuw binnen</span>
          )}
          <VehicleStatusBadge status={car.status} compact />
        </div>

        <div className="absolute right-3 top-3"><FavoriteButton carId={car.id} name={name} /></div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <h2 className="text-[17px] font-black leading-tight tracking-[-0.02em] text-neutral-950">
          <Link href={`/aanbod/${car.id}`} className="hover:text-neutral-600">
            {name}
          </Link>
        </h2>
        <p className="mt-1 min-h-4 text-[11px] text-neutral-500">
          {car.trim || " "}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3">
          {specs.filter(([, value]) => value != null).map(([Icon, value, label]) => (
            <div key={label} className="flex min-w-0 items-center gap-2 text-[10px] text-neutral-700">
              <dt>
                <span className="sr-only">{label}</span>
                <Icon className="h-4 w-4 shrink-0 stroke-[1.5] text-neutral-700" aria-hidden="true" />
              </dt>
              <dd className="truncate">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-neutral-200 pt-4">
          <p className="text-xl font-black tracking-[-0.035em] text-neutral-950">
            {car.price > 0 ? formatPrice(car.price) : "Prijs op aanvraag"}
          </p>
          <CompareButton carId={car.id} name={name} card />
        </div>
      </div>
    </article>
  );
}
