import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { SongData } from "../context/Song";

const SearchModal = ({ isOpen, onClose, onPlay }) => {
  const { songs } = SongData();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
    } else {
      const results = songs.filter((song) =>
        song.title.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(results);
    }
  }, [query, songs]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="dark:bg-white bg-[#121212] w-full max-w-xl p-6 rounded-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 dark:text-gray-700 text-white"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center dark:text-gray-900 text-white">
          Search Songs
        </h2>
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-white bg-[#2a2a2a] dark:text-black text-white rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#FF0B55]"
        />

        <div className="max-h-60 overflow-y-auto space-y-2">
          {filtered.length > 0 ? (
            filtered.map((song) => (
              <div
                key={song._id}
                className="p-3 border rounded-md dark:hover:bg-gray-100 hover:bg-[#333333] cursor-pointer"
                onClick={() => onPlay(song)}
              >
                <p className="dark:text-gray-900 text-white">{song.title}</p>
              </div>
            ))
          ) : (
            <p className="text-center dark:text-gray-500 text-gray-400">
              No matching songs
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
