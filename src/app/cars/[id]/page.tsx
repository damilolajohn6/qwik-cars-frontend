"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCarById,
  setSelectedCar,
  fetchCars,
} from "@/redux/slices/carSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import { Car as CarType } from "../../../../types";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RentalForm from "@/components/RentalForm";
import { ShoppingCart, CalendarCheck, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CarDetailsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { selectedCar, loading, error, cars } = useAppSelector(
    (state) => state.cars
  );

  const [activeTab, setActiveTab] = useState<"overview" | "specs">("overview");

  useEffect(() => {
    if (id) dispatch(fetchCarById(id as string));
    dispatch(fetchCars({ limit: 4 }));
    return () => {
      dispatch(setSelectedCar(null));
    };
  }, [dispatch, id]);

  const handleAddToCart = (car: CarType) => {
    dispatch(addToCart(car));
    router.push("/cart");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !selectedCar) {
    return (
      <div className="container mx-auto py-10 text-center text-red-500">
        {error || "Car not found"}
        <Button variant="link" onClick={() => router.push("/cars")}>
          ← Back to Cars
        </Button>
      </div>
    );
  }

  const {
    brand,
    model,
    year,
    price,
    rentalPricePerHour,
    category,
    color,
    status,
    quantity,
    engineCC,
    maxPower,
    airbags,
    rearCamera,
    seats,
    images,
  } = selectedCar;

  return (
    <div className="container mx-auto px-4 py-10">
      <Button variant="outline" onClick={() => router.back()}>
        ← Back to Cars
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
        <Card>
          <CardHeader>
            <Carousel>
              <CarouselContent>
                {images?.length ? (
                  images.map((img, i) => (
                    <CarouselItem key={img.publicId || i}>
                      <Image
                        src={img.url || "/images/placeholder.jpg"}
                        alt={`Car ${i}`}
                        width={700}
                        height={450}
                        className="rounded-md w-full h-72 sm:h-96 object-cover"
                      />
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem>
                    <Image
                      src="/images/placeholder.jpg"
                      alt="Placeholder"
                      width={700}
                      height={450}
                      className="rounded-md w-full h-72 sm:h-96 object-cover"
                    />
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardHeader>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              {brand} {model} ({year})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 text-sm rounded transition ${
                  activeTab === "overview"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`px-4 py-2 text-sm rounded transition ${
                  activeTab === "specs"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                Specifications
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <p className="text-lg font-bold">
                    {category === "sale" || category === "both"
                      ? `$${price.toLocaleString()}`
                      : `$${rentalPricePerHour}/hr`}
                  </p>
                  <p className="text-gray-600">Status: {status}</p>
                  <p className="text-gray-600">Color: {color}</p>
                  <p className="text-gray-600">Available: {quantity}</p>
                </motion.div>
              )}
              {activeTab === "specs" && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm"
                >
                  {engineCC && <p>Engine: {engineCC}cc</p>}
                  {maxPower && <p>Max Power: {maxPower}</p>}
                  {airbags && <p>Airbags: {airbags}</p>}
                  <p>Rear Camera: {rearCamera ? "Yes" : "No"}</p>
                  {seats && <p>Seats: {seats}</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          <CardContent className="flex flex-wrap gap-4 mt-auto">
            {(category === "sale" || category === "both") && (
              <Button
                onClick={() => handleAddToCart(selectedCar)}
                disabled={status !== "available"}
              >
                <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
              </Button>
            )}
            {(category === "rent" || category === "both") && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button disabled={status !== "available"}>
                    <CalendarCheck className="w-4 h-4 mr-2" /> Rent Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-lg sm:max-w-xl p-4 overflow-y-auto max-h-[90vh]">
                  <RentalForm car={selectedCar} />
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Related Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars
            .filter((car) => car._id !== selectedCar._id)
            .slice(0, 4)
            .map((car) => (
              <Card key={car._id} className="hover:shadow-md transition">
                <Image
                  src={car.images[0]?.url || "/images/placeholder.jpg"}
                  alt={car.model}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-t"
                />
                <CardContent className="p-4">
                  <p className="text-lg font-semibold">
                    {car.brand} {car.model}
                  </p>
                  <p className="text-sm text-gray-500">{car.year}</p>
                  <Button
                    onClick={() => router.push(`/cars/${car._id}`)}
                    variant="link"
                    className="text-blue-600 p-0"
                  >
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
