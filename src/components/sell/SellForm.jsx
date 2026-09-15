"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, FileImage, Gauge, Mail, Phone, ShieldCheck } from "lucide-react";

const steps = ["Voertuiggegevens", "Staat en foto's", "Contactgegevens"];
const initialData = {
  brand: "",
  model: "",
  year: "",
  mileage: "",
  fuel: "",
  transmission: "",
  vin: "",
  history: "",
  damage: "",
  roadworthy: "",
  keys: "",
  notes: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  postalCode: "",
  contactMoment: "",
  privacy: false,
};

const inputClass = "mt-2 h-12 w-full rounded-sm border border-white/10 bg-neutral-950 px-4 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-white/50 focus:ring-2 focus:ring-white/10";
const selectClass = `${inputClass} appearance-none`;

function Field({ label, name, value, onChange, placeholder, type = "text", required = false }) {
  return <label className="block text-xs font-semibold text-neutral-300">{label}{required && <span className="ml-1 text-white" aria-hidden="true">*</span>}
    <input name={name} value={value} onChange={onChange} placeholder={placeholder} type={type} required={required} className={inputClass} />
  </label>;
}

function SelectField({ label, name, value, onChange, children, required = false }) {
  return <label className="block text-xs font-semibold text-neutral-300">{label}{required && <span className="ml-1 text-white" aria-hidden="true">*</span>}
    <select name={name} value={value} onChange={onChange} required={required} className={selectClass}>
      <option value="">Maak een keuze</option>
      {children}
    </select>
  </label>;
}

