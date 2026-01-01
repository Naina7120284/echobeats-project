import React from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { UserData } from "../context/User";

const Podcasts = () => {
  const { songs, setSelectedSong, setIsPlaying } = SongData();
  const { addToPlaylist } = UserData();

  const onPlayClick = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  const onBookmarkClick = (id) => {
    addToPlaylist(id);
  };

  // Filter songs to show only those whose title contains the word 'podcast'
  const filteredPodcasts = songs.filter(song =>
    song.title.toLowerCase().includes("podcast")
  );

  return (
    <Layout>
      <h1 className="text-3xl font-bold my-8">Podcasts</h1>

      {/* Grid Header for podcasts */}
      <div className="grid grid-cols-3 sm:grid-cols-4 mb-4 pl-2 text-[#a7a7a7] dark:text-black">
        <p>
          <b className="mr-4">#</b>
        </p>
        <p>Host</p>
        <p className="hidden sm:block">Description</p>
        <p className="text-center">Actions</p>
      </div>
      <hr />

      {/* Display filtered podcasts */}
      {filteredPodcasts.length > 0 ? (
        filteredPodcasts.map((song, i) => (
          <div
            key={song._id}
            className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] dark:text-black hover:bg-[#ffffff2b] dark:hover:bg-[#4538382b] hover:rounded hover:scale-[1.01] transition-all duration-200 cursor-pointer"
          >
            <p className="text-white dark:text-black">
              <b className="mr-4 text-[#a7a7a7] dark:text-black">{i + 1}</b>
              <img src={song.thumbnail.url} className="inline w-10 mr-5 rounded" alt="" />
              {song.title}
            </p>
            <p className="text-[15px] flex items-center">{song.singer}</p>
            <p className="text-[15px] items-center hidden sm:flex">
              {song.description?.slice(0, 20)}...
            </p>
            <p className="flex justify-center items-center gap-5">
              <span onClick={() => onBookmarkClick(song._id)}>
                <FaBookmark />
              </span>
              <span onClick={() => onPlayClick(song._id)}>
                <FaPlay />
              </span>
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No podcasts available</p>
      )}
    </Layout>
  );
};

export default Podcasts;
