import React, { useState } from "react";
import { Check } from "lucide-react";
import COLORS from "../data/colors";

export default function Checkin({ initialHabits = [], initialCheckins = [], onUpdate }) {
    const [habits] = useState(initialHabits);
    const [todayCheckins, setTodayCheckins] = useState(initialCheckins);

    const toggleCheckin = (habitId) => {
        setTodayCheckins(prev => {
            const next = prev.includes(habitId) ? prev.filter(id => id !== habitId) : [...prev, habitId];
            onUpdate?.(next);
            return next;
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold" style={{ color: COLORS.textMain }}>Daily Check-In</h1>
            <p style={{ color: COLORS.textLight }}>Mark your habits as complete for today</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {habits.map(habit => {
                    const isChecked = todayCheckins.includes(habit.id);
                    return (
                        <button
                            key={habit.id}
                            onClick={() => toggleCheckin(habit.id)}
                            className="rounded-xl p-6 shadow-sm border text-left transition-all hover:shadow-md"
                            style={{
                                backgroundColor: isChecked ? COLORS.primaryLight : COLORS.cardBg,
                                borderColor: isChecked ? COLORS.primary : COLORS.border,
                                borderWidth: isChecked ? "2px" : "1px",
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{habit.icon}</span>
                                    <div>
                                        <h3 className="font-semibold" style={{ color: COLORS.textMain }}>{habit.title}</h3>
                                        <p className="text-sm" style={{ color: COLORS.textLight }}>{habit.frequency}</p>
                                    </div>
                                </div>

                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isChecked ? "scale-110" : ""}`}
                                    style={{ backgroundColor: isChecked ? COLORS.accent : COLORS.border, color: "white" }}>
                                    {isChecked && <Check className="w-5 h-5" strokeWidth={3} />}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
