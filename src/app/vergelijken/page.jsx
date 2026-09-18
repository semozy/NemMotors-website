import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CompareTable from "@/components/cars/CompareTable";
import { getCars } from "@/lib/cars";

export const metadata = {
  title: "Wagens vergelijken",
  description: "Vergelijk uw favoriete wagens bij NEM Motors.",
};
export const dynamic = "force-dynamic";

export default async function ComparePage({ searchParams }) {
  const params = await searchParams;
  const availableCars = await getCars();
  const requestedIds = String(params?.autos || "").split(",").filter(Boolean).slice(0, 3);
  const selectedCars = requestedIds.map((id) => availableCars.find((car) => String(car.id) === id)).filter(Boolean);

  return (
    <main className="min-h-[calc(100vh-70px)] bg-[#fafafa] text-neutral-950">
      <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-5 sm:px-8 lg:px-11">
        <Link href="/aanbod" className="inline-flex items-center gap-2 text-[11px] font-medium text-neutral-700 hover:text-black">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Terug naar aanbod
        </Link>

        <div className="mt-4">
          <h1 className="text-[34px] font-black leading-none tracking-[-0.045em] sm:text-[40px]">Vergelijk uw favoriete wagens</h1>
          <p className="mt-2 text-sm text-neutral-500">Bekijk de verschillen en ontdek welke wagen bij u past.</p>
        </div>

        <CompareTable initialCars={selectedCars} />
      </div>
    </main>
  );
}
