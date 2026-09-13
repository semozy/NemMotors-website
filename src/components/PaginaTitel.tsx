"use client";

import { motion } from "framer-motion";
import Sectie from "@/components/Sectie";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PaginaTitel({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="border-b border-white/10 bg-gradient-to-b from-neutral-900 to-neutral-950">
      <Sectie className="py-16">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-black tracking-tight md:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg text-neutral-300">{subtitle}</p>
        )}
      </Sectie>
    </div>
  );
}
