"use client";

import { useEffect, useState } from "react";
import { Check, GitCompareArrows } from "lucide-react";

const storageKey = "nem-motors-comparison";

export default function CompareButton({ carId, name, compact = false, card = false }) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    function readSelection() {
      try {
        const ids = JSON.parse(window.localStorage.getItem(storageKey) || "[]").map(String);
        setSelected(ids.includes(String(carId)));
      } catch {
        setSelected(false);
      }
    }

    readSelection();
    window.addEventListener("nem-comparison-change", readSelection);
    window.addEventListener("storage", readSelection);
    return () => {
      window.removeEventListener("nem-comparison-change", readSelection);
      window.removeEventListener("storage", readSelection);
    };
  }, [carId]);

  function toggleComparison() {
    let selectedIds = [];
    try {
      selectedIds = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
    } catch {
      selectedIds = [];
    }

    const normalizedIds = selectedIds.map(String);
    const nextIds = normalizedIds.includes(String(carId))
      ? normalizedIds.filter((id) => id !== String(carId))
      : [...normalizedIds, String(carId)].slice(-3);
    window.localStorage.setItem(storageKey, JSON.stringify(nextIds));
    window.dispatchEvent(new CustomEvent("nem-comparison-change", { detail: nextIds }));
  }

  if (compact) {
    return (
      <button type="button" onClick={toggleComparison} aria-label={`${name} vergelijken`} aria-pressed={selected} className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white">
        <GitCompareArrows className="h-4 w-4" aria-hidden="true" />
      </button>
    );
  }

  if (card) {
    return (
      <button type="button" onClick={toggleComparison} aria-pressed={selected} className={`inline-flex h-7 items-center gap-1.5 rounded px-2 text-[10px] font-bold transition ${selected ? "bg-neutral-950 text-white" : "border border-neutral-300 bg-white text-neutral-800 hover:border-neutral-950"}`}>
        {selected ? <Check className="h-3 w-3" aria-hidden="true" /> : <GitCompareArrows className="h-3 w-3" aria-hidden="true" />}
        {selected ? "Aangevinkt" : "Vergelijk"}
      </button>
    );
  }

  return (
    <button type="button" onClick={toggleComparison} aria-pressed={selected} className="flex h-11 w-full items-center justify-center gap-3 rounded-md border border-neutral-300 bg-white text-xs font-bold transition hover:border-neutral-950">
      <GitCompareArrows className="h-4 w-4" aria-hidden="true" />
      Vergelijk deze wagen
    </button>
  );
}
