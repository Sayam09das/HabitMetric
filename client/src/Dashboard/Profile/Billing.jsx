import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Mail,
    Lock,
    Bell,
    Globe,
    Palette,
    Shield,
    Smartphone,
    Download,
    Upload,
    Trash2,
    AlertTriangle,
    Check,
    Eye,
    EyeOff,
    Camera,
    Save,
    X,
    LogOut,
    Key,
    Calendar,
    Clock,
    Moon,
    Sun,
    Volume2,
    VolumeX,
    Zap,
    Settings as SettingsIcon,
    ChevronRight,
    Info,
    Crown,
    CreditCard,
    HelpCircle,
} from "lucide-react";
import COLORS from "../data/colors";

const Billing = () => {
    return (
        <div>
            <AnimatePresence mode="wait">
                <motion.div
                    key="billing"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                >
                    {/* Current Plan */}
                    <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-6 sm:p-8 text-white shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <Crown className="w-8 h-8" />
                                <div>
                                    <h2 className="text-2xl font-bold">Premium Plan</h2>
                                    <p className="text-sm opacity-90">Unlimited everything</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold">$9.99</p>
                                <p className="text-sm opacity-90">per month</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm">Next billing date: December 9, 2025</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:shadow-xl transition-all"
                            >
                                Manage Plan
                            </motion.button>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
                        <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-gray-600" />
                                <div>
                                    <p className="font-semibold text-gray-800">•••• •••• •••• 4242</p>
                                    <p className="text-sm text-gray-500">Expires 12/2026</p>
                                </div>
                            </div>
                            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Billing History */}
                    <div className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Billing History</h2>
                        <div className="space-y-3">
                            {[
                                { date: "Nov 9, 2025", amount: "$9.99", status: "Paid" },
                                { date: "Oct 9, 2025", amount: "$9.99", status: "Paid" },
                                { date: "Sep 9, 2025", amount: "$9.99", status: "Paid" },
                            ].map((invoice, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-800">{invoice.date}</p>
                                        <p className="text-sm text-gray-500">Premium Plan</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="font-bold text-gray-800">{invoice.amount}</p>
                                            <p className="text-xs text-green-600">{invoice.status}</p>
                                        </div>
                                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Billing;
