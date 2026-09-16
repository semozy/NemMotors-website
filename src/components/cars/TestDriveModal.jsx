"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays, Check, Clock3, Info, LockKeyhole, Mail, MessageSquare, Phone, UserRound, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const inputClass = "h-11 w-full rounded-md border border-neutral-300 bg-white pl-10 pr-3 text-xs text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-600 focus:ring-2 focus:ring-neutral-100";

export default function TestDriveModal({ car }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const closeButtonRef = useRef(null);
  const name = `${car.brand} ${car.model}`;

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

  function submit(event) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    setSubmitted(true);
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="flex h-11 w-full items-center justify-center gap-3 rounded-md bg-neutral-950 text-xs font-bold text-white transition hover:bg-neutral-800">
        <CalendarDays className="h-4 w-4" aria-hidden="true" />
        Plan een proefrit
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
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
                  <fieldset>
                    <legend className="text-base font-black">Wanneer wilt u langskomen?</legend>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      <label className="block text-[11px] font-medium">Voorkeursdatum<span className="relative mt-1.5 block"><CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" /><input type="date" name="date" required className={inputClass} /></span></label>
                      <label className="block text-[11px] font-medium">Voorkeurstijd<span className="relative mt-1.5 block"><Clock3 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" /><select name="time" required defaultValue="" className={`${inputClass} appearance-none`}><option value="" disabled>Kies een tijdstip</option><option>09:00 – 11:00</option><option>11:00 – 13:00</option><option>13:00 – 15:00</option><option>15:00 – 18:00</option></select></span></label>
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

                  <p className="mt-3 flex items-center gap-2 text-[10px] text-neutral-500"><LockKeyhole className="h-4 w-4" />We gebruiken uw gegevens om uw proefrit te plannen. <span className="underline underline-offset-2">Privacybeleid</span></p>

                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-neutral-200 pt-5">
                    <button type="button" onClick={closeModal} className="h-11 rounded-md border border-neutral-300 px-7 text-xs font-bold transition hover:border-neutral-950">Annuleren</button>
                    <button type="submit" className="group flex h-11 items-center gap-3 rounded-md bg-neutral-950 px-7 text-xs font-bold text-white transition hover:bg-neutral-800">Proefrit aanvragen <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" /></button>
                  </div>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
