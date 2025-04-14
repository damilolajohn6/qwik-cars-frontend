// components/cars/CarCard.tsx
import Image from "next/image";
import { Car } from "../../../types";
import { Button } from "@/components/ui/button";

interface CarCardProps {
  car: Car;
  onSelect: (car: Car) => void;
}

export default function CarCard({ car, onSelect }: CarCardProps) {
  return (
    <div className="border p-4 rounded-xl shadow-sm flex flex-col gap-2">
      <Image
        src={car.images[0]?.url}
        alt={car.model}
        height={400}
        width={400}
        className="h-40 w-full object-cover rounded-lg"
      />
      <h2 className="font-semibold text-lg">
        {car.brand} {car.model}
      </h2>
      <p className="text-sm text-muted-foreground">
        {car.year} - {car.color}
      </p>
      <p className="font-medium text-primary">${car.price}</p>
      <Button onClick={() => onSelect(car)} variant="outline" size="sm">
        Edit
      </Button>
    </div>
  );
}
