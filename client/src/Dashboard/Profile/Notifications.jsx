import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Bell, Smartphone } from "lucide-react";

const Notifications = () => {
    // ✅ Notification state for each type
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: true,
        habitReminders: true,
        weeklyReport: false,
        achievements: true,
    });

    // ✅ Toggle handler
    const handleNotificationToggle = (key) => {
        setNotifications((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="space-y-6">
            <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm"
            >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                    Notification Preferences
                </h2>

                <div className="space-y-6">
                    {/* Notification Channels */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Channels</h3>
                        <div className="space-y-3">
                            {[
                                { key: "email", label: "Email Notifications", icon: Mail },
                                { key: "push", label: "Push Notifications", icon: Bell },
                                { key: "sms", label: "SMS Notifications", icon: Smartphone },
                            ].map((channel) => {
                                const ChannelIcon = channel.icon;
                                return (
                                    <div
                                        key={channel.key}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <ChannelIcon className="w-5 h-5 text-gray-600" />
                                            <span className="font-medium text-gray-800">
                                                {channel.label}
                                            </span>
                                        </div>

                                        {/* Toggle Switch */}
                                        <button
                                            onClick={() => handleNotificationToggle(channel.key)}
                                            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${notifications[channel.key]
                                                    ? "bg-indigo-600"
                                                    : "bg-gray-300"
                                                }`}
                                        >
                                            <motion.div
                                                animate={{
                                                    x: notifications[channel.key] ? 24 : 2,
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 500,
                                                    damping: 30,
                                                }}
                                                className="absolute top-0.5 left-0 w-5 h-5 bg-white rounded-full shadow-md"
                                            />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Notification Types */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Types</h3>
                        <div className="space-y-3">
                            {[
                                { key: "habitReminders", label: "Habit Reminders" },
                                { key: "weeklyReport", label: "Weekly Progress Report" },
                                { key: "achievements", label: "Achievement Unlocked" },
                            ].map((type) => (
                                <div
                                    key={type.key}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                                >
                                    <span className="font-medium text-gray-800">
                                        {type.label}
                                    </span>

                                    {/* Toggle Switch */}
                                    <button
                                        onClick={() => handleNotificationToggle(type.key)}
                                        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${notifications[type.key]
                                                ? "bg-indigo-600"
                                                : "bg-gray-300"
                                            }`}
                                    >
                                        <motion.div
                                            animate={{
                                                x: notifications[type.key] ? 24 : 2,
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 30,
                                            }}
                                            className="absolute top-0.5 left-0 w-5 h-5 bg-white rounded-full shadow-md"
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Notifications;
