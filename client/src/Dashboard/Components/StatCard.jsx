import React from "react";
import COLORS from "../data/colors";

const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div
        className="rounded-xl p-6 shadow-sm border transition-all hover:shadow-md"
        style={{ backgroundColor: COLORS.cardBg, borderColor: COLORS.border }}
    >
        <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}15` }}>
                <Icon className="w-6 h-6" style={{ color }} />
            </div>
            {trend != null && (
                <span
                    className="text-xs font-medium px-2 py-1 rounded-full"
                    style={{ backgroundColor: COLORS.accent + "15", color: COLORS.accent }}
                >
                    +{trend}%
                </span>
            )}
        </div>
        <p className="text-sm font-medium mb-1" style={{ color: COLORS.textLight }}>
            {label}
        </p>
        <p className="text-2xl font-bold" style={{ color: COLORS.textMain }}>
            {value}
        </p>
    </div>
);

export default StatCard;
