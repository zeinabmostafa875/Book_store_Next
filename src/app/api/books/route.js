import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const BOOKS_FILE_PATH = path.join(process.cwd(), "src/data/books.json");


async function readBooks() {
  try {
    const data = await fs.readFile(BOOKS_FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
   
    if (error.code === "ENOENT") {
      await fs.writeFile(BOOKS_FILE_PATH, JSON.stringify([], null, 2));
      return [];
    }
    throw error;
  }
}


async function writeBooks(books) {
  await fs.writeFile(BOOKS_FILE_PATH, JSON.stringify(books, null, 2));
}


export async function GET() {
  try {
    const books = await readBooks();
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    const newBook = await request.json();


    if (!newBook.title || !newBook.author) {
      return NextResponse.json(
        { error: "Title and author are required" },
        { status: 400 }
      );
    }

    const books = await readBooks();

  
    newBook.id = Date.now().toString();

    books.push(newBook);
    await writeBooks(books);

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add book" }, { status: 500 });
  }
}


export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("id");

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    let books = await readBooks();
    const initialLength = books.length;

    books = books.filter((book) => book.id !== bookId);

    if (books.length === initialLength) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    await writeBooks(books);

    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}

// PUT: تحديث كتاب
export async function PUT(request) {
  try {
    const updatedBook = await request.json();

    if (!updatedBook.id) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    let books = await readBooks();
    const bookIndex = books.findIndex((book) => book.id === updatedBook.id);

    if (bookIndex === -1) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    books[bookIndex] = { ...books[bookIndex], ...updatedBook };

    await writeBooks(books);

    return NextResponse.json(books[bookIndex], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    );
  }
}
