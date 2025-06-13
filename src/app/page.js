"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Fetch function
async function fetchBooks() {
  try {
    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=bestsellers&maxResults=12"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}

// Book Card Component
function BookCard({ book }) {
  const { volumeInfo } = book;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="w-24 h-36 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
          {volumeInfo.imageLinks?.thumbnail ? (
            <image
              src={volumeInfo.imageLinks.thumbnail}
              alt={volumeInfo.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl text-emerald-600">📖</span>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
            {volumeInfo.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {volumeInfo.authors
              ? volumeInfo.authors.join(", ")
              : "Unknown Author"}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm text-gray-600">
              {volumeInfo.averageRating || "N/A"}
              <span className="text-gray-400 ml-1">
                ({volumeInfo.ratingsCount || 0} ratings)
              </span>
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
        {volumeInfo.description || "No description available"}
      </p>
      <div className="flex justify-between items-center mt-auto">
        <div className="flex flex-col">
          <span className="text-emerald-600 font-semibold">
            {volumeInfo.pageCount
              ? `${volumeInfo.pageCount} pages`
              : "Paperback"}
          </span>
          <span className="text-sm text-gray-500">
            {volumeInfo.publishedDate
              ? new Date(volumeInfo.publishedDate).getFullYear()
              : "Publication Year N/A"}
          </span>
        </div>
        <Link
          href={`/book/${encodeURIComponent(
            volumeInfo.title.replace(/\s+/g, "-").toLowerCase()
          )}`}
          className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        setIsLoading(true);
        const fetchedBooks = await fetchBooks();
        setBooks(fetchedBooks);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }

    loadBooks();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="bg-gray-200 rounded-lg p-4">
              <div className="flex">
                <div className="w-24 h-36 bg-gray-300 mr-4"></div>
                <div className="flex-grow">
                  <div className="h-6 bg-gray-300 mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-300 mb-2 w-1/2"></div>
                  <div className="h-4 bg-gray-300 w-1/3"></div>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-3 bg-gray-300 mb-2"></div>
                <div className="h-3 bg-gray-300 mb-2"></div>
                <div className="h-3 bg-gray-300 w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error handling
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
    <div className="bg-emerald-50 min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your Next{" "}
            <span className="text-emerald-600">Literary Adventure</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore a world of books, from timeless classics to contemporary
            bestsellers. Your reading journey starts here.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/books"
              className="bg-emerald-600 text-white px-8 py-3 rounded-full text-lg hover:bg-emerald-700 transition-colors shadow-lg"
            >
              Browse Books
            </Link>
            <Link
              href="/about"
              className="bg-white text-emerald-800 px-8 py-3 rounded-full text-lg hover:bg-emerald-100 transition-colors border border-emerald-600 shadow-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Book Store?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-emerald-50 rounded-lg shadow-md">
              <div className="text-emerald-600 text-5xl mb-4 flex justify-center">
                📚
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Vast Collection
              </h3>
              <p className="text-gray-600">
                Explore thousands of books across multiple genres and
                categories.
              </p>
            </div>
            <div className="text-center p-6 bg-emerald-50 rounded-lg shadow-md">
              <div className="text-emerald-600 text-5xl mb-4 flex justify-center">
                🔍
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Easy Discovery
              </h3>
              <p className="text-gray-600">
                Find your next favorite book with our intuitive search and
                recommendations.
              </p>
            </div>
            <div className="text-center p-6 bg-emerald-50 rounded-lg shadow-md">
              <div className="text-emerald-600 text-5xl mb-4 flex justify-center">
                💡
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Personalized Experience
              </h3>
              <p className="text-gray-600">
                Create an account to save favorites and get tailored
                suggestions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Start Your Reading Journey Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-emerald-100">
            Join thousands of book lovers and discover a world of stories
            waiting to be explored.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/signup"
              className="bg-white text-emerald-800 px-8 py-3 rounded-full text-lg hover:bg-emerald-100 transition-colors"
            >
              Create Account
            </Link>
            <Link
              href="/books"
              className="bg-emerald-800 text-white px-8 py-3 rounded-full text-lg hover:bg-emerald-900 transition-colors"
            >
              View Books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
