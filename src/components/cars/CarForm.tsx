/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Car } from "../../../types";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCars, setSelectedCar } from "../../redux/slices/carSlice";

const carSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce.number().min(1900, "Year must be 1900 or later"),
  color: z.string().min(1, "Color is required"),
  price: z.coerce.number().min(0, "Price must be non-negative"),
  retailPrice: z.coerce
    .number()
    .min(0, "Retail price must be non-negative")
    .optional(),
  rentalPricePerHour: z.coerce
    .number()
    .min(0, "Rental price must be non-negative")
    .optional(),
  category: z.enum(["sale", "rent", "both"], {
    errorMap: () => ({ message: "Category is required" }),
  }),
  engineCC: z.coerce
    .number()
    .min(0, "Engine CC must be non-negative")
    .optional(),
  maxPower: z.string().optional(), // Changed to string
  airbags: z.coerce.number().min(0, "Airbags must be non-negative").optional(),
  rearCamera: z.boolean().optional(),
  seats: z.coerce.number().min(1, "Seats must be at least 1").optional(),
  quantity: z.coerce
    .number()
    .min(0, "Quantity must be non-negative")
    .optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

type CarFormValues = z.infer<typeof carSchema>;

interface Props {
  selectedCar: Car | null;
  onClose: () => void;
  refreshCars: () => void;
}

export default function CarForm({ selectedCar, onClose, refreshCars }: Props) {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: selectedCar
      ? { ...selectedCar, images: selectedCar.images.map((img) => img.url) }
      : {
          brand: "",
          model: "",
          year: new Date().getFullYear(),
          color: "",
          price: 0,
          retailPrice: 0,
          rentalPricePerHour: 0,
          category: "sale",
          engineCC: 0,
          maxPower: "",
          airbags: 0,
          rearCamera: false,
          seats: 5,
          quantity: 1,
          images: [],
        },
  });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const images = watch("images");

  useEffect(() => {
    if (selectedCar) {
      dispatch(fetchCars({ category: selectedCar.category }));
    }
  }, [selectedCar, dispatch]);

  const onSubmit = async (data: CarFormValues) => {
    try {
      if (!user || user.role !== "admin") {
        throw new Error("Only admins can add or update cars");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      console.log("Submitting data:", data);

      if (selectedCar) {
        await axios.put(`/api/cars/${selectedCar._id}`, data, config);
      } else {
        await axios.post(`/api/cars`, data, config);
      }
      refreshCars();
      onClose();
      dispatch(setSelectedCar(null));
    } catch (err: any) {
      console.error("Error saving car:", err);
      setUploadError(err.response?.data?.error || "Failed to save car");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const url = await uploadToCloudinary(file);
      setValue("images", [...images, url], { shouldValidate: true });
    } catch (error) {
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url: string) => {
    setValue(
      "images",
      images.filter((img) => img !== url)
    );
  };

  if (!user || user.role !== "admin") {
    return <p className="text-red-500">Unauthorized: Admins only</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-bold">
        {selectedCar ? "Edit Car" : "Add New Car"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="brand" className="block text-sm font-medium mb-1">
            Brand
          </label>
          <Input id="brand" placeholder="Brand" {...register("brand")} />
          {errors.brand && (
            <p className="text-red-500 text-sm">{errors.brand.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="model" className="block text-sm font-medium mb-1">
            Model
          </label>
          <Input id="model" placeholder="Model" {...register("model")} />
          {errors.model && (
            <p className="text-red-500 text-sm">{errors.model.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium mb-1">
            Year
          </label>
          <Input
            id="year"
            type="number"
            placeholder="Year"
            {...register("year")}
          />
          {errors.year && (
            <p className="text-red-500 text-sm">{errors.year.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="color" className="block text-sm font-medium mb-1">
            Color
          </label>
          <Input id="color" placeholder="Color" {...register("color")} />
          {errors.color && (
            <p className="text-red-500 text-sm">{errors.color.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Price
          </label>
          <Input
            id="price"
            type="number"
            placeholder="Price"
            {...register("price")}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="retailPrice"
            className="block text-sm font-medium mb-1"
          >
            Retail Price
          </label>
          <Input
            id="retailPrice"
            type="number"
            placeholder="Retail Price"
            {...register("retailPrice")}
          />
        </div>
        <div>
          <label
            htmlFor="rentalPricePerHour"
            className="block text-sm font-medium mb-1"
          >
            Rental Price/Hour
          </label>
          <Input
            id="rentalPricePerHour"
            type="number"
            placeholder="Rental Price/Hour"
            {...register("rentalPricePerHour")}
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            {...register("category")}
            className="border p-2 w-full rounded"
          >
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
            <option value="both">Both</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="engineCC" className="block text-sm font-medium mb-1">
            Engine CC
          </label>
          <Input
            id="engineCC"
            type="number"
            placeholder="Engine CC"
            {...register("engineCC")}
          />
        </div>
        <div>
          <label htmlFor="maxPower" className="block text-sm font-medium mb-1">
            Max Power
          </label>
          <Input
            id="maxPower"
            placeholder="Max Power"
            {...register("maxPower")}
          />
        </div>
        <div>
          <label htmlFor="airbags" className="block text-sm font-medium mb-1">
            Airbags
          </label>
          <Input
            id="airbags"
            type="number"
            placeholder="Airbags"
            {...register("airbags")}
          />
        </div>
        <div>
          <label
            htmlFor="rearCamera"
            className="block text-sm font-medium mb-1"
          >
            Rear Camera
          </label>
          <input id="rearCamera" type="checkbox" {...register("rearCamera")} />
        </div>
        <div>
          <label htmlFor="seats" className="block text-sm font-medium mb-1">
            Seats
          </label>
          <Input
            id="seats"
            type="number"
            placeholder="Seats"
            {...register("seats")}
          />
          {errors.seats && (
            <p className="text-red-500 text-sm">{errors.seats.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium mb-1">
            Quantity
          </label>
          <Input
            id="quantity"
            type="number"
            placeholder="Quantity"
            {...register("quantity")}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Upload Image</label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
        />
        {uploading && (
          <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
        )}
        {uploadError && (
          <p className="text-red-500 text-sm mt-1">{uploadError}</p>
        )}
      </div>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-2">
          {images.map((url) => (
            <div key={url} className="relative w-32 h-32">
              <Image
                src={url}
                alt="Car Image"
                fill
                className="object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || uploading}
        className="w-full"
      >
        {selectedCar ? "Update Car" : "Create Car"}
      </Button>
    </form>
  );
}
