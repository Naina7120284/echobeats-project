import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Player from "./Player";

const Layout = ({ children }) => {
  return (
    <div className="h-screen bg-black text-white dark:bg-white dark:text-black overflow-hidden">
      <div className="h-[88%] md:h-[90%] flex">
        
        <Sidebar />
        <div className="w-full m-1 md:m-2 px-3 md:px-6 pt-4 rounded overflow-auto lg:ml-0">
          <Navbar />
          <div className="pb-24 md:pb-0">
            {children}
          </div>
        </div>
      </div>
      <Player />
    </div>
  );
};

export default Layout;

