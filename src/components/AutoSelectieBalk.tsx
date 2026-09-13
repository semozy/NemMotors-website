"use client";

import Link from "next/link";
import { GitCompareArrows, X } from "lucide-react";
import { useAutoSelectie } from "@/lib/useAutoSelectie";

export default function AutoSelectieBalk() {
  const compare = useAutoSelectie("compare");
  if (!compare.ids.length) return null;
  return <aside className="fixed bottom-4 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 items-center justify-between gap-4 rounded-xl border border-white/15 bg-neutral-950 px-4 py-3 text-white shadow-2xl" aria-label="Voertuigen vergelijken"><p className="text-sm font-bold">{compare.ids.length} van 4 wagens geselecteerd</p><div className="flex items-center gap-2"><Link href="/vergelijken" className="inline-flex items-center gap-2 rounded-lg bg-[#ffc20e] px-4 py-2 text-xs font-black text-neutral-950"><GitCompareArrows className="h-4 w-4" />Vergelijk</Link><button type="button" onClick={compare.clear} aria-label="Vergelijking wissen" className="rounded-lg p-2 hover:bg-white/10"><X className="h-4 w-4" /></button></div></aside>;
}
