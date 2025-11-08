import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check,
    Smile,
    TrendingUp,
    Calendar,
    Download,
    Share2,
    Clock,
    Heart,
    Brain,
    Activity,
    MessageCircle,
    Sparkles,
    Sun,
    Cloud,
    CloudRain,
    Zap,
    Info,
    ChevronRight,
    Award,
    Target,
    BarChart3,
    Moon,
    Wind,
    Umbrella,
    Stars,
    ThumbsUp,
    Coffee,
    Book,
    Music,
    Users,
    Settings,
    Bell,
    Filter,
} from "lucide-react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
    AreaChart,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Cell,
    PieChart,
    Pie,
    Legend,
    ComposedChart,
} from "recharts";
import COLORS from "../data/colors";

export default function MoodTracker({
    initialMood = "😊",
    initialHistory = [],
    onUpdate,
}) {
    const [currentMood, setCurrentMood] = useState(initialMood);
    const [history, setHistory] = useState(initialHistory);
    const [selectedPeriod, setSelectedPeriod] = useState("week");
    const [showNotes, setShowNotes] = useState(false);
    const [moodNote, setMoodNote] = useState("");
    const [timeOfDay, setTimeOfDay] = useState("");
    const [selectedFactors, setSelectedFactors] = useState([]);
    const [showInsights, setShowInsights] = useState(true);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setTimeOfDay("morning");
        else if (hour < 18) setTimeOfDay("afternoon");
        else setTimeOfDay("evening");
    }, []);

    // Enhanced mood options with rich metadata
    const moods = [
        {
            emoji: "😄",
            label: "Excellent",
            value: 5,
            color: "#10b981",
            bgColor: "#d1fae5",
            icon: Sun,
            description: "Feeling amazing!",
            keywords: ["energetic", "happy", "excited"],
        },
        {
            emoji: "😊",
            label: "Good",
            value: 4,
            color: "#3b82f6",
            bgColor: "#dbeafe",
            icon: Smile,
            description: "Pretty good day",
            keywords: ["content", "positive", "calm"],
        },
        {
            emoji: "😐",
            label: "Neutral",
            value: 3,
            color: "#f59e0b",
            bgColor: "#fef3c7",
            icon: Cloud,
            description: "Just okay",
            keywords: ["normal", "steady", "balanced"],
        },
        {
            emoji: "😢",
            label: "Low",
            value: 2,
            color: "#8b5cf6",
            bgColor: "#ede9fe",
            icon: CloudRain,
            description: "Not feeling great",
            keywords: ["sad", "tired", "down"],
        },
        {
            emoji: "😡",
            label: "Stressed",
            value: 1,
            color: "#ef4444",
            bgColor: "#fee2e2",
            icon: Zap,
            description: "Very stressed",
            keywords: ["anxious", "frustrated", "overwhelmed"],
        },
    ];

    // Mood factors
    const factors = [
        { id: "sleep", label: "Good Sleep", icon: Moon },
        { id: "exercise", label: "Exercised", icon: Activity },
        { id: "social", label: "Socialized", icon: Users },
        { id: "work", label: "Productive Work", icon: Target },
        { id: "relaxation", label: "Relaxed", icon: Coffee },
        { id: "learning", label: "Learned Something", icon: Book },
    ];

    // Calculate comprehensive statistics
    const stats = useMemo(() => {
        if (history.length === 0)
            return {
                avgMood: 0,
                mostCommon: "😊",
                trend: 0,
                streak: 0,
                total: 0,
                weekAvg: 0,
                monthAvg: 0,
                bestDay: null,
                worstDay: null,
            };

        const moodValues = history.map((entry) => {
            const mood = moods.find((m) => m.emoji === entry.mood);
            return mood ? mood.value : 3;
        });

        const avgMood = (
            moodValues.reduce((a, b) => a + b, 0) / moodValues.length
        ).toFixed(1);

        const moodCounts = history.reduce((acc, entry) => {
            acc[entry.mood] = (acc[entry.mood] || 0) + 1;
            return acc;
        }, {});
        const mostCommon = Object.keys(moodCounts).reduce((a, b) =>
            moodCounts[a] > moodCounts[b] ? a : b
        );

        const trend =
            moodValues.length > 1
                ? moodValues[moodValues.length - 1] - moodValues[0]
                : 0;

        // Positive streak (4+)
        let streak = 0;
        for (let i = history.length - 1; i >= 0; i--) {
            const mood = moods.find((m) => m.emoji === history[i].mood);
            if (mood && mood.value >= 4) streak++;
            else break;
        }

        // Week and month averages
        const weekData = history.slice(-7);
        const monthData = history.slice(-30);
        const weekAvg =
            weekData.length > 0
                ? (
                    weekData.reduce((sum, e) => {
                        const m = moods.find((mood) => mood.emoji === e.mood);
                        return sum + (m?.value || 3);
                    }, 0) / weekData.length
                ).toFixed(1)
                : 0;
        const monthAvg =
            monthData.length > 0
                ? (
                    monthData.reduce((sum, e) => {
                        const m = moods.find((mood) => mood.emoji === e.mood);
                        return sum + (m?.value || 3);
                    }, 0) / monthData.length
                ).toFixed(1)
                : 0;

        // Best and worst days
        const sortedByMood = [...history].sort((a, b) => {
            const moodA = moods.find((m) => m.emoji === a.mood)?.value || 3;
            const moodB = moods.find((m) => m.emoji === b.mood)?.value || 3;
            return moodB - moodA;
        });
        const bestDay = sortedByMood[0];
        const worstDay = sortedByMood[sortedByMood.length - 1];

        return {
            avgMood,
            mostCommon,
            trend,
            streak,
            total: history.length,
            weekAvg,
            monthAvg,
            bestDay,
            worstDay,
        };
    }, [history, moods]);

    // Chart data preparations
    const chartData = useMemo(() => {
        const data = history.slice(-30).map((entry, index) => ({
            date: entry.date,
            mood: moods.find((m) => m.emoji === entry.mood)?.value || 3,
            label: entry.date,
            fullDate: entry.fullDate,
        }));
        return data;
    }, [history, moods]);

    const distributionData = useMemo(() => {
        const distribution = moods.map((mood) => ({
            name: mood.label,
            value: history.filter((e) => e.mood === mood.emoji).length,
            color: mood.color,
            emoji: mood.emoji,
        }));
        return distribution.filter((d) => d.value > 0);
    }, [history, moods]);

    const weeklyPattern = useMemo(() => {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        return days.map((day) => {
            const dayEntries = history.filter((e) => e.date.startsWith(day));
            const avgValue =
                dayEntries.length > 0
                    ? dayEntries.reduce((sum, e) => {
                        const mood = moods.find((m) => m.emoji === e.mood);
                        return sum + (mood?.value || 3);
                    }, 0) / dayEntries.length
                    : 0;
            return { day, mood: avgValue, count: dayEntries.length };
        });
    }, [history, moods]);

    const timeOfDayPattern = useMemo(() => {
        const periods = ["Morning", "Afternoon", "Evening"];
        return periods.map((period) => {
            const periodEntries = history.filter((e) =>
                e.fullDate?.includes(period)
            );
            const avgValue =
                periodEntries.length > 0
                    ? periodEntries.reduce((sum, e) => {
                        const mood = moods.find((m) => m.emoji === e.mood);
                        return sum + (mood?.value || 3);
                    }, 0) / periodEntries.length
                    : 0;
            return { period, mood: avgValue, count: periodEntries.length };
        });
    }, [history, moods]);

    // Handle mood selection
    const chooseMood = useCallback(
        (selectedMood) => {
            setCurrentMood(selectedMood.emoji);
            const now = new Date();
            const newEntry = {
                date: now.toLocaleDateString("en-US", { weekday: "short" }),
                fullDate: now.toISOString(),
                mood: selectedMood.emoji,
                note: moodNote,
                factors: selectedFactors,
                time: now.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                timestamp: now.getTime(),
            };

            const newHistory = [...history, newEntry].slice(-60);
            setHistory(newHistory);
            setMoodNote("");
            setSelectedFactors([]);
            onUpdate?.({ mood: selectedMood.emoji, history: newHistory });
        },
        [history, moodNote, selectedFactors, onUpdate]
    );

    // Toggle factor selection
    const toggleFactor = (factorId) => {
        setSelectedFactors((prev) =>
            prev.includes(factorId)
                ? prev.filter((f) => f !== factorId)
                : [...prev, factorId]
        );
    };

    // Get AI-powered insights
    const getInsight = () => {
        if (!stats || stats.total === 0)
            return "Start tracking your mood to receive personalized insights!";

        const insights = [];

        if (stats.avgMood >= 4.5) {
            insights.push("🌟 Your emotional wellness is exceptional! You're thriving.");
        } else if (stats.avgMood >= 4) {
            insights.push("✨ You're maintaining positive emotional health. Great work!");
        } else if (stats.avgMood >= 3) {
            insights.push("🌤️ Your mood is balanced. Consider activities that bring you joy.");
        } else if (stats.avgMood >= 2) {
            insights.push(
                "💙 Your mood has been lower. Self-care activities might help."
            );
        } else {
            insights.push(
                "🤗 You're going through a tough time. Consider reaching out for support."
            );
        }

        if (stats.streak >= 7) {
            insights.push(
                `You've maintained positive moods for ${stats.streak} days!`
            );
        }

        if (stats.trend > 0) {
            insights.push("📈 Your mood is trending upward - keep it up!");
        } else if (stats.trend < 0) {
            insights.push("📉 Consider what might be affecting your recent mood.");
        }

        return insights.join(" ");
    };

    // Get motivational message
    const getMotivation = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning! How are you feeling today? 🌅";
        if (hour < 18) return "Good afternoon! Take a moment to check in with yourself 🌞";
        return "Good evening! Reflect on your day and log your mood 🌙";
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.03 },
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

    const moodButtonVariants = {
        rest: { scale: 1 },
        hover: {
            scale: 1.15,
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.6 },
        },
        tap: { scale: 0.9 },
        selected: {
            scale: 1.1,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        },
    };

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const mood = moods.find((m) => m.value === payload[0].value);
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-4 rounded-xl shadow-2xl border border-gray-200"
                >
                    <p className="text-sm font-bold text-gray-800 mb-2">
                        {payload[0].payload.label}
                    </p>
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">{mood?.emoji || "😐"}</span>
                        <div>
                            <p className="text-sm font-semibold" style={{ color: mood?.color }}>
                                {mood?.label}
                            </p>
                            <p className="text-xs text-gray-500">{mood?.value}/5</p>
                        </div>
                    </div>
                </motion.div>
            );
        }
        return null;
    };

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-[1920px] mx-auto space-y-4 sm:space-y-6 p-3 sm:p-4 lg:p-6 xl:p-8">
                {/* Header Section */}
                <motion.div variants={itemVariants}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                                Mood & Wellness Tracker
                            </h1>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                                {getMotivation()}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                            >
                                <Bell className="w-4 h-4" />
                                <span className="hidden sm:inline">Reminders</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                            >
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">Export</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-purple-500/40 transition-all"
                            >
                                <Share2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Share Journey</span>
                            </motion.button>
                        </div>
                    </div>

                    {/* Quick Stats Bar */}
                    {stats.total > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="rounded-xl bg-white border border-purple-200 p-3 sm:p-4 shadow-sm"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <Activity className="w-4 h-4 text-purple-600" />
                                    <p className="text-xs font-medium text-gray-600">Avg Mood</p>
                                </div>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800">
                                    {stats.avgMood}
                                    <span className="text-sm text-gray-500">/5</span>
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="rounded-xl bg-white border border-green-200 p-3 sm:p-4 shadow-sm"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <Sparkles className="w-4 h-4 text-green-600" />
                                    <p className="text-xs font-medium text-gray-600">Streak</p>
                                </div>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800">
                                    {stats.streak}
                                    <span className="text-sm text-gray-500">d</span>
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="rounded-xl bg-white border border-blue-200 p-3 sm:p-4 shadow-sm"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    <p className="text-xs font-medium text-gray-600">Entries</p>
                                </div>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800">
                                    {stats.total}
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="rounded-xl bg-white border border-pink-200 p-3 sm:p-4 shadow-sm"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <Heart className="w-4 h-4 text-pink-600" />
                                    <p className="text-xs font-medium text-gray-600">Top Mood</p>
                                </div>
                                <p className="text-2xl sm:text-3xl">{stats.mostCommon}</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="rounded-xl bg-white border border-amber-200 p-3 sm:p-4 shadow-sm"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <Sun className="w-4 h-4 text-amber-600" />
                                    <p className="text-xs font-medium text-gray-600">Week Avg</p>
                                </div>
                                <p className="text-xl sm:text-2xl font-bold text-gray-800">
                                    {stats.weekAvg}
                                    <span className="text-sm text-gray-500">/5</span>
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="rounded-xl bg-white border border-indigo-200 p-3 sm:p-4 shadow-sm"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                                    <p className="text-xs font-medium text-gray-600">Trend</p>
                                </div>
                                <p className="text-2xl sm:text-3xl">
                                    {stats.trend > 0 ? "📈" : stats.trend < 0 ? "📉" : "➡️"}
                                </p>
                            </motion.div>
                        </div>
                    )}
                </motion.div>

                {/* AI Insight Banner */}
                {stats.total > 0 && (
                    <motion.div
                        variants={itemVariants}
                        className="rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

                        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 10, 0],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl"
                            >
                                <Brain className="w-10 h-10 sm:w-12 sm:h-12" />
                            </motion.div>
                            <div className="flex-1">
                                <h3 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
                                    AI Wellness Insights
                                    <Sparkles className="w-5 h-5" />
                                </h3>
                                <p className="text-sm sm:text-base text-white/95 leading-relaxed">
                                    {getInsight()}
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-2xl transition-all"
                            >
                                View Full Report
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Mood Selection Card */}
                <motion.div
                    variants={itemVariants}
                    className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 lg:p-10 shadow-lg"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                            How are you feeling right now?
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600">
                            Select your current emotional state
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-8">
                        {moods.map((mood) => {
                            const MoodIcon = mood.icon;
                            const isSelected = currentMood === mood.emoji;

                            return (
                                <motion.button
                                    key={mood.emoji}
                                    variants={moodButtonVariants}
                                    initial="rest"
                                    whileHover="hover"
                                    whileTap="tap"
                                    animate={isSelected ? "selected" : "rest"}
                                    onClick={() => chooseMood(mood)}
                                    className={`relative rounded-2xl p-5 sm:p-6 lg:p-8 transition-all ${isSelected
                                            ? "ring-4 ring-offset-4 shadow-2xl"
                                            : "border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                                        }`}
                                    style={{
                                        backgroundColor: isSelected ? mood.bgColor : "white",
                                        borderColor: isSelected ? mood.color : undefined,
                                        ringColor: isSelected ? mood.color : undefined,
                                    }}
                                >
                                    {isSelected && (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                            className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
                                        >
                                            <Check className="w-5 h-5 text-white" strokeWidth={3} />
                                        </motion.div>
                                    )}

                                    <div className="flex flex-col items-center gap-3">
                                        <motion.span
                                            animate={
                                                isSelected
                                                    ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
                                                    : {}
                                            }
                                            transition={{ duration: 0.5 }}
                                            className="text-5xl sm:text-6xl lg:text-7xl"
                                        >
                                            {mood.emoji}
                                        </motion.span>
                                        <div
                                            className="p-2 sm:p-3 rounded-xl"
                                            style={{ backgroundColor: mood.bgColor }}
                                        >
                                            <MoodIcon
                                                className="w-5 h-5 sm:w-6 sm:h-6"
                                                style={{ color: mood.color }}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p
                                                className="text-base sm:text-lg font-bold mb-1"
                                                style={{ color: mood.color }}
                                            >
                                                {mood.label}
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-500">
                                                {mood.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Mood Factors */}
                    <div className="border-t border-gray-200 pt-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Stars className="w-5 h-5 text-purple-600" />
                            <h3 className="text-lg font-semibold text-gray-800">
                                What influenced your mood today?
                            </h3>
                            <span className="text-xs text-gray-500">(Optional)</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                            {factors.map((factor) => {
                                const FactorIcon = factor.icon;
                                const isSelected = selectedFactors.includes(factor.id);

                                return (
                                    <motion.button
                                        key={factor.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => toggleFactor(factor.id)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isSelected
                                                ? "bg-purple-600 text-white shadow-md"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        <FactorIcon className="w-4 h-4" />
                                        <span className="hidden sm:inline">{factor.label}</span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Optional Note */}
                    <div className="border-t border-gray-200 pt-6">
                        <button
                            onClick={() => setShowNotes(!showNotes)}
                            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 mb-4 transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>Add a personal note (optional)</span>
                            <ChevronRight
                                className={`w-4 h-4 transition-transform ${showNotes ? "rotate-90" : ""
                                    }`}
                            />
                        </button>

                        <AnimatePresence>
                            {showNotes && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <textarea
                                        value={moodNote}
                                        onChange={(e) => setMoodNote(e.target.value)}
                                        placeholder="What's on your mind? Share your thoughts, feelings, or what happened today..."
                                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base resize-none"
                                        rows={4}
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        {moodNote.length}/500 characters
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Analytics Dashboard */}
                {chartData.length > 0 && (
                    <>
                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            {/* Mood Timeline */}
                            <motion.div
                                variants={itemVariants}
                                className="rounded-2xl bg-white border border-gray-200 p-5 sm:p-6 shadow-lg"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                                            Mood Timeline
                                        </h2>
                                        <p className="text-sm text-gray-500">30-day trend analysis</p>
                                    </div>
                                    <BarChart3 className="w-7 h-7 text-purple-600" />
                                </div>

                                <ResponsiveContainer width="100%" height={320}>
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="label" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                                        <YAxis domain={[1, 5]} stroke="#9ca3af" tick={{ fontSize: 11 }} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="mood"
                                            stroke="#a855f7"
                                            strokeWidth={3}
                                            fill="url(#colorMood)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </motion.div>

                            {/* Mood Distribution */}
                            <motion.div
                                variants={itemVariants}
                                className="rounded-2xl bg-white border border-gray-200 p-5 sm:p-6 shadow-lg"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                                            Mood Distribution
                                        </h2>
                                        <p className="text-sm text-gray-500">Overall breakdown</p>
                                    </div>
                                    <Target className="w-7 h-7 text-pink-600" />
                                </div>

                                <ResponsiveContainer width="100%" height={320}>
                                    <PieChart>
                                        <Pie
                                            data={distributionData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent, emoji }) =>
                                                `${emoji} ${(percent * 100).toFixed(0)}%`
                                            }
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {distributionData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </motion.div>

                            {/* Weekly Pattern */}
                            <motion.div
                                variants={itemVariants}
                                className="rounded-2xl bg-white border border-gray-200 p-5 sm:p-6 shadow-lg"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                                            Weekly Pattern
                                        </h2>
                                        <p className="text-sm text-gray-500">Average mood by day</p>
                                    </div>
                                    <Calendar className="w-7 h-7 text-blue-600" />
                                </div>

                                <ResponsiveContainer width="100%" height={320}>
                                    <BarChart data={weeklyPattern}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                                        <YAxis domain={[0, 5]} stroke="#9ca3af" tick={{ fontSize: 11 }} />
                                        <Tooltip />
                                        <Bar dataKey="mood" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </motion.div>

                            {/* Recent Entries */}
                            <motion.div
                                variants={itemVariants}
                                className="rounded-2xl bg-white border border-gray-200 p-5 sm:p-6 shadow-lg"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                                            Recent Entries
                                        </h2>
                                        <p className="text-sm text-gray-500">Last 7 check-ins</p>
                                    </div>
                                    <Clock className="w-7 h-7 text-indigo-600" />
                                </div>

                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                    {history
                                        .slice(-7)
                                        .reverse()
                                        .map((entry, index) => {
                                            const mood = moods.find((m) => m.emoji === entry.mood);
                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-all border border-gray-100"
                                                >
                                                    <div
                                                        className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                                                        style={{ backgroundColor: mood?.bgColor }}
                                                    >
                                                        {entry.mood}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-base font-bold text-gray-800">
                                                            {mood?.label || "Unknown"}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {entry.date} • {entry.time}
                                                        </p>
                                                        {entry.note && (
                                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                                "{entry.note}"
                                                            </p>
                                                        )}
                                                        {entry.factors && entry.factors.length > 0 && (
                                                            <div className="flex gap-1 mt-2">
                                                                {entry.factors.slice(0, 3).map((factorId) => {
                                                                    const factor = factors.find((f) => f.id === factorId);
                                                                    if (!factor) return null;
                                                                    const FactorIcon = factor.icon;
                                                                    return (
                                                                        <div
                                                                            key={factorId}
                                                                            className="p-1 bg-purple-100 rounded"
                                                                            title={factor.label}
                                                                        >
                                                                            <FactorIcon className="w-3 h-3 text-purple-600" />
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div
                                                        className="px-3 py-1.5 rounded-full text-xs font-bold"
                                                        style={{
                                                            backgroundColor: mood?.bgColor,
                                                            color: mood?.color,
                                                        }}
                                                    >
                                                        {mood?.value}/5
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                </div>
                            </motion.div>
                        </div>

                        {/* Advanced Analytics Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                            {/* Best & Worst Days */}
                            <motion.div
                                variants={itemVariants}
                                className="rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 sm:p-8 text-white shadow-2xl"
                            >
                                <Award className="w-10 h-10 mb-4" />
                                <h3 className="text-xl font-bold mb-4">Peak Performance</h3>
                                <div className="space-y-4">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                                        <p className="text-sm opacity-90 mb-1">Best Day</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-3xl">{stats.bestDay?.mood}</span>
                                            <div>
                                                <p className="font-bold">{stats.bestDay?.date}</p>
                                                <p className="text-xs opacity-75">{stats.bestDay?.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                                        <p className="text-sm opacity-90 mb-1">Improvement Area</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-3xl">{stats.worstDay?.mood}</span>
                                            <div>
                                                <p className="font-bold">{stats.worstDay?.date}</p>
                                                <p className="text-xs opacity-75">{stats.worstDay?.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Wellness Score */}
                            <motion.div
                                variants={itemVariants}
                                className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 sm:p-8 text-white shadow-2xl"
                            >
                                <Target className="w-10 h-10 mb-4" />
                                <h3 className="text-xl font-bold mb-4">Wellness Score</h3>
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <svg className="transform -rotate-90 w-full h-full">
                                        <circle
                                            cx="50%"
                                            cy="50%"
                                            r="45%"
                                            stroke="rgba(255,255,255,0.2)"
                                            strokeWidth="10"
                                            fill="none"
                                        />
                                        <motion.circle
                                            cx="50%"
                                            cy="50%"
                                            r="45%"
                                            stroke="white"
                                            strokeWidth="10"
                                            fill="none"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: (stats.avgMood / 5) }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            strokeDasharray="1 1"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <p className="text-4xl font-bold">{((stats.avgMood / 5) * 100).toFixed(0)}%</p>
                                        <p className="text-sm opacity-80">Overall</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-center">
                                    <div className="bg-white/20 rounded-lg p-3">
                                        <p className="text-2xl font-bold">{stats.weekAvg}</p>
                                        <p className="text-xs opacity-80">Week</p>
                                    </div>
                                    <div className="bg-white/20 rounded-lg p-3">
                                        <p className="text-2xl font-bold">{stats.monthAvg}</p>
                                        <p className="text-xs opacity-80">Month</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Milestone Tracker */}
                            <motion.div
                                variants={itemVariants}
                                className="rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 p-6 sm:p-8 text-white shadow-2xl"
                            >
                                <Trophy className="w-10 h-10 mb-4" />
                                <h3 className="text-xl font-bold mb-4">Milestones</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: "First Entry", achieved: stats.total >= 1, icon: "🎯" },
                                        { label: "7 Day Streak", achieved: stats.streak >= 7, icon: "🔥" },
                                        { label: "30 Entries", achieved: stats.total >= 30, icon: "📅" },
                                        { label: "Consistent Tracker", achieved: stats.total >= 60, icon: "⭐" },
                                    ].map((milestone, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`flex items-center gap-3 p-3 rounded-lg ${milestone.achieved
                                                    ? "bg-white/30 backdrop-blur-sm"
                                                    : "bg-white/10"
                                                }`}
                                        >
                                            <span className="text-2xl">{milestone.icon}</span>
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm">{milestone.label}</p>
                                            </div>
                                            {milestone.achieved ? (
                                                <Check className="w-5 h-5" />
                                            ) : (
                                                <div className="w-5 h-5 rounded-full border-2 border-white/50" />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}

                {/* Wellness Tips */}
                <motion.div
                    variants={itemVariants}
                    className="rounded-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-purple-200 p-6 sm:p-8"
                >
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-4 bg-white rounded-2xl shadow-md">
                            <Info className="w-8 h-8 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Daily Wellness Tips
                            </h3>
                            <p className="text-gray-600">
                                Simple practices to boost your emotional well-being
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: Sun, title: "Morning Ritual", desc: "Start with 10min meditation", color: "bg-yellow-100 text-yellow-700" },
                            { icon: Activity, title: "Move Daily", desc: "30min physical activity", color: "bg-green-100 text-green-700" },
                            { icon: Heart, title: "Connect", desc: "Quality time with loved ones", color: "bg-pink-100 text-pink-700" },
                            { icon: Moon, title: "Rest Well", desc: "7-9 hours quality sleep", color: "bg-indigo-100 text-indigo-700" },
                        ].map((tip, index) => {
                            const TipIcon = tip.icon;
                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all"
                                >
                                    <div className={`w-12 h-12 rounded-lg ${tip.color} flex items-center justify-center mb-3`}>
                                        <TipIcon className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-bold text-gray-800 mb-1">{tip.title}</h4>
                                    <p className="text-sm text-gray-600">{tip.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Achievement Banner */}
                {stats.streak >= 7 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 p-6 sm:p-8 text-white shadow-2xl"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                                >
                                    <Award className="w-10 h-10" />
                                </motion.div>
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                                        🎉 {stats.streak} Day Streak!
                                    </h3>
                                    <p className="text-white/90">
                                        Incredible consistency! You're building lasting habits.
                                    </p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
                            >
                                Share Your Journey
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Bottom CTA */}
                <motion.div
                    variants={itemVariants}
                    className="rounded-2xl bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />

                    <div className="relative text-center max-w-3xl mx-auto">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Sparkles className="w-16 h-16 mx-auto mb-6 text-purple-400" />
                        </motion.div>
                        <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                            Your Emotional Wellness Journey
                        </h3>
                        <p className="text-lg text-gray-300 mb-8">
                            Track daily, understand patterns, and build lasting emotional resilience.
                            Your mental health matters.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                            >
                                View Full Analytics
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
                            >
                                Get Premium Insights
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}