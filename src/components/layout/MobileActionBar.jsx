"use client";

import { Phone, MessageCircle, MapPin } from "lucide-react";
import { siteGegevens } from "@/components/layout/Footer";

export default function MobileActionBar() {
  // Verwijder spaties en plusjes voor WhatsApp
  const waNumber = siteGegevens.whatsappNumber || "32473563404";
  const waLink = `https://wa.me/${waNumber}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex h-16 w-full items-center justify-between border-t border-neutral-200 bg-white pb-safe lg:hidden">
      <a 
        href={`tel:${siteGegevens.phoneNumber.replace(/\s+/g, "")}`} 
        className="flex h-full flex-1 flex-col items-center justify-center gap-1 text-neutral-600 transition hover:bg-neutral-50 active:bg-neutral-100"
      >
        <Phone className="h-5 w-5" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Bellen</span>
      </a>

      <div className="h-8 w-px bg-neutral-200" />

      <a 
        href={waLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex h-full flex-1 flex-col items-center justify-center gap-1 text-[#25D366] transition hover:bg-neutral-50 active:bg-neutral-100"
      >
        <MessageCircle className="h-5 w-5 fill-current" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">WhatsApp</span>
      </a>

      <div className="h-8 w-px bg-neutral-200" />

      <a 
        href="https://www.google.com/maps/search/?api=1&query=Ambachtslaan+5%2F10%2C+3665+As"
        target="_blank" 
        rel="noopener noreferrer"
        className="flex h-full flex-1 flex-col items-center justify-center gap-1 text-neutral-600 transition hover:bg-neutral-50 active:bg-neutral-100"
      >
        <MapPin className="h-5 w-5" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Route</span>
      </a>
    </div>
  );
}
