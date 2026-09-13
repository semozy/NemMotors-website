"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[560px] overflow-hidden bg-neutral-950 lg:min-h-[650px]">
      <motion.div
        initial={{ scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=85')] bg-cover bg-[center_top]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#070707_0%,rgba(7,7,7,0.96)_26%,rgba(7,7,7,0.68)_56%,rgba(7,7,7,0.28)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:46px_46px] opacity-40" />
      <div className="absolute left-0 top-24 hidden h-72 w-40 border-y border-r border-white/10 text-[10px] uppercase text-white/35 lg:block">
        <span className="absolute left-5 top-6">est.</span>
        <span className="absolute left-5 top-10">2024</span>
        <span className="absolute right-4 top-1/2 h-px w-20 bg-white/15" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-neutral-950 to-transparent" />

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-5 pb-24 pt-24 lg:min-h-[650px] lg:px-8 lg:pt-28">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ y: 35, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="font-mono text-4xl font-black uppercase leading-[0.98] text-white md:text-6xl"
          >
            Sterke wagens.
            <br />
            Sterke service.
          </motion.h1>
          <motion.p
            initial={{ y: 35, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-5 text-sm font-black uppercase text-[#ffc20e] md:text-base"
          >
            Uw vertrouwen is onze motor.
          </motion.p>
          <motion.p
            initial={{ y: 35, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-4 max-w-xl text-sm font-medium leading-7 text-neutral-300 md:text-base"
          >
            Bij NEM Motors vindt u zorgvuldig geselecteerde tweedehandswagens met duidelijke informatie over de technische staat, garantievoorwaarden en persoonlijke service.
          </motion.p>
          <motion.div
            initial={{ y: 35, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/voorraad"
              className="inline-flex h-11 items-center justify-center rounded-sm bg-[#ffc20e] px-5 text-sm font-black text-neutral-950 shadow-[0_12px_30px_rgba(255,194,14,0.2)] transition hover:-translate-y-0.5 hover:bg-yellow-300"
            >
              Bekijk ons aanbod
            </Link>
            <Link
              href="/#diensten"
              className="inline-flex h-11 items-center justify-center rounded-sm border border-white/35 bg-black/20 px-5 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-[#ffc20e] hover:text-[#ffc20e]"
            >
              Onze diensten
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
