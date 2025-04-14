"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../../redux/store";

const AdminDashboardPage = () => {
  const router = useRouter();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("AdminDashboard user:", user);
    if (loading) return; // Skip if still loading user
    if (!user || user.role !== "admin") {
      console.log("Redirecting to /login due to missing or invalid user");
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "admin") {
    return null; // Prevent rendering until user is loaded
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>
        Welcome, {user.name}! Use the sidebar to manage cars, orders, and
        rentals.
      </p>
    </div>
  );
};

export default AdminDashboardPage;
