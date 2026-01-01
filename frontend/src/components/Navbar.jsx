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
    if (location.pathname.includes("/podcasts")) return "Podcasts"; // Check for podcast route

    return "All";
  };

  const activeTab = getActiveTab();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            src={assets.arrow_left}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            alt="Back"
            onClick={() => navigate(-1)}
          />
          <img
            src={assets.arrow_right}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            alt="Forward"
            onClick={() => navigate(+1)}
          />
        </div>
        <div className="flex items-center justify-end p-4">
          {/* You can add other elements here if necessary */}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <p
            className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl cursor-pointer hover:bg-gray-400 dark:bg-black dark:text-white"
            onClick={logoutUser}
          >
            Logout
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer ${
            activeTab === "All"
              ? "bg-white text-black dark:bg-black dark:text-white"
              : "bg-black text-white dark:bg-white dark:text-black"
          }`}
          onClick={() => navigate("/home")}
        >
          All
        </p>
        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer hidden md:block ${
            activeTab === "Music"
              ? "bg-white text-black dark:bg-black dark:text-white"
              : "bg-black text-white dark:bg-white dark:text-black"
          }`}
          onClick={() => navigate("/music")}
        >
          Music
        </p>

        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer hidden md:block ${
            activeTab === "Playlist"
              ? "bg-white text-black dark:bg-black dark:text-white"
              : "bg-black text-white dark:bg-white dark:text-black"
          }`}
          onClick={() => navigate("/playlist")}
        >
          Playlist
        </p>

        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer hidden md:block ${
            activeTab === "Podcasts"
              ? "bg-white text-black dark:bg-black dark:text-white"
              : "bg-black text-white dark:bg-white dark:text-black"
          }`}
          onClick={() => navigate("/podcasts")}
        >
          Podcasts
        </p>

        {/* For mobile view */}
        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer md:hidden ${
            activeTab === "Music"
              ? "bg-white text-black dark:bg-black dark:text-white"
              : "bg-black text-white dark:bg-white dark:text-black"
          }`}
          onClick={() => navigate("/music")}
        >
          Music
        </p>
        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer md:hidden ${
            activeTab === "Playlist"
              ? "bg-white text-black dark:bg-black dark:text-white"
              : "bg-black text-white dark:bg-white dark:text-black"
          }`}
          onClick={() => navigate("/playlist")}
        >
          Playlist
        </p>
        
        {/* For mobile view */}
        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer md:hidden ${
            activeTab === "Podcasts"
              ? "bg-white text-black dark:bg-black dark:text-white"
              : "bg-black text-white dark:bg-white dark:text-black"
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
