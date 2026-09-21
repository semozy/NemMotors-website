import ServicesSection from "@/components/home/ServicesSection";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Clock, Mail, MapPin, Phone, Quote, Star, User, MessageCircle, FileSearch, CarFront, FileCheck, ArrowRight as ArrowRightIcon } from "lucide-react";
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
            <div className="relative min-h-[420px]">
              <Image src="/images/home/garage.jpeg" alt="Over NEM Motors" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-center" />
            </div>
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
        slug: "suv",
        label: "SUV",
        description: "Hoge instap & ruimte",
        image: "/images/home/SUV.png",
        url: "/aanbod?body=SUV%2F4x4%2FPick-up",
    },
    {
        slug: "berline",
        label: "Berline",
        description: "Comfort & klasse",
        image: "/images/home/Berline.png",
        url: "/aanbod?body=Berline",
    },
    {
        slug: "break",
        label: "Break",
        description: "Ruimte voor iedereen",
        image: "/images/home/Break.png",
        url: "/aanbod?body=Break",
    },
    {
        slug: "stadswagen",
        label: "Stadswagen",
        description: "Compact & wendbaar",
        image: "/images/home/Stadswagen.png",
        url: "/aanbod?body=Stadswagen",
    },
    {
        slug: "coupe",
        label: "Coupé",
        description: "Sportief & stijlvol",
        image: "/images/home/Coupe.png",
        url: "/aanbod?body=Coupé",
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
            return (<Link href={type.url} key={type.slug} className="group overflow-hidden rounded-lg bg-[#f5f5f3] pb-5 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">
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
      <div className="mb-20">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-[1px] w-8 bg-neutral-950"></span>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
                De NEM Motors aanpak
              </p>
            </div>
            <h2 className="mt-4 text-[44px] font-black tracking-tight text-neutral-950 md:text-5xl lg:text-6xl">
              Waarom NEM Motors?
            </h2>
          </div>
          <div className="flex w-full flex-col justify-between gap-4 md:w-auto md:flex-row md:items-end md:gap-12 lg:gap-24">
            <p className="text-lg text-neutral-600 md:mb-1">
              Een wagen die bij u past.<br />
              Begeleiding bij elke stap.
            </p>
            <Link href="/contact" className="whitespace-nowrap border-b border-neutral-950 pb-0.5 text-sm font-bold text-neutral-950 transition hover:opacity-70 md:mb-2">
              Neem contact op
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {/* Card 01 - Wide, Dark */}
          <div className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[20px] bg-neutral-950 p-8 text-white lg:col-span-7 lg:min-h-[340px]">
            <Image src="/images/home/begeleiding.png" alt="Persoonlijke begeleiding" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="relative z-10 text-sm font-semibold opacity-50">01</span>
            <div className="relative z-10 mt-12 max-w-sm">
              <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">Persoonlijke<br />begeleiding</h3>
              <p className="mt-4 text-lg text-white/80">Rechtstreeks contact<br/>en advies dat bij u past.</p>
            </div>
          </div>

          {/* Card 02 - Narrow, Light */}
          <div className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[20px] bg-[#f4f4f4] p-8 text-neutral-950 lg:col-span-5 lg:min-h-[340px]">
            <Image src="/images/home/info.png" alt="Duidelijke informatie" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="relative z-10 text-sm font-semibold opacity-50">02</span>
            <div className="relative z-10 mt-12 max-w-xs">
              <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">Duidelijke<br />informatie</h3>
              <p className="mt-4 text-lg text-neutral-600">Weet wat u koopt,<br/>tot in de details.</p>
            </div>
          </div>

          {/* Card 03 - Narrow, Light */}
          <div className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[20px] bg-[#f4f4f4] p-8 text-neutral-950 lg:col-span-5 lg:min-h-[340px]">
            <Image src="/images/home/garantie.png" alt="12 maanden garantie" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="relative z-10 text-sm font-semibold opacity-50">03</span>
            <div className="relative z-10 mt-12 max-w-xs">
              <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">12 maanden<br />garantie</h3>
              <p className="mt-4 text-lg text-neutral-600">Na elke aankoop<br/>van een wagen.</p>
            </div>
          </div>

          {/* Card 04 - Wide, Dark */}
          <div className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[20px] bg-neutral-950 p-8 text-white lg:col-span-7 lg:min-h-[340px]">
            <Image src="/images/home/vlot.png" alt="Vlot geregeld" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="relative z-10 text-sm font-semibold opacity-50">04</span>
            <div className="relative z-10 mt-12 max-w-sm">
              <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">Vlot geregeld</h3>
              <p className="mt-4 text-lg text-white/80">Van documenten tot<br/>overdracht: wij begeleiden u.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="review-marquee-frame mt-6 overflow-hidden pb-2" aria-label="Automatisch scrollende reviews">
        <div className="review-marquee-track flex w-max">
          {reviewGroups.map((group, groupIndex) => (<div key={groupIndex} className="flex shrink-0 gap-4 pr-4" aria-hidden={groupIndex === 1}>
              {group.map((review) => (
                <a
                  key={`${groupIndex}-${review.name}-${review.date}`}
                  href="https://www.autoscout24.be/nl/verkopers/nem-motors/over-ons#reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block min-w-[300px] sm:min-w-[360px]"
                >
                  <article className="h-full rounded-lg border border-neutral-200 bg-neutral-50 p-5 shadow-sm transition group-hover:-translate-y-1 group-hover:border-neutral-300 group-hover:shadow-md">
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
                  </article>
                </a>
              ))}
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
