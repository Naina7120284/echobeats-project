import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { UserData } from "../context/User";
import { FaBookmark, FaPlay } from "react-icons/fa";

const Album = () => {
  const {
    fetchAlbumSong,
    albumSong,
    albumData,
    setIsPlaying,
    setSelectedSong,
  } = SongData();

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetchAlbumSong(params.id);
    }
  }, [params.id]);

  const onclickHander = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  const { addToPlaylist } = UserData();

  const savePlayListHandler = (id) => {
    addToPlaylist(id);
  };

  return (
    <Layout>
      {albumData ? (
        <>
          <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
            {/* Added Optional Chaining to prevent crash if thumbnail is missing */}
            {albumData?.thumbnail?.url && (
              <img
                src={albumData.thumbnail.url}
                className="w-48 rounded shadow-lg"
                alt={albumData.title}
              />
            )}

            <div className="flex flex-col">
              <p className="uppercase text-sm font-semibold tracking-wider">Playlist</p>
              <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                {albumData?.title}
              </h2>
              <h4 className="text-gray-400">{albumData?.description}</h4>
              <p className="mt-2">
                <img
                  src={assets.echobeats_hq_logo}
                  className="inline-block w-6 rounded mr-2"
                  alt="logo"
                />
                <span className="font-bold">EchoBeats</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] dark:text-black border-b border-[#ffffff2b] pb-2">
            <p><b className="mr-4">#</b> Title</p>
            <p>Artist</p>
            <p className="hidden sm:block">Description</p>
            <p className="text-center">Actions</p>
          </div>

          {/* Added Safety Check for albumSong array */}
          {albumSong && albumSong.length > 0 ? (
            albumSong.map((e, i) => (
              <div
                className="grid grid-cols-3 sm:grid-cols-4 py-3 pl-2 text-[#a7a7a7] dark:text-black hover:bg-[#ffffff2b] dark:hover:bg-[#4538382b] rounded-md transition-all duration-200 cursor-pointer group"
                key={e._id || i}
              >
                <div className="flex items-center text-white dark:text-black">
                  <b className="mr-4 text-[#a7a7a7]">{i + 1}</b>
                  {/* FIXED: Added Optional Chaining to e.thumbnail.url */}
                  <img
                    src={e?.thumbnail?.url || "/default-song.png"}
                    className="inline w-10 h-10 mr-5 rounded object-cover"
                    alt=""
                  />
                  <span className="truncate">{e?.title}</span>
                </div>
                
                <p className="text-[15px] flex items-center">{e?.singer}</p>
                
                <p className="text-[15px] items-center hidden sm:flex truncate pr-4">
                  {e?.description ? e.description.slice(0, 30) + "..." : "No description"}
                </p>

                <div className="flex justify-center items-center gap-5">
                  <button
                    className="hover:text-yellow-500 transition-colors"
                    onClick={(e_stop) => {
                        e_stop.stopPropagation();
                        savePlayListHandler(e._id);
                    }}
                  >
                    <FaBookmark />
                  </button>
                  <button
                    className="hover:text-yellow-500 transition-colors"
                    onClick={(e_stop) => {
                        e_stop.stopPropagation();
                        onclickHander(e._id);
                    }}
                  >
                    <FaPlay />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p>This playlist is currently empty.</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
            <p>Loading Album Data...</p>
        </div>
      )}
    </Layout>
  );
};

export default Album;