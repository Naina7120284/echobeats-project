import React from "react";
import { assets } from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import { UserData } from "../context/User";
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutUser } = UserData();

  const getActiveTab = () => {
    if (location.pathname.includes("/playlist")) return "Playlist";
    if (location.pathname.includes("/music")) return "Music";
    if (location.pathname.includes("/podcasts")) return "Podcasts";
    return "All";
  };

  const activeTab = getActiveTab();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        {/* FIX: Removed 'lg:ml-0'. 
            'ml-12' now stays on Desktop too, so the back arrow 
            never hides behind the hamburger menu.
        */}
        <div className="flex items-center gap-2 ml-12">
          <img
            src={assets.arrow_left}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:scale-105 active:scale-90 transition"
            alt="Back"
            onClick={() => navigate(-1)}
          />
          <img
            src={assets.arrow_right}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:scale-105 active:scale-90 transition"
            alt="Forward"
            onClick={() => navigate(+1)}
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <p
            className="bg-white text-black text-[13px] md:text-[15px] px-3 md:px-4 py-1 rounded-2xl cursor-pointer hover:bg-gray-400 dark:bg-black dark:text-white transition"
            onClick={logoutUser}
          >
            Logout
          </p>
        </div>
      </div>

      {/* Categories Row */}
      <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer whitespace-nowrap ${
            activeTab === "All"
              ? "bg-white text-black dark:bg-black dark:text-white"
              : "bg-black text-white dark:bg-white dark:text-black border border-gray-800"
          }`}
          onClick={() => navigate("/home")}
        >
          All
        </p>
        
        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer whitespace-nowrap ${
            activeTab === "Music"
              ? "bg-white text-black dark:bg-black dark:text-white"
              : "bg-black text-white dark:bg-white dark:text-black border border-gray-800"
          }`}
          onClick={() => navigate("/music")}
        >
          Music
        </p>

        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer whitespace-nowrap ${
            activeTab === "Playlist"
              ? "bg-white text-black dark:bg-black dark:text-white"
              : "bg-black text-white dark:bg-white dark:text-black border border-gray-800"
          }`}
          onClick={() => navigate("/playlist")}
        >
          Playlist
        </p>

        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer whitespace-nowrap ${
            activeTab === "Podcasts"
              ? "bg-white text-black dark:bg-black dark:text-white"
              : "bg-black text-white dark:bg-white dark:text-black border border-gray-800"
          }`}
          onClick={() => navigate("/podcasts")}
        >
          Podcasts
        </p>
      </div>
    </>
  );
};

export default Navbar;
