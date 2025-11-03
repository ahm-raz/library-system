import React, { useEffect, useState } from "react";
import axios from "axios";

const ReturnBook = () => {
  const [borrowed, setBorrowed] = useState([]);
  const [recordId, setRecordId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchBorrowed = async () => {
      try {
        setDataLoading(true);
        const res = await axios.get("http://localhost:5000/api/borrow/history");
        const onlyBorrowed = res.data.filter((r) => r.status === "borrowed");
        setBorrowed(onlyBorrowed);
      } catch (err) {
        console.error("Error fetching borrowed books:", err);
        setMessage("❌ Failed to load borrowed books");
      } finally {
        setDataLoading(false);
      }
    };
    fetchBorrowed();
  }, []);

  const handleReturn = async (e) => {
    e.preventDefault();
    if (!recordId) {
      setMessage("❌ Please select a borrow record");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.put("http://localhost:5000/api/borrow/return", { recordId });
      setMessage("✅ Book successfully returned to library!");
      setRecordId("");
      
      // Refresh the borrowed list
      const res = await axios.get("http://localhost:5000/api/borrow/history");
      const onlyBorrowed = res.data.filter((r) => r.status === "borrowed");
      setBorrowed(onlyBorrowed);
    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.response?.data?.message || "Error returning book"}`);
    } finally {
      setLoading(false);
    }
  };

  const selectedRecord = borrowed.find(r => r._id === recordId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-16 w-32 h-32 bg-orange-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-amber-300 rounded-full opacity-25 blur-lg"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-700 to-cyan-800 bg-clip-text text-transparent">
                Return Book
              </h1>
              <p className="text-lg text-teal-700 mt-2">
                Welcome books back to our library collection
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Return Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-teal-100 transform hover:shadow-3xl transition-all duration-300">
            <form onSubmit={handleReturn} className="space-y-6">
              {/* Record Selection */}
              <div className="relative">
                <label className="block text-sm font-semibold text-teal-800 mb-3 ml-1">
                  Select Borrow Record
                </label>
                <div className="relative">
                  <select
                    value={recordId}
                    onChange={(e) => setRecordId(e.target.value)}
                    required
                    disabled={dataLoading || borrowed.length === 0}
                    className="w-full bg-white border-2 border-teal-200 rounded-2xl py-4 px-6 text-teal-900 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-200 shadow-lg appearance-none disabled:opacity-50"
                  >
                    <option value="">
                      {dataLoading ? "Loading records..." : 
                       borrowed.length === 0 ? "No books currently borrowed" : 
                       "Choose a borrow record..."}
                    </option>
                    {borrowed.map((record) => (
                      <option key={record._id} value={record._id}>
                        {record.user?.name || "Unknown User"} — {record.book?.title || "Unknown Book"}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !recordId || dataLoading}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-xl flex items-center justify-center space-x-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing Return...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Mark as Returned</span>
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

          {/* Selection Preview & Stats */}
          <div className="space-y-6">
            {/* Selected Record Preview */}
            {selectedRecord && (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-2 border-amber-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Selected Record Details</span>
                </h3>
                
                <div className="space-y-4">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{selectedRecord.user?.name || "Unknown User"}</p>
                      <p className="text-sm text-gray-600">{selectedRecord.user?.email || "No email"}</p>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{selectedRecord.book?.title || "Unknown Book"}</p>
                      <p className="text-sm text-gray-600">by {selectedRecord.book?.author || "Unknown Author"}</p>
                    </div>
                  </div>

                  {/* Borrow Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                      <p className="font-semibold text-blue-700">Issue Date</p>
                      <p className="text-gray-600">
                        {new Date(selectedRecord.issueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-xl">
                      <p className="font-semibold text-purple-700">Days Borrowed</p>
                      <p className="text-gray-600">
                        {Math.ceil((new Date() - new Date(selectedRecord.issueDate)) / (1000 * 60 * 60 * 24))} days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Card */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl shadow-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Current Borrow Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Total Borrowed Books</span>
                  <span className="text-2xl font-bold">{borrowed.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Users</span>
                  <span className="text-2xl font-bold">
                    {new Set(borrowed.map(r => r.user?._id)).size}
                  </span>
                </div>
                <div className="pt-3 border-t border-teal-400">
                  <p className="text-teal-100 text-sm">
                    {borrowed.length === 0 
                      ? "All books are currently available" 
                      : "Books waiting to be returned"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-2 border-orange-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => window.location.href = '/borrow'}
                  className="w-full flex items-center justify-between p-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors duration-200"
                >
                  <span className="text-orange-700 font-medium">Borrow New Book</span>
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button
                  onClick={() => window.location.href = '/books'}
                  className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200"
                >
                  <span className="text-blue-700 font-medium">View All Books</span>
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State for Data */}
        {dataLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
              <p className="text-teal-700 font-medium">Loading borrow records...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!dataLoading && borrowed.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-teal-800 mb-3">All Books Are Available</h3>
            <p className="text-teal-600 max-w-md mx-auto mb-6">
              Great news! There are currently no borrowed books waiting to be returned. 
              All books are safely back in the library.
            </p>
            <button
              onClick={() => window.location.href = '/books'}
              className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Browse Library Collection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnBook;