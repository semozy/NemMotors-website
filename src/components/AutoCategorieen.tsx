import Link from "next/link";
import { Car, Fuel, Truck, Users, Zap, type LucideIcon } from "lucide-react";
import Sectie from "@/components/Sectie";
import { vehicleTypes } from "@/lib/auto-categorieen";
import { vehicles } from "@/lib/autos";
import type { VehicleTypeSlug } from "@/types/auto";

const icons: Record<VehicleTypeSlug, LucideIcon> = {
  elektrisch: Zap,
  hybride: Fuel,
  "hoge-instap": Car,
  compact: Car,
  gezinsauto: Users,
  bedrijfswagen: Truck,
};

export default function AutoCategorieen() {
  return (
    <Sectie className="py-5 pb-10">
      <div>
        <p className="text-xs font-bold uppercase text-neutral-400">Kies uw type</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {vehicleTypes.map((type) => {
            const Icon = icons[type.slug];
            const count = vehicles.filter((vehicle) => vehicle.typeSlugs.includes(type.slug)).length;

            return (
              <Link
                key={type.slug}
                href={`/voorraad?type=${type.slug}`}
                className="group min-h-28 rounded-sm border border-white/10 bg-[linear-gradient(180deg,#202020_0%,#111111_100%)] p-4 text-center shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:border-[#ffc20e] hover:bg-neutral-900"
              >
                <Icon className="mx-auto h-7 w-7 text-neutral-200 transition group-hover:text-[#ffc20e]" />
                <h3 className="mt-3 text-sm font-black text-white">{type.label}</h3>
                <p className="mt-1 text-[11px] font-semibold text-neutral-400">{count} wagens</p>
              </Link>
            );
          })}
        </div>
      </div>
    </Sectie>
  );
}
