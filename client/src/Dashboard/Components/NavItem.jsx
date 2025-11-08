import React from "react";
import COLORS  from "../data/colors";

// NavItem Component
const NavItem = ({ icon: Icon, label, to, isActive, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left font-medium text-sm"
        style={{
            backgroundColor: isActive ? COLORS.primaryLight : "transparent",
            color: isActive ? COLORS.primary : COLORS.textLight,
        }}
        onMouseEnter={(e) => {
            if (!isActive) {
                e.currentTarget.style.backgroundColor = `${COLORS.primary}08`;
            }
        }}
        onMouseLeave={(e) => {
            if (!isActive) {
                e.currentTarget.style.backgroundColor = "transparent";
            }
        }}
    >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="truncate">{label}</span>
    </button>
);

export default NavItem;
