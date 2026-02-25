import React from "react";
import axios from "axios";
import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/User.jsx";
import { SongProvider } from "./context/Song.jsx";
import { ThemeProvider } from "./context/Theme.jsx";

axios.defaults.withCredentials = true;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <UserProvider>
        <SongProvider>
          <App />
        </SongProvider>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>
);