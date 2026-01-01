import React from "react";
import { useTheme } from "../context/Theme";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-800 text-white dark:bg-gray-200 dark:text-black hover:scale-110 transition-all duration-200"
    >
      {theme === "dark" ? (
        <Moon className="w-5 h-5 text-blue-500" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
