import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Flame, Plus, Search, Filter, SortAsc, MoreVertical, CheckCircle, Calendar, TrendingUp, Clock, Target, Star, Archive, Copy, Share2, Download, Eye, EyeOff, AlertCircle, Award, Zap, Trophy } from "lucide-react";

import COLORS from "../data/colors";

export default function Habits({ initialHabits = [], onUpdate }) {
    const [habits, setHabits] = useState(initialHabits);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [sortBy, setSortBy] = useState("streak");
    const [viewMode, setViewMode] = useState("grid");
    const [selectedHabits, setSelectedHabits] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [activeHabitMenu, setActiveHabitMenu] = useState(null);
    const [showArchived, setShowArchived] = useState(false);

    // Filtering and Sorting Logic
    const filteredAndSortedHabits = useMemo(() => {
        let result = [...habits];

        // Search filter
        if (searchQuery) {
            result = result.filter(
                (h) =>
                    h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    h.category?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Type filter
        if (filterType !== "all") {
            result = result.filter((h) => h.category === filterType);
        }

        // Show/hide archived
        if (!showArchived) {
            result = result.filter((h) => !h.archived);
        }

        // Sorting
        result.sort((a, b) => {
            switch (sortBy) {
                case "streak":
                    return (b.streak || 0) - (a.streak || 0);
                case "title":
                    return a.title.localeCompare(b.title);
                case "frequency":
                    return a.frequency.localeCompare(b.frequency);
                case "recent":
                    return new Date(b.lastCheckin || 0) - new Date(a.lastCheckin || 0);
                default:
                    return 0;
            }
        });

        return result;
    }, [habits, searchQuery, filterType, sortBy, showArchived]);

    // Statistics
    const stats = useMemo(() => {
        const active = habits.filter((h) => !h.archived).length;
        const totalStreak = habits.reduce((sum, h) => sum + (h.streak || 0), 0);
        const avgStreak = active > 0 ? Math.round(totalStreak / active) : 0;
        const completed = habits.filter((h) => h.completedToday).length;
        const categories = [...new Set(habits.map((h) => h.category))].length;

        return { active, avgStreak, completed, categories };
    }, [habits]);

    // Handlers
    const deleteHabit = useCallback(
        (id) => {
            const updated = habits.filter((h) => h.id !== id);
            setHabits(updated);
            onUpdate?.(updated);
        },
        [habits, onUpdate]
    );

    const archiveHabit = useCallback(
        (id) => {
            const updated = habits.map((h) =>
                h.id === id ? { ...h, archived: !h.archived } : h
            );
            setHabits(updated);
            onUpdate?.(updated);
        },
        [habits, onUpdate]
    );

    const duplicateHabit = useCallback(
        (habit) => {
            const newHabit = {
                ...habit,
                id: Date.now(),
                title: `${habit.title} (Copy)`,
                streak: 0,
            };
            const updated = [...habits, newHabit];
            setHabits(updated);
            onUpdate?.(updated);
        },
        [habits, onUpdate]
    );

    const toggleSelection = useCallback((id) => {
        setSelectedHabits((prev) =>
            prev.includes(id) ? prev.filter((hId) => hId !== id) : [...prev, id]
        );
    }, []);

    const bulkDelete = useCallback(() => {
        const updated = habits.filter((h) => !selectedHabits.includes(h.id));
        setHabits(updated);
        setSelectedHabits([]);
        onUpdate?.(updated);
    }, [habits, selectedHabits, onUpdate]);

    // Animation Variants
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
        exit: {
            opacity: 0,
            x: -100,
            transition: { duration: 0.3 },
        },
    };

    const cardVariants = {
        hover: {
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            transition: { duration: 0.2 },
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

    // Get streak badge
    const getStreakBadge = (streak) => {
        if (streak >= 100) return { text: "Legend", color: "#f59e0b", icon: Trophy };
        if (streak >= 50) return { text: "Master", color: "#8b5cf6", icon: Award };
        if (streak >= 30) return { text: "Expert", color: "#3b82f6", icon: Star };
        if (streak >= 7) return { text: "Rising", color: "#10b981", icon: TrendingUp };
        return { text: "Beginner", color: "#6b7280", icon: Zap };
    };

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-[1920px] mx-auto space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6 xl:p-8">
                {/* Header Section */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                My Habits
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600">
                                Manage and track your daily habits effectively
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                                onClick={() => setShowArchived(!showArchived)}
                            >
                                {showArchived ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                <span className="hidden sm:inline">
                                    {showArchived ? "Hide" : "Show"} Archived
                                </span>
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
                                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
                            >
                                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                                Add Habit
                            </motion.button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <motion.div
                            variants={itemVariants}
                            whileHover="hover"
                            className="rounded-xl bg-white border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <Target className="w-5 h-5 text-indigo-600" />
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                                    Active Habits
                                </p>
                            </div>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {stats.active}
                            </p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            whileHover="hover"
                            className="rounded-xl bg-white border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Flame className="w-5 h-5 text-orange-600" />
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                                    Avg Streak
                                </p>
                            </div>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {stats.avgStreak}
                            </p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            whileHover="hover"
                            className="rounded-xl bg-white border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                                    Completed Today
                                </p>
                            </div>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {stats.completed}/{stats.active}
                            </p>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            whileHover="hover"
                            className="rounded-xl bg-white border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Award className="w-5 h-5 text-purple-600" />
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                                    Categories
                                </p>
                            </div>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {stats.categories}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Search and Filter Bar */}
                <motion.div
                    variants={itemVariants}
                    className="rounded-xl bg-white border border-gray-200 p-4 sm:p-5 shadow-sm"
                >
                    <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search habits..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base"
                            />
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap items-center gap-2">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                            >
                                <option value="all">All Categories</option>
                                <option value="Health">Health</option>
                                <option value="Productivity">Productivity</option>
                                <option value="Mindfulness">Mindfulness</option>
                                <option value="Social">Social</option>
                                <option value="Learning">Learning</option>
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                            >
                                <option value="streak">Sort by Streak</option>
                                <option value="title">Sort by Name</option>
                                <option value="frequency">Sort by Frequency</option>
                                <option value="recent">Sort by Recent</option>
                            </select>

                            <button
                                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm"
                            >
                                {viewMode === "grid" ? "List" : "Grid"} View
                            </button>
                        </div>
                    </div>

                    {/* Bulk Actions */}
                    <AnimatePresence>
                        {selectedHabits.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 flex items-center justify-between p-3 bg-indigo-50 rounded-lg"
                            >
                                <p className="text-sm font-medium text-indigo-900">
                                    {selectedHabits.length} habit(s) selected
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={bulkDelete}
                                        className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Delete Selected
                                    </button>
                                    <button
                                        onClick={() => setSelectedHabits([])}
                                        className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Habits Grid/List */}
                <AnimatePresence mode="popLayout">
                    {filteredAndSortedHabits.length === 0 ? (
                        <motion.div
                            variants={itemVariants}
                            className="rounded-xl bg-white border border-gray-200 p-8 sm:p-12 text-center shadow-sm"
                        >
                            <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                                No habits found
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-6">
                                {searchQuery
                                    ? "Try adjusting your search or filters"
                                    : "Start building better habits today"}
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                            >
                                Create Your First Habit
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            className={
                                viewMode === "grid"
                                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
                                    : "space-y-3 sm:space-y-4"
                            }
                        >
                            {filteredAndSortedHabits.map((habit) => {
                                const badge = getStreakBadge(habit.streak || 0);
                                const BadgeIcon = badge.icon;
                                const categoryColor = getCategoryColor(habit.category);

                                return (
                                    <motion.div
                                        key={habit.id}
                                        variants={itemVariants}
                                        whileHover="hover"
                                        layout
                                        className={`rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden ${selectedHabits.includes(habit.id)
                                                ? "ring-2 ring-indigo-500"
                                                : ""
                                            }`}
                                    >
                                        {/* Card Header with gradient */}
                                        <div
                                            className="h-2"
                                            style={{
                                                background: `linear-gradient(to right, ${categoryColor}, ${categoryColor}dd)`,
                                            }}
                                        />

                                        <div className="p-4 sm:p-5">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3 flex-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedHabits.includes(habit.id)}
                                                        onChange={() => toggleSelection(habit.id)}
                                                        className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                                                    />
                                                    <div
                                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-2xl sm:text-3xl"
                                                        style={{ backgroundColor: `${categoryColor}15` }}
                                                    >
                                                        {habit.icon}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                                                            {habit.title}
                                                        </h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span
                                                                className="text-xs font-medium px-2 py-0.5 rounded-full"
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
                                                    </div>
                                                </div>

                                                {/* More Menu */}
                                                <div className="relative">
                                                    <button
                                                        onClick={() =>
                                                            setActiveHabitMenu(
                                                                activeHabitMenu === habit.id
                                                                    ? null
                                                                    : habit.id
                                                            )
                                                        }
                                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                    >
                                                        <MoreVertical className="w-4 h-4 text-gray-600" />
                                                    </button>

                                                    <AnimatePresence>
                                                        {activeHabitMenu === habit.id && (
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-10"
                                                            >
                                                                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                                                                    <Edit2 className="w-4 h-4" />
                                                                    Edit Habit
                                                                </button>
                                                                <button
                                                                    onClick={() => duplicateHabit(habit)}
                                                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                                                >
                                                                    <Copy className="w-4 h-4" />
                                                                    Duplicate
                                                                </button>
                                                                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                                                                    <Share2 className="w-4 h-4" />
                                                                    Share
                                                                </button>
                                                                <button
                                                                    onClick={() => archiveHabit(habit.id)}
                                                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                                                >
                                                                    <Archive className="w-4 h-4" />
                                                                    {habit.archived ? "Unarchive" : "Archive"}
                                                                </button>
                                                                <hr className="my-2" />
                                                                <button
                                                                    onClick={() => {
                                                                        deleteHabit(habit.id);
                                                                        setActiveHabitMenu(null);
                                                                    }}
                                                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                    Delete
                                                                </button>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                <div className="rounded-lg bg-gray-50 p-3">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Flame className="w-4 h-4 text-orange-500" />
                                                        <p className="text-xs text-gray-600 font-medium">
                                                            Current Streak
                                                        </p>
                                                    </div>
                                                    <p className="text-xl sm:text-2xl font-bold text-gray-800">
                                                        {habit.streak || 0}
                                                    </p>
                                                    <p className="text-xs text-gray-500">days</p>
                                                </div>

                                                <div className="rounded-lg bg-gray-50 p-3">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Trophy className="w-4 h-4 text-amber-500" />
                                                        <p className="text-xs text-gray-600 font-medium">
                                                            Best Streak
                                                        </p>
                                                    </div>
                                                    <p className="text-xl sm:text-2xl font-bold text-gray-800">
                                                        {habit.bestStreak || habit.streak || 0}
                                                    </p>
                                                    <p className="text-xs text-gray-500">days</p>
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mb-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs text-gray-600 font-medium">
                                                        Completion Rate
                                                    </span>
                                                    <span className="text-xs font-semibold text-gray-800">
                                                        {habit.completionRate || 0}%
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${habit.completionRate || 0}%` }}
                                                        transition={{ duration: 1, ease: "easeOut" }}
                                                        className="h-full rounded-full"
                                                        style={{ backgroundColor: categoryColor }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Badge and Actions */}
                                            <div className="flex items-center justify-between">
                                                <div
                                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                                                    style={{
                                                        backgroundColor: `${badge.color}15`,
                                                    }}
                                                >
                                                    <BadgeIcon
                                                        className="w-3.5 h-3.5"
                                                        style={{ color: badge.color }}
                                                    />
                                                    <span
                                                        className="text-xs font-semibold"
                                                        style={{ color: badge.color }}
                                                    >
                                                        {badge.text}
                                                    </span>
                                                </div>

                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${habit.completedToday
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                                                        }`}
                                                >
                                                    {habit.completedToday ? "Completed" : "Check In"}
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}