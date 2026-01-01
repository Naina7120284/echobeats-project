import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/User";
import toast from "react-hot-toast";
import { SongData } from "../context/Song";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const { registerUser, btnLoading } = UserData();
  const { fetchSongs, fetchAlbums } = SongData();
  const navigate = useNavigate();

  const isLengthValid = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const submitHandler = (e) => {
    e.preventDefault();

    const isPasswordValid =
      isLengthValid &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar;

    if (!isPasswordValid) {
      toast.error("Please follow password rules.");
      setShowRules(true);
      return;
    }

    registerUser(name, email, password, navigate, fetchSongs, fetchAlbums);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white/80 bg-opacity-90 text-gray-800 p-8 rounded-lg shadow-md max-w-md w-full z-10">
        <h1 className="text-4xl font-bold text-center mb-6 text-yellow-600">
          EchoBeats
        </h1>

        <div className="text-center mb-4">
          <Link to="/" className="text-sm text-yellow-600 hover:underline">
            ← Back to Home
          </Link>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {showRules && (
              <div className="mt-2 text-xs text-gray-700 space-y-1">
                <p
                  className={`${
                    isLengthValid ? "text-green-600" : "text-red-500"
                  }`}
                >
                  • At least 8 characters
                </p>
                <p
                  className={`${
                    hasUpperCase ? "text-green-600" : "text-red-500"
                  }`}
                >
                  • One uppercase letter
                </p>
                <p
                  className={`${
                    hasLowerCase ? "text-green-600" : "text-red-500"
                  }`}
                >
                  • One lowercase letter
                </p>
                <p
                  className={`${hasNumber ? "text-green-600" : "text-red-500"}`}
                >
                  • One number
                </p>
                <p
                  className={`${
                    hasSpecialChar ? "text-green-600" : "text-red-500"
                  }`}
                >
                  • One special character
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={btnLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
              btnLoading
                ? "bg-yellow-400 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-700"
            }`}
          >
            {btnLoading ? "Please Wait..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/login" className="text-sm text-yellow-600 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
