import CarList from "@/components/cars/CarList";
import { getCars } from "@/lib/cars";

export const metadata = {
  title: "Ons aanbod",
  description: "Ontdek het aanbod tweedehandswagens van NEM Motors. Zoek op merk, prijs en uitvoering en vind de wagen die bij u past.",
};

export default function AanbodPage() {
  return <CarList cars={getCars()} catalog />;
}
