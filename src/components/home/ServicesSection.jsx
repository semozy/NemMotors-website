import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CarFront,
  FileText,
  MessageCircle,
  RefreshCw,
  CircleGauge,
  Tag,
} from "lucide-react";
import Container from "@/components/ui/Container";

const hoofddiensten = [
  {
    title: "Vind uw volgende wagen",
    description:
      "Ontdek zorgvuldig geselecteerde tweedehandswagens met duidelijke informatie.",
    action: "Bekijk het aanbod",
    href: "/aanbod",
    image: "/images/home/service-aanbod.png",
    icon: CarFront,
  },
  {
    title: "Ruil uw wagen in",
    description:
      "Toe aan iets nieuws? Ontdek de mogelijkheden om uw huidige wagen in te ruilen.",
    action: "Ontdek de mogelijkheden",
    href: "/auto-verkopen",
    image: "/images/home/service-inruil.png",
    icon: RefreshCw,
  },
  {
    title: "Verkoop uw wagen",
    description:
      "Ontvang een eerlijk voorstel op basis van de staat, kilometerstand en marktwaarde.",
    action: "Vraag een voorstel",
    href: "/auto-verkopen",
    image: "/images/home/service-verkoop.png",
    icon: Tag,
  },
];

const extraDiensten = [
  {
    title: "Administratie geregeld",
    description: "Hulp bij documenten en praktische stappen.",
    icon: FileText,
  },
  {
    title: "Proefrit op afspraak",
    description: "Ervaar zelf welke wagen bij u past.",
    icon: CircleGauge,
  },
  {
    title: "Persoonlijk advies",
    description: "Samen vinden we wat bij u past.",
    icon: MessageCircle,
  },
];

export default function ServicesSection() {
  return (
    <section id="diensten" className="bg-[#fafaf9]">
      <Container className="py-16 sm:py-20">
        <header className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.48em] text-neutral-900 sm:text-xs">
            Onze diensten
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-neutral-950 sm:text-5xl lg:text-[3.45rem]">
            Uw wagen. Onze zorg.
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-base font-medium text-neutral-500 sm:text-lg lg:text-xl">
            Van uw eerste proefrit tot de administratie: wij helpen u bij elke stap.
          </p>
        </header>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {hoofddiensten.map((dienst) => {
            const Icon = dienst.icon;

            return (
              <article
                key={dienst.title}
                className="flex min-h-full flex-col rounded-xl border border-neutral-200 bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <Image
                  src={dienst.image}
                  alt=""
                  width={1536}
                  height={1024}
                  className="aspect-[16/10] w-full rounded-lg object-cover"
                />

                <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4">
                  <Icon
                    className="h-8 w-8 stroke-[1.65] text-neutral-950"
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 text-lg font-extrabold tracking-tight text-neutral-950">
                    {dienst.title}
                  </h3>
                  <p className="mt-1.5 min-h-12 text-sm leading-5 text-neutral-500">
                    {dienst.description}
                  </p>
                  <div className="mt-5 border-t border-neutral-200 pt-4">
                    <Link
                      href={dienst.href}
                      className="inline-flex items-center gap-2 text-sm font-bold text-neutral-950 transition hover:gap-3"
                    >
                      {dienst.action}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-5 grid overflow-hidden rounded-xl border border-neutral-200 bg-white md:grid-cols-3">
          {extraDiensten.map((dienst, index) => {
            const Icon = dienst.icon;

            return (
              <div
                key={dienst.title}
                className={`flex items-center gap-5 px-6 py-6 sm:px-8 ${
                  index > 0
                    ? "border-t border-neutral-200 md:border-l md:border-t-0"
                    : ""
                }`}
              >
                <Icon
                  className="h-10 w-10 shrink-0 stroke-[1.55] text-neutral-950"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-sm font-bold text-neutral-950">
                    {dienst.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    {dienst.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
