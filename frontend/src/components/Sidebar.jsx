import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import PlayListCard from "./PlayListCard";
import { UserData } from "../context/User";
import { SongData } from "../context/Song";
import toast from "react-hot-toast";
import SearchModal from "./Search";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = UserData();
  const { playSong } = SongData();

  const handleSongPlay = (song) => {
    playSong(song);
    setIsSearchOpen(false);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  const handleBrowsePodcasts = () => {
    navigate("/podcasts");
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  return (
    <>
      {/* 1. MOBILE HAMBURGER BUTTON - Hidden on Desktop (lg) */}
      {!isOpen && (
        <div className="lg:hidden fixed top-4 left-4 z-[60]">
          <button
            className="text-2xl font-bold text-[#FF0B55] bg-[#121212] p-2 rounded-md border border-gray-800"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>
        </div>
      )}

      {/* 2. MOBILE OVERLAY - Blurs background when sidebar is open on phones */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* 3. SIDEBAR CONTAINER */}
      <div className={`
        /* Mobile Styles (Drawer) */
        fixed inset-y-0 left-0 z-[60] w-[280px] bg-black transition-transform duration-300 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        
        /* Desktop Styles (Resetting everything back to your original design) */
        lg:static lg:translate-x-0 lg:w-[25%] lg:h-full lg:p-2 lg:flex lg:flex-col lg:gap-2 lg:bg-transparent
        text-white dark:text-black flex flex-col gap-2 p-2
      `}>
        
        {/* Header Section */}
        <div className="bg-[#121212] dark:bg-[#cccccc] h-[10%] rounded flex items-center justify-between px-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => { navigate("/home"); if (window.innerWidth < 1024) setIsOpen(false); }}
          >
            <img src={assets.echobeats_hq_logo} className="w-10 rounded" alt="logo" />
            <p className="font-bold text-xl text-[#FF0B55]">EchoBeats</p>
          </div>
          <button
            className="text-white dark:text-black text-xl"
            onClick={() => setIsOpen(false)}
          >
            ☰
          </button>
        </div>

        {/* Navigation Section */}
        <div className="bg-[#121212] dark:bg-[#cccccc] h-[15%] rounded flex flex-col justify-around">
          <div
            className="flex items-center gap-3 pl-8 cursor-pointer"
            onClick={() => { navigate("/home"); if (window.innerWidth < 1024) setIsOpen(false); }}
          >
            <img src={assets.home_icon} className="w-6" alt="home" />
            <p className="font-bold">Home</p>
          </div>
          <div
            className="flex items-center gap-3 pl-8 cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
          >
            <img src={assets.search_icon} className="w-6" alt="search" />
            <p className="font-bold">Search</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-[#121212] dark:bg-[#cccccc] h-[85%] rounded flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={assets.stack_icon} className="w-8" alt="library" />
                <p className="font-semibold">Your Library</p>
              </div>
            </div>

            <div onClick={() => { navigate("/playlist"); if (window.innerWidth < 1024) setIsOpen(false); }}>
              <PlayListCard />
            </div>

            <div className="p-4 m-2 bg-[#121212] dark:bg-[#cccccc] rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
              <h1>Let's find some podcasts to follow</h1>
              <p className="font-light py-3">
                We'll keep you updated on new episodes
              </p>
              <button
                className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4 flex"
                onClick={handleBrowsePodcasts} 
              >
                Browse Podcasts <img src={assets.podcast_icon} className="w-6 ml-1" alt="podcast" />
              </button>

              {user && user.role === "admin" && (
                <button
                  className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4"
                  onClick={() => { navigate("/admin"); if (window.innerWidth < 1024) setIsOpen(false); }}
                >
                  Admin Dashboard
                </button>
              )}
            </div>
          </div>

          <div className="text-center dark:text-[#FF0B55] text-white text-sm font-bold p-4">
            Made with <span className="text-red-600 animate-pulse">❤️</span> by{" "}
            <span className="font-semibold">Team Raven </span>
          </div>
        </div>

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onPlay={handleSongPlay}
        />
      </div>
    </>
  );
};

export default Sidebar;
