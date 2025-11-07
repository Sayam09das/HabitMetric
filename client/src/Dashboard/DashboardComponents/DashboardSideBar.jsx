import React, { useEffect, useState } from "react";
import {
    Home,
    Calendar,
    CheckSquare,
    Smile,
    TrendingUp,
    Settings,
    LogOut,
    Menu,
    ChevronDown,
    X,
} from "lucide-react";
import { AnimatedThemeToggler } from "../../Components/ui/animated-theme-toggler";

const DashboardSideBar = () => {
    const [activeSection, setActiveSection] = useState("overview");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [user] = useState({ name: "Sayam", avatar: "👨‍💻" });
    const [isDark, setIsDark] = useState(false);

    // 🎨 Manual color palettes
    const COLORS = {
        light: {
            primary: "#4F46E5", // Indigo-600
            cardBg: "#FFFFFF",
            textMain: "#111827",
            textLight: "#6B7280",
            background: "#F9FAFB",
            border: "#E5E7EB",
            hoverBg: "#F3F4F6",
        },
        dark: {
            primary: "#818CF8", // Lighter indigo for contrast
            cardBg: "#1E293B", // Slate-800
            textMain: "#F9FAFB",
            textLight: "#CBD5E1",
            background: "#0F172A", // Slate-900
            border: "#334155",
            hoverBg: "#1E293B",
        },
    };

    // 🧠 Detect `.dark` class on HTML
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        setIsDark(document.documentElement.classList.contains("dark"));
        return () => observer.disconnect();
    }, []);

    const theme = isDark ? COLORS.dark : COLORS.light;

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    const NavItem = ({ icon: Icon, label, section }) => (
        <button
            onClick={() => setActiveSection(section)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
            style={{
                backgroundColor:
                    activeSection === section ? theme.primary + "33" : "transparent",
                color: activeSection === section ? theme.primary : theme.textLight,
            }}
            onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
                activeSection === section ? theme.primary + "33" : theme.hoverBg)
            }
            onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
                activeSection === section ? theme.primary + "33" : "transparent")
            }
        >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: theme.background,
                color: theme.textMain,
                transition: "background-color 0.4s ease, color 0.4s ease",
            }}
        >
            {/* 🌐 Top Navbar */}
            <div
                style={{
                    backgroundColor: theme.cardBg,
                    borderBottom: `1px solid ${theme.border}`,
                    transition: "background-color 0.4s ease, border-color 0.4s ease",
                }}
                className="sticky top-0 z-50 shadow-sm"
            >
                <div className="flex items-center justify-between px-6 py-4">
                    {/* Left: Logo + Sidebar Toggle */}
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                            {sidebarOpen ? (
                                <X className="w-6 h-6" style={{ color: theme.textMain }} />
                            ) : (
                                <Menu className="w-6 h-6" style={{ color: theme.textMain }} />
                            )}
                        </button>

                        <div className="flex items-center gap-2">
                            <img
                                src="/logo.png" // 🖼️ replace with your logo path
                                alt="HabitFlow Logo"
                                className="w-10 h-10 rounded-lg object-cover"
                                style={{
                                    backgroundColor: theme.primary,
                                    
                                }}
                            />

                            <span
                                className="text-xl font-bold"
                                style={{ color: theme.textMain }}
                            >
                                Habit Metric
                            </span>
                        </div>

                    </div>

                    {/* Right Side: Greeting + Theme Toggle + Profile */}
                    <div className="flex items-center gap-4">
                        <p
                            className="hidden md:block text-sm font-medium"
                            style={{ color: theme.textLight }}
                        >
                            {getGreeting()},{" "}
                            <span style={{ color: theme.primary }}>{user.name}</span> 👋
                        </p>

                        {/* ✨ Theme Toggler */}
                        <AnimatedThemeToggler className="p-2 rounded-lg transition-all" />

                        {/* 👤 Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                                style={{ backgroundColor: "transparent" }}
                            >
                                <span className="text-2xl">{user.avatar}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {showProfileMenu && (
                                <div
                                    className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border transition-all duration-300"
                                    style={{
                                        backgroundColor: theme.cardBg,
                                        borderColor: theme.border,
                                    }}
                                >
                                    <button
                                        className="w-full px-4 py-2 text-left rounded-t-lg"
                                        style={{ color: theme.textMain }}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.backgroundColor = theme.hoverBg)
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor = theme.cardBg)
                                        }
                                    >
                                        Profile
                                    </button>
                                    <button
                                        className="w-full px-4 py-2 text-left rounded-b-lg flex items-center gap-2"
                                        style={{
                                            color: "#EF4444",
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.backgroundColor = theme.hoverBg)
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor = theme.cardBg)
                                        }
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 📚 Sidebar */}
            <div className="flex">
                <div
                    className={`fixed lg:sticky top-0 left-0 h-screen z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div
                        className="w-64 h-full p-4 shadow-lg"
                        style={{
                            backgroundColor: theme.cardBg,
                            borderRight: `1px solid ${theme.border}`,
                        }}
                    >
                        <nav className="space-y-2 mt-4">
                            <NavItem icon={Home} label="Overview" section="overview" />
                            <NavItem icon={Calendar} label="My Habits" section="habits" />
                            <NavItem icon={CheckSquare} label="Check-In" section="checkin" />
                            <NavItem icon={Smile} label="Mood Tracker" section="mood" />
                            <NavItem icon={TrendingUp} label="Analytics" section="analytics" />
                            <NavItem icon={Settings} label="Settings" section="settings" />
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSideBar;
