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
      <section className="relative isolate overflow-hidden bg-[#0a0a0a] text-white">
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
