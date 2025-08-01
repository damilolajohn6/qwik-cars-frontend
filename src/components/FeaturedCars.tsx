"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { fetchCars } from "../redux/slices/carSlice";
import { Loader2, ExternalLink, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Car } from "../../types";
import { Button } from "./ui/button";

// Helper function to format Naira currency
const formatNaira = (price: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(price);
};

// A dedicated component for the car card for better readability
const CarCard = ({ car, index }: { car: Car; index: number }) => {
  const isForRent = car.category === "rent" || car.category === "both";
  const isNew = index < 2;

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden group">
      <div className="relative">
        <Image
          src={car.images?.[0]?.url || "/cars.jpg"}
          alt={`${car.brand} ${car.model}`}
          width={400}
          height={250}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full">
              New
            </span>
          )}
          {isForRent && (
            <span className="bg-blue-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Rent
            </span>
          )}
        </div>
        <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full text-gray-700 hover:bg-white hover:text-black">
          <Bookmark size={18} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xl font-bold text-gray-900">
            {formatNaira(isForRent ? car.rentalPricePerHour || 0 : car.price)}
          </p>
          <Link
            href="/contact"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 flex items-center gap-1"
          >
            Contact <ExternalLink size={14} />
          </Link>
        </div>
        <h3 className="text-base font-semibold text-gray-800 truncate">
          {car.year} {car.brand} {car.model}
        </h3>
        <p className="text-sm text-gray-500">Low Mileage, Automatic</p>
      </div>
      <div className="p-4">
        <Button
          asChild
          variant="outline"
          className="w-full bg-blue-500 hover:bg-blue-800 text-white font-medium"
        >
          <Link href={`/cars/${car._id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
};

export default function FeaturedCars() {
  const dispatch = useAppDispatch();
  const { cars, loading, error } = useAppSelector((state) => state.cars);

  useEffect(() => {
    dispatch(
      fetchCars({
        status: "available",
        limit: 6, // Fetch 6 to fit the 3x2 grid
      })
    );
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load featured cars. Please try again later.
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-left text-gray-900">
          Featured Listing
        </h2>
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, index) => (
              <CarCard key={car._id} car={car} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No featured cars available.
          </p>
        )}
      </div>
    </section>
  );
}
