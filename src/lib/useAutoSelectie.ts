"use client";

import { useSyncExternalStore } from "react";

type SelectionKind = "favorites" | "compare";
const eventName = "nem-vehicle-selection";

function key(kind: SelectionKind) { return `nem-${kind}`; }
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(eventName, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(eventName, callback); };
}
function snapshot(kind: SelectionKind) { return window.localStorage.getItem(key(kind)) || "[]"; }
function parse(value: string) { try { return JSON.parse(value) as string[]; } catch { return []; } }

export function useAutoSelectie(kind: SelectionKind) {
  const value = useSyncExternalStore(subscribe, () => snapshot(kind), () => "[]");
  const ids = parse(value);
  function toggle(id: string) {
    const current = parse(snapshot(kind));
    const next = current.includes(id) ? current.filter((item) => item !== id) : kind === "compare" ? [...current, id].slice(-4) : [...current, id];
    window.localStorage.setItem(key(kind), JSON.stringify(next));
    window.dispatchEvent(new Event(eventName));
  }
  function clear() { window.localStorage.removeItem(key(kind)); window.dispatchEvent(new Event(eventName)); }
  return { ids, toggle, clear };
}
