"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Send } from "lucide-react";

interface ContactFormProps { title: string; defaultMessage: string; }

export default function ContactFormulier({ title, defaultMessage }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const inputClass = "w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm font-semibold text-neutral-950 outline-none transition placeholder:text-neutral-400 hover:border-neutral-300 focus:border-[#ffc20e] focus:bg-white focus:ring-4 focus:ring-[#ffc20e]/20";
  const labelClass = "mb-1.5 block text-xs font-black uppercase tracking-[0.14em] text-neutral-500";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...Object.fromEntries(new FormData(form).entries()), type: "contact" }) });
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
    <form onSubmit={submit} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8">
      <div className="mb-6"><p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-700">Bericht</p><h3 className="mt-2 text-3xl font-black tracking-tight text-neutral-950">{title}</h3><p className="mt-3 text-sm leading-6 text-neutral-600">Laat uw gegevens achter. Wij nemen zo snel mogelijk contact met u op.</p></div>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label htmlFor="naam" className={labelClass}>Naam</label><input id="naam" name="naam" autoComplete="name" required placeholder="Uw volledige naam" className={inputClass} /></div>
          <div><label htmlFor="telefoon" className={labelClass}>Telefoon</label><input id="telefoon" name="telefoon" type="tel" autoComplete="tel" required placeholder="Uw telefoonnummer" className={inputClass} /></div>
        </div>
        <div><label htmlFor="email" className={labelClass}>E-mailadres</label><input id="email" name="email" autoComplete="email" required type="email" placeholder="Uw e-mailadres" className={inputClass} /></div>
        <div><label htmlFor="onderwerp" className={labelClass}>Onderwerp</label><input id="onderwerp" name="onderwerp" placeholder="Waarover wilt u contact opnemen?" className={inputClass} /></div>
        <div><label htmlFor="bericht" className={labelClass}>Bericht</label><textarea id="bericht" name="bericht" required rows={6} defaultValue={defaultMessage} className={`${inputClass} resize-none`} /></div>
        <div className="hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      </div>
      <p className="mt-5 text-xs leading-5 text-neutral-500">Door dit formulier te versturen gaat u akkoord met de verwerking van uw gegevens zoals beschreven in ons <Link href="/privacy" className="font-bold underline">privacybeleid</Link>.</p>
      <button disabled={status === "sending"} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ffc20e] px-8 py-4 font-black text-neutral-950 transition hover:bg-[#e6ad00] disabled:cursor-wait disabled:opacity-70">{status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Bezig met verzenden</> : <>Verstuur aanvraag <Send className="h-4 w-4" /></>}</button>
      <div aria-live="polite">
        {status === "sent" && <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /><p>Bedankt. Uw bericht is verzonden. Wij nemen zo snel mogelijk contact met u op.</p></div>}
        {status === "error" && <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}
      </div>
    </form>
  );
}
