"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { cookiePreferenceEvent, cookiePreferenceKey } from "./CookieConsent";

export default function GoogleMapEmbed() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    function update(event) {
      const preference = event?.detail || window.localStorage.getItem(cookiePreferenceKey);
      setAllowed(preference === "all");
    }
    update();
    window.addEventListener(cookiePreferenceEvent, update);
    return () => window.removeEventListener(cookiePreferenceEvent, update);
  }, []);

  function allowMaps() {
    window.localStorage.setItem(cookiePreferenceKey, "all");
    window.dispatchEvent(new CustomEvent(cookiePreferenceEvent, { detail: "all" }));
  }

  if (!allowed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#eceeed] px-6 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"><MapPin className="h-5 w-5" /></span>
        <p className="mt-4 text-sm font-black">Google Maps is geblokkeerd</p>
        <p className="mt-1 max-w-xs text-xs leading-5 text-neutral-500">Geef toestemming voor externe diensten om de interactieve kaart te laden.</p>
        <button type="button" onClick={allowMaps} className="mt-4 h-9 rounded-md bg-neutral-950 px-5 text-[11px] font-bold text-white">Google Maps toestaan</button>
      </div>
    );
  }

  return (
    <iframe
      title="Google Maps-locatie van NEM Motors"
      src="https://www.google.com/maps?q=Ambachtslaan+5%2F10%2C+3665+As%2C+Belgium&output=embed"
      className="absolute inset-0 h-full w-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}
