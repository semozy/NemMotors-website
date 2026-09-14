import CarList from "@/components/cars/CarList";
import Container from "@/components/ui/Container";

export default function FeaturedCars({ cars = [] }) {
  if (!cars.length) return null;
  return <Container><h2 className="mb-6 text-3xl font-bold">Aanbevolen wagens</h2><CarList cars={cars} /></Container>;
}