export default function SellForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update(event) {
    const { name, value, type, checked } = event.target;
    setData((previous) => ({ ...previous, [name]: type === "checkbox" ? checked : value }));
    setError("");
  }

  function next(event) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    setStep((previous) => Math.min(previous + 1, steps.length - 1));
    setError("");
  }

  function submit(event) {
    event.preventDefault();
    if (!data.privacy) {
      setError("Vink aan dat u akkoord gaat met het privacybeleid.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return <div className="rounded-lg border border-white/10 bg-[#171717] p-8 text-center sm:p-12">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-neutral-950"><Check aria-hidden="true" /></div>
      <h2 className="mt-6 text-2xl font-black text-white">Uw aanvraag is ontvangen</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-neutral-400">Bedankt voor uw aanvraag. We nemen zo snel mogelijk contact met u op voor een eerste waardebepaling.</p>
    </div>;
  }

  return <div className="rounded-lg border border-white/10 bg-[#171717] p-5 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">
    <div className="mb-8 flex items-center justify-between gap-4">
      <div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">Uw aanvraag</p><h2 className="mt-2 text-2xl font-black text-white">Ontvang uw waardebepaling</h2></div>
      <span className="text-xs font-semibold text-neutral-500">Stap {step + 1} van {steps.length}</span>
    </div>
    <div className="mb-10" aria-label="Voortgang aanvraag">
      <div className="flex items-center gap-2">
        {steps.map((label, index) => <div key={label} className="flex min-w-0 flex-1 items-center gap-2"><div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${index <= step ? "bg-white text-neutral-950" : "bg-neutral-800 text-neutral-500"}`}>{index < step ? <Check className="h-4 w-4" /> : index + 1}</div><span className={`hidden text-[11px] font-semibold sm:block ${index === step ? "text-white" : "text-neutral-500"}`}>{label}</span>{index < steps.length - 1 && <div className={`h-px flex-1 ${index < step ? "bg-white" : "bg-neutral-800"}`} />}</div>)}
      </div>
    </div>

    {step === 0 && <form onSubmit={next} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Merk" name="brand" value={data.brand} onChange={update} placeholder="Bijv. BMW" required />
        <Field label="Model" name="model" value={data.model} onChange={update} placeholder="Bijv. 320i" required />
        <Field label="Bouwjaar" name="year" value={data.year} onChange={update} placeholder="Bijv. 2021" type="number" required />
        <Field label="Kilometerstand" name="mileage" value={data.mileage} onChange={update} placeholder="Bijv. 65.000" type="number" required />
        <SelectField label="Brandstof" name="fuel" value={data.fuel} onChange={update} required><option>Benzine</option><option>Diesel</option><option>Hybride</option><option>Elektrisch</option></SelectField>
        <SelectField label="Transmissie" name="transmission" value={data.transmission} onChange={update} required><option>Automaat</option><option>Handgeschakeld</option></SelectField>
      </div>
      <Field label="Chassisnummer (optioneel)" name="vin" value={data.vin} onChange={update} placeholder="17 tekens" />
      <div className="flex justify-end border-t border-white/10 pt-6"><button type="submit" className="inline-flex h-12 items-center gap-2 rounded-sm bg-white px-6 text-sm font-black text-neutral-950 transition hover:bg-neutral-200">Volgende stap <ArrowRight className="h-4 w-4" /></button></div>
    </form>}

    {step === 1 && <form onSubmit={next} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField label="Onderhoudshistorie" name="history" value={data.history} onChange={update} required><option>Volledig aanwezig</option><option>Gedeeltelijk aanwezig</option><option>Niet aanwezig</option></SelectField>
        <SelectField label="Is er schade aanwezig?" name="damage" value={data.damage} onChange={update} required><option>Nee</option><option>Ja, lichte schade</option><option>Ja, ernstige schade</option></SelectField>
        <SelectField label="Is de auto rijklaar?" name="roadworthy" value={data.roadworthy} onChange={update} required><option>Ja</option><option>Nee</option></SelectField>
        <SelectField label="Aantal sleutels" name="keys" value={data.keys} onChange={update} required><option>1</option><option>2</option><option>3 of meer</option></SelectField>
      </div>
      <label className="block text-xs font-semibold text-neutral-300">Extra informatie<textarea name="notes" value={data.notes} onChange={update} rows="4" placeholder="Vertel ons iets meer over uw auto..." className={`${inputClass} h-auto py-3`} /></label>
      <div><p className="text-xs font-semibold text-neutral-300">Foto&apos;s van uw auto <span className="font-normal text-neutral-500">(optioneel)</span></p><div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{["Voorkant", "Achterkant", "Zijkant", "Interieur", "Eventuele schade"].map((label) => <label key={label} className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-white/15 bg-neutral-950 px-3 py-5 text-center text-[11px] text-neutral-500 transition hover:border-white/50 hover:text-white"><FileImage className="h-5 w-5" /><span>{label}</span><input type="file" accept="image/*" className="sr-only" /></label>)}</div></div>
      <div className="flex justify-between border-t border-white/10 pt-6"><button type="button" onClick={() => setStep(0)} className="inline-flex h-12 items-center gap-2 rounded-sm border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-white"><ArrowLeft className="h-4 w-4" /> Terug</button><button type="submit" className="inline-flex h-12 items-center gap-2 rounded-sm bg-white px-6 text-sm font-black text-neutral-950 transition hover:bg-neutral-200">Volgende stap <ArrowRight className="h-4 w-4" /></button></div>
    </form>}

    {step === 2 && <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Voornaam" name="firstName" value={data.firstName} onChange={update} placeholder="Uw voornaam" required />
        <Field label="Achternaam" name="lastName" value={data.lastName} onChange={update} placeholder="Uw achternaam" required />
        <Field label="E-mailadres" name="email" value={data.email} onChange={update} placeholder="naam@email.be" type="email" required />
        <Field label="Telefoonnummer" name="phone" value={data.phone} onChange={update} placeholder="+32 ..." type="tel" required />
        <Field label="Postcode" name="postalCode" value={data.postalCode} onChange={update} placeholder="3665" required />
        <SelectField label="Voorkeursmoment voor contact" name="contactMoment" value={data.contactMoment} onChange={update} required><option>Ochtend</option><option>Middag</option><option>Avond</option><option>Geen voorkeur</option></SelectField>
      </div>
      <label className="flex items-start gap-3 text-xs leading-5 text-neutral-400"><input type="checkbox" name="privacy" checked={data.privacy} onChange={update} className="mt-1 h-4 w-4 shrink-0 accent-white" />Ik ga akkoord met het privacybeleid en geef toestemming om contact met mij op te nemen.</label>
      {error && <p role="alert" className="rounded-sm border border-white/20 bg-neutral-900 px-4 py-3 text-xs font-semibold text-white">{error}</p>}
      <div className="flex flex-col-reverse justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center"><button type="button" onClick={() => setStep(1)} className="inline-flex h-12 items-center gap-2 rounded-sm border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-white"><ArrowLeft className="h-4 w-4" /> Terug</button><div className="text-right"><button type="submit" className="inline-flex h-12 items-center gap-2 rounded-sm bg-white px-6 text-sm font-black text-neutral-950 transition hover:bg-neutral-200">Ontvang mijn waardebepaling <ArrowRight className="h-4 w-4" /></button><p className="mt-2 text-[11px] text-neutral-500">Gratis en volledig vrijblijvend.</p></div></div>
    </form>}
  </div>;
}
