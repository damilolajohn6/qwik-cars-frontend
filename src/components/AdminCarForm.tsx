"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchCars } from "../redux/slices/carSlice";
import { RootState, AppDispatch } from "../redux/store";

export default function AdminCarForm() {
  const dispatch: AppDispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    price: "",
    rentalPricePerHour: "",
    category: "sale" as "sale" | "rent" | "both",
    images: [] as File[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, images: Array.from(e.target.files!) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const images = await Promise.all(
      formData.images.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "car-dealership"); // Configure in Cloudinary
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dilhmmvz6/image/upload",
          formData
        );
        return res.data.secure_url;
      })
    );

    const carData = {
      ...formData,
      year: Number(formData.year),
      price: Number(formData.price),
      rentalPricePerHour: formData.rentalPricePerHour
        ? Number(formData.rentalPricePerHour)
        : undefined,
      images,
    };

    try {
      await axios.post("/api/cars", carData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(fetchCars({})); // Refresh car list
      setFormData({
        brand: "",
        model: "",
        year: "",
        color: "",
        price: "",
        rentalPricePerHour: "",
        category: "sale",
        images: [],
      });
    } catch (error) {
      console.error("Failed to add car:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold">Add New Car</h2>
      <input
        type="text"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        placeholder="Brand"
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        name="model"
        value={formData.model}
        onChange={handleChange}
        placeholder="Model"
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="Year"
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        name="color"
        value={formData.color}
        onChange={handleChange}
        placeholder="Color"
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        name="rentalPricePerHour"
        value={formData.rentalPricePerHour}
        onChange={handleChange}
        placeholder="Rental Price per Hour (optional)"
        className="border p-2 w-full"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="sale">Sale</option>
        <option value="rent">Rent</option>
        <option value="both">Both</option>
      </select>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Car
      </button>
    </form>
  );
}
