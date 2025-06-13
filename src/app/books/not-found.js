import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
      <div className="text-center bg-white p-10 rounded-xl shadow-lg">
        <div className="mb-6">
          <span className="text-8xl font-bold text-emerald-600">404</span>
        </div>
        <h1 className="text-3xl font-bold text-emerald-800 mb-4">
          Book Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The book you are looking for does not exist or has been removed.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/books"
            className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors"
          >
            Browse Books
          </Link>
          <Link
            href="/"
            className="bg-white text-emerald-800 px-6 py-3 rounded-full hover:bg-emerald-100 transition-colors border border-emerald-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
