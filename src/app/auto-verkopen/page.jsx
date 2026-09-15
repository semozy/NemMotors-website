import Link from "next/link";
import { ArrowRight, BadgeEuro, ClipboardCheck, FileCheck2, HandCoins, HelpCircle, Phone, ShieldCheck, UserRoundCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SellForm from "@/components/sell/SellForm";

export const metadata = {
  title: "Auto verkopen",
  description: "Verkoop uw auto snel, eenvoudig en betrouwbaar aan NEM Motors.",
};

const steps = [
  ["01", "Vul uw voertuiggegevens in", "Vertel ons kort wat u rijdt en hoe uw auto ervoor staat.", ClipboardCheck],
  ["02", "Ontvang een eerste waardebepaling", "We bekijken uw informatie en komen snel bij u terug.", BadgeEuro],
  ["03", "Laat uw auto controleren", "Tijdens een afspraak controleren we de wagen zorgvuldig.", ShieldCheck],
  ["04", "Ontvang uw betaling", "Na akkoord regelen we de betaling en administratie.", HandCoins],
];

const reasons = [
  ["Geen verborgen kosten", "U weet vooraf waar u aan toe bent. Onze waardebepaling is gratis."],
  ["Veilige betaling", "We zorgen voor een duidelijke en correcte afhandeling."],
  ["Volledige administratie", "Wij helpen met documenten, vrijwaring en de praktische opvolging."],
  ["Persoonlijke begeleiding", "U krijgt één aanspreekpunt dat uw aanvraag van dichtbij opvolgt."],
];

const faqs = [
  ["Is de waardebepaling gratis?", "Ja. De eerste waardebepaling is volledig gratis en vrijblijvend."],
  ["Ben ik verplicht om mijn auto te verkopen?", "Nee. U bent nergens toe verplicht. U beslist pas na ons voorstel."],
  ["Hoe snel ontvang ik een voorstel?", "Na ontvangst van uw gegevens nemen we zo snel mogelijk contact met u op."],
  ["Welke documenten heb ik nodig?", "Neem bij voorkeur uw inschrijvingsbewijs, keuringsbewijs, onderhoudsboekje en beide sleutels mee."],
  ["Kopen jullie auto’s met schade?", "Dat kan. Beschrijf de schade zo duidelijk mogelijk en voeg eventueel foto’s toe."],
  ["Kan ik mijn auto inruilen?", "Ja, een inruilvoorstel kan samen met de aankoop van een andere wagen besproken worden."],
  ["Wanneer ontvang ik de betaling?", "Na de controle en zodra alle afspraken zijn bevestigd, bespreken we de betaaltermijn helder met u."],
];

export default function AutoVerkopenPage() {
  return (
    <main className="bg-neutral-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#070707_0%,rgba(7,7,7,0.96)_35%,rgba(7,7,7,0.48)_100%)]" />
        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-400">UW AUTO VERKOPEN</p>
            <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">Verkoop uw auto eenvoudig en betrouwbaar<span className="text-neutral-400">.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-neutral-300">Ontvang vrijblijvend een voorstel voor uw auto. Snel geregeld, zonder advertenties of eindeloze onderhandelingen.</p>
            <Link href="#aanvraag" className="mt-8 inline-flex h-14 items-center gap-3 rounded-sm bg-white px-7 text-sm font-black text-neutral-950 transition hover:-translate-y-0.5 hover:bg-neutral-200">Start uw aanvraag <ArrowRight className="h-4 w-4" /></Link>
            <div className="mt-12 grid gap-4 text-sm font-semibold text-neutral-200 sm:grid-cols-3">
              {["Vrijblijvende waardebepaling", "Snelle en veilige betaling", "Wij regelen de administratie"].map((benefit) => <div key={benefit} className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />{benefit}</div>)}
            </div>
          </div>
          <div className="min-h-[360px] rounded-lg border border-white/15 bg-[url('https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1400&q=85')] bg-cover bg-center shadow-2xl shadow-black/50 lg:min-h-[470px]" role="img" aria-label="Auto wordt professioneel geïnspecteerd" />
        </div>
      </section>

      <section className="bg-[#111111]">
        <Container className="py-20">
          <div className="max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">Duidelijk proces</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Zo werkt het</h2><p className="mt-4 text-sm leading-7 text-neutral-400">Van uw eerste aanvraag tot een correcte betaling: vier heldere stappen.</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{steps.map(([number, title, text, Icon]) => <article key={number} className="border-t border-white/15 pt-5"><div className="flex items-center justify-between"><span className="text-3xl font-black text-white/30">{number}</span><Icon className="h-6 w-6 text-neutral-400" aria-hidden="true" /></div><h3 className="mt-8 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-neutral-400">{text}</p></article>)}</div>
        </Container>
      </section>

      <section id="aanvraag" className="scroll-mt-20 bg-neutral-950">
        <Container className="py-20"><div className="mb-10 max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">Persoonlijk voorstel</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Vertel ons over uw auto</h2><p className="mt-4 text-sm leading-7 text-neutral-400">Met enkele gegevens kunnen we uw aanvraag zorgvuldig bekijken.</p></div><SellForm /></Container>
      </section>

      <section className="bg-[#f5f5f3] text-neutral-950">
        <Container className="py-20"><div className="max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">Zonder zorgen</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Waarom uw auto aan ons verkopen?</h2></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{reasons.map(([title, text]) => <article key={title} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"><UserRoundCheck className="h-6 w-6 text-neutral-700" aria-hidden="true" /><h3 className="mt-8 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-neutral-600">{text}</p></article>)}</div></Container>
      </section>

      <section className="bg-white text-neutral-950">
        <Container className="max-w-4xl py-20"><div className="flex items-start gap-4"><HelpCircle className="mt-1 h-6 w-6 shrink-0 text-neutral-500" /><div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">Veelgestelde vragen</p><h2 className="mt-3 text-3xl font-black tracking-tight">Goed om te weten</h2></div></div><div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">{faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-sm font-black marker:hidden [&::-webkit-details-marker]:hidden">{question}<span className="text-2xl font-normal text-neutral-400 transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pt-4 text-sm leading-7 text-neutral-600">{answer}</p></details>)}</div></Container>
      </section>

      <section className="bg-neutral-950">
        <Container className="py-20"><div className="flex flex-col justify-between gap-8 rounded-lg border border-white/10 bg-[#171717] p-8 sm:p-10 lg:flex-row lg:items-center"><div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">Persoonlijk contact</p><h2 className="mt-3 text-3xl font-black">Heeft u nog vragen?</h2><p className="mt-3 text-sm text-neutral-400">Neem contact met ons op. Wij helpen u graag verder.</p></div><div className="flex flex-col gap-3 sm:flex-row"><Link href="/#contact" className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-white px-6 text-sm font-black text-neutral-950 transition hover:bg-neutral-200">Neem contact op <ArrowRight className="h-4 w-4" /></Link><a href="tel:+32470000000" className="inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-white/20 px-6 text-sm font-bold text-white transition hover:border-white"><Phone className="h-4 w-4" /> Bel ons</a></div></div></Container>
      </section>
    </main>
  );
}
