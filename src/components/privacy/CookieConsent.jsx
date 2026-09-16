"use client";

import { useEffect, useState } from "react";
import { Cookie, ShieldCheck, X } from "lucide-react";

export const cookiePreferenceKey = "nem-motors-cookie-preference";
export const cookiePreferenceEvent = "nem-cookie-preference-change";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [hasPreference, setHasPreference] = useState(false);

  useEffect(() => {
    function readPreference() {
      const storedPreference = window.localStorage.getItem(cookiePreferenceKey);
      setHasPreference(Boolean(storedPreference));
      setOpen(!storedPreference);
    }
    function openSettings() {
      setOpen(true);
    }
    readPreference();
    window.addEventListener("nem-open-cookie-settings", openSettings);
    return () => window.removeEventListener("nem-open-cookie-settings", openSettings);
  }, []);

  function savePreference(value) {
    window.localStorage.setItem(cookiePreferenceKey, value);
    window.dispatchEvent(new CustomEvent(cookiePreferenceEvent, { detail: value }));
    setHasPreference(true);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/35 p-4 sm:items-center" role="presentation">
      <section role="dialog" aria-modal="true" aria-labelledby="cookie-title" className="relative w-full max-w-[560px] rounded-xl border border-neutral-200 bg-white p-6 text-neutral-950 shadow-[0_24px_70px_rgba(0,0,0,0.3)] sm:p-7">
        {hasPreference && (
          <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100" aria-label="Cookievoorkeuren sluiten"><X className="h-4 w-4" /></button>
        )}
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100"><Cookie className="h-5 w-5" /></span>
        <h2 id="cookie-title" className="mt-4 text-2xl font-black tracking-[-0.035em]">Uw privacy, uw keuze</h2>
        <p className="mt-3 text-sm leading-6 text-neutral-600">We gebruiken noodzakelijke opslag om favorieten, vergelijkingen en uw cookiekeuze te bewaren. Met uw toestemming laden we ook externe diensten zoals Google Maps.</p>
        <div className="mt-4 flex items-start gap-3 rounded-lg bg-neutral-50 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
          <div><p className="text-xs font-bold">Noodzakelijke functies blijven altijd actief</p><p className="mt-1 text-[11px] leading-5 text-neutral-500">Daarmee werken uw favorieten en vergelijking zonder advertentiecookies.</p></div>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => savePreference("necessary")} className="h-11 rounded-md border border-neutral-300 px-5 text-xs font-bold transition hover:border-neutral-950">Alleen noodzakelijk</button>
          <button type="button" onClick={() => savePreference("all")} className="h-11 rounded-md bg-neutral-950 px-6 text-xs font-bold text-white transition hover:bg-neutral-800">Alles accepteren</button>
        </div>
      </section>
    </div>
  );
}

export function CookieSettingsButton() {
  return <button type="button" onClick={() => window.dispatchEvent(new Event("nem-open-cookie-settings"))} className="hover:text-white">Cookievoorkeuren</button>;
}
