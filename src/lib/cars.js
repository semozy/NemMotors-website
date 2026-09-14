import { cars } from "@/data/cars";

export function getCars() {
  return cars;
}

export function getCarById(id) {
  return cars.find((car) => String(car.id) === String(id));
}

export function filterCars(cars, filters, query = "", sort = "relevant") {
  return cars.filter((car) => {
    const text = `${car.brand} ${car.model} ${car.trim || ""} ${car.description || ""}`.toLocaleLowerCase("nl-BE");
    return query.toLocaleLowerCase("nl-BE").split(/\s+/).every((word) => text.includes(word))
      && (!filters.brand || car.brand === filters.brand)
      && (!filters.model || car.model === filters.model)
      && (!filters.price || (car.price > 0 && car.price <= Number(filters.price)))
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
