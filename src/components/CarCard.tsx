"use client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addToCart } from "../redux/slices/cartSlice";
import { setSelectedCar } from "../redux/slices/carSlice";
import Image from "next/image";
import { AppDispatch } from "../redux/store";
import { Car } from "../../types";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleBuy = () => {
    dispatch(addToCart(car));
    router.push("/cart");
  };

  const handleRent = () => {
    dispatch(setSelectedCar(car));
    router.push("/rentals");
  };

  return (
    <div className="border rounded-lg p-4 shadow">
      <Image
        src={car.images[0]?.url}
        alt={`${car.brand} ${car.model}`}
        width={300}
        height={200}
        className="rounded"
      />
      <h2 className="text-xl font-semibold">
        {car.brand} {car.model} ({car.year})
      </h2>
      <p>Price: ${car.price}</p>
      {car.rentalPricePerHour && <p>Rent: ${car.rentalPricePerHour}/hour</p>}
      <p>Status: {car.status}</p>
      <div className="mt-2">
        {(["sale", "both"] as string[]).includes(car.category) &&
          car.status === "available" && (
            <button
              onClick={handleBuy}
              className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
            >
              Buy
            </button>
          )}
        {(["rent", "both"] as string[]).includes(car.category) &&
          car.status === "available" && (
            <button
              onClick={handleRent}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Rent
            </button>
          )}
      </div>
    </div>
  );
}
