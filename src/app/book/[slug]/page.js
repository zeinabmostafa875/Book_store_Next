"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function BookDetailsPage() {
  const params = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        // Decode the slug (book title) from the URL
        const bookTitle = decodeURIComponent(params.slug);

      
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q="${bookTitle}"&maxResults=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
          setBook(data.items[0]);
        } else {
          throw new Error("Book not found");
        }

        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }

    if (params.slug) {
      fetchBookDetails();
    }
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 bg-gray-300 h-96 mb-4 md:mb-0 md:mr-8"></div>
          <div className="w-full md:w-2/3">
            <div className="h-10 bg-gray-300 mb-4 w-3/4"></div>
            <div className="h-6 bg-gray-300 mb-2 w-1/2"></div>
            <div className="h-4 bg-gray-300 mb-4 w-full"></div>
            <div className="h-4 bg-gray-300 mb-4 w-full"></div>
            <div className="h-4 bg-gray-300 mb-4 w-3/4"></div>
          </div>
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
      </div>
    );
  }

  if (!book) {
    return <div>No book found</div>;
  }

  const { volumeInfo } = book;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        {/* Book Cover */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0 md:mr-8 flex justify-center">
          <div className="max-w-md w-full shadow-2xl rounded-xl overflow-hidden transform transition-transform hover:scale-105">
            <Image
              src={
                volumeInfo.imageLinks?.large ||
                volumeInfo.imageLinks?.extraLarge ||
                volumeInfo.imageLinks?.thumbnail ||
                "/placeholder-book.jpg"
              }
              alt={volumeInfo.title}
              width={500}
              height={750}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Book Details */}
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold text-emerald-800 mb-4">
            {volumeInfo.title}
          </h1>

          <p className="text-xl text-gray-600 mb-4">
            {volumeInfo.authors
              ? `By ${volumeInfo.authors.join(", ")}`
              : "Unknown Author"}
          </p>

          <div className="flex items-center mb-4">
            <span className="text-yellow-500 mr-2">★</span>
            <span className="text-gray-600">
              {volumeInfo.averageRating || "N/A"}
              <span className="text-gray-400 ml-1">
                ({volumeInfo.ratingsCount || 0} ratings)
              </span>
            </span>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-2">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {volumeInfo.description || "No description available"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold text-emerald-700">
                Publisher
              </h3>
              <p className="text-gray-600">{volumeInfo.publisher || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-700">
                Published Date
              </h3>
              <p className="text-gray-600">
                {volumeInfo.publishedDate || "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-700">
                Page Count
              </h3>
              <p className="text-gray-600">
                {volumeInfo.pageCount ? `${volumeInfo.pageCount} pages` : "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-700">
                Categories
              </h3>
              <p className="text-gray-600">
                {volumeInfo.categories
                  ? volumeInfo.categories.join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            {volumeInfo.previewLink && (
              <a
                href={volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors mr-4"
              >
                Preview Book
              </a>
            )}
            {volumeInfo.infoLink && (
              <a
                href={volumeInfo.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-emerald-800 px-6 py-3 rounded-full hover:bg-emerald-100 transition-colors border border-emerald-600"
              >
                More Info
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
