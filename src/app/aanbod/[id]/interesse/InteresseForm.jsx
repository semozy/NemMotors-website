"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Lock, MessageSquare, User, ArrowRight, Check } from "lucide-react";

export default function InteresseForm({ car }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const carName = `${car.brand} ${car.model} ${car.trim || ""}`.trim();

  const [form, setForm] = useState({
    subject: "Meer informatie over deze wagen",
    message: "",
    tradeIn: false,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    bot_field: "",
  });

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fullName = `${form.firstName} ${form.lastName}`.trim();
    const fullMessage = `Aanvraag via Interesse-pagina
Wagen: ${carName}
Onderwerp: ${form.subject}
Telefoon: ${form.phone}
Bedrijf: ${form.company || "N.v.t."}
Inruilvoorstel gewenst: ${form.tradeIn ? "Ja" : "Nee"}

Bericht / Vraag:
${form.message || "Geen extra bericht."}`;

    try {
      const response = await fetch("/api/requests/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: form.email,
          message: fullMessage,
          bot_field: form.bot_field,
        }),
      });

      if (response.ok) {
        setSent(true);
      } else {
        setError("Er ging iets mis bij het versturen. Probeer het later opnieuw.");
      }
    } catch (err) {
      setError("Er is een netwerkfout opgetreden.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="mt-10 rounded-xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check className="h-8 w-8" />
        </span>
        <h2 className="mt-6 text-2xl font-black">Aanvraag verzonden!</h2>
        <p className="mt-2 text-neutral-500">Bedankt voor je interesse in de {car.brand} {car.model}. We nemen zo snel mogelijk contact met je op via e-mail of telefoon.</p>
        <Link href="/aanbod" className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-8 text-xs font-bold text-white transition hover:bg-neutral-800">
          Terug naar aanbod
        </Link>
      </div>
    );
  }

  return (
    <form className="mt-10" onSubmit={submit}>
      <div className="space-y-10 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <input type="text" name="bot_field" className="hidden" tabIndex="-1" autoComplete="off" onChange={update} value={form.bot_field || ""} />
        
        {error && (
          <div className="rounded-md bg-red-50 p-4 text-xs font-bold text-red-600">
            {error}
          </div>
        )}

        {/* Section 1: Jouw aanvraag */}
        <section>
          <div className="flex items-center gap-4 border-b border-neutral-100 pb-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
              <MessageSquare className="h-5 w-5 text-neutral-700" />
            </div>
            <div>
              <h2 className="text-base font-black">Jouw aanvraag</h2>
              <p className="text-[11px] text-neutral-500">Laat ons weten hoe we je kunnen helpen.</p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <label className="block text-xs font-bold text-neutral-800">
              Waar kunnen we je mee helpen? <span className="text-red-500">*</span>
              <div className="relative mt-2">
                <select name="subject" value={form.subject} onChange={update} required className="h-11 w-full appearance-none rounded-md border border-neutral-300 bg-white px-4 text-xs font-medium text-neutral-900 outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950">
                  <option>Meer informatie over deze wagen</option>
                  <option>Proefrit inplannen</option>
                  <option>Overnamevoorstel aanvragen</option>
                  <option>Andere vraag</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              </div>
            </label>

            <label className="block text-xs font-bold text-neutral-800">
              Vragen of opmerkingen
              <textarea name="message" value={form.message} onChange={update} rows="4" className="mt-2 w-full resize-y rounded-md border border-neutral-300 bg-white p-4 text-xs text-neutral-900 outline-none placeholder:font-normal placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950" placeholder="Bijvoorbeeld: is de wagen nog beschikbaar, kan ik een testrit inplannen, ..."></textarea>
            </label>

            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" name="tradeIn" checked={form.tradeIn} onChange={update} className="mt-0.5 h-4 w-4 rounded border-neutral-300 accent-neutral-950" />
              <span className="text-xs font-medium text-neutral-700">Ik wil graag een inruilvoorstel ontvangen voor mijn huidige wagen.</span>
            </label>
          </div>
        </section>

        {/* Section 2: Persoonlijke gegevens */}
        <section>
          <div className="flex items-center gap-4 border-b border-neutral-100 pb-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100">
              <User className="h-5 w-5 text-neutral-700" />
            </div>
            <div>
              <h2 className="text-base font-black">Persoonlijke gegevens</h2>
              <p className="text-[11px] text-neutral-500">Zo kunnen we je snel en correct contacteren.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block text-xs font-bold text-neutral-800">
              Voornaam <span className="text-red-500">*</span>
              <input type="text" name="firstName" value={form.firstName} onChange={update} className="mt-2 h-11 w-full rounded-md border border-neutral-300 px-4 font-normal outline-none placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950" placeholder="Je voornaam" required />
            </label>
            <label className="block text-xs font-bold text-neutral-800">
              Achternaam <span className="text-red-500">*</span>
              <input type="text" name="lastName" value={form.lastName} onChange={update} className="mt-2 h-11 w-full rounded-md border border-neutral-300 px-4 font-normal outline-none placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950" placeholder="Je achternaam" required />
            </label>
            <label className="block text-xs font-bold text-neutral-800">
              E-mailadres <span className="text-red-500">*</span>
              <input type="email" name="email" value={form.email} onChange={update} className="mt-2 h-11 w-full rounded-md border border-neutral-300 px-4 font-normal outline-none placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950" placeholder="voorbeeld@e-mail.be" required />
            </label>
            <label className="block text-xs font-bold text-neutral-800">
              Telefoonnummer <span className="text-red-500">*</span>
              <input type="tel" name="phone" value={form.phone} onChange={update} className="mt-2 h-11 w-full rounded-md border border-neutral-300 px-4 font-normal outline-none placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950" placeholder="+32 471 23 45 67" required />
            </label>
            <label className="block text-xs font-bold text-neutral-800 sm:col-span-2">
              Bedrijfsnaam (optioneel)
              <input type="text" name="company" value={form.company} onChange={update} className="mt-2 h-11 w-full rounded-md border border-neutral-300 px-4 font-normal outline-none placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950" placeholder="Je bedrijfsnaam" />
            </label>
          </div>

          <div className="mt-8 border-t border-neutral-100 pt-6">
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-neutral-300 accent-neutral-950" />
              <span className="text-[11px] font-medium text-neutral-700">
                Ik ga ermee akkoord dat mijn gegevens worden verwerkt om mijn aanvraag te behandelen. <span className="text-red-500">*</span>{" "}
                <Link href="/privacybeleid" className="text-blue-600 underline">Lees onze privacyverklaring.</Link>
              </span>
            </label>
            
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <button type="submit" disabled={loading} className="group flex h-12 items-center justify-center gap-3 rounded-md bg-[#111111] px-8 text-xs font-bold text-white transition hover:bg-black disabled:opacity-70">
                {loading ? "Verzenden..." : "Aanvraag verzenden"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="flex items-center gap-3 text-neutral-500">
                <Lock className="h-5 w-5" />
                <p className="text-[10px] leading-tight">Je gegevens zijn veilig bij ons<br/>en worden nooit gedeeld met derden.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </form>
  );
}
