import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";

const DeleteModal = ({ show, onClose }) => {
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        if (deleted) {
            const timer = setTimeout(() => {
                onClose();
                setDeleted(false);
            }, 2800);
            return () => clearTimeout(timer);
        }
    }, [deleted, onClose]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl p-8 sm:p-10 max-w-md w-full shadow-2xl"
                    >
                        {deleted ? (
                            <div className="flex flex-col items-center justify-center text-center">
                                {/* ✅ Success Circle Animation */}
                                <motion.svg
                                    initial="hidden"
                                    animate="visible"
                                    viewBox="0 0 120 120"
                                    className="w-24 h-24 mb-6"
                                >
                                    {/* Circle */}
                                    <motion.circle
                                        cx="60"
                                        cy="60"
                                        r="50"
                                        stroke="#16a34a"
                                        strokeWidth="6"
                                        fill="none"
                                        strokeLinecap="round"
                                        variants={{
                                            hidden: { pathLength: 0 },
                                            visible: {
                                                pathLength: 1,
                                                transition: { duration: 1 },
                                            },
                                        }}
                                    />
                                    {/* Checkmark */}
                                    <motion.path
                                        d="M40 65 L55 80 L85 45"
                                        stroke="#16a34a"
                                        strokeWidth="6"
                                        fill="none"
                                        strokeLinecap="round"
                                        variants={{
                                            hidden: { pathLength: 0 },
                                            visible: {
                                                pathLength: 1,
                                                transition: { delay: 1, duration: 0.6 },
                                            },
                                        }}
                                    />
                                </motion.svg>

                                <motion.h3
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.6, duration: 0.5 }}
                                    className="text-2xl font-bold text-gray-800"
                                >
                                    Account Deleted
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.8, duration: 0.5 }}
                                    className="text-gray-600 mt-2 text-sm"
                                >
                                    Your account has been permanently removed.
                                </motion.p>
                            </div>
                        ) : (
                            <>
                                {/* ⚠️ Delete Confirmation */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                        <AlertTriangle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">
                                            Delete Account?
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            This action cannot be undone.
                                        </p>
                                    </div>
                                </div>

                                {/* Warning Info */}
                                <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-200">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        All your data including progress, analytics, and
                                        personal information will be permanently deleted.
                                    </p>
                                    <ul className="mt-3 space-y-1 text-sm text-gray-700">
                                        <li className="flex items-center gap-2">
                                            <X className="w-4 h-4 text-red-600" /> Tracking Data
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <X className="w-4 h-4 text-red-600" /> Analytics Insights
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <X className="w-4 h-4 text-red-600" /> Subscription Details
                                        </li>
                                    </ul>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={onClose}
                                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setDeleted(true)}
                                        className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                        Delete Forever
                                    </motion.button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeleteModal;
