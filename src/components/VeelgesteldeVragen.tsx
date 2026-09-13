"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/types/inhoud";

export default function VeelgesteldeVragen({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {faqs.map((faq, i) => (
        <div key={faq.question} className="rounded-3xl border border-white/10 bg-neutral-900">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
            aria-controls={`faq-answer-${i}`}
            className="flex w-full items-center justify-between p-6 text-left font-bold"
          >
            <span>{faq.question}</span>
            <ChevronDown className={`transition ${open === i ? "rotate-180 text-red-400" : ""}`} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.p
                id={`faq-answer-${i}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden px-6 pb-6 leading-7 text-neutral-400"
              >
                {faq.answer}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
