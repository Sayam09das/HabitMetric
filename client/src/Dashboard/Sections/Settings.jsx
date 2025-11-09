import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, AlertTriangle } from "lucide-react";
import DeleteModal from "./DeleteModal";
import COLORS from "../data/colors";

const Settings = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <div
            className="min-h-screen flex items-center justify-center p-6 bg-gray-50"
            style={{ backgroundColor: COLORS.background }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-8 sm:p-10"
            >
                {/* Header */}
                <div className="mb-8 text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center mb-4"
                    >
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-red-100">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                    </motion.div>
                    <h1
                        className="text-3xl font-bold mb-2"
                        style={{ color: COLORS.primary }}
                    >
                        Danger Zone
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Permanently delete your account and all associated data. This
                        action cannot be undone.
                    </p>
                </div>

                {/* Delete Account Section */}
                <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                    <h2 className="text-xl font-semibold text-red-700 mb-3">
                        Delete Your Account
                    </h2>
                    <p className="text-gray-700 mb-6">
                        When you delete your account, all your progress, analytics,
                        and saved data will be erased permanently. Please confirm
                        before proceeding.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2 mx-auto"
                    >
                        <Trash2 className="w-5 h-5" />
                        Delete Account
                    </motion.button>
                </div>
            </motion.div>

            {/* Delete Account Modal */}
            <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            />
        </div>
    );
};

export default Settings;
