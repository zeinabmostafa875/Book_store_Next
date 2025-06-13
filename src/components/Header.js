"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HomeIcon,
  BookOpenIcon,
  PlusCircleIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: HomeIcon,
    },
    {
      href: "/books",
      label: "Books",
      icon: BookOpenIcon,
    },
    {
      href: "/books/manage",
      label: "Manage Books",
      icon: PlusCircleIcon,
    },
    {
      href: "/about",
      label: "About",
      icon: InformationCircleIcon,
    },
    {
      href: "/contact",
      label: "Contact",
      icon: EnvelopeIcon,
    },
  ];

  const authItems = [
    {
      href: "/login",
      label: "Login",
      icon: ArrowRightOnRectangleIcon,
      className: "bg-emerald-600 text-white hover:bg-emerald-700",
    },
    {
      href: "/signup",
      label: "Sign Up",
      icon: UserPlusIcon,
      className:
        "bg-white text-emerald-800 hover:bg-emerald-100 border border-emerald-600",
    },
  ];

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold flex items-center space-x-2 hover:text-emerald-100 transition"
        >
          <BookOpenIcon className="h-8 w-8" />
          <span>Book Store</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <nav className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-300
                  ${
                    pathname === item.href
                      ? "bg-white bg-opacity-20 text-white"
                      : "hover:bg-white hover:bg-opacity-10 text-white text-opacity-90"
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex space-x-2">
            {authItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-full transition-colors
                  ${item.className}
                `}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-emerald-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {[...navItems, ...authItems].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                  ${
                    pathname === item.href
                      ? "bg-white bg-opacity-20 text-white"
                      : "hover:bg-white hover:bg-opacity-10 text-white text-opacity-90"
                  }
                `}
              >
                <item.icon className="h-6 w-6" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
