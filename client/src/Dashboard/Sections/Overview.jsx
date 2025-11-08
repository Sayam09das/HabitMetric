import React from "react";
import StatCard from "../Components/StatCard";
import COLORS  from "../data/colors";
import { Flame, Target, CheckSquare, Smile } from "lucide-react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

export default function Overview({ habits, todayCheckins, currentMood, weeklyProgress }) {
    const getStreak = () => Math.max(...habits.map(h => h.streak));

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold" style={{ color: COLORS.textMain }}>Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Flame} label="Current Streak" value={`${getStreak()} Days`} color={COLORS.error} trend={15} />
                <StatCard icon={Target} label="Total Habits" value={habits.length} color={COLORS.primary} />
                <StatCard icon={CheckSquare} label="Today's Check-ins" value={`${todayCheckins.length}/${habits.length}`} color={COLORS.accent} />
                <StatCard icon={Smile} label="Current Mood" value={currentMood} color={COLORS.warning} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-xl p-6 shadow-sm border" style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.border }}>
                    <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.textMain }}>Weekly Progress</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={weeklyProgress}>
                            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                            <XAxis dataKey="day" stroke={COLORS.textLight} />
                            <YAxis stroke={COLORS.textLight} />
                            <Tooltip />
                            <Bar dataKey="completed" fill={COLORS.primary} radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
