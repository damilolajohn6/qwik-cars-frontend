"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../../redux/slices/orderSlice";
import { Order, Car } from "../../../../types";
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

export default function AdminOrdersPage() {
  const dispatch: AppDispatch = useAppDispatch();
  const router = useRouter();
  const { orders, loading, error } = useAppSelector((state) => state.orders);
  const {
    user,
    loading: userLoading,
    token,
  } = useAppSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("AdminOrdersPage - User:", user, "Token:", token);
    if (!userLoading) {
      if (!user || user.role !== "admin") {
        console.log("Redirecting to /admin/login: User not admin or missing");
        router.push("/admin/login");
      } else {
        dispatch(fetchOrders()).catch((err) =>
          console.error("Fetch orders failed:", err)
        );
      }
    }
  }, [dispatch, user, userLoading, router, token]);

  const handleUpdateStatus = (orderId: string, status: Order["status"]) => {
    dispatch(updateOrderStatus({ orderId, status })).then(() =>
      dispatch(fetchOrders())
    );
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(orderId)).then(() => dispatch(fetchOrders()));
    }
  };

  const filteredOrders = orders.filter((order: Order) => {
    if (!searchTerm) return true; // Show all if no search term
    if (isCar(order.carId)) {
      return `${order.carId.brand} ${order.carId.model}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }
    return order.carId.toLowerCase().includes(searchTerm.toLowerCase());
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
        <Button onClick={() => dispatch(fetchOrders())}>Retry</Button>
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Orders</h2>
        <input
          type="text"
          placeholder="Search by car brand, model, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
      </div>

      {filteredOrders.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order: Order) => (
              <TableRow key={order._id}>
                <TableCell>
                  {isCar(order.carId)
                    ? `${order.carId.brand} ${order.carId.model}${
                        order.carId.year ? ` (${order.carId.year})` : ""
                      }`
                    : `Car ID: ${order.carId}`}
                </TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>${order.totalPrice.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "completed"
                        ? "outline"
                        : order.status === "cancelled"
                        ? "destructive"
                        : "default"
                    }
                    className={
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "cancelled"
                        ? ""
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(order._id, "completed")}
                      disabled={order.status === "completed"}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" /> Complete
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(order._id, "cancelled")}
                      disabled={order.status === "cancelled"}
                    >
                      <XCircle className="w-4 h-4 mr-1" /> Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteOrder(order._id)}
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
        <div className="text-center text-gray-500">No orders found</div>
      )}
    </div>
  );
}
