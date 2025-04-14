"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchOrders } from "../../redux/slices/orderSlice";
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
import { Order, Car } from "../../../types";

// Type guard to check if carId is a Car object
const isCar = (carId: string | Car): carId is Car => {
  return (carId as Car).brand !== undefined;
};

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { orders, loading, error } = useAppSelector((state) => state.orders);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      console.log("OrdersPage - User:", user); // Debug
      dispatch(fetchOrders());
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
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order: Order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>
                      {isCar(order.carId)
                        ? `${order.carId.brand} ${order.carId.model}${
                            order.carId.year ? ` (${order.carId.year})` : ""
                          }`
                        : `Car ID: ${order.carId}`}
                    </TableCell>
                    <TableCell>${order.totalPrice.toLocaleString()}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
