import AutoOverzicht, { VehicleListingFilters } from "@/components/AutoOverzicht";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getParam(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function VoorraadPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const initialFilters: VehicleListingFilters = {
    brand: getParam(params, "brand"),
    model: getParam(params, "model"),
    fuel: getParam(params, "fuel"),
    type: getParam(params, "type"),
    maxPrice: getParam(params, "price"),
    sort: getParam(params, "sort") || "Recent toegevoegd",
  };

  return <AutoOverzicht initialFilters={initialFilters} />;
}
