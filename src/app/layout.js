import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Book Store - Your Literary Companion",
    template: "%s | Book Store",
  },
  description:
    "Discover, explore, and enjoy a world of books at your fingertips",
  keywords: ["books", "reading", "library", "book store", "literature"],
  authors: [{ name: "Book Store Team" }],
  openGraph: {
    title: "Book Store",
    description: "Your ultimate destination for books",
    type: "website",
    locale: "en_US",
    url: "https://bookstore.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-emerald-800 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 Book Store. All rights reserved.</p>
            <div className="mt-4 space-x-4">
              <a href="/privacy" className="hover:text-emerald-200 transition">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-emerald-200 transition">
                Terms of Service
              </a>
              <a href="/contact" className="hover:text-emerald-200 transition">
                Contact Us
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

// about
