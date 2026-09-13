import type { VehicleTypeSlug } from "@/types/auto";

export interface VehicleTypeOption {
  slug: VehicleTypeSlug;
  label: string;
  description: string;
}

export const vehicleTypes: VehicleTypeOption[] = [
  {
    slug: "elektrisch",
    label: "Elektrisch",
    description: "Stil, zuinig en klaar voor lage-emissiezones.",
  },
  {
    slug: "hybride",
    label: "Hybride",
    description: "Flexibel rijden met verbrandingsmotor en elektrische steun.",
  },
  {
    slug: "hoge-instap",
    label: "Hoge instap",
    description: "Comfortabel instappen en goed overzicht op de weg.",
  },
  {
    slug: "compact",
    label: "Compact",
    description: "Handige stadswagens en praktische hatchbacks.",
  },
  {
    slug: "gezinsauto",
    label: "Gezinsauto",
    description: "Ruimte, comfort en veiligheid voor dagelijks gebruik.",
  },
  {
    slug: "bedrijfswagen",
    label: "Bedrijfswagen",
    description: "Praktische wagens voor zelfstandigen en bedrijven.",
  },
];

export function getVehicleTypeLabel(slug: string) {
  return vehicleTypes.find((type) => type.slug === slug)?.label ?? slug;
}
