import type { ReactNode } from "react";
import Sectie from "@/components/Sectie";

export default function JuridischePagina({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return <main className="bg-white text-neutral-950"><Sectie className="max-w-4xl py-16"><p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-700">NEM Motors</p><h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{title}</h1><p className="mt-5 text-lg leading-8 text-neutral-600">{intro}</p><div className="mt-10 space-y-8 text-sm leading-7 text-neutral-700 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-neutral-950 [&_a]:font-bold [&_a]:underline">{children}</div></Sectie></main>;
}
