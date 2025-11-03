import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(`❌ ${data.message || "Login failed"}`);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      setMessage(`✅ Welcome back! Logged in as ${data.role}`);

      setTimeout(() => navigate("/books"), 1200);
    } catch (err) {
      setMessage("❌ Server error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const existing = localStorage.getItem("user");
    if (existing) navigate("/books");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-16 w-32 h-32 bg-orange-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-amber-300 rounded-full opacity-25 blur-lg"></div>
        <div className="absolute bottom-10 right-1/4 w-12 h-12 bg-orange-300 rounded-full opacity-30 blur-lg"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative">
        {/* Header Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-700 to-orange-800 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-amber-600 mt-2 font-medium">Sign in to your library account</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-amber-100 transform hover:shadow-3xl transition-all duration-300">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-semibold text-amber-800 mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white border-2 border-amber-200 rounded-2xl py-4 px-6 text-amber-900 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-200 shadow-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-semibold text-amber-800 mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white border-2 border-amber-200 rounded-2xl py-4 px-6 text-amber-900 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-200 shadow-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-xl flex items-center justify-center space-x-3"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign In</span>
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-amber-100">
              <p className="text-amber-600 text-sm">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="font-semibold text-amber-700 hover:text-amber-800 underline transition-colors duration-200"
                >
                  Create one here
                </Link>
              </p>
            </div>
          </form>

          {/* Message Display */}
          {message && (
            <div className={`mt-6 p-4 rounded-2xl border-2 text-center font-medium transition-all duration-300 ${
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
        </div>

        {/* Demo Credentials */}
        <div className="bg-amber-50/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-amber-200 shadow-lg">
          <h3 className="text-sm font-semibold text-amber-800 mb-2 flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Demo Credentials</span>
          </h3>
          <div className="text-xs text-amber-700 space-y-1">
            <p><span className="font-medium">Admin:</span> admin@library.com / admin123</p>
            <p><span className="font-medium">Member:</span> member@library.com / member123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;