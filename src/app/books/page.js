"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

async function fetchAllBooks(page = 1) {
  try {
    const startIndex = (page - 1) * 12;
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=programming&startIndex=${startIndex}&maxResults=12`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    return {
      books: data.items || [],
      totalBooks: data.totalItems || 0,
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    async function loadBooks() {
      try {
        setIsLoading(true);
        const { books: fetchedBooks, totalBooks: total } = await fetchAllBooks(
          currentPage
        );
        setBooks(fetchedBooks);
        setTotalBooks(total);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }

    loadBooks();
  }, [currentPage]);

  const totalPages = Math.ceil(totalBooks / 12);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md animate-pulse"
            >
              <div className="h-64 bg-gray-300"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 mb-2 w-1/2"></div>
                <div className="h-4 bg-gray-200 w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 bg-red-100 rounded-lg">
        <h2 className="text-2xl text-red-600 mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-red-500">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-emerald-800 mb-8 text-center">
        Book Collection
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => {
          const bookInfo = book.volumeInfo;
          return (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={
                    bookInfo.imageLinks?.thumbnail ||
                    bookInfo.imageLinks?.smallThumbnail ||
                    "/placeholder-book.jpg"
                  }
                  alt={bookInfo.title || "Book Cover"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-emerald-800 mb-2 line-clamp-2">
                  {bookInfo.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {bookInfo.authors
                    ? bookInfo.authors.join(", ")
                    : "Unknown Author"}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-emerald-600">
                    {bookInfo.pageCount
                      ? `${bookInfo.pageCount} pages`
                      : "Paperback"}
                  </span>
                  <Link
                    href={`/book/${encodeURIComponent(
                      bookInfo.title.replace(/\s+/g, "-").toLowerCase()
                    )}`}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="bg-emerald-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
          className="bg-emerald-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
