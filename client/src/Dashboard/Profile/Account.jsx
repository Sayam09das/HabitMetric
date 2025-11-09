import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Lock,
    Eye,
    EyeOff,
    Key,
    Shield,
    Check,
    Smartphone,
} from "lucide-react";

const Account = () => {
    // State for showing/hiding current password
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-6">
            <motion.div
                key="account"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
            >
                {/* Change Password Section */}
                <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                        Change Password
                    </h2>

                    <div className="space-y-4">
                        {/* Current Password */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                <Lock className="w-4 h-4" />
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-all"
                                    placeholder="Enter current password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                <Key className="w-4 h-4" />
                                New Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-all"
                                placeholder="Enter new password"
                            />
                        </div>

                        {/* Confirm New Password */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                <Key className="w-4 h-4" />
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-indigo-600 focus:outline-none transition-all"
                                placeholder="Confirm new password"
                            />
                        </div>

                        {/* Update Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all"
                        >
                            Update Password
                        </motion.button>
                    </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                Two-Factor Authentication
                            </h2>
                            <p className="text-sm text-gray-600">
                                Add an extra layer of security to your account
                            </p>
                        </div>
                        <Shield className="w-8 h-8 text-green-600" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-gray-800">Enabled</span>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-white transition-all"
                        >
                            Configure
                        </motion.button>
                    </div>
                </div>

                {/* Active Sessions */}
                <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Active Sessions
                    </h2>

                    <div className="space-y-3">
                        {[
                            {
                                device: "Chrome on Windows",
                                location: "Kolkata, IN",
                                time: "Active now",
                            },
                            {
                                device: "Safari on iPhone",
                                location: "Kolkata, IN",
                                time: "2 hours ago",
                            },
                        ].map((session, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <Smartphone className="w-5 h-5 text-gray-600" />
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {session.device}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {session.location} • {session.time}
                                        </p>
                                    </div>
                                </div>

                                {index > 0 && (
                                    <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                                        Revoke
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Account;
