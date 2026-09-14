import ServicesSection from "@/components/home/ServicesSection";
import { ShieldCheck, Car, Fuel, Truck, Users, Zap, Clock, Mail, MapPin, Phone, Quote, User } from "lucide-react";
import { siteGegevens } from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
const sterkePunten = [
    "Zorgvuldig geselecteerde tweedehandswagens",
    "Persoonlijke begeleiding van eerste contact tot aflevering",
    "Duidelijke prijzen en eerlijke uitleg",
    "Transparante informatie over opties en historiek",
    "Hulp bij inruil, verkoop, documenten en proefritten",
];

import Hero from "@/components/home/Hero";
import CarFilter from "@/components/cars/CarFilter";


export default function HomePage() {
    return (<>
      <Hero />
      <div className="bg-neutral-950 text-white">
        <CarFilter />
        <CarCategories />
      </div>
      <div className="bg-white text-neutral-950">
        <ServicesSection />
        <Container id="over-ons" className="py-10">
          <div className="grid overflow-hidden rounded-lg bg-neutral-100 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="min-h-[420px] bg-[url('https://images.unsplash.com/photo-1562141961-b5d92de784a3?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center"/>
            <div className="p-8 md:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-700">
                Over NEM Motors
              </p>
              <h2 className="mt-4 text-4xl font-black text-neutral-950 md:text-5xl">
                Een garage met ervaring en een persoonlijke aanpak
              </h2>
              <p className="mt-6 leading-8 text-neutral-700">
                Bij NEM Motors helpen we klanten bij het vinden van een
                betrouwbare tweedehandswagen die past bij hun budget, gezin en
                rijgedrag. We combineren ervaring in de autoverkoop met een
                eerlijke en duidelijke aanpak: transparante informatie, correcte
                afspraken en persoonlijk advies op maat.
              </p>
              <p className="mt-5 leading-8 text-neutral-700">
                Elke wagen wordt zorgvuldig geselecteerd en duidelijk
                voorgesteld, zodat je precies weet waar je aan toe bent. Van je
                eerste vraag tot de aflevering van de wagen begeleiden we je
                stap voor stap.
              </p>
              <p className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-neutral-950">
                Waar NEM Motors voor staat:
              </p>
              <div className="mt-8 grid gap-4">
                {sterkePunten.map((highlight) => (<div key={highlight} className="flex gap-3 text-sm font-semibold text-neutral-800">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600"/>
                    <span>{highlight}</span>
                  </div>))}
              </div>
            </div>
          </div>
        </Container>
        <GarageInfo />
      </div>
    </>);
}

const autoCategorieen = [
    {
        slug: "elektrisch",
        label: "Elektrisch",
        description: "Stil, zuinig en klaar voor lage-emissiezones.",
    },
    {
        slug: "hybride",
        label: "Hybride",
        description: "Flexibel rijden met verbrandingsmotor en elektrische steun.",
    },
    {
        slug: "hoge-instap",
        label: "Hoge instap",
        description: "Comfortabel instappen en goed overzicht op de weg.",
    },
    {
        slug: "compact",
        label: "Compact",
        description: "Handige stadswagens en praktische hatchbacks.",
    },
    {
        slug: "gezinsauto",
        label: "Gezinsauto",
        description: "Ruimte, comfort en veiligheid voor dagelijks gebruik.",
    },
    {
        slug: "bedrijfswagen",
        label: "Bedrijfswagen",
        description: "Praktische wagens voor zelfstandigen en bedrijven.",
    },
];

const icons = {
    elektrisch: Zap,
    hybride: Fuel,
    "hoge-instap": Car,
    compact: Car,
    gezinsauto: Users,
    bedrijfswagen: Truck,
};
function CarCategories() {
    return (<Container className="py-5 pb-10">
      <div>
        <p className="text-xs font-bold uppercase text-neutral-400">
          Voor elk type wagen
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {autoCategorieen.map((type) => {
            const Icon = icons[type.slug];
            return (<div key={type.slug} className="group min-h-28 rounded-sm border border-white/10 bg-[linear-gradient(180deg,#202020_0%,#111111_100%)] p-4 text-center shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:border-[#ffc20e] hover:bg-neutral-900">
                <Icon className="mx-auto h-7 w-7 text-neutral-200 transition group-hover:text-[#ffc20e]"/>
                <h3 className="mt-3 text-sm font-black text-white">
                  {type.label}
                </h3>
                <p className="mt-1 text-[11px] font-semibold text-neutral-400">
                  {type.description}
                </p>
              </div>);
        })}
        </div>
      </div>
    </Container>);
}

const reviews = [
    {
        name: "S. K.",
        text: "Zeer correcte service, duidelijke uitleg en snelle afhandeling.",
        date: "2026",
    },
    {
        name: "M. D.",
        text: "Betrouwbare verkoper met mooie wagens en eerlijke communicatie.",
        date: "2026",
    },
    {
        name: "A. V.",
        text: "Alles verliep professioneel van eerste contact tot aflevering.",
        date: "2026",
    },
    {
        name: "Y. B.",
        text: "Vriendelijke ontvangst en alles werd rustig uitgelegd. Heel tevreden met mijn aankoop.",
        date: "2026",
    },
    {
        name: "R. T.",
        text: "Snelle reactie via WhatsApp en correcte afspraken voor de proefrit.",
        date: "2026",
    },
    {
        name: "N. C.",
        text: "De wagen was zoals beschreven en de afhandeling verliep zonder zorgen.",
        date: "2026",
    },
    {
        name: "K. P.",
        text: "Eerlijke uitleg over de auto en geen opdringerige verkoop. Aanrader.",
        date: "2026",
    },
    {
        name: "L. M.",
        text: "Goede service, duidelijke communicatie en een nette aflevering van de wagen.",
        date: "2026",
    },
    {
        name: "F. D.",
        text: "Professionele aanpak van begin tot einde. Ik kom zeker terug.",
        date: "2026",
    },
];

function GarageInfo() {
    const mapsQuery = encodeURIComponent(siteGegevens.address);
    const reviewGroups = [reviews, reviews];
    return (<Container id="contact" className="py-10 pb-20">
      <div className="rounded-lg border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-700">
              Persoonlijk contact
            </p>
            <h2 className="mt-4 text-4xl font-black text-neutral-950 md:text-5xl">
              Maak kennis met Volkan
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-700">
              Volkan is het gezicht achter NEM Motors en staat klaar om klanten
              persoonlijk te begeleiden bij hun zoektocht naar de juiste wagen.
              Met duidelijke uitleg over opties, onderhoudshistoriek en
              beschikbare mogelijkheden helpt hij je om een keuze te maken die
              past bij jouw wensen en budget.{" "}
            </p>
            <p className="mt-5 max-w-3xl leading-8 text-neutral-700">
              Wil je meer informatie over een wagen, een proefrit plannen of je
              huidige auto verkopen? Neem rechtstreeks contact op met Volkan. Je
              krijgt snel, eerlijk en professioneel advies.
            </p>
          </div>
          <aside className="rounded-lg bg-neutral-100 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-neutral-950 text-white">
                <User className="h-9 w-9"/>
              </div>
              <div>
                <h3 className="text-xl font-black text-neutral-950">
                  Volkan Eldekci
                </h3>
                <p className="text-sm font-semibold text-neutral-600">
                  Zaakvoerder NEM Motors
                </p>
              </div>
            </div>
            <div className="mt-7 grid gap-4 text-sm font-semibold text-neutral-700">
              <a href={`tel:${siteGegevens.phoneNumber}`} className="flex items-center gap-3 hover:text-yellow-700">
                <Phone className="h-5 w-5 text-neutral-500"/>{" "}
                {siteGegevens.phoneNumber}
              </a>
              <a href={`mailto:${siteGegevens.email}`} className="flex items-center gap-3 hover:text-yellow-700">
                <Mail className="h-5 w-5 text-neutral-500"/>{" "}
                {siteGegevens.email}
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-neutral-500"/>{" "}
                {siteGegevens.address}
              </p>
              <p className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-neutral-500"/>{" "}
                {siteGegevens.openingHours}
              </p>
            </div>
            <a href={`mailto:${siteGegevens.email}`} className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-yellow-400 px-5 py-3 text-sm font-black text-neutral-950 transition hover:bg-yellow-300">
              Contact opnemen
            </a>
          </aside>
        </div>
      </div>

      <div className="review-marquee-frame mt-6 overflow-hidden pb-2" aria-label="Automatisch scrollende reviews">
        <div className="review-marquee-track flex w-max">
          {reviewGroups.map((group, groupIndex) => (<div key={groupIndex} className="flex shrink-0 gap-4 pr-4" aria-hidden={groupIndex === 1}>
              {group.map((review) => (<article key={`${groupIndex}-${review.name}-${review.date}`} className="min-w-[300px] rounded-lg border border-neutral-200 bg-neutral-50 p-5 shadow-sm sm:min-w-[360px]">
                  <Quote className="h-5 w-5 text-yellow-700" aria-hidden="true"/>
                  <p className="mt-3 text-sm leading-6 text-neutral-700">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="mt-4 border-t border-neutral-200 pt-3">
                    <p className="font-black text-neutral-950">{review.name}</p>
                    <p className="text-xs font-semibold text-neutral-500">
                      Klant sinds {review.date}
                    </p>
                  </div>
                </article>))}
            </div>))}
        </div>
      </div>

      <a href={`https://maps.google.com/?q=${mapsQuery}`} target="_blank" rel="noreferrer" className="mt-6 flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-5 text-sm text-neutral-700 shadow-sm transition hover:border-yellow-400">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-yellow-700"/>
        <div>
          <p className="font-black text-neutral-950">Onze locatie</p>
          <p className="mt-1">{siteGegevens.address} · Open in Google Maps</p>
        </div>
      </a>
    </Container>);
}
