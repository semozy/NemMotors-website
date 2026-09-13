export type VehicleTypeSlug =
  | "elektrisch"
  | "hybride"
  | "hoge-instap"
  | "compact"
  | "gezinsauto"
  | "bedrijfswagen";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  trim: string;
  price: number;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  body: string;
  power: string;
  badge?: string;
  color: string;
  doors: number;
  seats: number;
  firstRegistration: string;
  image: string;
  gallery: string[];
  description: string;
  options: string[];
  typeSlugs: VehicleTypeSlug[];
}

export interface SoldVehicle {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  image: string;
}

