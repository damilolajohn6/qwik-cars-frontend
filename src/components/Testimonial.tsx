"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    title: "Reliable and Efficient",
    message:
      "Didi Global Autos made my car-buying experience smooth and enjoyable. The staff was knowledgeable and truly cared about helping me find the right vehicle. Highly recommend!",
    name: "Alice Monroe",
    role: "Real Estate Agent",
    image: "/avatar.jpg",
  },
  {
    title: "Exceeded Expectations",
    message:
      "From start to finish, the team was professional and helpful. They made sure every detail was taken care of and the car I got was in perfect shape.",
    name: "David Osei",
    role: "Software Engineer",
    image: "/avatar.jpg",
  },
  {
    title: "Fantastic Customer Service",
    message:
      "I walked in unsure about what I wanted, but the staff guided me patiently. They explained all my options and helped me find a car I absolutely love.",
    name: "Rita Johnson",
    role: "Entrepreneur",
    image: "/avatar.jpg",
  },
  {
    title: "Smooth & Transparent Process",
    message:
      "There were no hidden fees, and everything was explained clearly. The buying process was quick and smooth, and I drove away happy!",
    name: "Samuel Ofori",
    role: "Civil Engineer",
    image: "/avatar.jpg",
  },
];

export default function Testimonial() {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? testimonials.length - 2 : prev - 2));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 2) % testimonials.length);
  };

  const displayedTestimonials =
    typeof window !== "undefined" && window.innerWidth >= 1024
      ? [
          testimonials[startIndex],
          testimonials[(startIndex + 1) % testimonials.length],
        ]
      : [testimonials[startIndex]];

  return (
    <div className="bg-muted py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-2xl font-bold mb-8">Testimonials</h2>
      <div className="flex items-center justify-center gap-4 max-w-6xl mx-auto">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full hover:bg-primary/10 transition"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {displayedTestimonials.map((testimonial, idx) => (
            <Card key={idx} className="w-full">
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {testimonial.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {testimonial.message}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-full hover:bg-primary/10 transition"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
