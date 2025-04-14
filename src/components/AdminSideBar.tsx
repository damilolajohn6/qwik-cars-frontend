"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "../redux/slices/authSlice";
import { RootState, AppDispatch } from "../redux/store";

export default function AdminSidebar() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/auth/login"); // Redirect to admin login
    }
  }, [user, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <aside className="bg-gray-800 text-white w-64 h-screen p-4 fixed">
      <div className="text-xl font-bold mb-6">
        <Link href="/admin">Admin Dashboard</Link>
      </div>
      <ul className="space-y-4">
        <li>
          <Link href="/admin/cars" className="hover:text-gray-300">
            Manage Cars
          </Link>
        </li>
        <li>
          <Link href="/admin/orders" className="hover:text-gray-300">
            Manage Orders
          </Link>
        </li>
        <li>
          <Link href="/admin/rentals" className="hover:text-gray-300">
            Manage Rentals
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="hover:text-gray-300">
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}
