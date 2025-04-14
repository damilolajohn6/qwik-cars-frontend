"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchUserRentals } from "../../redux/slices/rentalSlice";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Rental, Car } from "../../../types";

// Type guard to check if carId is a Car object
const isCar = (carId: string | Car): carId is Car => {
  return (carId as Car).brand !== undefined;
};

export default function RentalsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { rentals, loading, error } = useAppSelector((state) => state.rentals);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      console.log("RentalsPage - User:", user); // Debug
      dispatch(fetchUserRentals());
    }
  }, [dispatch, user]);

  if (!user) {
    router.push("/login");
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Rentals</h1>
      <Card>
        <CardHeader>
          <CardTitle>Rental History</CardTitle>
        </CardHeader>
        <CardContent>
          {rentals.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rental ID</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentals.map((rental: Rental) => (
                  <TableRow key={rental._id}>
                    <TableCell>{rental._id}</TableCell>
                    <TableCell>
                      {isCar(rental.carId)
                        ? `${rental.carId.brand} ${rental.carId.model}${
                            rental.carId.year ? ` (${rental.carId.year})` : ""
                          }`
                        : `Car ID: ${rental.carId}`}
                    </TableCell>
                    <TableCell>
                      {new Date(rental.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(rental.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>${rental.totalPrice.toLocaleString()}</TableCell>
                    <TableCell>{rental.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500">No rentals found.</p>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
