"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const SearchFilter = ({ label }: { label: string }) => (
  <div className="bg-white border border-gray-200 rounded-md px-4 py-2 flex items-center justify-between flex-1 min-w-[150px]">
    <span className="text-gray-600">{label}</span>
    <ChevronDown className="h-5 w-5 text-gray-400" />
  </div>
);

export default function Hero() {

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Searching...");
  };

  return (
    <section className="bg-white">

      <div className="container mx-auto px-4 pt-16 pb-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
          Find Your Next Car
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-gray-500">
          Your One-Stop Destination for Every Car Shopping
        </p>

        {/* Car Image */}
        <div className="mt-8">
          <Image
            src="/cars1.png"
            alt="Red Infiniti car"
            width={700}
            height={350}
            className="mx-auto"
            priority
          />
        </div>
      </div>

      {/* Quick Search Section */}
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-5">Quick Search</h2>
            <form
              onSubmit={handleSearch}
              className="flex flex-wrap gap-4 items-center"
            >
              <SearchFilter label="Make" />
              <SearchFilter label="Model" />
              <SearchFilter label="Body Type" />
              <SearchFilter label="Fuel Type" />
              <SearchFilter label="Price Range" />
              <SearchFilter label="Year Made" />
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-10 rounded-md h-full"
              >
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
