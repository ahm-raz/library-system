import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import BookList from "./BookList";
import AddBook from "./AddBook";
import AddUser from "./AddUser";
import BorrowBook from "./BorrowBook";
import ReturnBook from "./ReturnBook";
import Signup from "./Signup";
import './App.css'
const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        {/* Background decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-20 right-16 w-32 h-32 bg-orange-200 rounded-full opacity-30 blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-amber-300 rounded-full opacity-25 blur-lg"></div>
        </div>

        <Navbar />
        
        {/* Main content with elegant container */}
        <main className="relative mt-20 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Animated page transitions */}
            <div className="animate-fade-in">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/addbook" element={<AddBook />} />
                <Route path="/adduser" element={<AddUser />} />
                <Route path="/borrow" element={<BorrowBook />} />
                <Route path="/return" element={<ReturnBook />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </div>
        </main>

        {/* Library-themed footer */}
        <footer className="relative bg-gradient-to-r from-amber-800 to-amber-900 text-amber-100 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-lg font-semibold">Library Management System</span>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-amber-200 text-sm">
                  &copy; 2024 Digital Library. All rights reserved.
                </p>
                <p className="text-amber-300 text-xs mt-1">
                  Built with ❤️ for book lovers
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer decorative wave */}
          <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-t from-amber-50 to-transparent"></div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;