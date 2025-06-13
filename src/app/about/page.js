"use client";

import React from "react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-emerald-800 mb-6">
        About Our Book Store
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Founded with a passion for literature, our book store aims to
            connect readers with amazing stories from around the world. We
            believe in the power of books to inspire, educate, and transform
            lives.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To provide a curated collection of books that cater to diverse
            interests, support emerging authors, and create a community of
            passionate readers.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-bold text-emerald-800 mb-6">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Diversity",
              description:
                "Celebrating books from all cultures and perspectives",
            },
            {
              title: "Quality",
              description: "Carefully selected books of exceptional quality",
            },
            {
              title: "Community",
              description: "Building a supportive network of book lovers",
            },
          ].map((value, index) => (
            <div key={index} className="bg-emerald-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-emerald-700 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
