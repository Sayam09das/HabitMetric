import React, { useState } from "react";
import { Edit2, Trash2, Flame, Plus } from "lucide-react";
import COLORS from "../data/colors";

export default function Habits({ initialHabits = [], onUpdate }) {
    const [habits, setHabits] = useState(initialHabits);

    const deleteHabit = (id) => {
        const updated = habits.filter(h => h.id !== id);
        setHabits(updated);
        onUpdate?.(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold" style={{ color: COLORS.textMain }}>My Habits</h1>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium hover:scale-105 transition-transform" style={{ backgroundColor: COLORS.primary, color: "white" }}>
                    <Plus className="w-5 h-5" /> Add Habit
                </button>
            </div>

            <div className="space-y-3">
                {habits.map(habit => (
                    <div key={habit.id} className="rounded-xl p-5 shadow-sm border flex items-center justify-between hover:shadow-md transition-all" style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.border }}>
                        <div className="flex items-center gap-4">
                            <span className="text-3xl">{habit.icon}</span>
                            <div>
                                <h3 className="font-semibold" style={{ color: COLORS.textMain }}>{habit.title}</h3>
                                <p className="text-sm" style={{ color: COLORS.textLight }}>{habit.frequency} • {habit.streak} day streak</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: COLORS.accent + "15" }}>
                                <Flame className="w-4 h-4" style={{ color: COLORS.error }} />
                                <span className="font-semibold" style={{ color: COLORS.accent }}>{habit.streak}</span>
                            </div>

                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <Edit2 className="w-4 h-4" style={{ color: COLORS.textLight }} />
                            </button>

                            <button onClick={() => deleteHabit(habit.id)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <Trash2 className="w-4 h-4" style={{ color: COLORS.error }} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
