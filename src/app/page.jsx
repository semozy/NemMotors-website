import ServicesSection from "@/components/home/ServicesSection";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ArrowRight, Clock, Mail, MapPin, Phone, Quote, Star, User } from "lucide-react";
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
import FeaturedCars from "@/components/home/FeaturedCars";
import CarFilter from "@/components/cars/CarFilter";
import { getCars } from "@/lib/cars";
export const dynamic = "force-dynamic";


export default async function HomePage() {
    const cars = await getCars();
    return (<>
      <Hero />
      <div className="bg-white text-neutral-950">
        <CarFilter cars={cars} />
        <CarCategories />
        <FeaturedCars cars={cars.filter((car) => car.featured && car.status !== "verkocht")} />
      </div>
      <div className="bg-white text-neutral-950">
        <ServicesSection />
        <Container id="over-ons" className="py-10">
          <div className="grid overflow-hidden rounded-lg bg-neutral-100 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="min-h-[420px] bg-[url('https://images.unsplash.com/photo-1562141961-b5d92de784a3?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center"/>
            <div className="p-8 md:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-950">
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
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-neutral-950"/>
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
        description: "Duurzaam op weg",
        image: "/images/home/category-electric-transparent.png",
    },
    {
        slug: "hybride",
        label: "Hybride",
        description: "Het beste van twee werelden",
        image: "/images/home/category-hybrid-transparent.png",
    },
    {
        slug: "hoge-instap",
        label: "SUV",
        description: "Ruimte voor meer",
        image: "/images/home/category-suv-transparent.png",
    },
    {
        slug: "compact",
        label: "Compact",
        description: "Wendbaar en efficiënt",
        image: "/images/home/category-compact-transparent.png",
    },
    {
        slug: "gezinsauto",
        label: "Gezinswagens",
        description: "Comfort voor iedereen",
        image: "/images/home/category-family-transparent.png",
    },
];

function CarCategories() {
    return (<Container className="pb-14 pt-12 lg:pb-16 lg:pt-14">
      <div>
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl font-black tracking-[-0.035em] text-neutral-950 md:text-4xl">Welke wagen past bij u?</h2>
          <Link href="/aanbod" className="hidden items-center gap-3 text-xs font-medium text-neutral-600 transition hover:text-black sm:flex">Bekijk alle categorieën <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {autoCategorieen.map((type) => {
            return (<Link href={`/aanbod?body=${encodeURIComponent(type.label)}`} key={type.slug} className="group overflow-hidden rounded-lg bg-[#f5f5f3] pb-5 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="h-32 overflow-hidden">
                  <Image
                    src={type.image}
                    alt={`${type.label} wagen`}
                    width={720}
                    height={420}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="text-sm font-black text-neutral-950">
                  {type.label}
                </h3>
                <p className="mt-1 text-xs font-medium text-neutral-600">
                  {type.description}
                </p>
              </Link>);
        })}
        </div>
        <Link href="/aanbod" className="mt-5 flex items-center justify-center gap-3 text-xs font-medium text-neutral-600 sm:hidden">Bekijk alle categorieën <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </Container>);
}

const reviews = [
{
    name: "Oceane",
    text: "Je recommande vivement ce garage ! J’ai acheté ma voiture ici et je suis vraiment très satisfait de mon expérience. Du premier contact jusqu’au jour où je suis allé récupérer le véhicule, tout s’est parfaitement bien passé. Le vendeur est une personne très sérieuse, honnête, professionnelle et vraiment agréable. Il est très joignable, toujours disponible pour répondre aux questions et prend le temps de bien expliquer les choses. On sent qu’il fait son travail avec sérieux et qu’il tient réellement à satisfaire ses clients. La voiture correspond parfaitement à ce qui avait été annoncé, aucune mauvaise surprise. Tout était clair, transparent et conforme à mes attentes. C’est vraiment rassurant de pouvoir faire confiance à quelqu’un lorsqu’on achète une voiture. Je ne regrette absolument pas mon achat et je suis très content d’être passé par ce garage. Une personne de confiance, professionnelle et sympathique, que je recommande sans hésiter. Je reviendrai avec plaisir si j’ai besoin d’un autre véhicule à l’avenir. Encore merci pour votre sérieux et votre professionnalisme !",
    date: "2026",
    rating: 4,
},
{
    name: "Kaan Bozcu",
    text: "Ik ben zeer tevreden over de service en de professionele aanpak. Alles werd duidelijk uitgelegd en verliep vlot en zonder problemen. Een vriendelijke en betrouwbare autodealer die echt met de klant meedenkt. Zeker een aanrader!",
    date: "2026",
},
{
    name: "Saskia",
    text: "Na het maken van een testrit was een deal en inruil huidige auto snel gemaakt. Eigenaar communiceert snel en lost zaken snel op. Al met al heb ik een hele goede indruk van deze garage!",
    date: "2026",
},
{
    name: "Gelukkige chauffeur",
    text: "Vriendelijk, duidelijk contact, vlotte testrit. Enige verwarring over navigatie was meteen uitgeklaard. Aanrader!",
    date: "2026",
},
{
    name: "Eef Peeters",
    text: "Top service! Zeer vriendelijke verkoper die heel veel info gaf en eerlijk is. Hij was stipt op de afspraak aanwezig en handelde het administratief gedeelte zeer en snel correct af. Ik voelde me enorm gerustgesteld door zijn advies. Zeker een aanrader!",
    date: "2026",
},
{
    name: "Merle Houben",
    text: "De verkoper was zeer vriendelijk. We hadden direct een goed gevoel & waren zeer content van hoe deze verkoop is verlopen!",
    date: "2026",
},
{
    name: "Germaine",
    text: "Zeer vriendelijke verkoper die je bijstaat in het gehele proces.",
    date: "2026",
},
{
    name: "Vanzonhoven robby",
    text: "Toffe en goede verkoper. Vlot in omgang weet waar hij mee bezig is. Toffe zaak.",
    date: "2026",
},
{
    name: "AV",
    text: "Super tevreden over de verkoper.",
    date: "2025",
},
{
    name: "Steven",
    text: "Perfecte service",
    date: "2025",
},
{
    name: "Erwin",
    text: "Als ging goed",
    date: "2025",
},
{
    name: "Andrei B",
    text: "Absoluutd een aanrader! De service van Volkan bij Auto's NEM was uitstekend. Hij heeft de aankoop van mijn auto ongelooflijk snel en soepel afgehandeld – alles was binnen een dag geregeld, inclusief alle documenten en de overname van mijn oude wagen. Zeer correct, vriendelijk en professioneel.",
    date: "2025",
},
];

function verkortReview(text, maximumWoorden = 10) {
    const woorden = text.trim().split(/\s+/);

    if (woorden.length <= maximumWoorden) {
        return text;
    }

    return `${woorden.slice(0, maximumWoorden).join(" ")}…`;
}

function GarageInfo() {
    const mapsQuery = encodeURIComponent(siteGegevens.address);
    const reviewGroups = [reviews, reviews];
    return (<Container id="contact" className="py-10 pb-20">
      <div className="rounded-lg border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-950">
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
              <a href={`tel:${siteGegevens.phoneNumber}`} className="flex items-center gap-3 hover:text-neutral-950">
                <Phone className="h-5 w-5 text-neutral-500"/>{" "}
                {siteGegevens.phoneNumber}
              </a>
              <a href={`mailto:${siteGegevens.email}`} className="flex items-center gap-3 hover:text-neutral-950">
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
            <a href={`mailto:${siteGegevens.email}`} className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-neutral-950 px-5 py-3 text-sm font-black text-white transition hover:bg-neutral-700">
              Contact opnemen
            </a>
          </aside>
        </div>
      </div>

      <div className="review-marquee-frame mt-6 overflow-hidden pb-2" aria-label="Automatisch scrollende reviews">
        <div className="review-marquee-track flex w-max">
          {reviewGroups.map((group, groupIndex) => (<div key={groupIndex} className="flex shrink-0 gap-4 pr-4" aria-hidden={groupIndex === 1}>
              {group.map((review) => (<article key={`${groupIndex}-${review.name}-${review.date}`} className="min-w-[300px] rounded-lg border border-neutral-200 bg-neutral-50 p-5 shadow-sm sm:min-w-[360px]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-1" role="img" aria-label={`${review.rating ?? 5} van de 5 sterren`}>
                      {Array.from({ length: 5 }, (_, index) => (<Star
                        key={index}
                        className={`h-5 w-5 ${index < (review.rating ?? 5) ? "fill-amber-400 text-amber-400" : "fill-neutral-200 text-neutral-200"}`}
                        aria-hidden="true"
                      />))}
                    </div>
                    <Quote className="h-5 w-5 text-neutral-300" aria-hidden="true"/>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-neutral-700" title={review.text}>
                    &quot;{verkortReview(review.text)}&quot;
                  </p>
                  <div className="mt-4 flex items-end justify-between gap-4 border-t border-neutral-200 pt-3">
                    <p className="font-black text-neutral-950">{review.name}</p>
                    <p className="text-right text-xs font-semibold text-neutral-500">
                      Geschreven op {review.date}
                    </p>
                  </div>
                </article>))}
            </div>))}
        </div>
      </div>

      <a href={`https://maps.google.com/?q=${mapsQuery}`} target="_blank" rel="noreferrer" className="mt-6 flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-5 text-sm text-neutral-700 shadow-sm transition hover:border-neutral-950">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-neutral-950"/>
        <div>
          <p className="font-black text-neutral-950">Onze locatie</p>
          <p className="mt-1">{siteGegevens.address} · Open in Google Maps</p>
        </div>
      </a>
      <div className="mt-4 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 shadow-sm">
        <iframe
          title={`Locatie van ${siteGegevens.name}`}
          src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
          className="h-80 w-full border-0 sm:h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Container>);
}
