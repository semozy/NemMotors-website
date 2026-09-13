"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { Review } from "@/types/inhoud";

export default function ReviewKaart({ review }: { review: Review }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex min-h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-950 shadow-sm transition hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-yellow-700">Klantervaring</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
          <Quote className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-5 flex-1 text-base leading-7 text-neutral-700">&quot;{review.text}&quot;</p>

      <div className="mt-7 flex items-center gap-3 border-t border-neutral-200 pt-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-950 text-sm font-black text-white">
          {review.name[0]}
        </div>
        <div>
          <p className="font-black text-neutral-950">{review.name}</p>
          <p className="text-sm text-neutral-500">Klant sinds {review.date}</p>
        </div>
      </div>
    </motion.div>
  );
}
