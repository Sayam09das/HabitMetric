import React from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StatCard from "../Components/StatCard";
import { Flame, Target, CheckSquare, Smile } from "lucide-react";
import COLORS from "../data/colors";

export default function Analytics({ habits = [], todayCheckins = [], weeklyProgress = [] }) {
    const getStreak = () => (habits.length ? Math.max(...habits.map(h => h.streak)) : 0);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold" style={{ color: COLORS.textMain }}>Progress Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Flame} label="Current Streak" value={`${getStreak()} Days`} color={COLORS.error} trend={12} />
                <StatCard icon={Target} label="Total Habits" value={habits.length} color={COLORS.primary} />
                <StatCard icon={CheckSquare} label="Today's Check-ins" value={`${todayCheckins.length}/${habits.length}`} color={COLORS.accent} />
                <StatCard icon={Smile} label="Avg Mood" value={"😊"} color={COLORS.warning} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-xl p-6 shadow-sm border" style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.border }}>
                    <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.textMain }}>Completion Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weeklyProgress}>
                            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                            <XAxis dataKey="day" stroke={COLORS.textLight} />
                            <YAxis stroke={COLORS.textLight} />
                            <Tooltip />
                            <Line type="monotone" dataKey="completed" stroke={COLORS.primary} strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="rounded-xl p-6 shadow-sm border" style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.border }}>
                    <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.textMain }}>Top Performers</h2>
                    <div className="space-y-3">
                        {habits.sort((a, b) => b.streak - a.streak).slice(0, 5).map(habit => (
                            <div key={habit.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{habit.icon}</span>
                                    <span className="font-medium" style={{ color: COLORS.textMain }}>{habit.title}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Flame className="w-4 h-4" style={{ color: COLORS.error }} />
                                    <span className="font-bold" style={{ color: COLORS.accent }}>{habit.streak}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
