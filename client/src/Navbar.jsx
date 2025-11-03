import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-2xl border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Section - Logo and Main Links */}
          <div className="flex items-center space-x-8">
            {/* Library Logo */}
            <Link
              to="/books"
              className="flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-800 bg-clip-text text-transparent">
                  Digital Library
                </h1>
                <p className="text-xs text-amber-600 -mt-1">
                  {user.role === 'admin' ? 'Administrator' : 'Library Member'}
                </p>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/books"
                className={`flex items-center space-x-2 px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                  isActive("/books")
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                    : "text-amber-700 hover:bg-amber-50 hover:text-amber-800 hover:shadow-md"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Books</span>
              </Link>

              {user.role === "admin" && (
                <>
                  <Link
                    to="/addbook"
                    className={`flex items-center space-x-2 px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                      isActive("/addbook")
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                        : "text-green-700 hover:bg-green-50 hover:text-green-800 hover:shadow-md"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add Book</span>
                  </Link>

                  <Link
                    to="/adduser"
                    className={`flex items-center space-x-2 px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                      isActive("/adduser")
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                        : "text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:shadow-md"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Add User</span>
                  </Link>

                  <Link
                    to="/borrow"
                    className={`flex items-center space-x-2 px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                      isActive("/borrow")
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "text-purple-700 hover:bg-purple-50 hover:text-purple-800 hover:shadow-md"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Borrow</span>
                  </Link>

                  <Link
                    to="/return"
                    className={`flex items-center space-x-2 px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                      isActive("/return")
                        ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                        : "text-teal-700 hover:bg-teal-50 hover:text-teal-800 hover:shadow-md"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Return</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right Section - User Info and Logout */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="hidden sm:flex items-center space-x-3 bg-amber-50 rounded-2xl px-4 py-2 border border-amber-200">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-amber-800">{user.name}</p>
                <p className="text-xs text-amber-600 capitalize">{user.role}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex overflow-x-auto space-x-2 py-2 scrollbar-hide">
            <Link
              to="/books"
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium transition-all duration-200 ${
                isActive("/books")
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                  : "text-amber-700 hover:bg-amber-50 hover:text-amber-800 hover:shadow-md"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Books</span>
            </Link>

            {user.role === "admin" && (
              <>
                <Link
                  to="/addbook"
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium transition-all duration-200 ${
                    isActive("/addbook")
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                      : "text-green-700 hover:bg-green-50 hover:text-green-800 hover:shadow-md"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Book</span>
                </Link>

                <Link
                  to="/adduser"
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium transition-all duration-200 ${
                    isActive("/adduser")
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                      : "text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:shadow-md"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Add User</span>
                </Link>

                <Link
                  to="/borrow"
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium transition-all duration-200 ${
                    isActive("/borrow")
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "text-purple-700 hover:bg-purple-50 hover:text-purple-800 hover:shadow-md"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Borrow</span>
                </Link>

                <Link
                  to="/return"
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium transition-all duration-200 ${
                    isActive("/return")
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                      : "text-teal-700 hover:bg-teal-50 hover:text-teal-800 hover:shadow-md"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Return</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;