"use client";
import CtaCards from "@/components/CtaCards";
import FeaturedCars from "@/components/FeaturedCars";
import HomeAboutUs from "@/components/HomeAboutUs";
import Hero from "@/components/HomeHero";
import Testimonial from "@/components/Testimonial";

export default function Home() {

  return (
    <div className="">
      <Hero />
      <FeaturedCars />
      <CtaCards />
      <HomeAboutUs />
      <Testimonial />
    </div>
  );
}
