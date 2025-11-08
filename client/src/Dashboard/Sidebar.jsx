import React, { useEffect, useCallback, useRef } from "react";
import {
    Home,
    Calendar,
    CheckSquare,
    Smile,
    TrendingUp,
    Settings,
    X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import NavItem from "./Components/NavItem";
import COLORS from "./data/colors";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const location = useLocation();
    const navigate = useNavigate();
    const sidebarRef = useRef(null);

    const navItems = [
        {
            to: "/dashboard",
            label: "Overview",
            icon: Home,
            ariaLabel: "Navigate to Dashboard Overview",
        },
        {
            to: "/dashboard/habits",
            label: "My Habits",
            icon: Calendar,
            ariaLabel: "Navigate to My Habits",
        },
        {
            to: "/dashboard/checkin",
            label: "Check-In",
            icon: CheckSquare,
            ariaLabel: "Navigate to Check-In",
        },
        {
            to: "/dashboard/mood",
            label: "Mood Tracker",
            icon: Smile,
            ariaLabel: "Navigate to Mood Tracker",
        },
        {
            to: "/dashboard/analytics",
            label: "Analytics",
            icon: TrendingUp,
            ariaLabel: "Navigate to Analytics",
        },
        {
            to: "/dashboard/settings",
            label: "Settings",
            icon: Settings,
            ariaLabel: "Navigate to Settings",
        },
    ];

    // Close sidebar handler
    const closeSidebar = useCallback(() => {
        setSidebarOpen(false);
    }, [setSidebarOpen]);

    // Handle navigation with sidebar close
    const handleNavigation = useCallback(
        (path) => {
            navigate(path);
            if (window.innerWidth < 1024) {
                closeSidebar();
            }
        },
        [navigate, closeSidebar]
    );

    // Check if route is active
    const isActiveRoute = useCallback(
        (path) => {
            if (path === "/dashboard") {
                return location.pathname === "/dashboard";
            }
            return location.pathname.startsWith(path);
        },
        [location.pathname]
    );

    // Handle escape key to close sidebar
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape" && sidebarOpen) {
                closeSidebar();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [sidebarOpen, closeSidebar]);

    // Prevent body scroll when sidebar is open on mobile
    useEffect(() => {
        if (sidebarOpen && window.innerWidth < 1024) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [sidebarOpen]);

    // Focus trap for accessibility
    useEffect(() => {
        if (sidebarOpen && sidebarRef.current) {
            const focusableElements = sidebarRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            const handleTab = (e) => {
                if (e.key === "Tab") {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            lastElement?.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            firstElement?.focus();
                            e.preventDefault();
                        }
                    }
                }
            };

            document.addEventListener("keydown", handleTab);
            return () => document.removeEventListener("keydown", handleTab);
        }
    }, [sidebarOpen]);

    // Add animations
    useEffect(() => {
        const styleId = "sidebar-animations";
        if (!document.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.innerHTML = `
                @keyframes slideIn {
                    from { 
                        transform: translateX(-100%); 
                        opacity: 0; 
                    }
                    to { 
                        transform: translateX(0); 
                        opacity: 1; 
                    }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-slideIn {
                    animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-in;
                }
                .sidebar-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .sidebar-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .sidebar-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(156, 163, 175, 0.3);
                    border-radius: 3px;
                }
                .sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(156, 163, 175, 0.5);
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    return (
        <>
            {/* Overlay for mobile screens */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
                    onClick={closeSidebar}
                    aria-hidden="true"
                    role="presentation"
                />
            )}

            {/* Sidebar Container */}
            <aside
                ref={sidebarRef}
                role="navigation"
                aria-label="Main Navigation"
                className={`
                    fixed lg:sticky top-0 left-0 h-screen z-50 
                    flex flex-col justify-between 
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen
                        ? "translate-x-0 animate-slideIn"
                        : "-translate-x-full lg:translate-x-0"
                    }
                `}
                style={{
                    width: "260px",
                    backgroundColor: COLORS.cardBg,
                    borderRight: `1px solid ${COLORS.border}`,
                    boxShadow: sidebarOpen
                        ? "4px 0 15px rgba(0,0,0,0.1)"
                        : "2px 0 8px rgba(0,0,0,0.05)",
                }}
            >
                {/* Sidebar Header - Mobile Only */}
                <div className="flex items-center justify-between px-5 py-4 border-b lg:hidden">
                    <div className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="HabitMetric Logo"
                            className="w-8 h-8 rounded-lg object-cover"
                            onError={(e) => {
                                e.target.style.display = "none";
                            }}
                        />
                        <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
                            HabitMetric
                        </h2>
                    </div>
                    <button
                        onClick={closeSidebar}
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                        aria-label="Close sidebar"
                        type="button"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Navigation Content */}
                <div className="flex-1 overflow-y-auto sidebar-scrollbar px-3 py-4">
                    <nav className="space-y-1" role="list">
                        {navItems.map((item) => (
                            <NavItem
                                key={item.to}
                                icon={item.icon}
                                label={item.label}
                                to={item.to}
                                isActive={isActiveRoute(item.to)}
                                onClick={() => handleNavigation(item.to)}
                                ariaLabel={item.ariaLabel}
                            />
                        ))}
                    </nav>
                </div>

                {/* Footer Section */}
                <div
                    className="px-4 py-3 border-t"
                    style={{ borderColor: COLORS.border }}
                >
                    <div className="text-center space-y-1">
                        <p className="text-xs text-gray-500 font-medium">
                            © {new Date().getFullYear()} HabitMetric
                        </p>
                        <p className="text-xs text-gray-400">
                            Version 1.0.0
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
}