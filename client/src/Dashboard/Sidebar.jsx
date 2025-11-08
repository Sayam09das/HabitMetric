import React, { useEffect } from "react";
import {
    Home,
    Calendar,
    CheckSquare,
    Smile,
    TrendingUp,
    Settings,
} from "lucide-react";
import NavItem from "./Components/NavItem";
import COLORS from "./data/colors";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const location = useLocation();
    const navigate = useNavigate();

    const navs = [
        { to: "/dashboard", label: "Overview", icon: Home },
        { to: "/dashboard/habits", label: "My Habits", icon: Calendar },
        { to: "/dashboard/checkin", label: "Check-In", icon: CheckSquare },
        { to: "/dashboard/mood", label: "Mood Tracker", icon: Smile },
        { to: "/dashboard/analytics", label: "Analytics", icon: TrendingUp },
        { to: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    // Add smooth slide + fade animation for mobile sidebar
    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
        @keyframes slideIn {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn {
            animation: slideIn 0.3s ease-out;
        }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <>
            {/* Overlay for mobile screens */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar Container */}
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen z-40 flex flex-col justify-between transition-transform duration-300 ${sidebarOpen ? "translate-x-0 animate-slideIn" : "-translate-x-full lg:translate-x-0"
                    }`}
                style={{
                    width: "260px",
                    backgroundColor: COLORS.cardBg,
                    borderRight: `1px solid ${COLORS.border}`,
                    boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
                }}
            >
                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto p-5">
                    {/* Brand / Title (optional if shown in navbar) */}
                    <div className="flex items-center justify-between mb-6 lg:hidden">
                        <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
                            HabitMetric
                        </h2>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="space-y-2">
                        {navs.map((n) => (
                            <NavItem
                                key={n.to}
                                icon={n.icon}
                                label={n.label}
                                to={n.to}
                                isActive={
                                    location.pathname === n.to ||
                                    (n.to === "/dashboard" &&
                                        location.pathname === "/dashboard")
                                }
                                onClick={() => {
                                    navigate(n.to);
                                    setSidebarOpen(false);
                                }}
                            />
                        ))}
                    </nav>
                </div>

                {/* Footer Section */}
                <div
                    className="p-4 border-t text-sm text-gray-500"
                    style={{ borderColor: COLORS.border }}
                >
                    <p className="text-center">
                        © {new Date().getFullYear()} HabitMetric
                    </p>
                </div>
            </aside>
        </>
    );
}
