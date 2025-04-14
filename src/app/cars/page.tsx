"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchCars } from "../../redux/slices/carSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { Car } from "../../../types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Loader2, ShoppingCart, Car as CarIcon, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductHero from "@/components/ProductHero";

export default function CarsPage() {
  const dispatch = useAppDispatch();
  const { cars, loading, error } = useAppSelector((state) => state.cars);
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<"sale" | "rent" | "both">(
    (searchParams.get("type") as "sale" | "rent") || "both"
  );
  const [brand, setBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  // Unique brands for filter
  const brands = Array.from(new Set(cars.map((car) => car.brand))).sort();

  useEffect(() => {
    dispatch(
      fetchCars({
        category,
        brand: brand !== "all" ? brand : undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        search: searchTerm,
      })
    );
  }, [dispatch, category, brand, priceRange, searchTerm]);

  const handleAddToCart = (car: Car) => {
    dispatch(addToCart(car));
  };

  const handleRent = (car: Car) => {
    // Redirect to rental form (implement later)
    console.log(`Renting ${car.brand} ${car.model}`);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(searchTerm.trim());
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value as "sale" | "rent" | "both");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-500">
        Error: {error}{" "}
        <Button onClick={() => dispatch(fetchCars({}))}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="">
      <ProductHero />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse Cars</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Category Toggle */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Category</label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="both">All Cars</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Brand Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Brand</label>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <Slider
              min={0}
              max={100000}
              step={1000}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="mt-2"
            />
          </div>

          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Search</label>
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="text"
                placeholder="Search by brand or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" variant="ghost">
                <Search className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>

        {/* Car Grid */}
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <p className="text-gray-600">
                    {car.category === "sale" || car.category === "both"
                      ? `$${car.price.toLocaleString()}`
                      : `$${car.rentalPricePerHour}/hour`}
                  </p>
                  <p className="text-sm text-gray-500">Status: {car.status}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="outline">
                    <Link href={`/cars/${car._id}`}>View Details</Link>
                  </Button>
                  {car.category === "sale" || car.category === "both" ? (
                    <Button
                      onClick={() => handleAddToCart(car)}
                      disabled={car.status !== "available"}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleRent(car)}
                      disabled={car.status !== "available"}
                    >
                      <CarIcon className="w-4 h-4 mr-2" />
                      Rent Now
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No cars found</div>
        )}
      </div>
    </div>
  );
}
