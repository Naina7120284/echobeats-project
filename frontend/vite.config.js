import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001", // Corrected to match your backend PORT
        changeOrigin: true,             // Necessary for virtual hosted sites
        secure: false,                  // Set to false if you are not using SSL (https)
      },
    },
  },
});
