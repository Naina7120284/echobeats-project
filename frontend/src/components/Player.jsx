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
        <div className="h-24 md:h-20 bg-[#121212] flex flex-col md:flex-row justify-between items-center text-white px-2 md:px-4 border-t border-gray-800">
          
          {/* Main Wrapper to keep items on one line for Desktop, but handle tight space on Mobile */}
          <div className="flex w-full items-center justify-between gap-1 md:gap-4">
            
            {/* Song Info Section - Shrink text on mobile */}
            <div className="flex items-center gap-2 md:gap-4 min-w-[80px] md:w-[30%]">
              <img
                src={song?.thumbnail?.url || "https://via.placeholder.com/50"}
                className="w-10 h-10 md:w-12 md:h-12 rounded object-cover flex-shrink-0"
                alt={song?.title}
              />
              <div className="overflow-hidden leading-tight">
                <p className="text-[10px] md:text-sm font-bold truncate max-w-[60px] md:max-w-full">{song?.title}</p>
                <p className="text-[8px] md:text-xs text-gray-400 truncate max-w-[60px] md:max-w-full">{song?.singer}</p>
              </div>
            </div>

            {/* Controls Section - Centered and takes most space on mobile */}
            <div className="flex flex-col items-center gap-1 flex-grow md:w-[40%]">
              <audio ref={audioRef} src={song?.audio?.url} />
              
              <div className="flex justify-center items-center gap-3 md:gap-6">
                <GrChapterPrevious 
                  className="cursor-pointer text-gray-400 hover:text-white transition active:scale-90" 
                  size={16} 
                  onClick={prevMusic} 
                />
                <button
                  className="bg-white text-black rounded-full p-1.5 md:p-2 hover:scale-105 active:scale-95 transition"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <FaPause size={12} className="md:w-4 md:h-4" /> : <FaPlay size={12} className="md:w-4 md:h-4 ml-0.5" />}
                </button>
                <GrChapterNext 
                  className="cursor-pointer text-gray-400 hover:text-white transition active:scale-90" 
                  size={16} 
                  onClick={nextMusic} 
                />
              </div>

              {/* Seek Bar: Full width for mobile touch */}
              <div className="w-full flex items-center gap-1 md:gap-2 text-[8px] md:text-xs text-gray-400">
                <span>{formatTime(progress)}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="progress-bar flex-grow accent-yellow-500 cursor-pointer h-1"
                  value={duration ? (progress / duration) * 100 : 0}
                  onChange={handleProgressChange}
                />
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume Section - Keep it visible but compact on mobile */}
            <div className="flex items-center justify-end gap-1 md:gap-2 min-w-[70px] md:w-[30%]">
              <img
                src={volume === 0 ? assets.mute_icon : assets.volume_icon}
                className="w-3 md:w-5 cursor-pointer opacity-70 hover:opacity-100 flex-shrink-0"
                alt="Volume"
                onClick={handleMute}
              />
              <input
                type="range"
                className="w-12 md:w-20 accent-yellow-500 h-1 cursor-pointer"
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