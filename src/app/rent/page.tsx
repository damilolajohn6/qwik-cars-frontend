"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchCars } from "../../redux/slices/carSlice";
import { Loader2, ExternalLink, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Car } from "../../../types";
import ProductHero from "@/components/ProductHero";
import CategoriesServices from "@/components/CategoriesServices";
import CtaCards from "@/components/CtaCards";
import BrowseByType from "@/components/BrowseByTypes";

// Helper function to format Naira currency
const formatNaira = (price: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(price);
};

const RentalCarCard = ({ car }: { car: Car }) => (
  <div className="">
    <div className="bg-gray-100 rounded-lg overflow-hidden group border border-transparent hover:border-blue-500 hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <Image
          src={car.images?.[0]?.url || "/images/placeholder.jpg"}
          alt={`${car.brand} ${car.model}`}
          width={400}
          height={250}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Rent
          </span>
        </div>
        <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full text-gray-700 hover:bg-white hover:text-black">
          <Bookmark size={18} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xl font-bold text-gray-900">
            {formatNaira(car.rentalPricePerHour || 0)}
            <span className="text-sm font-normal text-gray-500">/hour</span>
          </p>
          <Link
            href={`/cars/${car._id}`}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 flex items-center gap-1"
          >
            Details <ExternalLink size={14} />
          </Link>
        </div>
        <h3 className="text-base font-semibold text-gray-800 truncate">
          {car.year} {car.brand} {car.model}
        </h3>
        <p className="text-sm text-gray-500">Low Mileage, Automatic</p>
      </div>
    </div>
  </div>
);

// The main page component
export default function RentedCarsPage() {
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

  return (
    <div className="">
      <ProductHero />

      <main className="bg-white">
        <CategoriesServices />
        <div className="">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900">
                Cars for Rent
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Choose from our premium selection of vehicles available for
                hourly rental.
              </p>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
              </div>
            )}

            {error && (
              <div className="text-center text-red-500 py-20">
                <p>Failed to load rental cars.</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {!loading && !error && (
              <>
                {cars.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {cars.map((car) => (
                      <RentalCarCard key={car._id} car={car} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      No Cars Found
                    </h3>
                    <p className="mt-2 text-gray-500">
                      There are currently no cars available for rent. Please
                      check back later.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <CtaCards />
      </main>
      <BrowseByType />
    </div>
  );
}
