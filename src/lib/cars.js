import { cars as fallbackCars } from "@/data/cars";
import { createPublicSupabaseClient, hasSupabaseConfig } from "@/lib/supabase";

function mapVehicle(row) {
  const images = [...(row.vehicle_images || [])]
    .sort((a, b) => a.position - b.position)
    .map((image) => image.public_url);
  return {
    id: row.id,
    brand: row.brand,
    model: row.model,
    title: row.title,
    trim: row.trim,
    year: row.year,
    firstRegistration: row.first_registration,
    price: Number(row.price || 0),
    mileage: row.mileage,
    fuel: row.fuel,
    transmission: row.transmission,
    power: row.power,
    powerKw: row.power_kw,
    body: row.body,
    vehicleType: row.vehicle_type,
    drivetrain: row.drivetrain,
    seats: row.seats,
    doors: row.doors,
    batteryCapacity: row.battery_capacity == null ? null : Number(row.battery_capacity),
    range: row.range_km,
    engineCapacity: row.engine_capacity,
    cylinders: row.cylinders,
    emissionClass: row.emission_class,
    co2Emission: row.co2_emission == null ? null : Number(row.co2_emission),
    autoscoutUrl: row.energy_label,
    color: row.color,
    paintType: row.paint_type,
    interiorColor: row.interior_color,
    upholstery: row.upholstery,
    serviceHistory: row.service_history,
    nonSmoker: row.non_smoker,
    description: row.description,
    options: row.options || [],
    vatLabel: row.vat_label,
    status: row.status,
    featured: row.featured,
    newArrival: row.new_arrival,
    images,
  };
}

export async function getCars() {
  if (!hasSupabaseConfig()) return process.env.NODE_ENV === "production" ? [] : fallbackCars;
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .order("featured", { ascending: false })
    .order("published_at", { ascending: false });
  if (error) throw new Error(`Wagenaanbod ophalen mislukt: ${error.message}`);
  return (data || []).map(mapVehicle);
}

export async function getCarById(id) {
  if (!hasSupabaseConfig()) return process.env.NODE_ENV === "production" ? null : fallbackCars.find((car) => String(car.id) === String(id));
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*, vehicle_images(*)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Wagen ophalen mislukt: ${error.message}`);
  return data ? mapVehicle(data) : null;
}

export function filterCars(cars, filters, query = "", sort = "relevant") {
  return cars.filter((car) => {
    const text = `${car.brand} ${car.model} ${car.trim || ""} ${car.body || ""} ${car.vehicleType || ""} ${car.fuel || ""} ${car.transmission || ""} ${car.color || ""} ${car.price || ""} ${car.description || ""}`.toLocaleLowerCase("nl-BE");
    return query.toLocaleLowerCase("nl-BE").split(/\s+/).every((word) => text.includes(word))
      && (!filters.brand || car.brand === filters.brand)
      && (!filters.model || car.model === filters.model)
      && (!filters.price || (filters.price.endsWith("+") ? car.price >= Number(filters.price.slice(0, -1)) : car.price > 0 && car.price <= Number(filters.price)))
      && (!filters.body || (car.body || car.vehicleType)?.trim() === filters.body?.trim())
      && (!filters.yearFrom || car.year >= Number(filters.yearFrom))
      && (!filters.yearTo || car.year <= Number(filters.yearTo))
      && (!filters.kmFrom || (car.mileage != null && car.mileage >= Number(filters.kmFrom)))
      && (!filters.kmTo || (car.mileage != null && car.mileage <= Number(filters.kmTo)))
      && (!filters.fuel.length || filters.fuel.includes(car.fuel))
      && (!filters.transmission.length || filters.transmission.includes(car.transmission));
  }).sort((a, b) => {
    if (sort === "price-low") return (a.price > 0 ? a.price : Infinity) - (b.price > 0 ? b.price : Infinity);
    if (sort === "price-high") return (b.price || 0) - (a.price || 0);
    if (sort === "year") return (b.year || 0) - (a.year || 0);
    if (sort === "mileage") return (a.mileage ?? Infinity) - (b.mileage ?? Infinity);
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
  });
}
