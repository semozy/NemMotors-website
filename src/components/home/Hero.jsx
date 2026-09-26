"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="relative isolate min-h-[650px] overflow-hidden bg-[#111312] text-white sm:min-h-[750px] lg:min-h-[820px]">
      <motion.div initial={reduceMotion ? false : { scale: 1.035 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
        <div 
          className="h-full w-full"
          dangerouslySetInnerHTML={{
            __html: `
              <video 
                autoplay 
                loop 
                muted 
                playsinline 
                preload="auto"
                poster="/images/home/volgende-wagen-bg.jpg"
                class="h-full w-full object-cover object-center"
              >
                <source src="/images/home/NemMotors.mp4" type="video/mp4" />
              </video>
            `
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,9,.94)_0%,rgba(7,9,9,.86)_35%,rgba(7,9,9,.3)_61%,rgba(7,9,9,.04)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05)_55%,rgba(0,0,0,.48)_100%)]" />
      <div className="relative mx-auto flex min-h-[650px] max-w-[1320px] items-center px-5 pb-28 pt-16 sm:min-h-[750px] lg:min-h-[820px] lg:px-8 lg:pb-32">
        <div className="max-w-[570px]">
          <motion.div {...reveal(0.05)} className="mb-7 flex items-center gap-5">
            <span className="h-px w-9 bg-white/80" />
            <span className="text-[10px] font-medium uppercase tracking-[0.38em] text-white/55">Premium occasions</span>
          </motion.div>
          <motion.h1 {...reveal(0.12)} className="text-[36px] font-black leading-[1] tracking-[-0.04em] sm:text-[52px] lg:text-[64px] break-words hyphens-auto" lang="nl">
            NEM Motors:<br />Sterke tweedehands&shy;wagens.
          </motion.h1>
          <motion.p {...reveal(0.2)} className="mt-4 text-lg font-semibold sm:text-xl">Uw vertrouwen is onze motor.</motion.p>
          <motion.p {...reveal(0.27)} className="mt-2 max-w-[500px] text-sm leading-6 text-white/80 sm:text-base">
            Ontdek zorgvuldig geselecteerde tweedehandswagens<br className="hidden sm:block" /> met persoonlijke service.
          </motion.p>
          <motion.div {...reveal(0.34)} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/aanbod" className="inline-flex h-12 items-center justify-center gap-5 rounded-md bg-white px-6 text-sm font-bold text-neutral-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-neutral-100">Bekijk het aanbod <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/auto-verkopen" className="inline-flex h-12 items-center justify-center rounded-md border border-white/70 bg-black/20 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white hover:text-black">Verkoop uw wagen</Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
