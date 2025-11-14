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
import Email from "./Auth/email.jsx";

// Dashboard & Inner Pages
import DashboardLayout from "./Dashboard/Dashboard.jsx";
import Habits from "./Dashboard/Sections/Habits.jsx";
import Checkin from "./Dashboard/Sections/Checkin.jsx";
import MoodTracker from "./Dashboard/Sections/MoodTracker.jsx";
import Analytics from "./Dashboard/Sections/Analytics.jsx";
import Settings from "./Dashboard/Sections/Settings.jsx";
import Profile from "./Dashboard/Profile/Profile.jsx";
import Account from "./Dashboard/Profile/Account.jsx";
import Notifications from "./Dashboard/Profile/Notifications.jsx";
import Appearance from "./Dashboard/Profile/Appearance.jsx";
import Privacy from "./Dashboard/Profile/Privacy.jsx";
import Billing from "./Dashboard/Profile/Billing.jsx";

const App = () => {
  const location = useLocation();

  // Hide navbar & footer on these routes
  const hideLayoutRoutes = ["/login", "/register", "/verify-email"];
  const hideLayout =
    hideLayoutRoutes.includes(location.pathname) ||
    location.pathname === "/dashboard" ||
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
        <Route path="/verify-email" element={<Email />} />

        {/* Dashboard: either use nested relative paths or delegate to DashboardLayout (choose one).
            Here we mount DashboardLayout at /dashboard/* so it can manage its own nested routes
            OR the children below can be matched as nested routes. */}
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route index element={<Habits />} />
          <Route path="habits" element={<Habits />} />
          <Route path="checkin" element={<Checkin />} />
          <Route path="mood" element={<MoodTracker />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile/profile" element={<Profile />} />
          <Route path="profile/account" element={<Account />} />
          <Route path="profile/notifications" element={<Notifications />} />
          <Route path="profile/appearance" element={<Appearance />} />
          <Route path="profile/privacy" element={<Privacy />} />
          <Route path="profile/billing" element={<Billing />} />
        </Route>
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
