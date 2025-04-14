"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../redux/slices/cartSlice";
import { createOrder } from "../../redux/slices/orderSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const handleQuantityChange = (carId: string, quantity: number) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ carId, quantity }));
    }
  };

  const handleRemove = (carId: string) => {
    dispatch(removeFromCart(carId));
  };

  const handleCheckout = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const orderData = {
      items: items.map((item) => ({
        carId: item.carId,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      ),
      paymentMethod: "credit_card",
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      router.push("/orders");
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="">

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {items.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Car</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.carId}>
                  <TableCell className="flex items-center space-x-4">
                    {item.car && (
                      <>
                        <Image
                          src={
                            item.car.images?.[0]?.url ||
                            "/images/placeholder.jpg"
                          }
                          alt={`${item.car.brand} ${item.car.model}`}
                          width={80}
                          height={60}
                          className="rounded-md"
                        />
                        <div>
                          <p className="font-semibold">
                            {item.car.brand} {item.car.model}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.car.year}
                          </p>
                        </div>
                      </>
                    )}
                    {!item.car && <p>Car ID: {item.carId}</p>}
                  </TableCell>
                  <TableCell>${item.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.carId, Number(e.target.value))
                      }
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    ${(item.quantity * item.price).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemove(item.carId)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-8 flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold">
                Total: ${total.toLocaleString()}
              </p>
            </div>
            <div className="space-x-4">
              <Button variant="outline" onClick={() => dispatch(clearCart())}>
                Clear Cart
              </Button>
              <Button onClick={handleCheckout}>Proceed to Checkout</Button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">
          Your cart is empty.
          <Button asChild variant="link">
            <Link href="/cars">Browse Cars</Link>
          </Button>
        </div>
      )}
    </div>
    </div>
  );
}
