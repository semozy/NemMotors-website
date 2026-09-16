"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";
import Navbar from "./Navbar";
import { navigation } from "@/constants/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 text-neutral-950 backdrop-blur-xl">
        <nav className="mx-auto flex h-[70px] max-w-[1320px] items-center justify-between px-5 lg:px-8">
          <Link
            href="/"
            aria-label="NEM Motors home"
            className="shrink-0 text-xl font-black tracking-[-0.04em] text-neutral-950 sm:text-2xl"
          >
            NEM Motors
          </Link>
          <div className="hidden h-full items-center gap-11 lg:flex">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={item.href === "/aanbod" ? false : undefined}
                  onClick={(event) => {
                    if (item.href === "/aanbod") {
                      event.preventDefault();
                      window.location.assign(item.href);
                    }
                  }}
                  className={`relative flex h-full items-center text-[13px] font-medium transition-colors hover:text-black ${active ? "text-black" : "text-neutral-600"}`}
                >
                  {item.name}
                  {active && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black" />}
                </Link>
              );
            })}
          </div>
          <Link href="/contact" className="hidden h-11 items-center gap-4 rounded-md bg-neutral-950 px-6 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 lg:inline-flex">
            Contact opnemen <ArrowRight className="h-4 w-4" />
          </Link>
          <button type="button" className="rounded-md border border-neutral-200 p-2.5 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Menu openen" aria-expanded={menuOpen} aria-controls="mobile-navigation">
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>
      <Navbar isOpen={menuOpen} onClose={() => setMenuOpen(false)} nav={navigation} />
    </>
  );
}
