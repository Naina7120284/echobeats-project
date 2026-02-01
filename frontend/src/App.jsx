import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserData } from "./context/User";
import Loading from "./components/Loading";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import PlayList from "./pages/PlayList";
import Album from "./pages/Album";
import Landing from "./pages/Landing";
import { Helmet, HelmetProvider } from "react-helmet-async"; // 1. Import HelmetProvider
import Music from "./pages/Music";

const App = () => {
  const { loading, user, isAuth } = UserData();

  return (
    // 2. Wrap everything in HelmetProvider to fix the "black screen" crash
    <HelmetProvider>
      <Helmet>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>EchoBeats</title>
      </Helmet>

      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Landing />} />
            <Route path="/home" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/playlist"
              element={isAuth ? <PlayList user={user} /> : <Login />}
            />
            <Route
              path="/music"
              element={isAuth ? <Music user={user} /> : <Login />}
            />
            <Route
              path="/album/:id"
              element={isAuth ? <Album user={user} /> : <Login />}
            />
            <Route path="/admin" element={isAuth ? <Admin /> : <Login />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </HelmetProvider>
  );
};

export default App;