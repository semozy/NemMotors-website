"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
export default function Navbar({ isOpen, onClose, nav, }) {
    const pathname = usePathname();
    const closeRef = useRef(null);
    useEffect(() => {
        if (!isOpen)
            return;
        closeRef.current?.focus();
        const closeOnEscape = (event) => {
            if (event.key === "Escape")
                onClose();
        };
        document.addEventListener("keydown", closeOnEscape);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", closeOnEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);
    return (<AnimatePresence>
      {isOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/70 lg:hidden" onMouseDown={(event) => {
                if (event.target === event.currentTarget)
                    onClose();
            }}>
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }} className="ml-auto h-full w-80 bg-neutral-950 p-6 shadow-2xl" id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Hoofdnavigatie">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-black tracking-[0.2em]">NEM MOTORS</span>
              <button ref={closeRef} onClick={onClose} aria-label="Menu sluiten">
                <X />
              </button>
            </div>
            <div className="grid gap-3">
              {nav.map((item) => (<Link key={item.name} href={item.href} prefetch={item.href === "/aanbod" ? false : undefined} onClick={(event) => {
                    if (item.href === "/aanbod") {
                        event.preventDefault();
                        window.location.assign(item.href);
                        return;
                    }
                    onClose();
                }} className={`rounded-2xl border px-4 py-4 text-left transition ${pathname === item.href
                    ? "border-red-500/60 bg-red-500/10 text-red-400"
                    : "border-white/10 text-neutral-100 hover:border-red-500/60 hover:bg-red-500/10"}`}>
                  {item.name}
                </Link>))}
            </div>
          </motion.aside>
        </motion.div>)}
    </AnimatePresence>);
}
