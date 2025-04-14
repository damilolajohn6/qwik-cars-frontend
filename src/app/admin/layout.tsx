"use client";

import { Fragment, ReactNode, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { AppDispatch, RootState } from "../../redux/store";



interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Manage Cars", href: "/admin/cars" },
  { name: "Manage Orders", href: "/admin/orders" },
  { name: "Manage Rentals", href: "/admin/rentals" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("AdminSidebar user:", user);
    if (loading) return; // Skip rendering if still loading user
    if (!user || user.role !== "admin") {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user === null) {
      console.log("User is null, redirecting to /admin/login");
      router.push("/admin/login");
    } else if (user && user.role !== "admin") {
      console.log("User is not admin, redirecting to /admin/login");
      router.push("/admin/login");
    }
  }, [user, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  if (loading || !user || user.role !== "admin") return null; // Prevent rendering until user is loaded

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800 p-4 text-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Admin Panel</h2>
                <button onClick={() => setSidebarOpen(false)}>
                  {/* <XIcon className="w-6 h-6" /> */}
                </button>
              </div>
              <nav className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block hover:text-gray-300"
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:text-red-400"
                >
                  {/* <LogoutIcon className="w-4 h-4" /> */}
                  Logout
                </button>
              </nav>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar (desktop) */}
      <div className="hidden lg:flex lg:flex-shrink-0 w-64 bg-gray-800 text-white p-6 flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-gray-300"
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 hover:text-red-400"
          >
            {/* <LogoutIcon className="w-4 h-4" /> */}
            Logout
          </button>
        </nav>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top nav */}
        <header className="flex items-center justify-between bg-white px-4 py-4 shadow-sm lg:px-6">
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <div className="text-sm text-gray-600 hidden sm:block">
            Welcome, {user?.name}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
