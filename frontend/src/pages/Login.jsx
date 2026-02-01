import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/User";
import { SongData } from "../context/Song";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get auth functions from UserData context
  const { loginUser, btnLoading } = UserData();
  
  // Get data fetching functions from SongData context
  const { fetchSongs, fetchAlbums } = SongData();
  
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    // Passing all required dependencies to the context function
    await loginUser(email, password, navigate, fetchSongs, fetchAlbums);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Login Card */}
      <div className="relative bg-white/90 text-black p-8 rounded-lg shadow-xl max-w-md w-full z-10 backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-center mb-2 text-yellow-600">
          EchoBeats
        </h1>

        <div className="text-center mb-6">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-yellow-600 hover:underline transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={btnLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all shadow-lg ${
              btnLoading
                ? "bg-yellow-400 cursor-not-allowed scale-95"
                : "bg-yellow-600 hover:bg-yellow-700 active:scale-95"
            }`}
          >
            {btnLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-yellow-600 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
