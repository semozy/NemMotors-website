import CarList from "@/components/cars/CarList";
import { getCars } from "@/lib/cars";

export const metadata = {
  title: "Tweedehandswagens te koop",
  description: "Bekijk het actuele aanbod tweedehandswagens van NEM Motors in As, Limburg. Ontdek beschikbare wagens en bekijk prijzen, specificaties en details.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nemmotors.be"}/aanbod`,
  }
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
