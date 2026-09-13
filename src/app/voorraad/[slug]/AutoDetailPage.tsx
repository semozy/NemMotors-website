import { notFound } from "next/navigation";
import { vehicles } from "@/lib/autos";
import AutoDetails from "@/components/AutoDetails";
import type { Vehicle } from "@/types/auto";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return vehicles.flatMap((vehicle) =>
    getVehicleSlugs(vehicle).map((slug) => ({ slug }))
  );
}

type VehiclePageParams = Promise<{ slug: string }>;

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getVehicleSlugs(vehicle: Vehicle) {
  return Array.from(
    new Set([
      vehicle.id,
      slugify(`${vehicle.brand} ${vehicle.model}`),
      slugify(`${vehicle.brand} ${vehicle.model} ${vehicle.trim}`),
    ])
  ).filter(Boolean);
}

function findVehicleBySlug(id: string) {
  const requestedSlug = slugify(id);
  return vehicles.find((vehicle) => getVehicleSlugs(vehicle).includes(requestedSlug));
}

export async function generateMetadata({ params }: { params: VehiclePageParams }) {
  const { slug } = await params;
  const vehicle = findVehicleBySlug(slug);
  if (!vehicle) return { title: "Wagen niet gevonden" };
  return {
    title: `${vehicle.brand} ${vehicle.model}`,
    description: vehicle.description,
    alternates: { canonical: `/voorraad/${vehicle.id}` },
    openGraph: {
      title: `${vehicle.brand} ${vehicle.model} ${vehicle.trim}`,
      description: vehicle.description,
      images: [{ url: vehicle.image, alt: `${vehicle.brand} ${vehicle.model}` }],
    },
  };
}

export default async function AutoDetailPage({ params }: { params: VehiclePageParams }) {
  const { slug } = await params;
  const vehicle = findVehicleBySlug(slug);
  if (!vehicle) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${vehicle.brand} ${vehicle.model} ${vehicle.trim}`,
    image: vehicle.gallery.length ? vehicle.gallery : [vehicle.image],
    description: vehicle.description,
    sku: vehicle.id,
    brand: { "@type": "Brand", name: vehicle.brand },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    mileageFromOdometer: { "@type": "QuantitativeValue", value: vehicle.mileage, unitCode: "KMT" },
    fuelType: vehicle.fuel,
    vehicleTransmission: vehicle.transmission,
    offers: { "@type": "Offer", priceCurrency: "EUR", price: vehicle.price, availability: vehicle.badge?.toLowerCase().includes("gereserveerd") ? "https://schema.org/LimitedAvailability" : "https://schema.org/InStock", url: `${siteConfig.websiteUrl}/voorraad/${vehicle.id}`, seller: { "@type": "AutoDealer", name: siteConfig.name } },
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><AutoDetails vehicle={vehicle} /></>;
}
