/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCars, setSelectedCar } from "../../../redux/slices/carSlice";
import { useAppSelector } from "../../../redux/hooks";
import Sidebar from "@/components/cars/Sidebar";
import CarCard from "@/components/cars/CarCard";
import CarForm from "@/components/cars/CarForm";
import { AppDispatch } from "@/redux/store";
import { Button } from "@/components/ui/button";

export default function AdminCars() {
  const dispatch = useDispatch<AppDispatch>();
  const { cars, selectedCar, loading, error } = useAppSelector(
    (state) => state.cars
  );

  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchCars({ category, status }));
  }, [category, status, dispatch]);

  const refreshCars = () => {
    dispatch(fetchCars({ category, status }));
  };

  const handleAddNew = () => {
    dispatch(setSelectedCar(null)); // Clear selection
    setShowForm(true); // Open form in add mode
  };

  const handleEditCar = (car: any) => {
    dispatch(setSelectedCar(car));
    setShowForm(true); // Show form in edit mode
  };

  const handleCloseForm = () => {
    setShowForm(false);
    dispatch(setSelectedCar(null));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex min-h-screen">
      <Sidebar
        category={category}
        status={status}
        setCategory={setCategory}
        setStatus={setStatus}
      />

      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Cars</h1>
          <Button
            onClick={handleAddNew}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add New Car
          </Button>
        </div>

        {showForm && (
          <CarForm
            selectedCar={selectedCar}
            onClose={handleCloseForm}
            refreshCars={refreshCars}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cars.map((car) => (
            <CarCard
              key={car._id}
              car={car}
              onSelect={() => handleEditCar(car)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
