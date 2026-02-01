import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [songLoading, setSongLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [song, setSong] = useState(null); // Changed to null for object
  const [albums, setAlbums] = useState([]);
  const [index, setIndex] = useState(0);
  const [albumSong, setAlbumSong] = useState([]);
  const [albumData, setAlbumData] = useState(null); // Changed to null for object

  async function fetchSongs() {
    try {
      const { data } = await axios.get("/api/song/all");
      setSongs(data);
      // Only set initial song if data exists to prevent "null" errors
      if (data.length > 0) {
        setSelectedSong(data[0]?._id);
      }
      setIsPlaying(false);
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setSongLoading(false);
    }
  }

  async function fetchSingleSong() {
    if (!selectedSong) return; // Prevention: Don't call if no ID exists
    try {
      const { data } = await axios.get("/api/song/single/" + selectedSong);
      setSong(data);
    } catch (error) {
      console.error("Error fetching single song:", error);
    }
  }

  async function addAlbum(formData, setTitle, setDescription, setFile) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/song/album/new", formData);
      toast.success(data.message);
      fetchAlbums();
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add album");
    } finally {
      setLoading(false);
    }
  }

  async function addSong(formData, setTitle, setDescription, setFile, setSinger, setAlbum) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/song/new", formData);
      toast.success(data.message);
      fetchSongs();
      setTitle("");
      setDescription("");
      setFile(null);
      setSinger("");
      setAlbum("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add song");
    } finally {
      setLoading(false);
    }
  }

  async function addThumbnail(id, formData, setFile) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/song/" + id, formData);
      toast.success(data.message);
      fetchSongs();
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add thumbnail");
    } finally {
      setLoading(false);
    }
  }

  async function fetchAlbums() {
    try {
      const { data } = await axios.get("/api/song/album/all");
      setAlbums(data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  }

  async function deleteSong(id) {
    try {
      const { data } = await axios.delete("/api/song/" + id);
      toast.success(data.message);
      fetchSongs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  }

  async function fetchAlbumSong(id) {
    try {
      const { data } = await axios.get("/api/song/album/" + id);
      setAlbumSong(data.songs);
      setAlbumData(data.album);
    } catch (error) {
      console.error("Error fetching album songs:", error);
    }
  }

  const playSong = (selectedSongData) => {
    setIsPlaying(true);
    setSong(selectedSongData);
    setSelectedSong(selectedSongData._id);
  };

  function nextMusic() {
    if (songs.length === 0) return;
    const nextIndex = (index + 1) % songs.length;
    setIndex(nextIndex);
    setSelectedSong(songs[nextIndex]._id);
  }

  function prevMusic() {
    if (songs.length === 0) return;
    const prevIndex = (index - 1 + songs.length) % songs.length;
    setIndex(prevIndex);
    setSelectedSong(songs[prevIndex]._id);
  }

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  return (
    <SongContext.Provider
      value={{
        songs,
        loading,
        songLoading,
        selectedSong,
        isPlaying,
        song,
        albums,
        albumSong,
        albumData,
        setSelectedSong,
        setIsPlaying,
        fetchSingleSong,
        addAlbum,
        addSong,
        addThumbnail,
        deleteSong,
        fetchAlbumSong,
        nextMusic,
        prevMusic,
        fetchSongs,
        fetchAlbums,
        playSong,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const SongData = () => useContext(SongContext);

