import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

// Global configuration for Axios to handle cookies correctly
axios.defaults.withCredentials = true; 

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Changed [] to null for better object handling
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Helper for safe error messaging
  const handleError = (error) => {
    const message = error.response?.data?.message || "An unexpected error occurred";
    toast.error(message);
    setBtnLoading(false);
  };

  async function registerUser(name, email, password, navigate, fetchSongs, fetchAlbums) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/register", { name, email, password });

      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/home");
      if (fetchSongs) fetchSongs();
      if (fetchAlbums) fetchAlbums();
    } catch (error) {
      handleError(error);
    }
  }

  async function loginUser(email, password, navigate, fetchSongs, fetchAlbums) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", { email, password });

      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/home");
      if (fetchSongs) fetchSongs();
      if (fetchAlbums) fetchAlbums();
    } catch (error) {
      handleError(error);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/me");
      setUser(data);
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logoutUser() {
    try {
      await axios.get("/api/user/logout");
      toast.success("Logged out successfully");
      setIsAuth(false);
      setUser(null);
      // Using window.location.href to home is cleaner than a reload sometimes
      window.location.reload(); 
    } catch (error) {
      handleError(error);
    }
  }

  async function addToPlaylist(id) {
    try {
      const { data } = await axios.post("/api/user/song/" + id);
      toast.success(data.message);
      fetchUser();
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        registerUser,
        user,
        isAuth,
        btnLoading,
        loading,
        loginUser,
        logoutUser,
        addToPlaylist,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
