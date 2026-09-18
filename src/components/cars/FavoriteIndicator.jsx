"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function FavoriteIndicator() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function readFavorites(event) {
      if (Array.isArray(event?.detail)) {
        setCount(event.detail.length);
        return;
      }
      try {
        setCount(JSON.parse(window.localStorage.getItem("nem-motors-favorites") || "[]").length);
      } catch {
        setCount(0);
      }
    }
    readFavorites();
    window.addEventListener("nem-favorites-change", readFavorites);
    window.addEventListener("storage", readFavorites);
    window.addEventListener("pageshow", readFavorites);
    document.addEventListener("visibilitychange", readFavorites);
    return () => {
      window.removeEventListener("nem-favorites-change", readFavorites);
      window.removeEventListener("storage", readFavorites);
      window.removeEventListener("pageshow", readFavorites);
      document.removeEventListener("visibilitychange", readFavorites);
    };
  }, []);

  return (
    <Link href="/favorieten" aria-label={`Favorieten, ${count} bewaard`} className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-950 transition hover:bg-neutral-100">
      <Heart className={`h-5 w-5 ${count ? "fill-neutral-950" : ""}`} />
      {count > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-950 px-1 text-[9px] font-bold text-white">{count}</span>}
    </Link>
  );
}
