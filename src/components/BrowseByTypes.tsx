"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchCars } from "../redux/slices/carSlice";
import { Car } from "../../types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const BrowseByType: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cars, loading, error } = useAppSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCars({ limit: 4, brand: "Mercedes" }));
  }, [dispatch]);

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Browse By Type</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.map((car: Car) => (
          <Link href={`/cars/${car._id}`} key={car._id}>
            <Card className="hover:shadow-lg transition-shadow overflow-hidden">
              <CardContent className="p-0">
                <div className="relative w-full h-48">
                  <Image
                    src={car.images[0]?.url || "/images/placeholder.jpg"}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{car.brand}</h3>
                  <p className="text-sm text-gray-600">
                    {car.model} ({car.year})
                  </p>
                  <p className="text-sm font-medium">
                    {car.category === "sale" || car.category === "both"
                      ? `$${car.price.toLocaleString()}`
                      : `$${car.rentalPricePerHour}/hour`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrowseByType;
