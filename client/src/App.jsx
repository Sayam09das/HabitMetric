import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// Public Pages
import Navbar from "./Pages/Navbar/Navbar.jsx";
import Welcome from "./Components/Welcome/Welcome.jsx";
import About from "./Components/About/About.jsx";
import Features from "./Components/Features/Features.jsx";
import HowItWorks from "./Components/Works/Works.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Footer from "./Pages/Footer/Footer.jsx";

// Auth Pages
import Login from "./Auth/Login/Login.jsx";
import Register from "./Auth/Register/Register.jsx";

// Dashboard & Inner Pages
import DashboardLayout from "./Dashboard/Dashboard.jsx";
import Habits from "./Dashboard/Sections/Habits.jsx";
import Checkin from "./Dashboard/Sections/Checkin.jsx";
import MoodTracker from "./Dashboard/Sections/MoodTracker.jsx";
import Analytics from "./Dashboard/Sections/Analytics.jsx";
import Settings from "./Dashboard/Sections/Settings.jsx";

const App = () => {
  const location = useLocation();

  // Hide navbar & footer on these routes
  const hideLayoutRoutes = ["/login", "/register", "/dashboard"];
  const hideLayout =
    hideLayoutRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/dashboard/");

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes with nested pages */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Habits />} />
          <Route path="habits" element={<Habits />} />
          <Route path="checkin" element={<Checkin />} />
          <Route path="mood" element={<MoodTracker />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
