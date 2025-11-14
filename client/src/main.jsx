import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import App from "./App.jsx";

// Global axios interceptor: attach cleaned Bearer token and include credentials
axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (typeof token === "string") {
      // strip accidental surrounding quotes
      if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
        localStorage.setItem("token", token);
      }
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
