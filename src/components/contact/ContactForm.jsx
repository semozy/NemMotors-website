"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const initialValues = { name: "", email: "", message: "" };
const inputClass = "w-full rounded-md border border-neutral-200 bg-white px-3 text-xs text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100";

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [sent, setSent] = useState(false);

  function update(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    setSent(true);
    setValues(initialValues);
  }

  if (sent) {
    return (
      <div className="mt-5 flex min-h-[175px] flex-col items-center justify-center text-center" role="status">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-white"><Check className="h-4 w-4" /></span>
        <p className="mt-4 text-sm font-bold">Uw bericht is ontvangen.</p>
        <p className="mt-1 text-xs text-neutral-500">We nemen zo snel mogelijk contact met u op.</p>
        <button type="button" onClick={() => setSent(false)} className="mt-4 text-xs font-semibold underline underline-offset-4">Nog een bericht sturen</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sr-only" htmlFor="contact-name">Naam</label>
        <input id="contact-name" className={`${inputClass} h-10`} name="name" value={values.name} onChange={update} placeholder="Naam" autoComplete="name" required />
        <label className="sr-only" htmlFor="contact-email">E-mailadres</label>
        <input id="contact-email" className={`${inputClass} h-10`} name="email" type="email" value={values.email} onChange={update} placeholder="E-mailadres" autoComplete="email" required />
      </div>
      <label className="sr-only" htmlFor="contact-message">Bericht</label>
      <textarea id="contact-message" className={`${inputClass} mt-4 min-h-[92px] resize-y py-3`} name="message" value={values.message} onChange={update} placeholder="Bericht" required />
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[10px] text-neutral-500 underline decoration-neutral-400 underline-offset-4">Ons privacybeleid</span>
        <button type="submit" className="group flex h-10 items-center justify-center gap-3 rounded-md bg-neutral-950 px-6 text-xs font-bold text-white transition hover:bg-neutral-800">
          Verstuur bericht <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
