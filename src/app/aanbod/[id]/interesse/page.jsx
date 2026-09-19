import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCarById } from "@/lib/cars";
import { siteGegevens } from "@/components/layout/Footer";
import { ArrowLeft, ArrowRight, CalendarDays, Check, ChevronDown, Gauge, Fuel, Lock, MessageSquare, Phone, MapPin, Mail, Settings2, User, Zap } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import InteresseGallery from "./InteresseGallery";
import InteresseForm from "./InteresseForm";

export async function generateMetadata({ params }) {
  const p = await params;
  const car = await getCarById(p.id);
  if (!car) return { title: "Niet gevonden" };
  return { title: `Interesse in ${car.brand} ${car.model}` };
}

export default async function InteressePage({ params }) {
  const p = await params;
  const car = await getCarById(p.id);

  
  if (!car) {
    notFound();
  }

  const name = `${car.brand} ${car.model}`.trim();
  const images = car.images || [];

  return (
    <div className="bg-[#fafaf9] text-neutral-950">
      <main className="mx-auto max-w-[1200px] px-5 pb-20 pt-8 sm:px-8 lg:px-12">
        <Link href={`/aanbod/${car.id}`} className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-950">
          <ArrowLeft className="h-4 w-4" /> Terug naar wagen
        </Link>
        
        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:items-start">
          
          {/* Left Column - Form */}
          <section>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Interesse</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Interesse in deze wagen?</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-600">
              Vul het formulier in en wij nemen zo snel mogelijk contact met je op. Je kan ook direct een proefrit plannen of extra vragen stellen. Wij helpen je graag verder.
            </p>

            <InteresseForm car={car} />
          </section>

          {/* Right Column - Summary Card */}
          <aside className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm lg:sticky lg:top-[100px]">
            <InteresseGallery images={images} name={name} />

            {/* Title & Brand */}
            <div className="mt-6 flex items-start gap-4">
              <div>
                <h3 className="text-xl font-black leading-tight tracking-tight">{name}</h3>
                <p className="mt-1 text-xs text-neutral-500">{car.trim}</p>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-[11px] font-medium text-neutral-700">
              <div className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{car.year}</div>
              <div className="flex items-center gap-1.5"><Gauge className="h-4 w-4" />{car.mileage?.toLocaleString("nl-BE")} km</div>
              <div className="flex items-center gap-1.5"><Fuel className="h-4 w-4" />{car.fuel}</div>
              <div className="flex items-center gap-1.5"><Settings2 className="h-4 w-4" />{car.transmission}</div>
              {car.power > 0 && <div className="flex items-center gap-1.5"><Zap className="h-4 w-4" />{car.power} pk</div>}
            </div>

            {/* Price */}
            <div className="my-6 flex items-center justify-between border-y border-neutral-100 py-5">
              <span className="text-2xl font-black">{car.price > 0 ? formatPrice(car.price) : "Op aanvraag"}</span>
              <span className={`rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${car.status === "beschikbaar" ? "bg-emerald-100 text-emerald-800" : "bg-neutral-100 text-neutral-600"}`}>
                {car.status === "beschikbaar" ? "Op voorraad" : car.status}
              </span>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-neutral-400" />
                <div>
                  <p className="font-bold">NEM Motors</p>
                  <p className="text-neutral-500">Industrieweg 12<br/>3500 Hasselt</p>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="mt-2 inline-block font-semibold underline decoration-neutral-300 underline-offset-4 hover:text-black hover:decoration-black">Toon op kaart &rarr;</a>
                </div>
              </div>
              
              <div className="space-y-4">
                <a href={`tel:${siteGegevens.phoneNumber}`} className="flex items-center gap-3 font-semibold hover:text-neutral-600">
                  <Phone className="h-4 w-4 text-neutral-400" />
                  {siteGegevens.phoneNumber}
                </a>
                <a href={`mailto:${siteGegevens.email}`} className="flex items-center gap-3 font-semibold hover:text-neutral-600">
                  <Mail className="h-4 w-4 text-neutral-400" />
                  {siteGegevens.email}
                </a>
              </div>
            </div>

          </aside>
        </div>
      </main>
    </div>
  );
}

