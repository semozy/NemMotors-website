"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Upload } from "lucide-react";

const fields = [
  ["naam", "Naam", "text", true], ["telefoon", "Telefoonnummer", "tel", true], ["email", "E-mailadres", "email", true],
  ["merk", "Merk", "text", true], ["model", "Model", "text", true], ["bouwjaar", "Bouwjaar", "number", false],
  ["kilometerstand", "Kilometerstand", "number", false], ["brandstof", "Brandstof", "text", false], ["transmissie", "Transmissie", "text", false],
  ["motorisatie", "Motorisatie", "text", false], ["kleur", "Kleur", "text", false], ["verkoopprijs", "Gewenste verkoopprijs", "number", false],
] as const;
const uploads = [["voorkant", "Voorkant"], ["achterkant", "Achterkant"], ["interieur", "Interieur"], ["kilometerfoto", "Kilometerstand"], ["schadefoto", "Eventuele schade"]] as const;

export default function AutoVerkoopFormulier() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const inputClass = "rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-950 outline-none transition placeholder:text-neutral-400 hover:border-neutral-300 focus:border-[#ffc20e] focus:bg-white focus:ring-4 focus:ring-[#ffc20e]/20";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("type", "waardebepaling");
    try {
      const response = await fetch("/api/contact", { method: "POST", body: data });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Verzenden is mislukt.");
      setStatus("sent");
      form.reset();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Verzenden is mislukt.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} encType="multipart/form-data" className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8">
      <div className="mb-6"><p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-700">Uw wagen</p><h2 className="mt-2 text-2xl font-black text-neutral-950">Vraag een waardebepaling aan</h2><p className="mt-3 text-sm leading-6 text-neutral-600">Vul zoveel mogelijk gegevens in. Hoe vollediger de informatie, hoe gerichter wij kunnen reageren.</p></div>
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map(([name, label, type, required]) => <div key={name} className="grid gap-1.5"><label htmlFor={`sell-${name}`} className="text-xs font-black uppercase tracking-wide text-neutral-600">{label}{required ? " *" : ""}</label><input id={`sell-${name}`} name={name} type={type} required={required} autoComplete={name === "naam" ? "name" : name === "telefoon" ? "tel" : name === "email" ? "email" : undefined} className={inputClass} /></div>)}
        <label className="grid gap-1.5 text-xs font-black uppercase tracking-wide text-neutral-600">Staat van de wagen<select name="staat" defaultValue="" className={inputClass}><option value="" disabled>Kies een optie</option><option>Uitstekend</option><option>Goed</option><option>Redelijk</option></select></label>
        <label className="grid gap-1.5 text-xs font-black uppercase tracking-wide text-neutral-600">Is de wagen gekeurd?<select name="gekeurd" defaultValue="" className={inputClass}><option value="" disabled>Kies een optie</option><option>Ja</option><option>Nee</option></select></label>
        <label className="grid gap-1.5 text-xs font-black uppercase tracking-wide text-neutral-600">Zijn er schadepunten?<select name="schade" defaultValue="" className={inputClass}><option value="" disabled>Kies een optie</option><option>Nee</option><option>Ja</option></select></label>
        <label className="grid gap-1.5 text-xs font-black uppercase tracking-wide text-neutral-600">Onderhoudshistoriek<input name="onderhoudshistoriek" className={inputClass} /></label>
      </div>
      <label className="mt-4 grid gap-1.5 text-xs font-black uppercase tracking-wide text-neutral-600">Extra opmerkingen<textarea name="opmerkingen" rows={5} className={`${inputClass} w-full`} /></label>
      <p className="mt-6 text-sm font-black text-neutral-950">Foto&apos;s van uw wagen <span className="font-medium text-neutral-500">(JPG, PNG of WebP, max. 5 MB per foto)</span></p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">{uploads.map(([name, label]) => <label key={name} className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-4 text-sm font-semibold text-neutral-600 transition hover:border-[#ffc20e] hover:bg-yellow-50"><Upload className="h-5 w-5 text-yellow-700" />Upload {label}<input name={name} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" /></label>)}</div>
      <div className="hidden" aria-hidden="true"><label htmlFor="sell-website">Website</label><input id="sell-website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <p className="mt-5 text-xs leading-5 text-neutral-500">Door dit formulier te versturen gaat u akkoord met ons <Link href="/privacy" className="font-bold underline">privacybeleid</Link>.</p>
      <button disabled={status === "sending"} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ffc20e] px-7 py-4 font-black text-neutral-950 transition hover:bg-[#e6ad00] disabled:cursor-wait disabled:opacity-70 md:w-auto">{status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}{status === "sending" ? "Bezig met verzenden" : "Vraag waardebepaling aan"}</button>
      <div aria-live="polite">{status === "sent" && <p className="mt-5 flex gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"><CheckCircle2 className="h-5 w-5" />Uw aanvraag is verzonden. Wij nemen zo snel mogelijk contact op.</p>}{status === "error" && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}</div>
    </form>
  );
}
