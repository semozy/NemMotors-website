import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Quote, User } from "lucide-react";
import Sectie from "@/components/Sectie";
import { siteConfig } from "@/lib/site";
import { reviews } from "@/lib/reviews";

export default function GarageInfo() {
  const mapsQuery = encodeURIComponent(siteConfig.address);
  const reviewGroups = [reviews, reviews];

  return (
    <Sectie className="py-10 pb-20">
      <div className="rounded-lg border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-700">Persoonlijk contact</p>
            <h2 className="mt-4 text-4xl font-black text-neutral-950 md:text-5xl">Maak kennis met Volkan</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-700">
              Volkan is het gezicht achter NEM Motors en staat klaar om klanten persoonlijk te begeleiden bij hun zoektocht naar de juiste wagen. Met duidelijke uitleg over opties, onderhoudshistoriek en beschikbare mogelijkheden helpt hij je om een keuze te maken die past bij jouw wensen en budget.            </p>
            <p className="mt-5 max-w-3xl leading-8 text-neutral-700">
              Wil je meer informatie over een wagen, een proefrit plannen of je huidige auto verkopen? Neem rechtstreeks contact op met Volkan. Je krijgt snel, eerlijk en professioneel advies.
            </p>
          </div>
          <aside className="rounded-lg bg-neutral-100 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-neutral-950 text-white">
                <User className="h-9 w-9" />
              </div>
              <div>
                <h3 className="text-xl font-black text-neutral-950">Volkan Eldekci</h3>
                <p className="text-sm font-semibold text-neutral-600">Zaakvoerder NEM Motors</p>
              </div>
            </div>
            <div className="mt-7 grid gap-4 text-sm font-semibold text-neutral-700">
              <a href={`tel:${siteConfig.phoneNumber}`} className="flex items-center gap-3 hover:text-yellow-700">
                <Phone className="h-5 w-5 text-neutral-500" /> {siteConfig.phoneNumber}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 hover:text-yellow-700">
                <Mail className="h-5 w-5 text-neutral-500" /> {siteConfig.email}
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-neutral-500" /> {siteConfig.address}
              </p>
              <p className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-neutral-500" /> {siteConfig.openingHours}
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-yellow-400 px-5 py-3 text-sm font-black text-neutral-950 transition hover:bg-yellow-300"
            >
              Contact opnemen
            </Link>
          </aside>
        </div>
      </div>

      <div className="review-marquee-frame mt-6 overflow-hidden pb-2" aria-label="Automatisch scrollende reviews">
        <div className="review-marquee-track flex w-max">
          {reviewGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex shrink-0 gap-4 pr-4" aria-hidden={groupIndex === 1}>
              {group.map((review) => (
                <article
                  key={`${groupIndex}-${review.name}-${review.date}`}
                  className="min-w-[300px] rounded-lg border border-neutral-200 bg-neutral-50 p-5 shadow-sm sm:min-w-[360px]"
                >
                  <Quote className="h-5 w-5 text-yellow-700" aria-hidden="true" />
                  <p className="mt-3 text-sm leading-6 text-neutral-700">&quot;{review.text}&quot;</p>
                  <div className="mt-4 border-t border-neutral-200 pt-3">
                    <p className="font-black text-neutral-950">{review.name}</p>
                    <p className="text-xs font-semibold text-neutral-500">Klant sinds {review.date}</p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>

      <a href={`https://maps.google.com/?q=${mapsQuery}`} target="_blank" rel="noreferrer" className="mt-6 flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-5 text-sm text-neutral-700 shadow-sm transition hover:border-yellow-400">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-yellow-700" />
          <div>
            <p className="font-black text-neutral-950">Onze locatie</p>
            <p className="mt-1">{siteConfig.address} · Open in Google Maps</p>
          </div>
      </a>
    </Sectie>
  );
}
