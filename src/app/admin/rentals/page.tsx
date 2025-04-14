"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  fetchUserRentals,
  updateRentalStatus,
  deleteRental,
} from "../../../redux/slices/rentalSlice";
import { Rental, Car } from "../../../../types";
import { AppDispatch } from "../../../redux/store";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, CheckCircle, XCircle } from "lucide-react";

// Type guard to check if carId is a Car object
const isCar = (carId: string | Car): carId is Car => {
  return (carId as Car).brand !== undefined;
};

export default function AdminRentalsPage() {
  const dispatch: AppDispatch = useAppDispatch();
  const router = useRouter();
  const { rentals, loading, error } = useAppSelector((state) => state.rentals);
  const {
    user,
    loading: userLoading,
    token,
  } = useAppSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("AdminRentalsPage - User:", user, "Token:", token);
    if (!userLoading) {
      if (!user || user.role !== "admin") {
        console.log("Redirecting to /auth/login: User not admin or missing");
        router.push("/auth/login");
      } else {
        dispatch(fetchUserRentals()).catch((err) =>
          console.error("Fetch rentals failed:", err)
        );
      }
    }
  }, [dispatch, user, userLoading, router, token]);

  const handleUpdateStatus = (rentalId: string, status: Rental["status"]) => {
    dispatch(updateRentalStatus({ rentalId, status })).then(() =>
      dispatch(fetchUserRentals())
    );
  };

  const handleDeleteRental = (rentalId: string) => {
    if (confirm("Are you sure you want to delete this rental?")) {
      dispatch(deleteRental(rentalId)).then(() => dispatch(fetchUserRentals()));
    }
  };

  const filteredRentals = rentals.filter((rental: Rental) => {
    if (!searchTerm) return true; // Show all if no search term
    if (isCar(rental.carId)) {
      return `${rental.carId.brand} ${rental.carId.model}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }
    return rental.carId.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (userLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error: {error}{" "}
        <Button onClick={() => dispatch(fetchUserRentals())}>Retry</Button>
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Rentals</h2>
        <input
          type="text"
          placeholder="Search by car brand, model, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
      </div>

      {filteredRentals.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car</TableHead>
              <TableHead>Duration (Hours)</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRentals.map((rental: Rental) => (
              <TableRow key={rental._id}>
                <TableCell>
                  {isCar(rental.carId)
                    ? `${rental.carId.brand} ${rental.carId.model}${
                        rental.carId.year ? ` (${rental.carId.year})` : ""
                      }`
                    : `Car ID: ${rental.carId}`}
                </TableCell>
                <TableCell>{rental.bookedHours}</TableCell>
                <TableCell>${rental.totalPrice.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      rental.status === "completed"
                        ? "outline"
                        : rental.status === "cancelled"
                        ? "destructive"
                        : "default"
                    }
                    className={
                      rental.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : rental.status === "cancelled"
                        ? ""
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {rental.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleUpdateStatus(rental._id, "completed")
                      }
                      disabled={rental.status === "completed"}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" /> Complete
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleUpdateStatus(rental._id, "cancelled")
                      }
                      disabled={rental.status === "cancelled"}
                    >
                      <XCircle className="w-4 h-4 mr-1" /> Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteRental(rental._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center text-gray-500">No rentals found</div>
      )}
    </div>
  );
}
