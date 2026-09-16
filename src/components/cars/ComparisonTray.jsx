"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, GitCompareArrows, X } from "lucide-react";

const storageKey = "nem-motors-comparison";

export default function ComparisonTray() {
  const pathname = usePathname();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    function readSelection(event) {
      if (Array.isArray(event?.detail)) {
        setIds(event.detail.map(String));
        return;
      }
      try {
        setIds(JSON.parse(window.localStorage.getItem(storageKey) || "[]").map(String));
      } catch {
        setIds([]);
      }
    }

    readSelection();
    window.addEventListener("nem-comparison-change", readSelection);
    window.addEventListener("storage", readSelection);
    window.addEventListener("pageshow", readSelection);
    document.addEventListener("visibilitychange", readSelection);
    return () => {
      window.removeEventListener("nem-comparison-change", readSelection);
      window.removeEventListener("storage", readSelection);
      window.removeEventListener("pageshow", readSelection);
      document.removeEventListener("visibilitychange", readSelection);
    };
  }, [pathname]);

  function clearSelection() {
    window.localStorage.setItem(storageKey, "[]");
    window.dispatchEvent(new CustomEvent("nem-comparison-change", { detail: [] }));
  }

  if (ids.length === 0 || pathname === "/vergelijken") return null;

  return (
    <aside className="fixed bottom-24 right-4 z-50 w-[250px] rounded-lg border border-neutral-200 bg-white p-4 text-neutral-950 shadow-[0_16px_45px_rgba(0,0,0,0.18)] sm:bottom-6 sm:right-6" aria-live="polite">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100"><GitCompareArrows className="h-4 w-4" /></span>
          <div><p className="text-sm font-black">Mijn vergelijking</p><p className="text-[10px] text-neutral-500">{ids.length} van maximaal 3 wagens</p></div>
        </div>
        <button type="button" onClick={clearSelection} className="p-1 text-neutral-400 hover:text-neutral-950" aria-label="Vergelijking wissen"><X className="h-4 w-4" /></button>
      </div>
      <Link href={`/vergelijken?autos=${ids.join(",")}`} className="group mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-md bg-neutral-950 text-[11px] font-bold text-white transition hover:bg-neutral-800">
        Naar vergelijking <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </aside>
  );
}
