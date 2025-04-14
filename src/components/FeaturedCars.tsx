"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { fetchCars } from "../redux/slices/carSlice";
// import { Car } from "../../types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedCars() {
  const dispatch = useAppDispatch();
  const { cars, loading, error } = useAppSelector((state) => state.cars);

  useEffect(() => {
    dispatch(
      fetchCars({
        status: "available",
        limit: 12,
      })
    );
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-12">
        Failed to load featured cars. Please try again later.
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Cars</h2>
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cars.map((car) => (
              <Card key={car._id} className="overflow-hidden">
                <CardHeader>
                  <Image
                    src={car.images?.[0]?.url || "/images/placeholder.jpg"}
                    alt={`${car.brand} ${car.model}`}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>
                    {car.brand} {car.model} ({car.year})
                  </CardTitle>
                  <p className="text-gray-600 mt-2">
                    {car.category === "sale" || car.category === "both"
                      ? `$${car.price.toLocaleString()}`
                      : `$${car.rentalPricePerHour}/hour`}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/cars/${car._id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No featured cars available.
          </p>
        )}
        <div className="text-center mt-8">
          <Button asChild>
            <Link href="/cars">Browse All Cars</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
