import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "member" });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setMessage("❌ All fields are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.post("https://library-system-production-8209.up.railway.app/api/users/register", form);
      setForm({ name: "", email: "", password: "", role: "member" });
      setMessage("✅ User added successfully!");
      if (showUsers) fetchUsers(); // Refresh users list if visible
    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.response?.data?.message || "Failed to add user"}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://library-system-production-8209.up.railway.app/api/users");
      setUsers(res.data);
      setShowUsers(true);
      setMessage(""); // Clear any previous messages
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to fetch users");
    }
  };

  const hideUsers = () => {
    setShowUsers(false);
    setMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      {/* Add User Form */}
      <div className="max-w-md mx-auto">
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-2xl p-8 border border-blue-200 transform hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
          {/* Decorative elements */}
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-blue-400 rounded-full opacity-80"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-indigo-300 rounded-full opacity-60"></div>
          
          {/* Library card decorative effect */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-32 bg-gradient-to-b from-blue-400 to-indigo-600 rounded-r-lg shadow-lg"></div>
          
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="text-center mb-8 relative">
              <div className="inline-flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-blue-900 bg-clip-text text-transparent">
                  Add Library User
                </h2>
              </div>
              <p className="text-indigo-600 text-sm mt-2 font-medium">Register new library members</p>
            </div>

            {/* Form inputs */}
            <div className="space-y-5">
              <div className="relative">
                <label className="block text-sm font-semibold text-indigo-800 mb-2 ml-1">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter user's full name..."
                    className="w-full bg-white border-2 border-blue-200 rounded-xl py-4 px-6 text-indigo-900 placeholder-blue-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-indigo-800 mb-2 ml-1">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email address..."
                    className="w-full bg-white border-2 border-blue-200 rounded-xl py-4 px-6 text-indigo-900 placeholder-blue-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-indigo-800 mb-2 ml-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create secure password..."
                    className="w-full bg-white border-2 border-blue-200 rounded-xl py-4 px-6 text-indigo-900 placeholder-blue-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-indigo-800 mb-2 ml-1">
                  User Role
                </label>
                <div className="relative">
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full bg-white border-2 border-blue-200 rounded-xl py-4 px-6 text-indigo-900 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm appearance-none"
                  >
                    <option value="member">Library Member</option>
                    <option value="admin">Administrator</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-7 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Registering User...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Register User</span>
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

      {/* Users List Section */}
      <div className="text-center">
        {!showUsers ? (
          <button
            onClick={fetchUsers}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>View All Library Users</span>
          </button>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Library Users ({users.length})
              </h3>
              <button
                onClick={hideUsers}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Hide</span>
              </button>
            </div>

            {users.length > 0 ? (
              <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        User Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role === 'admin' ? 'Administrator' : 'Library Member'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 text-lg font-medium">No users found in the library</p>
                <p className="text-gray-400 text-sm mt-1">Register new users to see them here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUser;