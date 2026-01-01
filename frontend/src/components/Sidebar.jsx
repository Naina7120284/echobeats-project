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

  const notify = () => toast("Take Subscription");

  const handleSongPlay = (song) => {
    playSong(song);
    setIsSearchOpen(false);
  };

  const handleBrowsePodcasts = () => {
    navigate("/podcasts"); // Navigate to the podcasts section
  };

  if (!isOpen) {
    return (
      <div className="w-14 h-full bg-[#121212] dark:bg-[#cccccc] p-6 hidden lg:flex flex-col items-center justify-start text-white dark:text-black rounded ">
        <button
          className="text-2xl font-bold mb-4 text-[#FF0B55]"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>
      </div>
    );
  }

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white dark:text-black hidden lg:flex">
      <div className="bg-[#121212] dark:bg-[#cccccc] h-[10%] rounded flex items-center justify-between px-4">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img
            src={assets.echobeats_hq_logo}
            className="w-10 rounded"
            alt="logo"
          />
          <p className="font-bold text-xl text-[#FF0B55]">EchoBeats</p>
        </div>
        <button
          className="text-white dark:text-black text-xl"
          onClick={() => setIsOpen(false)}
        >
          ☰
        </button>
      </div>

      <div className="bg-[#121212] dark:bg-[#cccccc] h-[15%] rounded flex flex-col justify-around">
        <div
          className="flex items-center gap-3 pl-8 cursor-pointer"
          onClick={() => navigate("/home")}
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

      <div className="bg-[#121212] dark:bg-[#cccccc] h-[85%] rounded flex flex-col justify-between">
        <div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={assets.stack_icon} className="w-8" alt="library" />
              <p className="font-semibold">Your Library</p>
            </div>
          </div>

          <div onClick={() => navigate("/playlist")}>
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
              Browse Podcasts <img src={assets.podcast_icon} className="w-6 ml-1"  />
            </button>

            {user && user.role === "admin" && (
              <button
                className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4"
                onClick={() => navigate("/admin")}
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
  );
};

export default Sidebar;
