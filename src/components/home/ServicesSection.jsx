import { Car, FileText, Handshake, KeyRound, ShieldCheck, Wrench } from "lucide-react";
import Container from "@/components/ui/Container";
const diensten = [
    {
        title: "Verkoop van tweedehandswagens",
        description: "Zorgvuldig geselecteerde wagens met duidelijke informatie, correcte prijzen en persoonlijke begeleiding.",
    },
    {
        title: "Inruil van uw wagen",
        description: "Wilt u uw huidige wagen inruilen? Wij bekijken graag samen de mogelijkheden.",
    },
    {
        title: "Aankoop van wagens",
        description: "Heeft u een wagen te koop? NEM Motors doet een eerlijk voorstel op basis van staat, kilometerstand en marktwaarde.",
    },
    {
        title: "Administratieve begeleiding",
        description: "Wij helpen met documenten, keuring en praktische stappen bij aankoop of verkoop.",
    },
    {
        title: "Proefrit op afspraak",
        description: "Plan eenvoudig een proefrit en ontdek of de wagen bij uw wensen past.",
    },
    {
        title: "Advies op maat",
        description: "Wij denken mee met uw budget, wensen en rijbehoeften.",
    },
];


const dienstIconen = [Car, Handshake, KeyRound, FileText, Wrench, ShieldCheck];

export default function ServicesSection() {
  return (
        <Container id="diensten" className="py-14">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-700">
              Service
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-5xl">
              Alles voor uw wagen, duidelijk geregeld
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-600 md:text-lg">
              Van aankoop tot verkoop en van proefrit tot administratie: wij
              begeleiden u met heldere afspraken, correcte informatie en
              persoonlijk advies.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {diensten.map((service, index) => {
            const Icon = dienstIconen[index] ?? Car;
            return (<article key={service.title} className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                  <div className="flex min-h-56 flex-col">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffc20e] text-neutral-950 shadow-lg shadow-yellow-500/20">
                      <Icon className="h-7 w-7" aria-hidden="true"/>
                    </div>
                    <h3 className="text-xl font-black leading-tight text-neutral-950">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-neutral-600">
                      {service.description}
                    </p>
                  </div>
                </article>);
        })}
          </div>
        </Container>
  );
}
