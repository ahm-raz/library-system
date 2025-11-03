import React, { useEffect, useState } from "react";
import axios from "axios";

const BorrowHistory = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, borrowed, returned

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://library-system-production-8209.up.railway.app/api/borrow");
        setRecords(res.data);
      } catch (err) {
        console.error("Error fetching borrow history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const filteredRecords = records.filter(record => {
    if (filter === "all") return true;
    return record.status === filter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      borrowed: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200", icon: "📖" },
      returned: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200", icon: "✅" }
    };
    const config = statusConfig[status] || statusConfig.borrowed;
    
    return (
      <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
        <span>{config.icon}</span>
        <span className="capitalize">{status}</span>
      </div>
    );
  };

  const getDaysDifference = (issueDate, returnDate) => {
    const issue = new Date(issueDate);
    const return_ = returnDate ? new Date(returnDate) : new Date();
    const diffTime = Math.abs(return_ - issue);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-16 w-32 h-32 bg-orange-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-amber-300 rounded-full opacity-25 blur-lg"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 to-indigo-800 bg-clip-text text-transparent">
                Borrow History
              </h1>
              <p className="text-lg text-purple-700 mt-2">
                Track all book lending activities in the library
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-semibold">Total Records</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{records.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-semibold">Currently Borrowed</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {records.filter(r => r.status === 'borrowed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-semibold">Returned Books</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {records.filter(r => r.status === 'returned').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
              filter === "all"
                ? "bg-purple-500 text-white shadow-lg"
                : "bg-white/80 text-purple-600 hover:bg-white hover:shadow-md"
            }`}
          >
            All Records
          </button>
          <button
            onClick={() => setFilter("borrowed")}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
              filter === "borrowed"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white/80 text-blue-600 hover:bg-white hover:shadow-md"
            }`}
          >
            Currently Borrowed
          </button>
          <button
            onClick={() => setFilter("returned")}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
              filter === "returned"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-white/80 text-green-600 hover:bg-white hover:shadow-md"
            }`}
          >
            Returned
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-purple-700 font-medium">Loading borrow history...</p>
            </div>
          </div>
        )}

        {/* Records Table */}
        {!loading && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-purple-50 to-indigo-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-purple-800 uppercase tracking-wider">
                      Member & Book
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-purple-800 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-purple-800 uppercase tracking-wider">
                      Issue Date
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-purple-800 uppercase tracking-wider">
                      Return Date
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-purple-800 uppercase tracking-wider">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
                    <tr
                      key={record._id}
                      className="hover:bg-purple-50 transition-colors duration-150 group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {record.user?.name || "Unknown User"}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {record.book?.title || "Unknown Book"}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              by {record.book?.author || "Unknown Author"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {getStatusBadge(record.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                        <div className="font-medium">
                          {new Date(record.issueDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(record.issueDate).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                        {record.returnDate ? (
                          <>
                            <div className="font-medium">
                              {new Date(record.returnDate).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(record.returnDate).toLocaleTimeString()}
                            </div>
                          </>
                        ) : (
                          <span className="text-gray-400 italic">Not returned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                        <div className="font-medium">
                          {getDaysDifference(record.issueDate, record.returnDate)} days
                        </div>
                        <div className="text-xs text-gray-400">
                          {record.status === 'borrowed' && 'and counting...'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredRecords.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Records Found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {filter === "all" 
                    ? "No borrow records found in the system yet." 
                    : `No ${filter} records found.`}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Summary */}
        {!loading && filteredRecords.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-purple-700 font-medium">
              Showing {filteredRecords.length} of {records.length} records
              {filter !== "all" && ` (filtered by ${filter})`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowHistory;