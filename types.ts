export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: "customer" | "admin";
}

export interface Car {
    _id: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    price: number;
    retailPrice?: number;
    rentalPricePerHour?: number;
    category: "sale" | "rent" | "both";
    status: "available" | "sold" | "rented" | "unavailable";
    quantity: number;
    engineCC?: number;
    maxPower?: string;
    airbags?: number;
    rearCamera?: boolean;
    seats?: number;
    bookedHours?: number;
    images: { url: string; publicId: string }[];
    createdAt: string;
    updatedAt: string;
}

export interface CartItem {
    carId: string;
    quantity: number;
    price: number;
    car?: Car;
}

export interface Order {
    _id: string;
    userId: string;
    carId: string | Car;
    totalPrice: number;
    quantity: number;
    status: "pending" | "completed" | "cancelled";
    paymentMethod: "credit_card" | "bank_transfer" | "cash";
    deliveryAddress?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface Rental {
    _id: string;
    userId: string;
    carId: string | Car; // Allow populated Car data
    startDate: string;
    endDate: string;
    totalPrice: number;
    bookedHours: number;
    status: "active" | "completed" | "cancelled";
    paymentMethod: "credit_card" | "bank_transfer" | "cash";
    createdAt: string;
    updatedAt: string;
}