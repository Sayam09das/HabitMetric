import React, { useState } from "react";
import COLORS from "../data/colors";

export default function MoodTracker({ initialMood = "😊", initialHistory = [], onUpdate }) {
    const [currentMood, setCurrentMood] = useState(initialMood);
    const [history, setHistory] = useState(initialHistory);

    const moods = [
        { emoji: "😄", label: "Great", value: 5 },
        { emoji: "😊", label: "Good", value: 4 },
        { emoji: "😐", label: "Okay", value: 3 },
        { emoji: "😢", label: "Sad", value: 2 },
        { emoji: "😡", label: "Angry", value: 1 },
    ];

    const chooseMood = (m) => {
        setCurrentMood(m.emoji);
        const newHistory = [...history.slice(-6), { date: new Date().toLocaleDateString("en-US", { weekday: "short" }), mood: m.emoji }];
        setHistory(newHistory);
        onUpdate?.({ mood: m.emoji, history: newHistory });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold" style={{ color: COLORS.textMain }}>Mood Tracker</h1>

            <div className="rounded-xl p-6 shadow-sm border" style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.border }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.textMain }}>How are you feeling today?</h2>
                <div className="flex gap-4 justify-center">
                    {moods.map(mood => (
                        <button
                            key={mood.emoji}
                            onClick={() => chooseMood(mood)}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all hover:scale-110"
                            style={{
                                backgroundColor: currentMood === mood.emoji ? COLORS.primaryLight : COLORS.background,
                                border: `2px solid ${currentMood === mood.emoji ? COLORS.primary : COLORS.border}`
                            }}
                        >
                            <span className="text-4xl">{mood.emoji}</span>
                            <span className="text-xs font-medium" style={{ color: COLORS.textLight }}>{mood.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="rounded-xl p-6 shadow-sm border" style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.border }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: COLORS.textMain }}>Recent Mood</h2>
                <div className="flex justify-around items-end h-32">
                    {history.length === 0 ? <p style={{ color: COLORS.textLight }}>No mood entries yet.</p> :
                        history.map((day, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <span className="text-2xl">{day.mood}</span>
                                <span className="text-xs" style={{ color: COLORS.textLight }}>{day.date}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
