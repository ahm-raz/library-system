import React, { useState } from "react";
import axios from "axios";

const AddBook = ({ onBookAdded }) => {
  const [form, setForm] = useState({ title: "", author: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      setMessage("❌ Title and Author are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.post("https://library-system-production-8209.up.railway.app/api/books", form);
      setForm({ title: "", author: "", image: "" });
      setMessage("✅ Book added successfully!");
      onBookAdded(); // refresh book list
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-2xl p-8 border border-amber-200 transform hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
        {/* Decorative elements */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-amber-400 rounded-full opacity-80"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-amber-300 rounded-full opacity-60"></div>
        
        {/* Book spine decorative effect */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-32 bg-gradient-to-b from-amber-400 to-amber-600 rounded-r-lg shadow-lg"></div>
        
        <form onSubmit={handleSubmit}>
          {/* Header with library theme */}
          <div className="text-center mb-8 relative">
            <div className="inline-flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                Add New Book
              </h2>
            </div>
            <p className="text-amber-600 text-sm mt-2 font-medium">Expand our literary collection</p>
          </div>

          {/* Form inputs with elegant styling */}
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-semibold text-amber-800 mb-2 ml-1">
                Book Title *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter book title..."
                  className="w-full bg-white border-2 border-amber-200 rounded-xl py-4 px-6 text-amber-900 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-200 shadow-sm"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-amber-800 mb-2 ml-1">
                Author *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Enter author name..."
                  className="w-full bg-white border-2 border-amber-200 rounded-xl py-4 px-6 text-amber-900 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-200 shadow-sm"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-amber-800 mb-2 ml-1">
                Cover Image URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Paste image URL (optional)..."
                  className="w-full bg-white border-2 border-amber-200 rounded-xl py-4 px-6 text-amber-900 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-200 shadow-sm"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Adding to Library...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add to Library</span>
              </>
            )}
          </button>

          {/* Message display */}
          {message && (
            <div className={`mt-6 p-4 rounded-xl border-2 text-center font-medium transition-all duration-300 ${
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
    </div>
  );
};

export default AddBook;