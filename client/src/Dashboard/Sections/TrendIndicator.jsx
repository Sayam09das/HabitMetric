import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export default function TrendIndicator({ value = 0, size = 18 }) {
    // Decide the color + icon based on trend value
    let color = "text-gray-400";
    let Icon = Minus;

    if (value > 0) {
        color = "text-green-500";
        Icon = ArrowUpRight;
    } else if (value < 0) {
        color = "text-red-500";
        Icon = ArrowDownRight;
    }

    return (
        <div className="flex items-center gap-1">
            <Icon size={size} className={`${color} transition-transform duration-200`} />
            <span className={`text-sm font-medium ${color}`}>
                {value > 0 ? `+${value}` : value}
            </span>
        </div>
    );
}
