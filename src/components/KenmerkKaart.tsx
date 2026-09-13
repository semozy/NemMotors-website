"use client";

import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

export default function KenmerkKaart({ icon, title, text }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/15 text-red-400">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-neutral-400">{text}</p>
    </motion.div>
  );
}
