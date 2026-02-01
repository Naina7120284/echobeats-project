import React, { useEffect, useRef, useState } from "react";
import { SongData } from "../context/Song";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa";
import { assets } from "../assets/assets";

const Player = () => {
  const {
    song,
    fetchSingleSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
    nextMusic,
    prevMusic,
  } = SongData();

  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Fetch song details when the selected song ID changes
  useEffect(() => {
    if (selectedSong) {
      fetchSingleSong();
    }
  }, [selectedSong]);

  // Sync Audio Element with isPlaying state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log("Playback error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, song]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleMute = () => {
    const newVolume = volume > 0 ? 0 : 1;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetaData = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  const handleProgressChange = (e) => {
    if (audioRef.current && duration) {
      const newTime = (e.target.value / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  // Helper function to format time (00:00)
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed bottom-0 w-full">
      {song && (
        <div className="h-20 bg-[#121212] flex justify-between items-center text-white px-4 border-t border-gray-800">
          {/* Song Info */}
          <div className="flex items-center gap-4 w-[30%]">
            <img
              src={song?.thumbnail?.url || "https://via.placeholder.com/50"}
              className="w-12 h-12 rounded object-cover"
              alt={song?.title}
            />
            <div className="hidden md:block overflow-hidden">
              <p className="text-sm font-bold truncate">{song?.title}</p>
              <p className="text-xs text-gray-400 truncate">{song?.singer}</p>
            </div>
          </div>

          {/* Controls & Progress */}
          <div className="flex flex-col items-center gap-2 w-[40%]">
            <audio ref={audioRef} src={song?.audio?.url} />
            
            <div className="flex justify-center items-center gap-6">
              <GrChapterPrevious 
                className="cursor-pointer text-gray-400 hover:text-white transition" 
                size={20} 
                onClick={prevMusic} 
              />
              <button
                className="bg-white text-black rounded-full p-2 hover:scale-105 transition"
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
              </button>
              <GrChapterNext 
                className="cursor-pointer text-gray-400 hover:text-white transition" 
                size={20} 
                onClick={nextMusic} 
              />
            </div>

            <div className="w-full flex items-center gap-2 text-xs text-gray-400">
              <span>{formatTime(progress)}</span>
              <input
                type="range"
                min="0"
                max="100"
                className="progress-bar flex-grow accent-yellow-500 cursor-pointer h-1"
                // FIXED: Check for NaN to prevent console errors
                value={duration ? (progress / duration) * 100 : 0}
                onChange={handleProgressChange}
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center justify-end gap-2 w-[30%]">
            <img
              src={volume === 0 ? assets.mute_icon : assets.volume_icon}
              className="w-5 cursor-pointer opacity-70 hover:opacity-100"
              alt="Volume"
              onClick={handleMute}
            />
            <input
              type="range"
              className="w-20 accent-yellow-500 h-1 cursor-pointer"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;