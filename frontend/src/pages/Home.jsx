import React from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import AlbumItem from "../components/AlbumItem";
import SongItem from "../components/SongItem";

const Home = () => {
  const { songs = [], albums = [] } = SongData();

  return (
    <Layout>
      {/* Main Container: 
        Added 'px-4' for mobile and 'md:px-0' for desktop to prevent 
        content from hitting the very edge of the screen.
      */}
      <div className="px-4 md:px-0 pb-24">
        
        {/* Top Playlist Section */}
        <section className="mb-8">
          <h1 className="my-5 font-bold text-xl md:text-2xl">Top Playlist</h1>
          {/* Scroll Container Fix: 
            'no-scrollbar' hides the ugly bar on mobile. 
            'pb-4' ensures the shadow of cards isn't cut off.
          */}
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x touch-pan-x">
            {albums && albums.length > 0 ? (
              albums.map((e, i) => (
                <div key={e._id || i} className="snap-start min-w-[140px] md:min-w-[180px]">
                  <AlbumItem
                    image={e?.thumbnail?.url}
                    name={e?.title}
                    desc={e?.description}
                    id={e?._id}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-400 py-4">No playlists available yet.</p>
            )}
          </div>
        </section>

        {/* Popular Albums and Singles */}
        <section className="mb-8">
          <h1 className="my-5 font-bold text-xl md:text-2xl">Popular albums and singles</h1>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x touch-pan-x">
            {songs && songs.length > 0 ? (
              [...songs].reverse().map((e, i) => (
                <div key={e._id || i} className="snap-start min-w-[140px] md:min-w-[180px]">
                  <SongItem
                    image={e?.thumbnail?.url}
                    name={e?.title}
                    desc={e?.singer}
                    id={e?._id}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-400 py-4">No songs found.</p>
            )}
          </div>
        </section>

        {/* Trending Songs */}
        <section className="mb-8">
          <h1 className="my-5 font-bold text-xl md:text-2xl">Trending Songs</h1>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x touch-pan-x">
            {songs && songs.length > 0 ? (
              songs.map((e, i) => (
                <div key={e._id || i} className="snap-start min-w-[140px] md:min-w-[180px]">
                  <SongItem
                    image={e?.thumbnail?.url}
                    name={e?.title}
                    desc={e?.singer}
                    id={e?._id}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-400 py-4">Add some songs to see them here!</p>
            )}
          </div>
        </section>

        {/* Editorial Picks */}
        <section className="mb-8">
          <h1 className="my-5 font-bold text-xl md:text-2xl">Editorial Picks</h1>
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x touch-pan-x">
            {albums && albums.length > 0 ? (
              albums.map((e, i) => (
                <div key={e._id || i} className="snap-start min-w-[140px] md:min-w-[180px]">
                  <AlbumItem
                    image={e?.thumbnail?.url}
                    name={e?.title}
                    desc={e?.description}
                    id={e?._id}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-400 py-4">Nothing here yet.</p>
            )}
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Home;
