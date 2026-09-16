"use client";

import { useState } from "react";
import { ArrowRight, Camera, Check, ChevronDown, LockKeyhole } from "lucide-react";

const inputClass = "h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-[11px] text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100";

function Field({ label, name, placeholder, type = "text", required = false, className = "" }) {
  return (
    <label className={`block text-[11px] font-medium text-neutral-700 ${className}`}>
      <span className="mb-1.5 block">{label}</span>
      <input className={inputClass} name={name} type={type} placeholder={placeholder} required={required} />
    </label>
  );
}

function SelectField({ label, name, placeholder, options }) {
  return (
    <label className="block text-[11px] font-medium text-neutral-700">
      <span className="mb-1.5 block">{label}</span>
      <span className="relative block">
        <select className={`${inputClass} appearance-none pr-8 text-neutral-500`} name={name} defaultValue="" required>
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-700 transition-transform duration-200" aria-hidden="true" />
      </span>
    </label>
  );
}

export default function SellForm() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[490px] flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.035)]">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950 text-white"><Check className="h-5 w-5" /></span>
        <h2 className="mt-5 text-2xl font-black tracking-tight">Aanvraag ontvangen</h2>
        <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-500">Bedankt. We nemen persoonlijk contact met u op om uw wagen te bespreken.</p>
        <button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-xs font-bold underline underline-offset-4">Nog een aanvraag doen</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="self-stretch rounded-lg border border-neutral-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.035)] sm:p-6">
      <h2 className="text-[23px] font-black leading-tight tracking-[-0.035em]">Wat wilt u verkopen?</h2>
      <p className="mt-1 text-xs text-neutral-500">Vul de gegevens van uw wagen in.</p>

      <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
        <SelectField label="Merk" name="brand" placeholder="Selecteer merk" options={["Audi", "BMW", "Mercedes-Benz", "Tesla", "Toyota", "Volkswagen", "Volvo"]} />
        <Field label="Model" name="model" placeholder="Bijvoorbeeld A3" required />
        <Field label="Eerste inschrijving" name="registration" placeholder="MM / JJJJ" required />
        <Field label="Kilometerstand" name="mileage" placeholder="Bijvoorbeeld 110.000" inputMode="numeric" required />
        <SelectField label="Brandstof" name="fuel" placeholder="Selecteer brandstof" options={["Benzine", "Diesel", "Hybride", "Elektrisch"]} />
        <SelectField label="Transmissie" name="transmission" placeholder="Selecteer transmissie" options={["Automaat", "Handgeschakeld"]} />
      </div>

      <label className="mt-4 block text-[11px] font-medium text-neutral-700">
        <span className="mb-1.5 block">Voeg foto&apos;s toe <span className="text-neutral-400">(optioneel)</span></span>
        <span className="flex h-14 cursor-pointer items-center justify-center gap-3 rounded-md border border-dashed border-neutral-300 text-[10px] text-neutral-500 transition hover:border-neutral-500 hover:bg-neutral-50">
          <Camera className="h-5 w-5 text-neutral-900" strokeWidth={1.7} aria-hidden="true" />
          Sleep uw foto&apos;s hier naartoe of klik om te kiezen
          <input className="sr-only" type="file" name="photos" accept="image/*" multiple />
        </span>
      </label>

      <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
        <Field label="Naam" name="name" placeholder="Uw naam" required />
        <Field label="Telefoon" name="phone" placeholder="Bijvoorbeeld 0471 23 45 67" type="tel" required />
        <Field label="E-mailadres" name="email" placeholder="Bijvoorbeeld naam@email.be" type="email" required className="sm:col-span-2" />
      </div>

      <p className="mt-3 flex items-center gap-2 text-[9px] text-neutral-500">
        <LockKeyhole className="h-3.5 w-3.5 text-neutral-800" aria-hidden="true" />
        We gebruiken uw gegevens om uw aanvraag te behandelen.
      </p>

      <button type="submit" className="group mt-4 flex h-10 w-full items-center justify-center gap-3 rounded-md bg-neutral-950 px-5 text-xs font-bold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2">
        Vraag een voorstel aan
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </button>
    </form>
  );
}
