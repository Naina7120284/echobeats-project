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

  useEffect(() => {
    if (selectedSong) {
      fetchSingleSong();
    }
  }, [selectedSong]);

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

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="fixed bottom-0 w-full z-50">
      {song && (
        <div className="h-24 md:h-20 bg-[#121212]/95 backdrop-blur-md flex flex-col justify-center text-white px-3 md:px-6 border-t border-gray-800 shadow-2xl">
          
          {/* Audio Element */}
          <audio ref={audioRef} src={song?.audio?.url} />

          <div className="flex items-center justify-between gap-2 md:gap-4">
            
            {/* 1. Song Info (Left) */}
            <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
              <img
                src={song?.thumbnail?.url || "https://via.placeholder.com/50"}
                className="w-10 h-10 md:w-14 md:h-14 rounded-md object-cover flex-shrink-0 shadow-lg"
                alt={song?.title}
              />
              <div className="min-w-0 overflow-hidden leading-tight">
                <p className="text-xs md:text-sm font-bold truncate">{song?.title}</p>
                <p className="text-[10px] md:text-xs text-gray-400 truncate">{song?.singer}</p>
              </div>
            </div>

            {/* 2. Main Controls & Seek (Center) */}
            <div className="flex flex-col items-center gap-1 flex-[2] max-w-[50%] md:max-w-full">
              {/* Buttons */}
              <div className="flex justify-center items-center gap-4 md:gap-8">
                <GrChapterPrevious 
                  className="cursor-pointer text-gray-400 hover:text-white transition active:scale-75" 
                  size={18} 
                  onClick={prevMusic} 
                />
                <button
                  className="bg-white text-black rounded-full p-2 md:p-3 hover:scale-105 active:scale-95 transition flex items-center justify-center"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="ml-0.5" />}
                </button>
                <GrChapterNext 
                  className="cursor-pointer text-gray-400 hover:text-white transition active:scale-75" 
                  size={18} 
                  onClick={nextMusic} 
                />
              </div>

              {/* Seek Bar */}
              <div className="w-full flex items-center gap-2 text-[10px] md:text-xs text-gray-500 font-medium">
                <span className="hidden xs:inline">{formatTime(progress)}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="progress-bar flex-grow accent-yellow-500 cursor-pointer h-1"
                  value={duration ? (progress / duration) * 100 : 0}
                  onChange={handleProgressChange}
                />
                <span className="hidden xs:inline">{formatTime(duration)}</span>
              </div>
            </div>

            {/* 3. Volume Section (Right) */}
            <div className="flex items-center justify-end gap-2 flex-1 min-w-[60px] md:min-w-[120px]">
              <img
                src={volume === 0 ? assets.mute_icon : assets.volume_icon}
                className="w-4 md:w-5 cursor-pointer opacity-70 hover:opacity-100 transition"
                alt="Volume"
                onClick={handleMute}
              />
              <input
                type="range"
                className="hidden sm:block w-20 md:w-24 accent-yellow-500 h-1 cursor-pointer"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
              {/* On very small mobile, we hide the slider to avoid overlap but keep it functional via the Mute icon */}
              <input
                type="range"
                className="block sm:hidden w-10 accent-yellow-500 h-1 cursor-pointer"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Player;