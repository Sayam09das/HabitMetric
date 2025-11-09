import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Sun,
    Moon,
    Zap,
    Volume2,
} from "lucide-react";
import COLORS from "../data/colors";

const Appearance = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);

    return (
        <div>
            <motion.div
                key="appearance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm"
            >
                {/* Header */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                    Appearance Settings
                </h2>

                <div className="space-y-6">
                    {/* Theme Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Theme</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { mode: "light", icon: Sun, label: "Light Mode" },
                                { mode: "dark", icon: Moon, label: "Dark Mode" },
                                { mode: "auto", icon: Zap, label: "Auto" },
                            ].map((theme) => {
                                const ThemeIcon = theme.icon;
                                const isActive =
                                    (isDarkMode && theme.mode === "dark") ||
                                    (!isDarkMode && theme.mode === "light");

                                return (
                                    <motion.button
                                        key={theme.mode}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsDarkMode(theme.mode === "dark")}
                                        className={`p-6 rounded-xl border-2 transition-all ${isActive
                                                ? "border-indigo-600 bg-indigo-50"
                                                : "border-gray-300 bg-white hover:border-indigo-400"
                                            }`}
                                    >
                                        <ThemeIcon className="w-8 h-8 mx-auto mb-3 text-gray-800" />
                                        <p className="font-semibold text-gray-800">
                                            {theme.label}
                                        </p>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sound Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Sound Effects
                        </h3>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Volume2 className="w-5 h-5 text-gray-600" />
                                <span className="font-medium text-gray-800">
                                    Enable Sound Effects
                                </span>
                            </div>
                            <button
                                onClick={() => setSoundEnabled(!soundEnabled)}
                                className={`relative w-12 h-6 rounded-full transition-all ${soundEnabled ? "bg-indigo-600" : "bg-gray-300"
                                    }`}
                            >
                                <motion.div
                                    animate={{ x: soundEnabled ? 24 : 2 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    className="absolute top-0.5 left-0 w-5 h-5 bg-white rounded-full shadow-md"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Appearance;
