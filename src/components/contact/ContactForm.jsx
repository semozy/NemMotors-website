"use client";

import { useState } from "react";

const initialValues = { firstName: "", lastName: "", email: "", phone: "", subject: "", message: "", privacy: false };

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSent(false);
  }

  function submitForm(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!values.firstName.trim()) nextErrors.firstName = "Vul je voornaam in.";
    if (!values.lastName.trim()) nextErrors.lastName = "Vul je achternaam in.";
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Vul een geldig e-mailadres in.";
    if (!values.subject) nextErrors.subject = "Kies een onderwerp.";
    if (!values.message.trim()) nextErrors.message = "Vul je bericht in.";
    if (!values.privacy) nextErrors.privacy = "Ga akkoord met het privacybeleid.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSent(true);
      setValues(initialValues);
    }
  }

  const inputClass = "mt-2 min-h-11 w-full rounded-sm border border-white/10 bg-neutral-950 px-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-white/50 focus:ring-2 focus:ring-white/20";
  const errorClass = "mt-1 text-xs text-red-300";

  return <form onSubmit={submitForm} noValidate className="mt-7 space-y-5">
    {sent && <p role="status" className="border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.</p>}
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="text-sm text-neutral-300">Voornaam<input className={inputClass} name="firstName" value={values.firstName} onChange={updateField} autoComplete="given-name" />{errors.firstName && <span className={errorClass}>{errors.firstName}</span>}</label>
      <label className="text-sm text-neutral-300">Achternaam<input className={inputClass} name="lastName" value={values.lastName} onChange={updateField} autoComplete="family-name" />{errors.lastName && <span className={errorClass}>{errors.lastName}</span>}</label>
    </div>
    <label className="block text-sm text-neutral-300">E-mailadres<input className={inputClass} name="email" type="email" value={values.email} onChange={updateField} autoComplete="email" />{errors.email && <span className={errorClass}>{errors.email}</span>}</label>
    <label className="block text-sm text-neutral-300">Telefoonnummer <span className="text-neutral-600">(optioneel)</span><input className={inputClass} name="phone" type="tel" value={values.phone} onChange={updateField} autoComplete="tel" /></label>
    <label className="block text-sm text-neutral-300">Onderwerp<select className={inputClass} name="subject" value={values.subject} onChange={updateField}><option value="">Kies een onderwerp</option><option>Interesse in een wagen</option><option>Proefrit aanvragen</option><option>Auto verkopen</option><option>Onderhoud of herstelling</option><option>Financiering</option><option>Andere vraag</option></select>{errors.subject && <span className={errorClass}>{errors.subject}</span>}</label>
    <label className="block text-sm text-neutral-300">Bericht<textarea className={`${inputClass} min-h-36 resize-y py-3`} name="message" value={values.message} onChange={updateField} />{errors.message && <span className={errorClass}>{errors.message}</span>}</label>
    <label className="flex items-start gap-3 text-sm text-neutral-400"><input className="mt-1 h-4 w-4 accent-red-500" name="privacy" type="checkbox" checked={values.privacy} onChange={updateField} /><span>Ik ga akkoord met het privacybeleid.{errors.privacy && <span className={`block ${errorClass}`}>{errors.privacy}</span>}</span></label>
    <button type="submit" className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-white px-5 text-sm font-bold text-neutral-950 transition hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Verstuur bericht</button>
  </form>;
}