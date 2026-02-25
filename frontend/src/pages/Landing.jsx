import React from "react";
import { Link } from "react-router-dom";
import DeveloperModal from "../components/Developer";
import { useState } from "react";

const Landing = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      {/* Navbar: flex-wrap ensures items don't collide on tiny screens */}
<nav className="bg-transparent backdrop-blur-md text-white fixed w-full top-0 left-0 z-50 transition-all">
  <div className="max-w-7xl mx-auto px-4 py-4">
    <div className="flex items-center justify-between">
      {/* Brand: Reduced font on tiny screens (text-xl) */}
      <Link
        to="/"
        className="text-xl xs:text-2xl md:text-3xl font-bold text-white hover:text-yellow-300 transition-colors"
      >
        EchoBeats
      </Link>

      <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-6">
        {/* Hiding About/Developers on small mobile to give room for Login/SignUp */}
        <a href="#about" className="hidden lg:inline hover:text-yellow-500 scroll-smooth">
          About
        </a>

        <button
          onClick={() => setShowModal(true)}
          className="hidden sm:inline hover:text-yellow-500 text-sm md:text-base"
        >
          Developers
        </button>
        
        {/* Buttons: Smaller padding (px-3) on mobile so they fit side-by-side */}
        <Link to="/login" className="hover:bg-gray-300 bg-white px-3 md:px-6 py-1.5 md:py-2 rounded-xl text-black text-xs md:text-base font-semibold whitespace-nowrap">
          Login
        </Link>
        
        <Link
          to="/register"
          className="bg-yellow-500 px-3 md:px-6 py-1.5 md:py-2 rounded-xl hover:bg-yellow-600 text-white text-xs md:text-base font-semibold whitespace-nowrap"
        >
          Sign Up
        </Link>
      </div>
    </div>
  </div>
</nav>

      {/* Hero Section */}
      <div
        className="flex items-center justify-center h-screen text-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 px-6 py-12 w-full">
          {/* text-4xl for mobile, md:text-5xl for desktop */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate__animated animate__fadeIn">
            Discover Your Favorite Music
          </h1>
          <p className="text-base md:text-lg text-white mb-8 max-w-2xl mx-auto">
             Join EchoBeats to explore the latest albums, create personalized
             playlists, and listen to curated music collections anytime,
             anywhere. Music that speaks to your soul, waiting for you.
          </p>

          {/* BUTTON FIX: flex-col for mobile, md:flex-row for desktop */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-[200px] md:w-auto bg-yellow-500 text-white px-8 py-3 rounded-xl hover:bg-yellow-600 active:bg-yellow-700 active:scale-95 transition-all duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="w-[200px] md:w-auto bg-white text-black px-8 py-3 rounded-xl hover:bg-gray-200 active:bg-gray-300 active:scale-95 transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white text-black py-16" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Why EchoBeats?
          </h2>
          {/* md:grid-cols-3 keeps desktop 3-col, default grid-cols-1 fixes mobile squashing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="text-center">
              <div className="text-yellow-600 mb-4">
                <i className="fas fa-headphones-alt text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Endless Music</h3>
              <p className="text-gray-600">
                With EchoBeats, you have access to an endless library of songs
                and albums across all genres. Discover new hits and old
                favorites anytime.
              </p>
            </div>
            <div className="text-center">
              <div className="text-yellow-600 mb-4">
                <i className="fas fa-music text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Create Playlists</h3>
              <p className="text-gray-600">
                Personalize your experience by creating playlists. Share your
                playlists with friends or keep them private — the choice is
                yours.
              </p>
            </div>
            <div className="text-center">
              <div className="text-yellow-600 mb-4">
                <i className="fas fa-share-alt text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Share with Friends</h3>
              <p className="text-gray-600">
               Invite your friends to join EchoBeats and enjoy music together.
               Share your favorite tracks and playlists with a few clicks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-yellow-800 text-white py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Start Your Music Journey?
        </h2>
        <p className="text-lg mb-6">
          Join EchoBeats today and start streaming!
        </p>
        <Link
          to="/register"
          className="bg-yellow-600 text-white px-8 py-4 rounded-xl hover:bg-yellow-700 active:scale-95 transition duration-300"
        >
          Sign Up Now
        </Link>
        <p className="mt-8 text-sm text-white-300 tracking-wide">
          Made with <span className="text-red-500 animate-pulse">♥</span> by <span className="font-semibold">Team R<sup>2</sup>avn</span>
        </p>
      </div>
    </div>
  );
};

export default Landing;