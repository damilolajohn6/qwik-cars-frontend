"use client";

import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { createRental } from "../redux/slices/rentalSlice";
import { Car } from "../../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { format, addHours } from "date-fns";

interface RentalFormProps {
  car: Car
}

interface CreateRentalData {
  carId: string;
  startDate: string;
  endDate: string;
  paymentMethod: "credit_card" | "bank_transfer" | "cash";
}

export default function RentalForm({ car }: RentalFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [hours, setHours] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<
    "credit_card" | "bank_transfer" | "cash"
  >("credit_card");

  const endDate = addHours(startDate, hours);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const rentalData: CreateRentalData = {
      carId: car._id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      paymentMethod,
    };

    try {
      await dispatch(createRental(rentalData)).unwrap();
      router.push("/rentals");
    } catch (error) {
      console.error("Rental failed:", error);
    }
  };

  const totalPrice = (car.rentalPricePerHour || 0) * hours;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold">
        Rent {car.brand} {car.model}
      </h2>
      <div>
        <label className="block text-sm font-medium mb-1">Start Date</label>
        <Calendar
          mode="single"
          selected={startDate}
          onSelect={(date) => date && setStartDate(date)}
          className="rounded-md border"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Rental Duration (Hours)
        </label>
        <Input
          type="number"
          min="1"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">End Date</label>
        <p className="text-gray-600">{format(endDate, "PPp")}</p>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Total Price</label>
        <p className="text-lg font-semibold">
          ${totalPrice.toLocaleString()}
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Payment Method</label>
        <Select
          value={paymentMethod}
          onValueChange={(value) =>
            setPaymentMethod(value as "credit_card" | "bank_transfer" | "cash")
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="credit_card">Credit Card</SelectItem>
            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
            <SelectItem value="cash">Cash</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        Confirm Rental
      </Button>
    </form>
  );
}