"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";

export default function IntroScreen() {
  const [show, setShow] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Hide the SSR black screen so the React animation can take over
    document.documentElement.classList.add('hide-ssr-black-screen');

    let hasSeen = false;
    try {
      hasSeen = sessionStorage.getItem("nem_intro_garage_final");
    } catch (e) {}

    if (!hasSeen) {
      try {
        sessionStorage.setItem("nem_intro_garage_final", "true");
      } catch (e) {}
      
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3300);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <div 
          id="nem-intro"
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
            <div className="relative flex flex-col items-center">
              {/* Op maat gemaakte brede NEM logo met gaten (SVG) */}
              <div className="w-[200px] sm:w-[360px] lg:w-[560px]">
                <Logo className="w-full h-auto" animated={true} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
