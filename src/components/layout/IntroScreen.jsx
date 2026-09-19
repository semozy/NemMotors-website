"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroScreen() {
  const [show, setShow] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Unieke session-key zodat je hem nu direct ziet bij het vernieuwen
    if (!sessionStorage.getItem("nem_intro_garage_v1")) {
      setShow(true);
      sessionStorage.setItem("nem_intro_garage_v1", "true");
      
      // Ontkoppel de intro volledig uit de DOM nadat de animatie (3.1s) helemaal klaar is
      const timer = setTimeout(() => setShow(false), 3300);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <div 
          className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden"
          aria-label="Introductiescherm"
        >
          {/* DE BOVENSTE GARAGEDEUR */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#050505]"
            initial={{ y: "0%" }}
            animate={{ y: "-100%" }}
            // Mechanische, zware easing-curve voor een authentiek gevoel
            transition={{ delay: 2.3, duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
          />
          
          {/* DE ONDERSTE GARAGEDEUR */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#050505]"
            initial={{ y: "0%" }}
            animate={{ y: "100%" }}
            transition={{ delay: 2.3, duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
          />

          {/* HET KIER-LICHT (Lichtstraal van buiten als de deur net openbreekt) */}
          <motion.div 
            className="absolute top-1/2 left-0 right-0 h-[3px] bg-white shadow-[0_0_30px_10px_rgba(255,255,255,0.6)] -translate-y-1/2"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: [0, 1, 1],
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              delay: 2.0, 
              duration: 0.6, 
              times: [0, 0.6, 1],
              ease: "easeInOut" 
            }}
          />

          {/* TEKST & KOPLAMP EFFECT (Ligt bovenop de deuren, verdwijnt voordat ze opengaan) */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.1 }} // Licht inzoomen bij het vervagen
            transition={{ delay: 1.8, duration: 0.4, ease: "easeIn" }}
          >
            <style dangerouslySetInnerHTML={{ __html: `
              .koplamp-effect {
                background: linear-gradient(
                  90deg, 
                  rgba(255, 255, 255, 0.05) 0%, 
                  rgba(255, 255, 255, 0.05) 40%, 
                  rgba(255, 255, 255, 1) 50%, 
                  rgba(255, 255, 255, 0.05) 60%, 
                  rgba(255, 255, 255, 0.05) 100%
                );
                background-size: 200% auto;
                color: transparent;
                -webkit-background-clip: text;
                background-clip: text;
                animation: koplampSweep 1.8s ease-in-out forwards;
              }
              
              @keyframes koplampSweep {
                0% { background-position: 200% center; }
                100% { background-position: -50% center; }
              }
            `}} />

            <div className="relative">
              <h1 className="koplamp-effect text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] uppercase">
                NEM Motors
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute left-0 right-0 mt-3 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500"
              >
                Exclusive Cars
              </motion.p>
            </div>
          </motion.div>
          
        </div>
      )}
    </AnimatePresence>
  );
}
