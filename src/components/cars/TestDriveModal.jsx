"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Clock3, ChevronDown, Info, LockKeyhole, Mail, MessageSquare, Phone, UserRound, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const inputClass = "h-11 w-full rounded-md border border-neutral-300 bg-white pl-10 pr-3 text-xs text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-600 focus:ring-2 focus:ring-neutral-100";

export default function TestDriveModal({ car }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef(null);
  const name = `${car.brand} ${car.model}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    function closeOnEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function closeModal() {
    setOpen(false);
    setSubmitted(false);
  }

  const [submitting, setSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
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
      const data = {
        vehicle_id: car.id,
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        date: formData.get("date"),
        time: formData.get("time"),
        message: formData.get("message") || "",
      };

      const response = await fetch("/api/requests/test-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Er is iets misgegaan bij het aanvragen.");
      }
    } catch (error) {
      alert("Er is een netwerkfout opgetreden.");
    } finally {
      setSubmitting(false);
    }
  }
  const dateObj = selectedDate ? new Date(selectedDate) : null;
  const day = dateObj?.getDay();

  let timeSlots = [];
  if (day === 0) {
    timeSlots = ["Op afspraak"];
  } else if (day >= 1 && day <= 4) {
    for (let hour = 10; hour <= 18; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 18) timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  } else if (day === 5 || day === 6) {
    for (let hour = 10; hour <= 17; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 17) timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="flex h-11 w-full items-center justify-center gap-3 rounded-md bg-neutral-950 text-xs font-bold text-white transition hover:bg-neutral-800">
        <CalendarDays className="h-4 w-4" aria-hidden="true" />
        Plan een proefrit
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>

      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/65 p-4 backdrop-blur-[1px]" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="test-drive-title" className="relative my-auto w-full max-w-[610px] rounded-lg bg-white p-6 text-neutral-950 shadow-2xl sm:p-8">
            <button ref={closeButtonRef} type="button" onClick={closeModal} className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-neutral-100" aria-label="Proefritvenster sluiten">
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-950 text-white"><Check className="h-6 w-6" /></span>
                <h2 id="test-drive-title" className="mt-6 text-3xl font-black tracking-tight">Proefrit aangevraagd</h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">Bedankt. We nemen contact met u op om het gekozen moment voor de {name} te bevestigen.</p>
                <button type="button" onClick={closeModal} className="mt-7 h-11 rounded-md bg-neutral-950 px-7 text-xs font-bold text-white">Sluiten</button>
              </div>
            ) : (
              <>
                <h2 id="test-drive-title" className="pr-10 text-[31px] font-black leading-none tracking-[-0.045em]">Plan uw proefrit</h2>
                <p className="mt-2 text-xs text-neutral-500">Kies uw voorkeursmoment. Wij nemen contact op om uw afspraak te bevestigen.</p>

                <div className="mt-5 flex items-center gap-4 rounded-lg bg-neutral-100 p-3">
                  <div className="relative h-[78px] w-[145px] shrink-0 overflow-hidden rounded-md bg-neutral-200">
                    {car.images?.[0] && <Image src={car.images[0]} alt={name} fill sizes="145px" className="object-cover" />}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-black">{name}</h3>
                    <p className="mt-1 text-xs text-neutral-500">{car.trim || car.model} <span className="px-1.5">•</span> {car.price > 0 ? formatPrice(car.price) : "Prijs op aanvraag"}</p>
                  </div>
                </div>

                <form onSubmit={submit} className="mt-5">
                  <input type="text" name="bot_field" className="hidden" tabIndex="-1" autoComplete="off" />
                  <fieldset>
                    <legend className="text-base font-black">Wanneer wilt u langskomen?</legend>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      <label className="block text-[11px] font-medium">Voorkeursdatum<span className="relative mt-1.5 block"><CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" /><input type="date" name="date" min={new Date().toISOString().split("T")[0]} required className={inputClass} value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(""); }} /></span></label>
                      <div className="block text-[11px] font-medium">
                        Voorkeurstijd
                        <div className="relative mt-1.5 block">
                          <select name="time" value={selectedTime} onChange={() => {}} required className="sr-only" tabIndex={-1} aria-hidden="true">
                            <option value="" disabled>{selectedDate ? "Kies een tijdstip" : "Kies eerst een datum"}</option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                          <details className="group relative">
                            <summary 
                              className={`${inputClass} flex cursor-pointer list-none items-center justify-between pr-3 marker:hidden [&::-webkit-details-marker]:hidden ${!selectedDate ? "opacity-60 pointer-events-none" : ""}`}
                              onClick={(e) => { if (!selectedDate) e.preventDefault(); }}
                            >
                              <Clock3 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                              <span className={`truncate ${selectedTime ? "text-neutral-900" : "text-neutral-400"}`}>
                                {selectedTime || (selectedDate ? "Kies een tijdstip" : "Kies eerst een datum")}
                              </span>
                              <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                            </summary>
                            <div className="absolute inset-x-0 top-full z-30 mt-1 grid grid-cols-2 gap-1 rounded-md border border-neutral-200 bg-white p-1.5 shadow-lg">
                              {timeSlots.map((time) => (
                                <button 
                                  key={time} 
                                  type="button" 
                                  onClick={(event) => { setSelectedTime(time); event.currentTarget.closest("details")?.removeAttribute("open"); }} 
                                  className={`rounded-md px-2 py-2 text-center text-[11px] font-medium transition ${selectedTime === time ? "bg-neutral-950 text-white" : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950"}`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </details>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 flex items-center gap-2 text-[10px] text-neutral-500"><Info className="h-4 w-4" />Uw gekozen moment is een voorkeur, nog geen bevestigde afspraak.</p>
                  </fieldset>

                  <fieldset className="mt-5">
                    <legend className="text-base font-black">Uw contactgegevens</legend>
                    <label className="mt-3 block text-[11px] font-medium">Naam<span className="relative mt-1.5 block"><UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" /><input name="name" required autoComplete="name" placeholder="Voor- en achternaam" className={inputClass} /></span></label>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      <label className="block text-[11px] font-medium">Telefoon<span className="relative mt-1.5 block"><Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" /><input type="tel" name="phone" required autoComplete="tel" placeholder="Uw telefoonnummer" className={inputClass} /></span></label>
                      <label className="block text-[11px] font-medium">E-mailadres<span className="relative mt-1.5 block"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" /><input type="email" name="email" required autoComplete="email" placeholder="naam@voorbeeld.be" className={inputClass} /></span></label>
                    </div>
                    <label className="mt-3 block text-[11px] font-medium">Opmerking <span className="text-neutral-400">(optioneel)</span><span className="relative mt-1.5 block"><MessageSquare className="absolute left-3 top-3 h-4 w-4 text-neutral-500" /><textarea name="message" rows="2" placeholder="Heeft u een vraag of een specifieke wens?" className={`${inputClass} h-auto min-h-[64px] resize-y py-3`} /></span></label>
                  </fieldset>

                  <p className="mt-3 flex items-center gap-2 text-[10px] text-neutral-500"><LockKeyhole className="h-4 w-4" />We gebruiken uw gegevens om uw proefrit te plannen. <Link href="/privacybeleid" className="underline underline-offset-2 hover:text-neutral-900 transition">Privacybeleid</Link></p>

                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-neutral-200 pt-5">
                    <button type="button" onClick={closeModal} className="h-11 rounded-md border border-neutral-300 px-7 text-xs font-bold transition hover:border-neutral-950">Annuleren</button>
                    <button type="submit" disabled={submitting} className="group flex h-11 items-center gap-3 rounded-md bg-neutral-950 px-7 text-xs font-bold text-white transition hover:bg-neutral-800 disabled:opacity-60">{submitting ? "Even geduld..." : "Proefrit aanvragen"} <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" /></button>
                  </div>
                </form>
              </>
            )}
          </section>
        </div>,
        document.body
      )}
    </>
  );
}
