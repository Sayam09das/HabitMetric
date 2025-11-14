// src/Dashboard/Dashboard.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Overview from "./Sections/Overview";
import Habits from "./Sections/Habits";
import Checkin from "./Sections/Checkin";
import MoodTracker from "./Sections/MoodTracker";
import Analytics from "./Sections/Analytics";
import Settings from "./Sections/Settings";
import Profile from "./Profile/Profile";
import Account from "./Profile/Account";
import Notifications from "./Profile/Notifications";
import Appearance from "./Profile/Appearance";
import Privacy from "./Profile/Privacy";
import Billing from "./Profile/Billing";
import COLORS from "./data/colors";
import { Routes, Route } from "react-router-dom";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const initialHabits = [
    { id: 1, title: "Morning Exercise", frequency: "Daily", streak: 7, icon: "💪" },
    { id: 2, title: "Read 30 min", frequency: "Daily", streak: 5, icon: "📚" },
    { id: 3, title: "Meditation", frequency: "Daily", streak: 3, icon: "🧘" },
    { id: 4, title: "Drink 8 Glasses", frequency: "Daily", streak: 10, icon: "💧" },
    { id: 5, title: "Code Practice", frequency: "Daily", streak: 4, icon: "💻" },
  ];

  const [todayCheckins, setTodayCheckins] = useState([1, 2, 4, 5]);
  const weeklyProgress = [
    { day: "Mon", completed: 4 },
    { day: "Tue", completed: 5 },
    { day: "Wed", completed: 3 },
    { day: "Thu", completed: 5 },
    { day: "Fri", completed: 4 },
    { day: "Sat", completed: 5 },
    { day: "Sun", completed: 4 },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: darkMode ? "#0B1220" : COLORS.background }}>
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showProfileMenu={showProfileMenu}
        setShowProfileMenu={setShowProfileMenu}
      />

      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 p-6 lg:p-8">
          <Routes>
            <Route index element={<Overview habits={initialHabits} todayCheckins={todayCheckins} currentMood={"😊"} weeklyProgress={weeklyProgress} />} />
            <Route path="habits" element={<Habits initialHabits={initialHabits} />} />
            <Route path="checkin" element={<Checkin initialHabits={initialHabits} initialCheckins={todayCheckins} onUpdate={setTodayCheckins} />} />
            <Route path="mood" element={<MoodTracker initialMood={"😊"} initialHistory={[]} />} />
            <Route path="analytics" element={<Analytics habits={initialHabits} todayCheckins={todayCheckins} weeklyProgress={weeklyProgress} />} />
            <Route path="profile/profile" element={<Profile />} />
            <Route path="profile/account" element={<Account />} />
            <Route path="profile/notifications" element={<Notifications />} />
            <Route path="profile/appearance" element={<Appearance />} />
            <Route path="profile/privacy" element={<Privacy />} />
            <Route path="profile/billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
