import React, { useEffect, useState } from "react";
import axios from "axios";
import AddBook from "./AddBook";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const resFetch = await axios.get("http://localhost:5000/api/books/fetch");
      const resDB = await axios.get("http://localhost:5000/api/books");
      const allBooks = [...resDB.data, ...resFetch.data];
      const booksWithId = allBooks.map((b, idx) => ({ _id: b._id || idx, ...b }));
      setBooks(booksWithId);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBorrow = async (bookId) => {
    if (!user) return alert("Please login first to borrow books");
    setLoadingId(bookId);
    try {
      await axios.post("http://localhost:5000/api/borrow", { userId: user._id, bookId });
      fetchBooks();
    } catch (err) {
      console.error("Borrow failed:", err);
      alert("Borrow failed! Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleReturn = async (bookId) => {
    setLoadingId(bookId);
    try {
      const res = await axios.get("http://localhost:5000/api/borrow");
      const record = res.data.find(
        (r) => (r.book?._id || r.book) === bookId && r.status === "borrowed"
      );
      if (!record) return alert("No active borrow record found");
      await axios.put("http://localhost:5000/api/borrow/return", { recordId: record._id });
      fetchBooks();
    } catch (err) {
      console.error("Return failed:", err);
      alert("Return failed! Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredBooks = books.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-24 h-24 bg-amber-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-30 blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-700 to-orange-800 bg-clip-text text-transparent">
              Library Collection
            </h1>
          </div>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Discover {books.length} amazing books in our digital library. 
            {user ? " Start your reading journey today!" : " Login to borrow books!"}
          </p>
        </div>

        {/* Add Book Form for Admin */}
        {user?.role === "admin" && <AddBook onBookAdded={fetchBooks} />}

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/80 backdrop-blur-sm border-2 border-amber-200 rounded-2xl py-4 pl-12 pr-6 text-amber-900 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 shadow-lg transition-all duration-300 text-lg"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600"></div>
          </div>
        )}

        {/* Books Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl border-2 border-amber-100 hover:border-amber-200 p-6 transform hover:-translate-y-2 transition-all duration-300"
              >
                {/* Book Cover */}
                <div className="relative mb-5 overflow-hidden rounded-2xl shadow-lg">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
                      <svg className="w-16 h-16 text-amber-600 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Availability Badge */}
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                    book.available 
                      ? "bg-green-500 text-white" 
                      : "bg-red-500 text-white"
                  }`}>
                    {book.available ? "Available" : "Borrowed"}
                  </div>
                </div>

                {/* Book Info */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-amber-900 line-clamp-2 leading-tight group-hover:text-amber-800 transition-colors">
                    {book.title}
                  </h2>
                  
                  <div className="flex items-center space-x-2 text-amber-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-sm font-medium">by {book.author}</p>
                  </div>
                </div>

                {/* Action Button */}
                {user && (
                  <button
                    disabled={loadingId === book._id}
                    onClick={() =>
                      book.available ? handleBorrow(book._id) : handleReturn(book._id)
                    }
                    className={`w-full mt-5 py-3 px-4 rounded-xl font-semibold shadow-lg transform transition-all duration-200 flex items-center justify-center space-x-2 ${
                      book.available
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:shadow-xl hover:-translate-y-0.5"
                        : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white hover:shadow-xl hover:-translate-y-0.5"
                    } disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg`}
                  >
                    {loadingId === book._id ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : book.available ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Borrow Book</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Return Book</span>
                      </>
                    )}
                  </button>
                )}

                {/* Login Prompt */}
                {!user && (
                  <div className="mt-5 p-3 bg-amber-50 rounded-xl border border-amber-200 text-center">
                    <p className="text-sm text-amber-700 font-medium">
                      Please login to borrow books
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-amber-800 mb-3">No Books Found</h3>
            <p className="text-amber-600 max-w-md mx-auto">
              {search ? `No books matching "${search}" found in our collection.` : "Our library collection is currently empty."}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-xl transition-colors duration-200"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Books Count */}
        {!loading && filteredBooks.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-amber-700 font-medium">
              Showing {filteredBooks.length} of {books.length} books
              {search && ` for "${search}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;