"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Navbar from "./Navbar";
import { navigation as nav } from "@/constants/navigation";
export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    return (<>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label="NEM Motors home">
            <div className="text-left">
              <p className="text-2xl font-black leading-none text-white">NEM</p>
              <p className="-mt-0.5 text-[10px] font-black uppercase text-[#ffc20e]">
                Motors
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {nav.map((item) => (<Link key={item.name} href={item.href} className={`text-xs font-bold transition hover:text-[#ffc20e] ${pathname === item.href ? "text-[#ffc20e]" : "text-neutral-300"}`}>
                {item.name}
              </Link>))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/" className="inline-flex h-11 items-center rounded-sm border border-white/10 bg-black px-3 py-1.5 shadow-[0_10px_24px_rgba(255,194,14,0.10)] transition hover:border-[#ffc20e]" aria-label="NEM Motors home">
              <Image src="/images/logo/nemmotors.png" alt="NEM Motors" width={112} height={56} className="h-8 w-auto object-contain" priority/>
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <Link href="/aanbod" className="inline-flex min-h-11 items-center rounded-sm bg-[#ffc20e] px-4 text-sm font-bold text-neutral-950 hover:bg-yellow-300">
              Aanbod
            </Link>
          <button className="rounded-sm border border-white/10 p-2 text-white" onClick={() => setMenuOpen(true)} aria-label="Menu openen" aria-expanded={menuOpen} aria-controls="mobile-navigation">
            <Menu />
          </button>
          </div>
        </nav>
      </header>

      <Navbar isOpen={menuOpen} onClose={() => setMenuOpen(false)} nav={nav}/>
    </>);
}
