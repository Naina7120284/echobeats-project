import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserData } from "./context/User";
import Loading from "./components/Loading";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import PlayList from "./pages/PlayList";
import Album from "./pages/Album";
import Landing from "./pages/Landing";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Music from "./pages/Music";

const App = () => {
  const { loading, user, isAuth } = UserData();

  return (
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
            {/* 1. Public Landing Page */}
            <Route path="/" element={isAuth ? <Navigate to="/home" /> : <Landing />} />

            {/* 2. Authentication Pages */}
            <Route path="/login" element={isAuth ? <Navigate to="/home" /> : <Login />} />
            <Route path="/register" element={isAuth ? <Navigate to="/home" /> : <Register />} />

            {/* 3. Protected Home and Features */}
            <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/login" />} />
            
            <Route
              path="/playlist"
              element={isAuth ? <PlayList user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/music"
              element={isAuth ? <Music user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/album/:id"
              element={isAuth ? <Album user={user} /> : <Navigate to="/login" />}
            />
            
            <Route path="/admin" element={isAuth && user?.role === "admin" ? <Admin /> : <Navigate to="/home" />} />
            
            <Route path="*" element={<Navigate to={isAuth ? "/home" : "/"} />} />
          </Routes>
        </BrowserRouter>
      )}
    </HelmetProvider>
  );
};

export default App;