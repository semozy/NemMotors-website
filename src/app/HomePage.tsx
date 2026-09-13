import Hero from "@/components/Hero";
import SnelZoeken from "@/components/SnelZoeken";
import AutoCategorieen from "@/components/AutoCategorieen";
import DienstenOverzicht from "@/components/DienstenOverzicht";
import GarageVerhaal from "@/components/GarageVerhaal";
import GarageInfo from "@/components/GarageInfo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="bg-neutral-950 text-white">
        <SnelZoeken />
        <AutoCategorieen />
      </div>
      <div className="bg-white text-neutral-950">
        <DienstenOverzicht />
        <GarageVerhaal />
        <GarageInfo />
      </div>
    </>
  );
}
