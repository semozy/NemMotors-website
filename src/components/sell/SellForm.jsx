"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Camera, Check, ChevronDown, LockKeyhole } from "lucide-react";

const inputClass = "h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-[11px] text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100";

function Field({ label, name, placeholder, type = "text", required = false, className = "", pattern, title, min, max }) {
  return (
    <label className={`block text-[11px] font-medium text-neutral-700 ${className}`}>
      <span className="mb-1.5 block">{label}</span>
      <input className={inputClass} name={name} type={type} placeholder={placeholder} required={required} pattern={pattern} title={title} min={min} max={max} />
    </label>
  );
}

function TextareaField({ label, name, placeholder, required = false, className = "" }) {
  return (
    <label className={`block text-[11px] font-medium text-neutral-700 ${className}`}>
      <span className="mb-1.5 block">{label}</span>
      <textarea 
        className="w-full min-h-[80px] rounded-md border border-neutral-200 bg-white p-3 text-[11px] text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-100 resize-y" 
        name={name} 
        placeholder={placeholder} 
        required={required} 
      />
    </label>
  );
}

function SelectField({ label, name, placeholder, options }) {
  const [value, setValue] = useState("");

  function choose(event, option) {
    setValue(option);
    event.currentTarget.closest("details")?.removeAttribute("open");
  }

  return (
    <div className="block text-[11px] font-medium text-neutral-700">
      <span className="mb-1.5 block">{label}</span>
      <select className="sr-only" name={name} value={value} onChange={() => {}} required tabIndex={-1} aria-hidden="true">
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      <details className="group relative">
        <summary className={`${inputClass} flex cursor-pointer list-none items-center justify-between pr-3 text-neutral-500 marker:hidden [&::-webkit-details-marker]:hidden`}>
          <span className={value ? "text-neutral-900" : ""}>{value || placeholder}</span>
          <ChevronDown className="chevron-motion h-3.5 w-3.5 shrink-0 text-neutral-700 group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="absolute inset-x-0 top-full z-30 mt-1 max-h-48 overflow-y-auto rounded-md border border-neutral-200 bg-white py-1 shadow-lg">
          {options.map((option) => (
            <button key={option} type="button" onClick={(event) => choose(event, option)} className="block w-full px-3 py-2 text-left text-xs font-normal text-neutral-700 hover:bg-neutral-100">
              {option}
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}

export default function SellForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  function handleFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles(prev => {
        const combined = [...prev, ...newFiles];
        if (combined.length > 10) {
          alert("U kunt maximaal 10 foto's tegelijk toevoegen.");
          return combined.slice(0, 10);
        }
        return combined;
      });
    }
  }

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    
    setSubmitting(true);
    try {
      const formData = new FormData(form);
      // Remove the native file input's current value from formData
      formData.delete("photos");
      // Append all accumulated files to formData
      selectedFiles.forEach(file => {
        formData.append("photos", file);
      });

      const response = await fetch("/api/requests/sell", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Er is iets misgegaan bij het verzenden.");
      }
    } catch (error) {
      alert("Er is een netwerkfout opgetreden.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[490px] flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.035)]">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950 text-white"><Check className="h-5 w-5" /></span>
        <h2 className="mt-5 text-2xl font-black tracking-tight">Aanvraag ontvangen</h2>
        <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-500">Bedankt. We nemen persoonlijk contact met u op om uw wagen te bespreken.</p>
        <button type="button" onClick={() => { setSubmitted(false); setSelectedFiles([]); }} className="mt-6 text-xs font-bold underline underline-offset-4">Nog een aanvraag doen</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="self-stretch rounded-lg border border-neutral-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.035)] sm:p-6">
      <input type="text" name="bot_field" className="hidden" tabIndex="-1" autoComplete="off" />
      <h2 className="text-[23px] font-black leading-tight tracking-[-0.035em]">Wat wilt u verkopen?</h2>
      <p className="mt-1 text-xs text-neutral-500">Vul de gegevens van uw wagen in.</p>

      <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
        <Field label="Merk" name="brand" required />
        <Field label="Model" name="model" required />
        <Field label="Bouwjaar" name="registration" type="number" required min="1900" max={new Date().getFullYear() + 1} />
        <Field label="Kilometerstand" name="mileage" inputMode="numeric" required />
        <SelectField label="Brandstof" name="fuel" placeholder="Selecteer brandstof" options={["Benzine", "Diesel", "Elektrisch/Benzine", "Elektrisch/Diesel", "Elektrisch", "LPG"]} />
        <SelectField label="Transmissie" name="transmission" placeholder="Selecteer transmissie" options={["Automaat", "Manueel"]} />
        <Field label="Chassisnummer" name="chassis" required />
        <Field label="Gewenste prijs (€)" name="price" inputMode="numeric" />
      </div>

      <label className="mt-4 block text-[11px] font-medium text-neutral-700">
        <span className="mb-1.5 block">Voeg foto&apos;s toe <span className="text-neutral-400">(optioneel, max 10)</span></span>
        <span className="flex min-h-[56px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-neutral-300 p-3 text-center text-[10px] text-neutral-500 transition hover:border-neutral-500 hover:bg-neutral-50">
          {selectedFiles.length > 0 ? (
            <>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-neutral-900" strokeWidth={2} aria-hidden="true" />
                <span className="font-bold text-neutral-900">{selectedFiles.length} {selectedFiles.length === 1 ? "foto" : "foto's"} geselecteerd</span>
              </div>
              <span className="text-neutral-400 truncate max-w-[250px]">{selectedFiles.map(f => f.name).join(", ")}</span>
            </>
          ) : (
            <>
              <Camera className="h-5 w-5 text-neutral-900" strokeWidth={1.7} aria-hidden="true" />
              <span>Sleep uw foto&apos;s hier naartoe of klik om te kiezen</span>
            </>
          )}
          <input className="sr-only" type="file" name="photos" accept="image/*" multiple onChange={handleFileChange} />
        </span>
      </label>
      
      {selectedFiles.length > 0 && (
        <div className="mt-2 flex justify-end">
          <button type="button" onClick={() => setSelectedFiles([])} className="text-[10px] font-bold text-red-600 hover:underline">Wis alle foto&apos;s</button>
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
        <Field label="Naam" name="name" required />
        <Field label="Telefoon" name="phone" type="tel" required />
        <Field label="E-mailadres" name="email" type="email" required className="sm:col-span-2" />
        <TextareaField label="Opmerking (optioneel)" name="message" className="sm:col-span-2" />
      </div>

      <p className="mt-3 flex items-center gap-2 text-[9px] text-neutral-500">
        <LockKeyhole className="h-3.5 w-3.5 text-neutral-800" aria-hidden="true" />
        We gebruiken uw gegevens om uw aanvraag te behandelen. <Link href="/privacybeleid" className="underline underline-offset-2 hover:text-neutral-900 transition">Privacybeleid</Link>
      </p>

      <button type="submit" disabled={submitting} className="group mt-4 flex h-10 w-full items-center justify-center gap-3 rounded-md bg-neutral-950 px-5 text-xs font-bold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:opacity-60">
        {submitting ? "Bezig met verzenden..." : "Vraag een voorstel aan"}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </button>
    </form>
  );
}
