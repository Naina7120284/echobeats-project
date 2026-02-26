import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import PlayListCard from "./PlayListCard";
import { UserData } from "../context/User";
import { SongData } from "../context/Song";
import SearchModal from "./Search";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = UserData();
  const { playSong } = SongData();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleNavClick = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  const handleSongPlay = (song) => {
    playSong(song);
    setIsSearchOpen(false);
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed top-4 left-4 z-[70]">
          <button
            className="bg-transparent text-white dark:text-black text-2xl p-2 rounded-md border-none shadow-none hover:scale-110 transition-transform"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        </div>
      )}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]" 
          onClick={toggleSidebar}
        />
      )}

     <div className={`
      fixed inset-y-0 left-0 z-[60] 
      bg-transparent 
      transition-all duration-700 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] will-change-transform
      flex flex-col gap-2 p-2 
      text-white dark:text-black
      ${isOpen ? "w-[280px] translate-x-0 opacity-100" : "w-0 -translate-x-full overflow-hidden p-0 opacity-0"}
      lg:static lg:translate-x-0 lg:h-full
      ${isOpen ? "lg:w-[25%] lg:opacity-100" : "lg:w-0 lg:p-0 lg:opacity-0"}
    `}>
  
  <div className={`flex flex-col h-full gap-2 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}>
    
    {/* Header Section*/}
    <div className="bg-[#121212] dark:bg-[#cccccc] h-[10%] rounded flex items-center justify-between px-4 min-w-[260px]">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => handleNavClick("/home")}
      >
        <img src={assets.echobeats_hq_logo} className="w-10 rounded" alt="logo" />
        <p className="font-bold text-xl text-[#FF0B55]">EchoBeats</p>
      </div>
      
      <button
        className="text-white dark:text-black text-2xl font-bold"
        onClick={toggleSidebar}
      >
        ☰
      </button>
    </div>

        {/* Navigation Section */}
        <div className="bg-[#121212] dark:bg-[#cccccc] h-[15%] rounded flex flex-col justify-around min-w-[260px]">
          <div
            className="flex items-center gap-3 pl-8 cursor-pointer"
            onClick={() => handleNavClick("/home")}
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
        <div className="bg-[#121212] dark:bg-[#cccccc] h-[75%] rounded flex flex-col justify-between overflow-y-auto min-w-[260px]">
          <div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={assets.stack_icon} className="w-8" alt="library" />
                <p className="font-semibold">Your Library</p>
              </div>
            </div>

            <div onClick={() => handleNavClick("/playlist")}>
              <PlayListCard />
            </div>

            <div className="p-4 m-2 bg-[#121212] dark:bg-[#cccccc] rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
              <h1>Let's find some podcasts to follow</h1>
              <p className="font-light py-3">
                We'll keep you updated on new episodes
              </p>
              <button
                className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4 flex"
                onClick={() => handleNavClick("/podcasts")} 
              >
                Browse Podcasts <img src={assets.podcast_icon} className="w-6 ml-1" alt="podcast" />
              </button>

              {user?.role === "admin" && (
                <button
                  className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4"
                  onClick={() => handleNavClick("/admin")}
                >
                  Admin Dashboard
                </button>
              )}
            </div>
          </div>

          <div className="text-center dark:text-[#FF0B55] text-white text-sm font-bold p-4">
            Made with <span className="text-red-600 animate-pulse">❤️</span> by{" "}
            <span className="font-semibold">Team Raven</span>
          </div>
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
