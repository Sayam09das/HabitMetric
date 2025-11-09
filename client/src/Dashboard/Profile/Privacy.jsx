import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Download,
} from "lucide-react";
import COLORS from "../data/colors";

const Privacy = () => {
    const [toggles, setToggles] = useState({
        profileVisibility: true,
        activityStatus: true,
        dataCollection: true,
        personalization: true,
    });

    // Toggle handler for switches
    const handleToggle = (key) => {
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div>
            <motion.div
                key="privacy"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6"
            >
                {/* Privacy & Data Settings */}
                <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                        Privacy & Data
                    </h2>

                    <div className="space-y-4">
                        {[
                            {
                                key: "profileVisibility",
                                label: "Profile Visibility",
                                desc: "Control who can see your profile",
                            },
                            {
                                key: "activityStatus",
                                label: "Activity Status",
                                desc: "Show when you're active",
                            },
                            {
                                key: "dataCollection",
                                label: "Data Collection",
                                desc: "Allow analytics data collection",
                            },
                            {
                                key: "personalization",
                                label: "Personalization",
                                desc: "Use data to personalize experience",
                            },
                        ].map((item) => (
                            <div
                                key={item.key}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                            >
                                <div>
                                    <p className="font-semibold text-gray-800">{item.label}</p>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>

                                {/* Toggle Switch */}
                                <button
                                    onClick={() => handleToggle(item.key)}
                                    className={`relative w-12 h-6 rounded-full transition-all ${toggles[item.key] ? "bg-indigo-600" : "bg-gray-300"
                                        }`}
                                >
                                    <motion.div
                                        animate={{ x: toggles[item.key] ? 24 : 2 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        className="absolute top-0.5 left-0 w-5 h-5 bg-white rounded-full shadow-md"
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Data Export */}
                <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Export Your Data
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Download a copy of all your data including habits, check-ins, and
                        analytics.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all"
                    >
                        <Download className="w-5 h-5" />
                        Download My Data
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Privacy;
