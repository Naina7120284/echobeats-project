import React from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import AlbumItem from "../components/AlbumItem";
import SongItem from "../components/SongItem";

const Home = () => {
  // Use optional fallback to empty arrays to prevent spread errors
  const { songs = [], albums = [] } = SongData();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0f0f0f]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#d1f24d] border-t-transparent"></div>
          <p className="text-[#d1f24d] font-medium animate-pulse">Tuning the beats...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      {/* Top Playlist Section */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Top Playlist</h1>
        <div className="flex overflow-auto gap-4">
          {albums && albums.length > 0 ? (
            albums.map((e, i) => (
              <AlbumItem
                key={e._id || i}
                image={e?.thumbnail?.url}
                name={e?.title}
                desc={e?.description}
                id={e?._id}
              />
            ))
          ) : (
            <p className="text-gray-400 p-4">No playlists available yet.</p>
          )}
        </div>
      </div>

      {/* Popular Albums and Singles */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Popular albums and singles</h1>
        <div className="flex overflow-auto gap-4">
          {songs && songs.length > 0 ? (
            [...songs].reverse().map((e, i) => (
              <SongItem
                key={e._id || i}
                image={e?.thumbnail?.url}
                name={e?.title}
                desc={e?.singer}
                id={e?._id}
              />
            ))
          ) : (
            <p className="text-gray-400 p-4">No songs found.</p>
          )}
        </div>
      </div>

      {/* Trending Songs */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Trending Songs</h1>
        <div className="flex overflow-auto gap-4">
          {songs && songs.length > 0 ? (
            songs.map((e, i) => (
              <SongItem
                key={e._id || i}
                image={e?.thumbnail?.url}
                name={e?.title}
                desc={e?.singer}
                id={e?._id}
              />
            ))
          ) : (
            <p className="text-gray-400 p-4">Add some songs to see them here!</p>
          )}
        </div>
      </div>

      {/* Editorial Picks */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Editorial Picks</h1>
        <div className="flex overflow-auto gap-4">
          {albums && albums.length > 0 ? (
            albums.map((e, i) => (
              <AlbumItem
                key={e._id || i}
                image={e?.thumbnail?.url}
                name={e?.title}
                desc={e?.description}
                id={e?._id}
              />
            ))
          ) : (
            <p className="text-gray-400 p-4">Nothing here yet.</p>
          )}
        </div>
      </div>

      {/* Featured Charts */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto gap-4">
          {albums && albums.length > 0 ? (
            [...albums].reverse().map((e, i) => (
              <AlbumItem
                key={e._id || i}
                image={e?.thumbnail?.url}
                name={e?.title}
                desc={e?.description}
                id={e?._id}
              />
            ))
          ) : (
            <p className="text-gray-400 p-4">Charts will appear once data is added.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
