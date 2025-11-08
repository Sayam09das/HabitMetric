import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Menu,
    X,
    Bell,
    ChevronDown,
    LogOut,
    Search,
    User,
} from "lucide-react";
import COLORS from "./data/colors";

export default function Navbar({ sidebarOpen, setSidebarOpen, user }) {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    // Add fade-in animation dynamically
    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-6px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.25s ease-out;
        }`;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    // Generate initials like "SD"
    const getInitials = (name) => {
        if (!name) return "👤";
        const words = name.trim().split(" ");
        if (words.length === 1) return words[0][0].toUpperCase();
        return (words[0][0] + words[1][0]).toUpperCase();
    };

    return (
        <header className="sticky top-0 z-50 w-full shadow-sm backdrop-blur-md border-b border-gray-200 bg-white transition-all duration-300">
            <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3">
                {/* Left Section */}
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                    {/* Sidebar Toggle */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg transition hover:bg-gray-100 focus:outline-none"
                        aria-label="Toggle Sidebar"
                    >
                        {sidebarOpen ? (
                            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                        ) : (
                            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                        )}
                    </button>

                    {/* Logo + Brand */}
                    <Link
                        to="/"
                        className="flex items-center gap-1.5 sm:gap-2 hover:opacity-90 transition"
                    >
                        <img
                            src="/logo.png"
                            alt="HabitMetric Logo"
                            className="navbar-logo w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl object-cover shadow-sm"
                        />
                        <span className="navbar-title text-base sm:text-xl lg:text-2xl font-semibold tracking-wide text-gray-800">
                            HabitMetric
                        </span>
                    </Link>
                </div>

                {/* Middle Section - Search */}
                <div className="hidden md:flex items-center bg-gray-100 px-2.5 lg:px-3 py-1.5 lg:py-2 rounded-lg w-1/4 lg:w-1/3 border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500">
                    <Search className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search tasks, goals..."
                        className="bg-transparent outline-none text-xs lg:text-sm w-full text-gray-700"
                    />
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4">
                    {/* Greeting */}
                    <p className="hidden xl:block text-sm text-gray-600 font-medium whitespace-nowrap">
                        {getGreeting()},{" "}
                        <span className="text-indigo-600 font-semibold">
                            {user.name}
                        </span>{" "}
                        👋
                    </p>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowNotification(!showNotification);
                                setShowProfileMenu(false);
                            }}
                            className="relative p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition"
                            aria-label="Notifications"
                        >
                            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                            <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {showNotification && (
                            <div className="absolute right-0 mt-2 w-64 sm:w-72 lg:w-80 rounded-xl shadow-lg border border-gray-200 bg-white animate-fadeIn">
                                <div className="px-3 sm:px-4 py-2 border-b border-gray-100">
                                    <h4 className="text-xs sm:text-sm font-semibold text-gray-800">
                                        Notifications
                                    </h4>
                                </div>
                                <div className="max-h-60 overflow-y-auto">
                                    <Link
                                        to="/dashboard/notification"
                                        className="block px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-600 hover:bg-gray-50"
                                    >
                                        No new notifications.
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile Menu */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowProfileMenu(!showProfileMenu);
                                setShowNotification(false);
                            }}
                            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full hover:bg-gray-100 transition"
                        >
                            <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-xs sm:text-sm">
                                {getInitials(user.name)}
                            </div>
                            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
                        </button>

                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-52 sm:w-56 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 bg-white animate-fadeIn">
                                <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100">
                                    <p className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                                        {user.name}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                                        {user.email}
                                    </p>
                                </div>
                                <Link
                                    to="/dashboard/profile"
                                    className="block w-full px-3 sm:px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                                >
                                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> My Profile
                                </Link>
                                <Link
                                    to="/dashboard/settings"
                                    className="block w-full px-3 sm:px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                                >
                                    ⚙️ Settings
                                </Link>
                                <Link
                                    to="/logout"
                                    className="block w-full px-3 sm:px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50 text-xs sm:text-sm text-red-600"
                                >
                                    <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Logout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}