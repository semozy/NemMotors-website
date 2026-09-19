import CarList from "@/components/cars/CarList";
import { getCars } from "@/lib/cars";

export const metadata = {
  title: "Ons aanbod",
  description: "Ontdek het aanbod tweedehandswagens van NEM Motors. Zoek op merk, prijs en uitvoering en vind de wagen die bij u past.",
};

export default async function AanbodPage({ searchParams }) {
  const params = await searchParams;
  const initialFilters = {
    brand: params?.brand || "",
    model: params?.model || "",
    price: params?.price || "",
    body: params?.body || "",
    yearFrom: "",
    yearTo: "",
    kmFrom: "",
    kmTo: "",
    fuel: params?.fuel ? (Array.isArray(params.fuel) ? params.fuel : [params.fuel]) : [],
    transmission: [],
  };

  return <CarList cars={await getCars()} catalog initialFilters={initialFilters} initialQuery={params?.q || ""} />;
}
