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
import axios from "axios";


const API_ORIGIN = import.meta.env.VITE_PRIVATE_API_URL || "http://localhost:3000";

export default function Navbar({ sidebarOpen, setSidebarOpen, user: propUser = null, }) {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [user, setUser] = useState(propUser);

    const logout = async () => {
        try {
            await axios.post(
                `${API_ORIGIN}/auth/logout`,
                {},
                {
                    withCredentials: true,
                    timeout: 15000,
                }
            );

            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");

            window.location.href = "/login";
        } catch (err) {
            console.error("Logout failed:", err);
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
    };




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

    const getInitials = (name) => {
        if (!name) return "👤";
        const words = name.trim().split(" ").filter(Boolean);
        if (words.length === 1) return words[0][0].toUpperCase();
        return (words[0][0] + words[1][0]).toUpperCase();
    };

    useEffect(() => {
        if (propUser) {
            setUser(propUser);
            return;
        }

        let cancelled = false;

        const fetchProfile = async () => {
            try {
                // mark loading
                setUser(null);

                // rely on interceptor in main.jsx to attach Authorization header
                const resp = await axios.get(`${API_ORIGIN}/protected/profile`, { withCredentials: true, timeout: 15000 });

                if (cancelled) return;

                const resolved = resp.data?.user ?? (resp.data && (resp.data.name || resp.data.email) ? resp.data : null);
                if (resolved) {
                    setUser(resolved);
                    return;
                }

                // fallback: decode token (non-critical)
                const token = localStorage.getItem("token");
                if (token) {
                    try {
                        const clean = token.startsWith('"') && token.endsWith('"') ? token.slice(1, -1) : token;
                        const payload = JSON.parse(atob(clean.split(".")[1]));
                        setUser({ name: payload.name ?? payload.email ?? "User", email: payload.email ?? "" });
                        return;
                    } catch (e) {
                        // ignore decode error
                    }
                }

                setUser({ name: "User", email: "no-email@example.com" });
            } catch (err) {
                const status = err?.response?.status;
                // if invalid token, clear token to force a fresh login
                if (status === 401 || status === 403) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                    // do not auto-redirect in production here; let auth flow handle it
                }

                // try token decode fallback
                const token = localStorage.getItem("token");
                if (token) {
                    try {
                        const clean = token.startsWith('"') && token.endsWith('"') ? token.slice(1, -1) : token;
                        const payload = JSON.parse(atob(clean.split(".")[1]));
                        setUser({ name: payload.name ?? payload.email ?? "User", email: payload.email ?? "" });
                        return;
                    } catch (e) {
                        // ignore
                    }
                }
                setUser({ name: "User", email: "no-email@example.com" });
            }
        };

        fetchProfile();
        return () => {
            cancelled = true;
        };
    }, [propUser]);

    const displayName = user === null ? "Loading…" : (user?.name ?? "User");
    const displayEmail = user === null ? "" : (user?.email ?? "no-email@example.com");


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
                            {displayName}
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
                                {/* initials from safe displayName */}
                                {getInitials(displayName)}
                            </div>
                            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
                        </button>

                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-52 sm:w-56 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 bg-white animate-fadeIn">
                                <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100">
                                    <p className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                                        {displayName || "Unnamed"}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                                        {displayEmail}
                                    </p>
                                </div>

                                {/* View Profile */}
                                <Link
                                    to="/dashboard/profile"
                                    className="block w-full px-3 sm:px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50 text-xs sm:text-sm text-gray-700"
                                    onClick={() => setShowProfileMenu(false)}
                                >
                                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    View Profile
                                </Link>
                                <div className="border-t border-gray-100" />
                                <Link
                                    to="/dashboard/settings"
                                    className="block w-full px-3 sm:px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-xs sm:text-sm text-gray-700"
                                >
                                    ⚙️ Settings
                                </Link>
                                <button
                                    onClick={logout}
                                    className="block w-full px-3 sm:px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50 text-xs sm:text-sm text-red-600"
                                >
                                    <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Logout
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}