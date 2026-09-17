const fieldMap = {
  brand: "brand", model: "model", title: "title", trim: "trim", year: "year",
  firstRegistration: "first_registration", price: "price", mileage: "mileage", fuel: "fuel",
  transmission: "transmission", power: "power", powerKw: "power_kw", body: "body",
  vehicleType: "vehicle_type", drivetrain: "drivetrain", seats: "seats", doors: "doors",
  batteryCapacity: "battery_capacity", range: "range_km", engineCapacity: "engine_capacity",
  cylinders: "cylinders", emissionClass: "emission_class", co2Emission: "co2_emission",
  energyLabel: "energy_label", color: "color", paintType: "paint_type",
  interiorColor: "interior_color", upholstery: "upholstery", serviceHistory: "service_history",
  nonSmoker: "non_smoker", description: "description", options: "options", vatLabel: "vat_label",
  status: "status", featured: "featured", newArrival: "new_arrival", publishedAt: "published_at",
};

const statuses = new Set(["concept", "beschikbaar", "gereserveerd", "verkocht"]);

export function normalizeVehicleInput(input, { partial = false } = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Ongeldige voertuiggegevens.");
  const output = {};
  for (const [clientKey, databaseKey] of Object.entries(fieldMap)) {
    if (Object.prototype.hasOwnProperty.call(input, clientKey)) output[databaseKey] = input[clientKey];
  }
  if (!partial && (!String(output.brand || "").trim() || !String(output.model || "").trim())) {
    throw new Error("Merk en model zijn verplicht.");
  }
  if (output.status && !statuses.has(output.status)) throw new Error("Ongeldige voertuigstatus.");
  if (output.options != null && !Array.isArray(output.options)) throw new Error("Opties moeten een lijst zijn.");
  if (output.status && output.status !== "concept" && !output.published_at) output.published_at = new Date().toISOString();
  if (output.status === "concept") output.published_at = null;
  return output;
}

export function sanitizeFileName(name) {
  return String(name || "image")
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}
