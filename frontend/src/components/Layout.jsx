import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Player from "./Player";

const Layout = ({ children }) => {
  return (
    <div className=" h-screen bg-black text-white dark:bg-white dark:text-black">

      <div className="h-[90%] flex">
        <Sidebar />
        <div className="w-full m-2 px-6 pt-4 rounded overflow-auto lg:ml-0">
          <Navbar />
          {children}
        </div>
      </div>
      <Player />
    </div>
  );
};

export default Layout;
