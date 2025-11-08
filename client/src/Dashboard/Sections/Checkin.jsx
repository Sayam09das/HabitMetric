import React, { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check,
    Calendar,
    TrendingUp,
    Award,
    Flame,
    Target,
    Clock,
    ChevronRight,
    Star,
    Trophy,
    Zap,
    CheckCircle2,
    Circle,
    Filter,
    RotateCcw,
    Download,
    Share2,
    Bell,
    Info,
    Sparkles,
    PartyPopper,
} from "lucide-react";
import COLORS from "../data/colors";

export default function Checkin({
    initialHabits = [],
    initialCheckins = [],
    onUpdate,
}) {
    const [habits] = useState(initialHabits);
    const [todayCheckins, setTodayCheckins] = useState(initialCheckins);
    const [filter, setFilter] = useState("all");
    const [showConfetti, setShowConfetti] = useState(false);
    const [recentlyChecked, setRecentlyChecked] = useState(null);
    const [timeOfDay, setTimeOfDay] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setTimeOfDay("morning");
        else if (hour < 18) setTimeOfDay("afternoon");
        else setTimeOfDay("evening");
    }, []);

    // Calculate statistics
    const stats = useMemo(() => {
        const total = habits.length;
        const completed = todayCheckins.length;
        const remaining = total - completed;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        const isAllComplete = total > 0 && completed === total;

        // Calculate category breakdown
        const byCategory = habits.reduce((acc, habit) => {
            const cat = habit.category || "Other";
            if (!acc[cat]) acc[cat] = { total: 0, completed: 0 };
            acc[cat].total++;
            if (todayCheckins.includes(habit.id)) acc[cat].completed++;
            return acc;
        }, {});

        return {
            total,
            completed,
            remaining,
            percentage,
            isAllComplete,
            byCategory,
        };
    }, [habits, todayCheckins]);

    // Filter habits
    const filteredHabits = useMemo(() => {
        let result = [...habits];

        if (filter === "completed") {
            result = result.filter((h) => todayCheckins.includes(h.id));
        } else if (filter === "pending") {
            result = result.filter((h) => !todayCheckins.includes(h.id));
        } else if (filter === "priority") {
            result = result.filter((h) => h.priority === "high");
        }

        // Sort: unchecked first, then by priority
        result.sort((a, b) => {
            const aChecked = todayCheckins.includes(a.id);
            const bChecked = todayCheckins.includes(b.id);
            if (aChecked !== bChecked) return aChecked ? 1 : -1;
            return (b.priority === "high" ? 1 : 0) - (a.priority === "high" ? 1 : 0);
        });

        return result;
    }, [habits, todayCheckins, filter]);

    // Toggle check-in
    const toggleCheckin = useCallback(
        (habitId) => {
            setTodayCheckins((prev) => {
                const isChecking = !prev.includes(habitId);
                const next = isChecking
                    ? [...prev, habitId]
                    : prev.filter((id) => id !== habitId);

                if (isChecking) {
                    setRecentlyChecked(habitId);
                    setTimeout(() => setRecentlyChecked(null), 2000);

                    // Check if all habits are complete
                    if (next.length === habits.length) {
                        setShowConfetti(true);
                        setTimeout(() => setShowConfetti(false), 3000);
                    }
                }

                onUpdate?.(next);
                return next;
            });
        },
        [habits.length, onUpdate]
    );

    // Reset all check-ins
    const resetCheckins = useCallback(() => {
        setTodayCheckins([]);
        onUpdate?.([]);
    }, [onUpdate]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
        },
    };

    const cardVariants = {
        unchecked: {
            scale: 1,
            transition: { duration: 0.2 },
        },
        checked: {
            scale: [1, 1.05, 1],
            transition: { duration: 0.5 },
        },
        hover: {
            scale: 1.02,
            transition: { duration: 0.2 },
        },
    };

    const checkmarkVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
            },
        },
    };

    // Get category color
    const getCategoryColor = (category) => {
        const colors = {
            Health: "#10b981",
            Productivity: "#3b82f6",
            Mindfulness: "#8b5cf6",
            Social: "#f59e0b",
            Learning: "#ec4899",
            Finance: "#14b8a6",
        };
        return colors[category] || COLORS.primary;
    };

    // Get time-based greeting
    const getGreeting = () => {
        const greetings = {
            morning: "Good morning! Start your day strong 🌅",
            afternoon: "Good afternoon! Keep the momentum going 💪",
            evening: "Good evening! Finish strong today 🌙",
        };
        return greetings[timeOfDay] || "Welcome back!";
    };

    // Get motivational message
    const getMotivationalMessage = () => {
        if (stats.isAllComplete) {
            return "🎉 Perfect day! All habits completed!";
        }
        if (stats.percentage >= 75) {
            return "🔥 Almost there! You're crushing it!";
        }
        if (stats.percentage >= 50) {
            return "💪 Great progress! Keep it up!";
        }
        if (stats.percentage >= 25) {
            return "🚀 Good start! Let's keep going!";
        }
        return "✨ Ready to make today count?";
    };

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-[1920px] mx-auto space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6 xl:p-8">
                {/* Confetti Animation */}
                <AnimatePresence>
                    {showConfetti && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                <PartyPopper className="w-32 h-32 text-yellow-400" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Header Section */}
                <motion.div variants={itemVariants}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                Daily Check-In
                            </h1>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                                {getGreeting()}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={resetCheckins}
                                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span className="hidden sm:inline">Reset</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                            >
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">Export</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                            >
                                <Share2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Share Progress</span>
                            </motion.button>
                        </div>
                    </div>

                    {/* Progress Hero Card */}
                    <motion.div
                        variants={itemVariants}
                        className="rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 sm:p-8 text-white shadow-2xl overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                            {/* Progress Circle */}
                            <div className="flex flex-col items-center justify-center">
                                <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                                    <svg className="transform -rotate-90 w-full h-full">
                                        <circle
                                            cx="50%"
                                            cy="50%"
                                            r="45%"
                                            stroke="rgba(255,255,255,0.2)"
                                            strokeWidth="8"
                                            fill="none"
                                        />
                                        <motion.circle
                                            cx="50%"
                                            cy="50%"
                                            r="45%"
                                            stroke="white"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: stats.percentage / 100 }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            style={{
                                                pathLength: stats.percentage / 100,
                                            }}
                                            strokeDasharray="1 1"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <p className="text-3xl sm:text-4xl font-bold">
                                            {stats.percentage}%
                                        </p>
                                        <p className="text-xs sm:text-sm text-white/80">
                                            Complete
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="lg:col-span-2 space-y-4">
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                                        {getMotivationalMessage()}
                                    </h3>
                                    <p className="text-sm sm:text-base text-white/80">
                                        Track your daily habits and build lasting routines
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Target className="w-5 h-5" />
                                            <p className="text-xs font-medium">Total</p>
                                        </div>
                                        <p className="text-2xl sm:text-3xl font-bold">
                                            {stats.total}
                                        </p>
                                    </div>

                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle2 className="w-5 h-5" />
                                            <p className="text-xs font-medium">Done</p>
                                        </div>
                                        <p className="text-2xl sm:text-3xl font-bold">
                                            {stats.completed}
                                        </p>
                                    </div>

                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="w-5 h-5" />
                                            <p className="text-xs font-medium">Left</p>
                                        </div>
                                        <p className="text-2xl sm:text-3xl font-bold">
                                            {stats.remaining}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Category Stats */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
                >
                    {Object.entries(stats.byCategory).map(([category, data]) => {
                        const color = getCategoryColor(category);
                        const percentage =
                            data.total > 0
                                ? Math.round((data.completed / data.total) * 100)
                                : 0;

                        return (
                            <motion.div
                                key={category}
                                whileHover={{ scale: 1.05 }}
                                className="rounded-xl bg-white border border-gray-200 p-3 sm:p-4 shadow-sm"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: `${color}20` }}
                                    >
                                        <Sparkles className="w-4 h-4" style={{ color }} />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 mb-1">{category}</p>
                                <div className="flex items-baseline gap-1">
                                    <p className="text-xl sm:text-2xl font-bold text-gray-800">
                                        {data.completed}
                                    </p>
                                    <p className="text-sm text-gray-500">/ {data.total}</p>
                                </div>
                                <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{ duration: 0.5 }}
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Filter Bar */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center gap-2 sm:gap-3"
                >
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Filter:</span>
                    </div>
                    {[
                        { value: "all", label: "All Habits", icon: Target },
                        { value: "pending", label: "Pending", icon: Circle },
                        { value: "completed", label: "Completed", icon: CheckCircle2 },
                        { value: "priority", label: "Priority", icon: Star },
                    ].map((filterOption) => (
                        <motion.button
                            key={filterOption.value}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilter(filterOption.value)}
                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${filter === filterOption.value
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                }`}
                        >
                            <filterOption.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{filterOption.label}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Habits Grid */}
                <AnimatePresence mode="popLayout">
                    {filteredHabits.length === 0 ? (
                        <motion.div
                            variants={itemVariants}
                            className="rounded-xl bg-white border border-gray-200 p-8 sm:p-12 text-center shadow-sm"
                        >
                            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {filter === "completed"
                                    ? "No habits completed yet"
                                    : "No habits to show"}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {filter === "completed"
                                    ? "Start checking in to see your progress!"
                                    : "Adjust your filters or add new habits"}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4"
                        >
                            {filteredHabits.map((habit) => {
                                const isChecked = todayCheckins.includes(habit.id);
                                const categoryColor = getCategoryColor(habit.category);
                                const isRecent = recentlyChecked === habit.id;

                                return (
                                    <motion.button
                                        key={habit.id}
                                        variants={itemVariants}
                                        animate={isChecked ? "checked" : "unchecked"}
                                        whileHover="hover"
                                        layout
                                        onClick={() => toggleCheckin(habit.id)}
                                        className={`rounded-2xl p-5 sm:p-6 text-left transition-all shadow-sm hover:shadow-lg relative overflow-hidden ${isChecked
                                                ? "border-2 ring-2 ring-opacity-50"
                                                : "border border-gray-200 bg-white"
                                            }`}
                                        style={{
                                            backgroundColor: isChecked
                                                ? `${categoryColor}15`
                                                : "white",
                                            borderColor: isChecked
                                                ? categoryColor
                                                : "#e5e7eb",
                                            ringColor: isChecked
                                                ? `${categoryColor}50`
                                                : "transparent",
                                        }}
                                    >
                                        {/* Recent check animation overlay */}
                                        <AnimatePresence>
                                            {isRecent && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: [0, 0.2, 0] }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="absolute inset-0 bg-green-500 pointer-events-none"
                                                />
                                            )}
                                        </AnimatePresence>

                                        {/* Priority Badge */}
                                        {habit.priority === "high" && !isChecked && (
                                            <div className="absolute top-3 right-3">
                                                <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 rounded-full">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    <span className="text-xs font-semibold">
                                                        Priority
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                                                <div
                                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0"
                                                    style={{
                                                        backgroundColor: `${categoryColor}20`,
                                                    }}
                                                >
                                                    {habit.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 truncate">
                                                        {habit.title}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                                        <span
                                                            className="text-xs font-medium px-2 py-1 rounded-full"
                                                            style={{
                                                                backgroundColor: `${categoryColor}20`,
                                                                color: categoryColor,
                                                            }}
                                                        >
                                                            {habit.category}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {habit.frequency}
                                                        </span>
                                                    </div>

                                                    {/* Streak Info */}
                                                    {habit.streak > 0 && (
                                                        <div className="flex items-center gap-2">
                                                            <Flame className="w-4 h-4 text-orange-500" />
                                                            <span className="text-xs sm:text-sm text-gray-600">
                                                                {habit.streak} day streak
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Checkbox */}
                                            <motion.div
                                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isChecked ? "shadow-lg" : ""
                                                    }`}
                                                style={{
                                                    backgroundColor: isChecked
                                                        ? categoryColor
                                                        : "#e5e7eb",
                                                }}
                                            >
                                                <AnimatePresence mode="wait">
                                                    {isChecked ? (
                                                        <motion.div
                                                            key="check"
                                                            variants={checkmarkVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="hidden"
                                                        >
                                                            <Check
                                                                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                                                                strokeWidth={3}
                                                            />
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            key="empty"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                        >
                                                            <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        </div>

                                        {/* Success Message */}
                                        <AnimatePresence>
                                            {isChecked && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mt-4 pt-4 border-t"
                                                    style={{ borderColor: `${categoryColor}30` }}
                                                >
                                                    <div className="flex items-center gap-2 text-green-600">
                                                        <Zap className="w-4 h-4" />
                                                        <span className="text-xs sm:text-sm font-medium">
                                                            Great job! Keep it up! 🎉
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Achievement Banner */}
                {stats.isAllComplete && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 sm:p-8 text-white shadow-2xl"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                    <Trophy className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold mb-1">
                                        Perfect Day Achieved! 🎉
                                    </h3>
                                    <p className="text-sm sm:text-base text-white/90">
                                        You've completed all your habits today. Amazing work!
                                    </p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:shadow-xl transition-all"
                            >
                                Share Achievement
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}