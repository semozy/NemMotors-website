import PaginaTitel from "@/components/PaginaTitel";
import Sectie from "@/components/Sectie";
import ContactFormulier from "@/components/ContactFormulier";
import { CalendarCheck, Clock, Mail, MapPin, MessageCircle, Phone, Route, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";
import { vehicles } from "@/lib/autos";

export const metadata = {
  title: "Contact",
  description: "Heeft u een vraag, wilt u een proefrit plannen of meer informatie over een wagen? Neem gerust contact met ons op.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getParam(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function ContactCard({
  Icon,
  label,
  value,
  href,
}: {
  Icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex h-full items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ffc20e] text-neutral-950">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-neutral-500">{label}</p>
        <p className="mt-1 break-words text-base font-black text-neutral-950">{value}</p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer" className="block h-full">
      {content}
    </a>
  );
}

const contactReasons = [
  "Meer informatie over een wagen",
  "Een proefrit plannen",
  "Uw wagen verkopen of inruilen",
  "Een afspraak maken in de garage",
];

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const action = getParam(params, "actie");
  const vehicleId = getParam(params, "wagen");
  const vehicle = vehicles.find((item) => item.id === vehicleId);
  const vehicleName = vehicle ? `${vehicle.brand} ${vehicle.model} (${vehicle.year})` : "deze wagen";
  const formTitle =
    action === "proefrit" ? "Proefrit aanvragen" : action === "interesse" ? "Interesse in deze wagen" : "Verstuur bericht";
  const defaultMessage =
    action === "proefrit"
      ? `Hallo NEM Motors, ik wil graag een proefrit plannen voor ${vehicleName}.`
      : action === "interesse"
        ? `Hallo NEM Motors, ik heb interesse in ${vehicleName}. Kunt u mij meer informatie bezorgen?`
        : "Hallo NEM Motors, ik heb een vraag.";

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`;

  return (
    <>
      <PaginaTitel
        title={formTitle === "Verstuur bericht" ? "Neem contact op" : formTitle}
        subtitle="Wij staan klaar om u te helpen. Stel uw vraag, plan een proefrit of maak een afspraak in de garage."
      />
      <div className="bg-white text-neutral-950">
        <Sectie className="py-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-700">Contact</p>
                <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Persoonlijk geholpen door NEM Motors</h2>
                <p className="mt-5 text-lg leading-8 text-neutral-700">
                  Heeft u vragen over ons aanbod, wilt u een proefrit plannen of wilt u uw huidige wagen verkopen? Neem gerust contact op. Wij reageren snel en duidelijk.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <ContactCard Icon={Phone} label="Telefoon" value={siteConfig.phoneNumber} href={`tel:${siteConfig.phoneNumber.replace(/ /g, "")}`} />
                <ContactCard Icon={MessageCircle} label="WhatsApp" value="Direct contact" href={whatsappLink("Hallo NEM Motors, ik wil graag contact opnemen.")} />
                <ContactCard Icon={Mail} label="E-mailadres" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
                <ContactCard Icon={MapPin} label="Adres" value={siteConfig.address} href={mapsUrl} />
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="text-xl font-black">Waarvoor kunt u ons contacteren?</h3>
                <div className="mt-5 grid gap-3">
                  {contactReasons.map((reason) => (
                    <div key={reason} className="flex items-center gap-3 text-sm font-semibold text-neutral-800">
                      <ShieldCheck className="h-5 w-5 text-emerald-600" />
                      {reason}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 rounded-xl border border-neutral-950 bg-neutral-950 px-5 py-4 text-sm font-black text-white transition hover:bg-neutral-800"
                >
                  <Route className="h-5 w-5" />
                  Route openen
                </a>
                <a
                  href="/contact?actie=proefrit"
                  className="flex items-center justify-center gap-3 rounded-xl bg-[#ffc20e] px-5 py-4 text-sm font-black text-neutral-950 transition hover:bg-[#e6ad00]"
                >
                  <CalendarCheck className="h-5 w-5" />
                  Proefrit plannen
                </a>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <Clock className="mt-0.5 h-5 w-5 text-yellow-700" />
                <div>
                  <p className="font-black">Openingsuren</p>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">{siteConfig.openingHours}</p>
                </div>
              </div>
            </div>

            <ContactFormulier title={formTitle} defaultMessage={defaultMessage} />
          </div>

        </Sectie>
      </div>
    </>
  );
}
