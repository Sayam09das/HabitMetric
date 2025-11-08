import React from "react";
import { Home, Calendar, CheckSquare, Smile, TrendingUp, Settings } from "lucide-react";
import NavItem from "./Components/NavItem";
import COLORS  from "./data/colors";
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

    return (
        <div className={`fixed lg:sticky top-0 left-0 h-screen z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
            <div className="w-64 h-full p-4 shadow-lg" style={{ backgroundColor: COLORS.cardBg, borderRight: `1px solid ${COLORS.border}` }}>
                <nav className="space-y-2 mt-4">
                    {navs.map(n => (
                        <NavItem
                            key={n.to}
                            icon={n.icon}
                            label={n.label}
                            to={n.to}
                            isActive={location.pathname === n.to || (n.to === "/dashboard" && location.pathname === "/dashboard")}
                            onClick={() => {
                                navigate(n.to);
                                setSidebarOpen(false);
                            }}
                        />
                    ))}
                </nav>
            </div>
        </div>
    );
}
