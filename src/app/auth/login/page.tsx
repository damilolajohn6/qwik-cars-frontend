"use client"
import { useState, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "../../../redux/slices/authSlice";
import { RootState, AppDispatch } from "../../../redux/store";

export default function AdminLoginPage() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      const userRole = result.payload.user.role;
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  };

  // Prevent hydration error
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Client-side check: Redirect if user is already logged in as admin
      if (user?.role === "admin") {
        router.push("/admin");
      }
    }
  }, [user, router]);

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-4">
        Not an admin?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Customer Login
        </Link>
      </p>
    </div>
  );
}
