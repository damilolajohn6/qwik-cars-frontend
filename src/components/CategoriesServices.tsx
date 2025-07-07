"use client";

import Image from "next/image";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
}

const ServiceCard = ({ image, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-md overflow-hidden shadow-sm">
      <div className="relative w-full h-64">
        <Image src={image} alt={title} fill className="object-cover" priority />
        <div className="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1 rounded font-semibold shadow">
          New
        </div>
      </div>
      <div className="p-4 text-gray-700">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default function CategoriesServices() {
  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">
          Categories Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            image="/cat1.jpg"
            title="A weekend Experience"
            description="Make your weekend unforgettable with our exclusive car rental options! Whether it’s a road trip, a quick getaway, choose from our wide selection of stylish and reliable vehicles."
          />
          <ServiceCard
            image="/cat2.jpg"
            title="Available 24/7"
            description="We're here for you 24/7—Whether you need help buying a car, have questions about our services, or require assistance at any point during your rental, our dedicated team is always ready to support you."
          />
          <ServiceCard
            image="/cat3.jpg"
            title="Premium Car Every Time"
            description="Enjoy a premium driving experience every time—Our fleet of maintained, high-quality vehicles ensures you always get a top-tier car. Comfort, performance, and luxury are guaranteed with every ride."
          />
        </div>
      </div>
    </section>
  );
}
