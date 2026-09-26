import FavoritesContent from "@/components/cars/FavoritesContent";
import { getCars } from "@/lib/cars";

export const metadata = {
  title: "Favoriete wagens",
  description: "Bekijk uw favoriete wagens bij NEM Motors.",
  robots: { index: false, follow: true },
};
export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  return (
    <main className="min-h-[calc(100vh-70px)] bg-[#f8f8f7] text-neutral-950">
      <section className="relative isolate overflow-hidden bg-[#17191a] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_20%,rgba(255,255,255,0.08),transparent_35%),linear-gradient(110deg,#1d1f20,#111314)]" />
        <div className="absolute -right-20 top-8 -z-10 h-40 w-[55%] rotate-[-8deg] rounded-[50%] border-t border-white/10 opacity-70" />
        <div className="mx-auto max-w-[1180px] px-5 py-7 sm:px-7 lg:px-8">
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/60">Uw selectie</p>
          <h1 className="mt-2 text-[38px] font-black leading-none tracking-[-0.045em] sm:text-[44px]">Uw favoriete wagens</h1>
          <p className="mt-3 text-sm text-white/65">Bewaar uw favorieten, vergelijk de verschillen en vind uw volgende wagen.</p>
        </div>
      </section>
      <FavoritesContent cars={await getCars()} />
    </main>
  );
}
