"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function fetchBookDetails(bookId) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${bookId}`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    return null;
  }
}

export default function BookDetailsPage({ params }) {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBookDetails() {
      try {
        setIsLoading(true);
        const bookData = await fetchBookDetails(params.id);

        if (!bookData) {
          notFound();
          return;
        }

        setBook(bookData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }

    loadBookDetails();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="animate-pulse">
          <div className="w-64 h-96 bg-gray-300 mb-6"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-300 w-3/4"></div>
            <div className="h-6 bg-gray-300 w-1/2"></div>
            <div className="h-4 bg-gray-300 w-full"></div>
            <div className="h-4 bg-gray-300 w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="text-center py-8 bg-red-100 rounded-lg">
        <h2 className="text-2xl text-red-600 mb-4">Oops! Book not found</h2>
        <Link
          href="/books"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          Back to Books
        </Link>
      </div>
    );
  }

  const bookInfo = book.volumeInfo;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Book Image */}
        <div className="flex justify-center items-start">
          <div className="w-64 h-96 relative shadow-xl rounded-lg overflow-hidden">
            <Image
              src={
                bookInfo.imageLinks?.large ||
                bookInfo.imageLinks?.thumbnail ||
                "/placeholder-book.jpg"
              }
              alt={bookInfo.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Book Details */}
        <div>
          <h1 className="text-3xl font-bold text-emerald-800 mb-4">
            {bookInfo.title}
          </h1>

          <div className="mb-4">
            <p className="text-gray-600">
              <strong>Author(s):</strong>{" "}
              {bookInfo.authors ? bookInfo.authors.join(", ") : "Unknown"}
            </p>
            <p className="text-gray-600">
              <strong>Published:</strong>{" "}
              {bookInfo.publishedDate || "Date not available"}
            </p>
            <p className="text-gray-600">
              <strong>Publisher:</strong>{" "}
              {bookInfo.publisher || "Not specified"}
            </p>
            <p className="text-gray-600">
              <strong>Pages:</strong> {bookInfo.pageCount || "Not available"}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {bookInfo.description || "No description available"}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {bookInfo.categories ? (
                bookInfo.categories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No categories</span>
              )}
            </div>
          </div>

          <div className="flex space-x-4">
            {bookInfo.previewLink && (
              <a
                href={bookInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors"
              >
                Preview Book
              </a>
            )}
            <Link
              href="/books"
              className="bg-white text-emerald-800 px-6 py-3 rounded-full hover:bg-emerald-100 transition-colors border border-emerald-600"
            >
              Back to Books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
