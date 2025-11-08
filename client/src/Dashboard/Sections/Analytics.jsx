import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Legend,
    ComposedChart,
} from "recharts";
import { Flame, Target, Check, CheckSquare, Smile, TrendingUp, TrendingDown, Award, Calendar, Activity, BarChart3, Download, Share2, Filter, RefreshCw, Eye, Clock, Zap, Trophy, Star, Users, Brain, Sparkles, ChevronRight, Info, Settings } from "lucide-react";

export default function Analytics({
    habits = [
        { id: 1, title: "Morning Exercise", icon: "🏃", category: "Health", streak: 25, totalCheckIns: 100, perfectDays: 10 },
        { id: 2, title: "Read Books", icon: "📚", category: "Learning", streak: 18, totalCheckIns: 80, perfectDays: 8 },
        { id: 3, title: "Meditation", icon: "🧘", category: "Mindfulness", streak: 30, totalCheckIns: 120, perfectDays: 15 },
        { id: 4, title: "Drink Water", icon: "💧", category: "Health", streak: 22, totalCheckIns: 90, perfectDays: 12 },
        { id: 5, title: "Code Practice", icon: "💻", category: "Productivity", streak: 20, totalCheckIns: 75, perfectDays: 9 },
    ],
    todayCheckins = [1, 2, 3],
    weeklyProgress = [
        { day: "Mon", completed: 4, target: 5 },
        { day: "Tue", completed: 5, target: 5 },
        { day: "Wed", completed: 3, target: 5 },
        { day: "Thu", completed: 5, target: 5 },
        { day: "Fri", completed: 4, target: 5 },
        { day: "Sat", completed: 5, target: 5 },
        { day: "Sun", completed: 4, target: 5 },
    ],
    monthlyData = [],
}) {
    const [selectedPeriod, setSelectedPeriod] = useState("week");
    const [selectedMetric, setSelectedMetric] = useState("all");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(true);

    // Calculate comprehensive statistics
    const stats = useMemo(() => {
        const streak = habits.length ? Math.max(...habits.map((h) => h.streak || 0)) : 0;
        const avgStreak = habits.length
            ? Math.round(habits.reduce((sum, h) => sum + (h.streak || 0), 0) / habits.length)
            : 0;
        const completionRate =
            habits.length > 0 ? Math.round((todayCheckins.length / habits.length) * 100) : 0;
        const totalCheckIns = habits.reduce((sum, h) => sum + (h.totalCheckIns || 0), 0);
        const activeHabits = habits.filter((h) => h.streak > 0).length;
        const perfectDays = habits.reduce((sum, h) => sum + (h.perfectDays || 0), 0);

        const weeklyAvg = weeklyProgress.length
            ? Math.round(
                weeklyProgress.reduce((sum, d) => sum + d.completed, 0) / weeklyProgress.length
            )
            : 0;

        const topHabit = habits.length
            ? habits.reduce((best, h) => ((h.streak || 0) > (best.streak || 0) ? h : best), habits[0])
            : null;

        return {
            streak,
            avgStreak,
            completionRate,
            totalCheckIns,
            activeHabits,
            perfectDays,
            weeklyAvg,
            topHabit,
        };
    }, [habits, todayCheckins, weeklyProgress]);

    const monthlyProgress = useMemo(
        () => [
            { month: "Jan", completed: 85, target: 100, growth: 12 },
            { month: "Feb", completed: 92, target: 100, growth: 18 },
            { month: "Mar", completed: 88, target: 100, growth: 15 },
            { month: "Apr", completed: 95, target: 100, growth: 22 },
            { month: "May", completed: 91, target: 100, growth: 16 },
            { month: "Jun", completed: 98, target: 100, growth: 25 },
        ],
        []
    );

    const categoryData = useMemo(() => {
        const categories = ["Health", "Productivity", "Mindfulness", "Social", "Learning"];
        return categories.map((cat) => ({
            category: cat,
            habits: habits.filter((h) => h.category === cat).length,
            completed: Math.floor(Math.random() * 50) + 30,
        }));
    }, [habits]);

    const performanceMetrics = useMemo(
        () => [
            { metric: "Consistency", value: 92 },
            { metric: "Engagement", value: 88 },
            { metric: "Completion", value: 95 },
            { metric: "Quality", value: 85 },
            { metric: "Growth", value: 90 },
        ],
        []
    );

    const timeOfDayData = useMemo(
        () => [
            { time: "Morning", value: 35, color: "#fbbf24" },
            { time: "Afternoon", value: 40, color: "#60a5fa" },
            { time: "Evening", value: 25, color: "#818cf8" },
        ],
        []
    );

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    }, []);

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
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const cardVariants = {
        hover: {
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            transition: { duration: 0.2 },
        },
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-2xl border border-gray-200"
                >
                    <p className="text-xs sm:text-sm font-bold text-gray-800 mb-1 sm:mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-1 sm:gap-2 mb-1">
                            <div
                                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <p className="text-[10px] sm:text-xs text-gray-600">
                                {entry.name}: <span className="font-bold">{entry.value}</span>
                            </p>
                        </div>
                    ))}
                </motion.div>
            );
        }
        return null;
    };

    return (
        <>
            <style>{`
                /* Mobile First - Base styles for 320px+ */
                @media (max-width: 374px) {
                    .stat-card-text { font-size: 0.7rem; }
                    .stat-card-number { font-size: 1.5rem; }
                    .chart-container { min-height: 200px; }
                }

                /* Small phones - 375px to 424px */
                @media (min-width: 375px) and (max-width: 424px) {
                    .stat-card-text { font-size: 0.75rem; }
                    .stat-card-number { font-size: 1.75rem; }
                }

                /* Large phones - 425px to 767px */
                @media (min-width: 425px) and (max-width: 767px) {
                    .stat-card-text { font-size: 0.875rem; }
                    .stat-card-number { font-size: 2rem; }
                    .chart-container { min-height: 250px; }
                }

                /* Tablets - 768px to 1023px */
                @media (min-width: 768px) and (max-width: 1023px) {
                    .stat-card-number { font-size: 2.25rem; }
                    .chart-container { min-height: 280px; }
                }

                /* Small Laptops - 1024px to 1439px */
                @media (min-width: 1024px) and (max-width: 1439px) {
                    .chart-container { min-height: 300px; }
                }

                /* Large Laptops/Desktops - 1440px to 1919px */
                @media (min-width: 1440px) and (max-width: 1919px) {
                    .chart-container { min-height: 320px; }
                }

                /* Extra Large Displays - 1920px+ */
                @media (min-width: 1920px) {
                    .chart-container { min-height: 350px; }
                    .container-max { max-width: 2000px; }
                }

                /* Landscape orientation adjustments */
                @media (orientation: landscape) and (max-height: 500px) {
                    .mobile-landscape-compact { padding: 0.5rem; }
                    .hide-landscape { display: none; }
                }

                /* High DPI displays */
                @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                    .crisp-text { -webkit-font-smoothing: antialiased; }
                }

                /* Accessibility - Reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
                }
            `}</style>

            <motion.div
                className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 crisp-text"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="container-max max-w-[1920px] mx-auto space-y-3 sm:space-y-4 lg:space-y-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 mobile-landscape-compact">
                    {/* Header Section */}
                    <motion.div variants={itemVariants}>
                        <div className="flex flex-col sm:flex-row sm:items-start lg:items-center lg:justify-between gap-3 sm:gap-4">
                            <div className="flex-1">
                                <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 sm:mb-2 leading-tight">
                                    Progress Analytics
                                </h1>
                                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">
                                    Comprehensive insights into your habit performance 📊
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleRefresh}
                                    className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                                >
                                    <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                                    <span className="hidden xs:inline">Refresh</span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                                >
                                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <span className="hidden xs:inline">Export</span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm md:text-base hover:shadow-lg hover:shadow-indigo-500/40 transition-all"
                                >
                                    <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:inline">Share Report</span>
                                    <span className="sm:hidden">Share</span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Key Metrics Grid */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2 xs:gap-3 sm:gap-4"
                    >
                        <motion.div
                            variants={cardVariants}
                            whileHover="hover"
                            className="col-span-2 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-4 xs:p-5 sm:p-6 text-white shadow-xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16" />
                            <Flame className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3 relative z-10" />
                            <p className="stat-card-text text-xs sm:text-sm opacity-90 mb-1 relative z-10">Current Streak</p>
                            <div className="flex items-end justify-between relative z-10">
                                <div>
                                    <p className="stat-card-number text-3xl xs:text-4xl sm:text-5xl font-bold">{stats.streak}</p>
                                    <p className="text-xs sm:text-sm opacity-80">Days</p>
                                </div>
                                <div className="flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 rounded-full">
                                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="text-xs sm:text-sm font-semibold">12%</span>
                                </div>
                            </div>
                        </motion.div>

                        {[
                            { icon: Target, label: "Total Habits", value: habits.length, color: "indigo" },
                            { icon: CheckSquare, label: "Today's Progress", value: `${todayCheckins.length}/${habits.length}`, color: "green" },
                            { icon: Activity, label: "Active Habits", value: stats.activeHabits, color: "blue" },
                            { icon: Award, label: "Total Check-ins", value: stats.totalCheckIns, color: "purple" },
                            { icon: Zap, label: "Completion Rate", value: `${stats.completionRate}%`, color: "pink" },
                            { icon: Trophy, label: "Perfect Days", value: stats.perfectDays, color: "amber" },
                        ].map((item, index) => (
                            <motion.div key={index} variants={cardVariants} whileHover="hover">
                                <div className={`rounded-xl sm:rounded-2xl bg-white border border-${item.color}-200 p-3 xs:p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all`}>
                                    <item.icon className={`w-6 h-6 sm:w-8 sm:h-8 text-${item.color}-600 mb-2 sm:mb-3`} />
                                    <p className="stat-card-text text-[10px] xs:text-xs text-gray-600 mb-1">{item.label}</p>
                                    <p className="stat-card-number text-2xl xs:text-3xl font-bold text-gray-800">{item.value}</p>
                                    <div className={`flex items-center gap-1 mt-1 sm:mt-2 text-${item.color}-600`}>
                                        <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                        <span className="text-[10px] xs:text-xs font-semibold">{5 + index * 3}%</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* AI Insights Banner */}
                    <motion.div
                        variants={itemVariants}
                        className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 xs:p-5 sm:p-6 md:p-8 text-white shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-white/10 rounded-full blur-3xl" />

                        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="p-3 sm:p-4 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl"
                            >
                                <Brain className="w-8 h-8 sm:w-10 sm:h-10" />
                            </motion.div>
                            <div className="flex-1">
                                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold mb-1 sm:mb-2 flex items-center gap-2">
                                    AI Performance Insights
                                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                                </h3>
                                <p className="text-xs xs:text-sm sm:text-base text-white/95">
                                    Your consistency has improved by 22% this month! {stats.topHabit?.title} is your strongest habit. Keep up the excellent work! 🎉
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white text-purple-600 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:shadow-2xl transition-all"
                            >
                                View Details
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Main Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
                        {/* Completion Trend */}
                        <motion.div
                            variants={itemVariants}
                            whileHover="hover"
                            className="xl:col-span-2 rounded-xl sm:rounded-2xl bg-white border border-gray-200 p-4 xs:p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-4 sm:mb-6 gap-2 sm:gap-3">
                                <div>
                                    <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                                        Completion Trend
                                    </h2>
                                    <p className="text-xs sm:text-sm text-gray-500">Weekly performance overview</p>
                                </div>
                                <div className="flex gap-1.5 sm:gap-2">
                                    {["week", "month", "year"].map((period) => (
                                        <button
                                            key={period}
                                            onClick={() => setSelectedPeriod(period)}
                                            className={`px-2.5 xs:px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium transition-all ${selectedPeriod === period
                                                    ? "bg-indigo-600 text-white shadow-lg"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            {period.charAt(0).toUpperCase() + period.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="chart-container">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={selectedPeriod === "week" ? weeklyProgress : monthlyProgress}>
                                        <defs>
                                            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey={selectedPeriod === "week" ? "day" : "month"} stroke="#9ca3af" tick={{ fontSize: 10 }} />
                                        <YAxis stroke="#9ca3af" tick={{ fontSize: 10 }} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area type="monotone" dataKey="completed" fill="url(#colorCompleted)" stroke="#6366f1" strokeWidth={2} />
                                        <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Performance Radar */}
                        <motion.div
                            variants={itemVariants}
                            whileHover="hover"
                            className="rounded-xl sm:rounded-2xl bg-white border border-gray-200 p-4 xs:p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div>
                                    <h2 className="text-lg xs:text-xl font-bold text-gray-800 mb-1">Performance Score</h2>
                                    <p className="text-xs sm:text-sm text-gray-500">Multi-dimensional analysis</p>
                                </div>
                                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                            </div>
                            <div className="chart-container" style={{ minHeight: '220px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={performanceMetrics}>
                                        <PolarGrid stroke="#e5e7eb" />
                                        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: "#6b7280" }} />
                                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                                        <Radar name="Score" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Category Breakdown */}
                        <motion.div
                            variants={itemVariants}
                            whileHover="hover"
                            className="rounded-xl sm:rounded-2xl bg-white border border-gray-200 p-4 xs:p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all"
                        >
                            <h2 className="text-lg xs:text-xl font-bold text-gray-800 mb-1">Category Performance</h2>
                            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Habits by category</p>
                            <div className="chart-container" style={{ minHeight: '220px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={categoryData} layout="horizontal">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis type="number" stroke="#9ca3af" tick={{ fontSize: 9 }} />
                                        <YAxis dataKey="category" type="category" stroke="#9ca3af" tick={{ fontSize: 9 }} width={80} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="completed" fill="#6366f1" radius={[0, 8, 8, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Time of Day Distribution */}
                        <motion.div
                            variants={itemVariants}
                            whileHover="hover"
                            className="rounded-xl sm:rounded-2xl bg-white border border-gray-200 p-4 xs:p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all"
                        >
                            <h2 className="text-lg xs:text-xl font-bold text-gray-800 mb-1">Time Distribution</h2>
                            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Check-ins by time of day</p>
                            <div className="chart-container" style={{ minHeight: '220px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={timeOfDayData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ time, value }) => `${time} ${value}%`}
                                            outerRadius={window.innerWidth < 640 ? 60 : 90}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {timeOfDayData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Top Performers */}
                        <motion.div
                            variants={itemVariants}
                            whileHover="hover"
                            className="rounded-xl sm:rounded-2xl bg-white border border-gray-200 p-4 xs:p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div>
                                    <h2 className="text-lg xs:text-xl font-bold text-gray-800 mb-1">Top Performers</h2>
                                    <p className="text-xs sm:text-sm text-gray-500">Highest streaks</p>
                                </div>
                                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                                {habits
                                    .sort((a, b) => (b.streak || 0) - (a.streak || 0))
                                    .slice(0, 6)
                                    .map((habit, index) => {
                                        const categoryColor = {
                                            Health: "#10b981",
                                            Productivity: "#3b82f6",
                                            Mindfulness: "#8b5cf6",
                                            Social: "#f59e0b",
                                            Learning: "#ec4899",
                                        }[habit.category] || "#6366f1";

                                        return (
                                            <motion.div
                                                key={habit.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="flex items-center justify-between p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-all border border-gray-100"
                                            >
                                                <div className="flex items-center gap-2 sm:gap-3">
                                                    <div className="relative">
                                                        <div
                                                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-base sm:text-xl"
                                                            style={{ backgroundColor: `${categoryColor}20` }}
                                                        >
                                                            {habit.icon}
                                                        </div>
                                                        {index < 3 && (
                                                            <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-amber-500 rounded-full flex items-center justify-center">
                                                                <span className="text-[10px] sm:text-xs font-bold text-white">
                                                                    {index + 1}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800 text-xs sm:text-sm">
                                                            {habit.title}
                                                        </p>
                                                        <p className="text-[10px] sm:text-xs text-gray-500">{habit.category}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 sm:gap-2">
                                                    <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                                                    <span className="text-base sm:text-lg font-bold text-gray-800">
                                                        {habit.streak || 0}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
                        {/* Weekly Average Card */}
                        <motion.div
                            variants={itemVariants}
                            className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-5 xs:p-6 sm:p-8 text-white shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <Calendar className="w-8 h-8 sm:w-10 sm:h-10" />
                                <div className="px-2 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm font-semibold">
                                    This Week
                                </div>
                            </div>
                            <h3 className="text-lg xs:text-xl font-bold mb-2">Weekly Average</h3>
                            <div className="flex items-end gap-2 mb-3 sm:mb-4">
                                <p className="text-4xl xs:text-5xl font-bold">{stats.weeklyAvg}</p>
                                <p className="text-base xs:text-xl opacity-80 mb-1 sm:mb-2">habits/day</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm bg-white/20 rounded-lg p-2 sm:p-3">
                                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>15% better than last week</span>
                            </div>
                        </motion.div>

                        {/* Consistency Score */}
                        <motion.div
                            variants={itemVariants}
                            className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-5 xs:p-6 sm:p-8 text-white shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <Target className="w-8 h-8 sm:w-10 sm:h-10" />
                                <Star className="w-6 h-6 sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="text-lg xs:text-xl font-bold mb-2">Consistency Score</h3>
                            <div className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4">
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
                                        animate={{ pathLength: 0.92 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        strokeDasharray="1 1"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <p className="text-3xl xs:text-4xl font-bold">92%</p>
                                    <p className="text-xs sm:text-sm opacity-80">Score</p>
                                </div>
                            </div>
                            <p className="text-center text-xs sm:text-sm opacity-90">
                                Excellent consistency across all habits!
                            </p>
                        </motion.div>

                        {/* Achievement Summary */}
                        <motion.div
                            variants={itemVariants}
                            className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 p-5 xs:p-6 sm:p-8 text-white shadow-2xl sm:col-span-2 lg:col-span-1"
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <Trophy className="w-8 h-8 sm:w-10 sm:h-10" />
                                <Award className="w-6 h-6 sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="text-lg xs:text-xl font-bold mb-3 sm:mb-4">Recent Achievements</h3>
                            <div className="space-y-2 sm:space-y-3">
                                {[
                                    { icon: "🔥", label: "30-Day Streak", date: "2 days ago" },
                                    { icon: "🎯", label: "Perfect Week", date: "5 days ago" },
                                    { icon: "⭐", label: "Top Performer", date: "1 week ago" },
                                ].map((achievement, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg"
                                    >
                                        <span className="text-xl sm:text-2xl">{achievement.icon}</span>
                                        <div className="flex-1">
                                            <p className="font-semibold text-xs sm:text-sm">{achievement.label}</p>
                                            <p className="text-[10px] sm:text-xs opacity-75">{achievement.date}</p>
                                        </div>
                                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Recommendations Section */}
                    <motion.div
                        variants={itemVariants}
                        className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-200 p-4 xs:p-5 sm:p-6 md:p-8"
                    >
                        <div className="flex flex-col xs:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <div className="p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-md">
                                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="text-xl xs:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                                    Personalized Recommendations
                                </h3>
                                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                                    AI-powered insights to optimize your habit routine
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {[
                                {
                                    icon: Clock,
                                    title: "Optimal Time",
                                    desc: "Your best performance is at 7-9 AM",
                                    color: "bg-blue-100 text-blue-700",
                                    action: "Adjust Schedule",
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Growth Opportunity",
                                    desc: "Add 2 more habits to reach your goal",
                                    color: "bg-green-100 text-green-700",
                                    action: "Add Habits",
                                },
                                {
                                    icon: Users,
                                    title: "Social Boost",
                                    desc: "Join a community for motivation",
                                    color: "bg-purple-100 text-purple-700",
                                    action: "Find Groups",
                                },
                            ].map((rec, index) => {
                                const RecIcon = rec.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-md hover:shadow-xl transition-all"
                                    >
                                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${rec.color} flex items-center justify-center mb-2 sm:mb-3`}>
                                            <RecIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">{rec.title}</h4>
                                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{rec.desc}</p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                                        >
                                            {rec.action}
                                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                        </motion.button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Milestone Progress */}
                    <motion.div
                        variants={itemVariants}
                        className="rounded-xl sm:rounded-2xl bg-white border border-gray-200 p-4 xs:p-5 sm:p-6 md:p-8 shadow-lg"
                    >
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <div>
                                <h2 className="text-xl xs:text-2xl font-bold text-gray-800 mb-1">Milestone Progress</h2>
                                <p className="text-xs sm:text-sm text-gray-500">Track your journey to success</p>
                            </div>
                            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            {[
                                { label: "Bronze", target: 10, current: 10, color: "#cd7f32", achieved: true },
                                { label: "Silver", target: 30, current: 25, color: "#c0c0c0", achieved: false },
                                { label: "Gold", target: 50, current: 25, color: "#ffd700", achieved: false },
                                { label: "Platinum", target: 100, current: 25, color: "#e5e4e2", achieved: false },
                            ].map((milestone, index) => {
                                const progress = (milestone.current / milestone.target) * 100;
                                return (
                                    <div key={index}>
                                        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div
                                                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: `${milestone.color}30` }}
                                                >
                                                    {milestone.achieved ? (
                                                        <Check className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: milestone.color }} />
                                                    ) : (
                                                        <Star className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: milestone.color }} />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm sm:text-base">{milestone.label} Tier</p>
                                                    <p className="text-[10px] sm:text-xs text-gray-500">
                                                        {milestone.current} / {milestone.target} days
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs sm:text-sm font-bold text-gray-800">
                                                {Math.round(progress)}%
                                            </span>
                                        </div>
                                        <div className="w-full h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: milestone.color }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Bottom CTA Banner */}
                    <motion.div
                        variants={itemVariants}
                        className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 p-6 xs:p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/20 rounded-full blur-3xl" />

                        <div className="relative text-center max-w-3xl mx-auto">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-indigo-400" />
                            </motion.div>
                            <h3 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
                                Your Progress is Incredible!
                            </h3>
                            <p className="text-sm xs:text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 px-2">
                                You're in the top 10% of users. Keep tracking, keep growing, and achieve your goals with data-driven insights.
                            </p>
                            <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base lg:text-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
                                >
                                    Download Full Report
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base lg:text-lg hover:bg-white/20 transition-all"
                                >
                                    Share Your Success
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
}