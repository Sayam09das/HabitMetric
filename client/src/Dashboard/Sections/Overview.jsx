"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatCard from "../Components/StatCard";
import COLORS from "../data/colors";
import axios from "axios";
import {
    Flame,
    Target,
    CheckSquare,
    Smile,
    TrendingUp,
    Award,
    Calendar,
    Activity,
    Clock,
    Zap,
    Users,
    Star,
    Brain,
    Heart,
    Trophy,
    ChevronRight,
    Download,
    Filter,
    RefreshCw,
    MoreVertical,
    Info,
    ArrowUpRight,
    ArrowDownRight,
    Minus,
} from "lucide-react";
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Legend,
    Area,
    AreaChart,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ComposedChart,
} from "recharts";

const API_ORIGIN = import.meta.env.VITE_PRIVATE_API_URL || "http://localhost:3000";

export default function Overview({
    habits = [],
    todayCheckins = [],
    currentMood = "Neutral",
    weeklyProgress = [],
}) {


    const [timeOfDay, setTimeOfDay] = useState("");
    const [selectedPeriod, setSelectedPeriod] = useState("week");
    const [selectedMetric, setSelectedMetric] = useState("all");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showInsights, setShowInsights] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    const [user, setUser] = useState(null);


    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setTimeOfDay("morning");
        else if (hour < 18) setTimeOfDay("afternoon");
        else setTimeOfDay("evening");
    }, []);


    const handleRefresh = () => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        setTimeout(() => {
            window.location.reload();
        }, 150);
    };

    useEffect(() => {
        let cancelled = false;

        const fetchProfile = async () => {
            try {
                console.log("Overview: fetchProfile start", { API_ORIGIN });
                setUser(null);

                const resp = await axios.get(`${API_ORIGIN}/protected/profile`, {
                    withCredentials: true,
                    timeout: 15000,
                });

                console.log("Overview: API response", resp?.data);
                if (cancelled) {
                    console.log("Overview: cancelled after response");
                    return;
                }

                const resolved = resp.data?.user ?? ((resp.data?.name || resp.data?.email) ? resp.data : null);
                if (resolved) {
                    console.log("Overview: resolved user from API", resolved);
                    setUser(resolved);
                    return;
                }

                const token = localStorage.getItem("token");
                console.log("Overview: token from localStorage:", !!token);

                if (token) {
                    try {
                        const clean = token.startsWith('"') && token.endsWith('"') ? token.slice(1, -1) : token;
                        const payload = JSON.parse(atob(clean.split(".")[1]));
                        console.log("Overview: token payload:", payload);
                        setUser({ name: payload.name ?? payload.email ?? "User", email: payload.email ?? "" });
                        return;
                    } catch (e) {
                        console.warn("Overview: token decode failed", e);
                    }
                }

                console.log("Overview: falling back to default user");
                setUser({ name: "User", email: "no-email@example.com" });
            } catch (err) {
                console.error("Overview: fetchProfile error", err?.response ?? err);
                const status = err?.response?.status;
                if (status === 401 || status === 403) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                }

                const token = localStorage.getItem("token");
                if (token) {
                    try {
                        const clean = token.startsWith('"') && token.endsWith('"') ? token.slice(1, -1) : token;
                        const payload = JSON.parse(atob(clean.split(".")[1]));
                        console.log("Overview: token payload inside catch:", payload);
                        setUser({ name: payload.name ?? payload.email ?? "User", email: payload.email ?? "" });
                        return;
                    } catch (e) {
                        console.warn("Overview: token decode failed in catch", e);
                    }
                }

                setUser({ name: "User", email: "no-email@example.com" });
            }
        };

        fetchProfile();
        return () => { cancelled = true; };
    }, []);


    const displayName = user === null ? "Loading…" : (user?.name ?? "User");




    // Advanced Calculations with Memoization
    const metrics = useMemo(() => {
        const streak = Math.max(...habits.map((h) => h.streak || 0), 0);
        const completionRate = habits.length > 0
            ? Math.round((todayCheckins.length / habits.length) * 100)
            : 0;
        const totalCheckIns = habits.reduce((sum, h) => sum + (h.totalCheckIns || 0), 0);
        const activeHabits = habits.filter((h) => h.streak > 0).length;
        const avgStreak = habits.length > 0
            ? Math.round(habits.reduce((sum, h) => sum + (h.streak || 0), 0) / habits.length)
            : 0;
        const perfectDays = habits.filter(h => h.perfectDays || 0).reduce((sum, h) => sum + h.perfectDays, 0);

        // Calculate trends (mock data - in production, compare with previous period)
        const streakTrend = 15;
        const completionTrend = completionRate > 80 ? 8 : completionRate > 50 ? 0 : -5;
        const habitsTrend = 12;
        const checkInsTrend = 20;

        return {
            streak,
            completionRate,
            totalCheckIns,
            activeHabits,
            avgStreak,
            perfectDays,
            streakTrend,
            completionTrend,
            habitsTrend,
            checkInsTrend,
        };
    }, [habits, todayCheckins]);

    // Mock Enterprise-Level Data
    const monthlyProgress = [
        { month: "Jan", completed: 85, target: 100, benchmark: 75 },
        { month: "Feb", completed: 92, target: 100, benchmark: 78 },
        { month: "Mar", completed: 78, target: 100, benchmark: 80 },
        { month: "Apr", completed: 95, target: 100, benchmark: 82 },
        { month: "May", completed: 88, target: 100, benchmark: 85 },
        { month: "Jun", completed: 98, target: 100, benchmark: 87 },
    ];

    const yearlyProgress = [
        { quarter: "Q1", completed: 255, target: 300, growth: 12 },
        { quarter: "Q2", completed: 278, target: 300, growth: 18 },
        { quarter: "Q3", completed: 290, target: 300, growth: 22 },
        { quarter: "Q4", completed: 285, target: 300, growth: 15 },
    ];

    const habitCategories = [
        { name: "Health & Fitness", value: 35, color: "#10b981", count: 12 },
        { name: "Productivity", value: 30, color: "#3b82f6", count: 10 },
        { name: "Mindfulness", value: 20, color: "#8b5cf6", count: 7 },
        { name: "Social", value: 15, color: "#f59e0b", count: 5 },
    ];

    const performanceMetrics = [
        { subject: "Consistency", A: 92, B: 78, fullMark: 100 },
        { subject: "Engagement", A: 88, B: 85, fullMark: 100 },
        { subject: "Completion", A: 95, B: 80, fullMark: 100 },
        { subject: "Quality", A: 85, B: 75, fullMark: 100 },
        { subject: "Growth", A: 90, B: 82, fullMark: 100 },
    ];

    const weeklyActivityData = [
        { day: "Mon", morning: 4, afternoon: 6, evening: 5 },
        { day: "Tue", morning: 5, afternoon: 7, evening: 6 },
        { day: "Wed", morning: 3, afternoon: 5, evening: 8 },
        { day: "Thu", morning: 6, afternoon: 8, evening: 7 },
        { day: "Fri", morning: 5, afternoon: 6, evening: 4 },
        { day: "Sat", morning: 7, afternoon: 5, evening: 6 },
        { day: "Sun", morning: 6, afternoon: 7, evening: 8 },
    ];

    const insights = [
        {
            id: 1,
            type: "success",
            icon: TrendingUp,
            title: "Excellent Progress!",
            description: "You've maintained a 15-day streak. Keep up the momentum!",
            action: "View Details",
            color: "#10b981",
        },
        {
            id: 2,
            type: "warning",
            icon: Clock,
            title: "Peak Performance Time",
            description: "Your best habit completion time is between 6-9 AM",
            action: "Optimize Schedule",
            color: "#f59e0b",
        },
        {
            id: 3,
            type: "info",
            icon: Brain,
            title: "AI Recommendation",
            description: "Consider adding a meditation habit based on your stress patterns",
            action: "Add Habit",
            color: "#3b82f6",
        },
    ];

    const milestones = [
        { name: "First Habit", achieved: true, date: "Jan 15" },
        { name: "7-Day Streak", achieved: true, date: "Jan 22" },
        { name: "30-Day Streak", achieved: true, date: "Feb 14" },
        { name: "100 Check-ins", achieved: true, date: "Mar 10" },
        { name: "Perfect Month", achieved: false, date: "TBD" },
    ];


    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: "easeOut" },
        },
        hover: {
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            transition: { duration: 0.2 },
        },
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    // Custom Components
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-4 rounded-xl shadow-2xl border border-gray-200"
                >
                    <p className="text-sm font-bold text-gray-800 mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 mb-1">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <p className="text-xs text-gray-600">
                                {entry.name}: <span className="font-bold">{entry.value}</span>
                            </p>
                        </div>
                    ))}
                </motion.div>
            );
        }
        return null;
    };

    const TrendIndicator = ({ value, showIcon = true }) => {
        const isPositive = value > 0;
        const isNeutral = value === 0;
        const Icon = isPositive ? ArrowUpRight : isNeutral ? Minus : ArrowDownRight;
        const colorClass = isPositive
            ? "text-green-600 bg-green-50"
            : isNeutral
                ? "text-gray-600 bg-gray-50"
                : "text-red-600 bg-red-50";

        return (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${colorClass}`}>
                {showIcon && <Icon className="w-3 h-3" />}
                <span className="text-xs font-semibold">{Math.abs(value)}%</span>
            </div>
        );
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
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
                >
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Dashboard Overview
                            </h1>
                            <motion.button
                                whileHover={{ rotate: 180 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleRefresh}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <button
                                    onClick={handleRefresh}
                                    className="flex items-center justify-center"
                                >
                                    <RefreshCw
                                        className={`w-5 h-5 inline-block text-gray-600 hover:animate-none ${isRefreshing ? "animate-spin" : ""
                                            }`}
                                    />
                                </button>

                            </motion.button>
                        </div>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                            Good {timeOfDay},{" "}
                            <span className="font-semibold text-indigo-600">
                                {displayName ? displayName : "Loading…"}
                            </span>

                            ! Here's your comprehensive progress analysis
                        </p>

                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <select
                            value={selectedMetric}
                            onChange={(e) => setSelectedMetric(e.target.value)}
                            className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        >
                            <option value="all">All Metrics</option>
                            <option value="habits">Habits Only</option>
                            <option value="mood">Mood Only</option>
                            <option value="performance">Performance</option>
                        </select>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Export Report</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/30"
                        >
                            <Filter className="w-4 h-4" />
                            <span className="hidden sm:inline">Advanced Filters</span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* Key Metrics - Top Row */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2 sm:gap-3 lg:gap-4"
                >
                    <motion.div variants={cardVariants} whileHover="hover" className="col-span-2">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-4 sm:p-6 text-white shadow-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                            <Flame className="w-8 h-8 sm:w-10 sm:h-10 mb-3" />
                            <p className="text-xs sm:text-sm font-medium opacity-90 mb-1">
                                Current Streak
                            </p>
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                                        {metrics.streak}
                                    </p>
                                    <p className="text-xs sm:text-sm opacity-80">Days</p>
                                </div>
                                <TrendIndicator value={metrics.streakTrend} />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={cardVariants} whileHover="hover">
                        <div className="rounded-2xl bg-white border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mb-3" />
                            <p className="text-xs text-gray-600 mb-1">Total Habits</p>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {habits.length}
                            </p>
                            <TrendIndicator value={metrics.habitsTrend} />
                        </div>
                    </motion.div>

                    <motion.div variants={cardVariants} whileHover="hover">
                        <div className="rounded-2xl bg-white border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                            <CheckSquare className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mb-3" />
                            <p className="text-xs text-gray-600 mb-1">Today's Progress</p>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {todayCheckins.length}/{habits.length}
                            </p>
                            <TrendIndicator value={metrics.completionTrend} />
                        </div>
                    </motion.div>

                    <motion.div variants={cardVariants} whileHover="hover">
                        <div className="rounded-2xl bg-white border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                            <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-600 mb-3" />
                            <p className="text-xs text-gray-600 mb-1">Active Habits</p>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {metrics.activeHabits}
                            </p>
                            <TrendIndicator value={8} />
                        </div>
                    </motion.div>

                    <motion.div variants={cardVariants} whileHover="hover">
                        <div className="rounded-2xl bg-white border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mb-3" />
                            <p className="text-xs text-gray-600 mb-1">Total Check-ins</p>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {metrics.totalCheckIns}
                            </p>
                            <TrendIndicator value={metrics.checkInsTrend} />
                        </div>
                    </motion.div>

                    <motion.div variants={cardVariants} whileHover="hover">
                        <div className="rounded-2xl bg-white border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-3" />
                            <p className="text-xs text-gray-600 mb-1">Completion Rate</p>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {metrics.completionRate}%
                            </p>
                            <TrendIndicator value={5} />
                        </div>
                    </motion.div>

                    <motion.div variants={cardVariants} whileHover="hover">
                        <div className="rounded-2xl bg-white border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mb-3" />
                            <p className="text-xs text-gray-600 mb-1">Perfect Days</p>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                                {metrics.perfectDays}
                            </p>
                            <TrendIndicator value={12} />
                        </div>
                    </motion.div>
                </motion.div>

                {/* AI Insights Section */}
                <AnimatePresence>
                    {showInsights && (
                        <motion.div
                            variants={fadeInUp}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4"
                        >
                            {insights.map((insight, index) => (
                                <motion.div
                                    key={insight.id}
                                    variants={cardVariants}
                                    whileHover="hover"
                                    className="rounded-2xl bg-white border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div
                                            className="p-2 sm:p-3 rounded-xl"
                                            style={{ backgroundColor: `${insight.color}15` }}
                                        >
                                            <insight.icon
                                                className="w-5 h-5 sm:w-6 sm:h-6"
                                                style={{ color: insight.color }}
                                            />
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
                                        {insight.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-4">
                                        {insight.description}
                                    </p>
                                    <button
                                        className="text-xs sm:text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                                        style={{ color: insight.color }}
                                    >
                                        {insight.action}
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {/* Progress Chart */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="xl:col-span-2 rounded-2xl bg-white border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                                    Performance Analytics
                                </h2>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Track your progress over time
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {["week", "month", "year"].map((period) => (
                                    <button
                                        key={period}
                                        onClick={() => setSelectedPeriod(period)}
                                        className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg font-medium transition-all ${selectedPeriod === period
                                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {period.charAt(0).toUpperCase() + period.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={320}>
                            <ComposedChart
                                data={
                                    selectedPeriod === "week"
                                        ? weeklyProgress
                                        : selectedPeriod === "month"
                                            ? monthlyProgress
                                            : yearlyProgress
                                }
                            >
                                <defs>
                                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey={
                                        selectedPeriod === "week"
                                            ? "day"
                                            : selectedPeriod === "month"
                                                ? "month"
                                                : "quarter"
                                    }
                                    stroke="#9ca3af"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="completed"
                                    fill="url(#colorCompleted)"
                                    stroke="#6366f1"
                                    strokeWidth={2}
                                />
                                <Bar
                                    dataKey="completed"
                                    fill="#6366f1"
                                    radius={[8, 8, 0, 0]}
                                    maxBarSize={50}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="target"
                                    stroke="#f59e0b"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={false}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Performance Radar */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="rounded-2xl bg-white border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                                    Performance Metrics
                                </h2>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Multi-dimensional analysis
                                </p>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Info className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                        <ResponsiveContainer width="100%" height={280}>
                            <RadarChart data={performanceMetrics}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis
                                    dataKey="subject"
                                    tick={{ fontSize: 11, fill: "#6b7280" }}
                                />
                                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                                <Radar
                                    name="Current"
                                    dataKey="A"
                                    stroke="#6366f1"
                                    fill="#6366f1"
                                    fillOpacity={0.6}
                                />
                                <Radar
                                    name="Average"
                                    dataKey="B"
                                    stroke="#94a3b8"
                                    fill="#94a3b8"
                                    fillOpacity={0.3}
                                />
                                <Legend />
                            </RadarChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Category Distribution */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="rounded-2xl bg-white border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all"
                    >
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                            Habit Categories
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 mb-4">
                            Distribution by type
                        </p>
                        <ResponsiveContainer width="100%" height={240}>
                            <PieChart>
                                <Pie
                                    data={habitCategories}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`
                                    }
                                    outerRadius={90}
                                    fill="#8884d8"
                                    dataKey="value"
                                    animationDuration={1000}
                                >
                                    {habitCategories.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 space-y-2">
                            {habitCategories.map((cat) => (
                                <div
                                    key={cat.name}
                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: cat.color }}
                                        />
                                        <span className="text-xs sm:text-sm text-gray-700">
                                            {cat.name}
                                        </span>
                                    </div>
                                    <span className="text-xs sm:text-sm font-semibold text-gray-800">
                                        {cat.count} habits
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Weekly Activity Heatmap */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="xl:col-span-2 rounded-2xl bg-white border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all"
                    >
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                            Weekly Activity Pattern
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 mb-4">
                            Check-in distribution by time of day
                        </p>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={weeklyActivityData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="day"
                                    stroke="#9ca3af"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar
                                    dataKey="morning"
                                    stackId="a"
                                    fill="#fbbf24"
                                    radius={[0, 0, 0, 0]}
                                />
                                <Bar
                                    dataKey="afternoon"
                                    stackId="a"
                                    fill="#60a5fa"
                                    radius={[0, 0, 0, 0]}
                                />
                                <Bar
                                    dataKey="evening"
                                    stackId="a"
                                    fill="#818cf8"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* Bottom Section - Milestones & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Milestones */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="lg:col-span-2 rounded-2xl bg-white border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                                    Milestones & Achievements
                                </h2>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Your journey progress
                                </p>
                            </div>
                            <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={milestone.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <div
                                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${milestone.achieved
                                            ? "bg-gradient-to-br from-green-400 to-green-600"
                                            : "bg-gray-300"
                                            }`}
                                    >
                                        {milestone.achieved ? (
                                            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        ) : (
                                            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm sm:text-base font-semibold text-gray-800">
                                            {milestone.name}
                                        </p>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            {milestone.achieved ? "Achieved on" : "Target:"}{" "}
                                            {milestone.date}
                                        </p>
                                    </div>
                                    {milestone.achieved && (
                                        <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                            Completed
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Summary Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 sm:p-8 text-white shadow-2xl"
                    >
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                                    Keep Going! 🎉
                                </h3>
                                <p className="text-sm sm:text-base text-indigo-100">
                                    You're on track to achieve your goals this week
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                                    <div>
                                        <p className="text-3xl sm:text-4xl font-bold">
                                            {metrics.streak}
                                        </p>
                                        <p className="text-xs sm:text-sm text-indigo-100">
                                            Day Streak
                                        </p>
                                    </div>
                                    <Flame className="w-10 h-10 sm:w-12 sm:h-12 text-orange-300" />
                                </div>

                                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                                    <div>
                                        <p className="text-3xl sm:text-4xl font-bold">
                                            {metrics.completionRate}%
                                        </p>
                                        <p className="text-xs sm:text-sm text-indigo-100">
                                            Completion Rate
                                        </p>
                                    </div>
                                    <Target className="w-10 h-10 sm:w-12 sm:h-12 text-pink-300" />
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-3xl sm:text-4xl font-bold">
                                            {metrics.perfectDays}
                                        </p>
                                        <p className="text-xs sm:text-sm text-indigo-100">
                                            Perfect Days
                                        </p>
                                    </div>
                                    <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-300" />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full py-3 bg-white text-indigo-600 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
                            >
                                View Detailed Report
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Stats Banner */}
                <motion.div
                    variants={fadeInUp}
                    className="rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6 sm:p-8 text-white shadow-2xl overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

                    <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
                            </div>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
                                {metrics.avgStreak}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-400">Avg Streak</p>
                        </div>

                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400" />
                            </div>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
                                {habits.length}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-400">Total Habits</p>
                        </div>

                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                            </div>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
                                {metrics.activeHabits}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-400">Active Now</p>
                        </div>

                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                            </div>
                            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
                                92%
                            </p>
                            <p className="text-xs sm:text-sm text-gray-400">Focus Score</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}