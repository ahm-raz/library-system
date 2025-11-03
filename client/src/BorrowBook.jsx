import React, { useEffect, useState } from "react";
import axios from "axios";

const BorrowBook = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        const [userRes, bookRes] = await Promise.all([
          axios.get("https://library-system-production-8209.up.railway.app/api/users"),
          axios.get("https://library-system-production-8209.up.railway.app/api/books"),
        ]);
        setUsers(userRes.data);
        setBooks(bookRes.data.filter(book => book.available));
      } catch (err) {
        console.error("Error fetching data:", err);
        setMessage("❌ Failed to load data");
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBorrow = async (e) => {
    e.preventDefault();
    if (!userId || !bookId) {
      setMessage("❌ Please select both user and book");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.post("https://library-system-production-8209.up.railway.app/api/borrow", { userId, bookId });
      setMessage("✅ Book borrowed successfully!");
      setUserId("");
      setBookId("");
      
      // Refresh available books
      const bookRes = await axios.get("https://library-system-production-8209.up.railway.app/api/books");
      setBooks(bookRes.data.filter(book => book.available));
    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.response?.data?.message || "Error borrowing book"}`);
    } finally {
      setLoading(false);
    }
  };

  const selectedUser = users.find(u => u._id === userId);
  const selectedBook = books.find(b => b._id === bookId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-16 w-32 h-32 bg-orange-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-amber-300 rounded-full opacity-25 blur-lg"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-green-800 bg-clip-text text-transparent">
                Borrow Book
              </h1>
              <p className="text-lg text-emerald-700 mt-2">
                Lend books from our library collection
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Borrow Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-emerald-100 transform hover:shadow-3xl transition-all duration-300">
            <form onSubmit={handleBorrow} className="space-y-6">
              {/* User Selection */}
              <div className="relative">
                <label className="block text-sm font-semibold text-emerald-800 mb-3 ml-1">
                  Select Library Member
                </label>
                <div className="relative">
                  <select
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    disabled={dataLoading}
                    className="w-full bg-white border-2 border-emerald-200 rounded-2xl py-4 px-6 text-emerald-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 shadow-lg appearance-none disabled:opacity-50"
                  >
                    <option value="">Choose a library member...</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name} ({user.role})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Book Selection */}
              <div className="relative">
                <label className="block text-sm font-semibold text-emerald-800 mb-3 ml-1">
                  Select Available Book
                </label>
                <div className="relative">
                  <select
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    required
                    disabled={dataLoading}
                    className="w-full bg-white border-2 border-emerald-200 rounded-2xl py-4 px-6 text-emerald-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 shadow-lg appearance-none disabled:opacity-50"
                  >
                    <option value="">Choose an available book...</option>
                    {books.map((book) => (
                      <option key={book._id} value={book._id}>
                        {book.title} by {book.author}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || dataLoading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-xl flex items-center justify-center space-x-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing Borrow...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Borrow Book</span>
                  </>
                )}
              </button>

              {/* Message Display */}
              {message && (
                <div className={`p-4 rounded-2xl border-2 text-center font-medium transition-all duration-300 ${
                  message.startsWith("✅") 
                    ? "bg-green-50 border-green-200 text-green-700 shadow-sm" 
                    : "bg-red-50 border-red-200 text-red-700 shadow-sm"
                }`}>
                  <div className="flex items-center justify-center space-x-2">
                    {message.startsWith("✅") ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span>{message}</span>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Selection Preview */}
          <div className="space-y-6">
            {/* User Preview */}
            {selectedUser && (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-2 border-blue-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Selected Member</h3>
                    <p className="text-blue-600 font-medium">{selectedUser.name}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-medium">{selectedUser.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Role:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedUser.role === 'admin' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Book Preview */}
            {selectedBook && (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-2 border-amber-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Selected Book</h3>
                    <p className="text-amber-600 font-medium line-clamp-1">{selectedBook.title}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Author:</span>
                    <span className="font-medium">{selectedBook.author}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Available
                    </span>
                  </div>
                </div>
                {selectedBook.image && (
                  <img
                    src={selectedBook.image}
                    alt={selectedBook.title}
                    className="w-full h-32 object-cover rounded-xl mt-3 shadow-md"
                  />
                )}
              </div>
            )}

            {/* Stats Card */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl shadow-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Library Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{users.length}</div>
                  <div className="text-emerald-100 text-sm">Total Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{books.length}</div>
                  <div className="text-emerald-100 text-sm">Available Books</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State for Data */}
        {dataLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-emerald-700 font-medium">Loading library data...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowBook;