"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { fetchCarById, setSelectedCar } from "../../../redux/slices/carSlice";
import { addToCart } from "../../../redux/slices/cartSlice";
import { Car } from "../../../../types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShoppingCart, Car as CarIcon } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RentalForm from "../../../components/RentalForm";

export default function CarDetailsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = useParams();
  const { selectedCar, loading, error } = useAppSelector((state) => state.cars);

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id as string));
    }
    return () => {
      dispatch(setSelectedCar(null));
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedCar) {
      console.log("Selected Car Images:", selectedCar.images); // Debug
    }
  }, [selectedCar]);

  const handleAddToCart = (car: Car) => {
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
      <div className="container mx-auto px-4 py-8 text-red-500">
        {error || "Car not found"}{" "}
        <Button onClick={() => router.push("/cars")}>Back to Cars</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.push("/cars")}
      >
        ← Back to Cars
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Carousel */}
        <Card>
          <CardHeader>
            <Carousel>
              <CarouselContent>
                {Array.isArray(selectedCar.images) &&
                selectedCar.images.length > 0 ? (
                  selectedCar.images.map((img, index) => (
                    <CarouselItem
                      key={img.publicId || `image-${index}`}
                      data-testid={`carousel-item-${index}`}
                    >
                      <Image
                        src={img.url || "/images/placeholder.jpg"}
                        alt={`${selectedCar.brand} ${selectedCar.model}`}
                        width={600}
                        height={400}
                        className="w-full h-96 object-cover rounded-md"
                      />
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem key="placeholder">
                    <Image
                      src="/images/placeholder.jpg"
                      alt="Placeholder"
                      width={600}
                      height={400}
                      className="w-full h-96 object-cover rounded-md"
                    />
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardHeader>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedCar.brand} {selectedCar.model} ({selectedCar.year})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-2xl font-bold">
              {selectedCar.category === "sale" || selectedCar.category === "both"
                ? `$${selectedCar.price.toLocaleString()}`
                : `$${selectedCar.rentalPricePerHour}/hour`}
            </p>
            <p className="text-gray-600">Status: {selectedCar.status}</p>
            <p className="text-gray-600">Color: {selectedCar.color || "N/A"}</p>
            <p className="text-gray-600">
              Quantity Available: {selectedCar.quantity}
            </p>
            {selectedCar.engineCC && (
              <p className="text-gray-600">Engine: {selectedCar.engineCC} CC</p>
            )}
            {selectedCar.maxPower && (
              <p className="text-gray-600">Power: {selectedCar.maxPower}</p>
            )}
            {selectedCar.airbags && (
              <p className="text-gray-600">Airbags: {selectedCar.airbags}</p>
            )}
            <p className="text-gray-600">
              Rear Camera: {selectedCar.rearCamera ? "Yes" : "No"}
            </p>
            {selectedCar.seats && (
              <p className="text-gray-600">Seats: {selectedCar.seats}</p>
            )}
          </CardContent>
          <CardContent className="flex space-x-4">
            {(selectedCar.category === "sale" ||
              selectedCar.category === "both") && (
              <Button
                onClick={() => handleAddToCart(selectedCar)}
                disabled={selectedCar.status !== "available"}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            )}
            {(selectedCar.category === "rent" ||
              selectedCar.category === "both") && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button disabled={selectedCar.status !== "available"}>
                    <CarIcon className="w-4 h-4 mr-2" />
                    Rent Now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <RentalForm car={selectedCar} />
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Reviews Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            No reviews yet. Be the first to share your experience!
          </p>
          <Button
            variant="outline"
            className="mt-4"
            disabled // Enable when review system is implemented
          >
            Write a Review
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}