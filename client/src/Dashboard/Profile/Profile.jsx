import React, { useState, useCallback } from "react";
import { User, Mail, Smartphone, Globe, Clock, Upload, Camera, LogOut, Moon, Sun } from "lucide-react";
import COLORS from "../data/colors"

export default function Profile() {
    const [darkMode, setDarkMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "Sayam Das",
        email: "sayam@example.com",
        phone: "+91 98765 43210",
        location: "Kolkata, India",
        timezone: "Asia/Kolkata",
        language: "English",
    });

    const colors = darkMode ? DARK_COLORS : COLORS;

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = useCallback(() => {
        console.log("Saving profile data:", formData);
        alert("Profile saved successfully!");
    }, [formData]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: colors.background,
                transition: "background 0.3s ease",
            }}
        >
            {/* ✅ Normal Header */}
            <div
                style={{
                    borderBottom: `1px solid ${colors.border}`,
                    background: colors.cardBg,
                    transition: "all 0.3s ease",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
            >
                <div
                    style={{
                        maxWidth: "1280px",
                        margin: "0 auto",
                        padding: "16px 20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "12px",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            color: colors.textMain,
                            margin: 0,
                        }}
                    >
                        Profile Settings
                    </h1>
                </div>
            </div>


            {/* ✅ Main Content */}
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 20px" }}>
                <p style={{ color: colors.textLight, fontSize: "14px", marginBottom: "24px" }}>
                    Manage your account information and preferences.
                </p>

                <div style={{ display: "grid", gap: "24px" }}>
                    {/* ✅ User Info Card */}
                    <div
                        style={{
                            border: `1px solid ${colors.border}`,
                            borderRadius: "16px",
                            background: colors.cardBg,
                            padding: "24px",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                            <div style={{ position: "relative" }}>
                                <div
                                    style={{
                                        width: "56px",
                                        height: "56px",
                                        borderRadius: "50%",
                                        background: `linear-gradient(135deg, ${COLORS.primary} 0%, #7C3AED 100%)`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                        fontWeight: "700",
                                        fontSize: "20px",
                                    }}
                                >
                                    {formData.name.charAt(0)}
                                </div>
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "-2px",
                                        right: "-2px",
                                        width: "16px",
                                        height: "16px",
                                        background: "#10B981",
                                        borderRadius: "50%",
                                        border: `3px solid ${colors.cardBg}`,
                                    }}
                                />
                            </div>
                            <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                                <p style={{ fontWeight: "600", fontSize: "16px", color: colors.textMain, margin: "0 0 4px 0" }}>
                                    {formData.name}
                                </p>
                                <p style={{ fontSize: "14px", color: colors.textLight, margin: 0 }}>
                                    {formData.email}
                                </p>
                            </div>
                            <button
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "10px 18px",
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: colors.textMain,
                                    background: colors.background,
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* ✅ Profile Picture */}
                    <div
                        style={{
                            borderRadius: "16px",
                            background: colors.cardBg,
                            border: `1px solid ${colors.border}`,
                            padding: "24px",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <h2 style={{ fontSize: "18px", fontWeight: "700", color: colors.textMain, margin: "0 0 24px 0" }}>
                            Profile Picture
                        </h2>
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "24px" }}>
                            <div style={{ position: "relative" }}>
                                <div
                                    style={{
                                        width: "128px",
                                        height: "128px",
                                        borderRadius: "50%",
                                        background: `linear-gradient(135deg, ${COLORS.primary} 0%, #7C3AED 100%)`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                        fontWeight: "700",
                                        fontSize: "48px",
                                    }}
                                >
                                    {formData.name.charAt(0)}
                                </div>
                                <button
                                    style={{
                                        position: "absolute",
                                        bottom: "4px",
                                        right: "4px",
                                        width: "40px",
                                        height: "40px",
                                        background: COLORS.primary,
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                        border: `3px solid ${colors.cardBg}`,
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    <Camera size={20} />
                                </button>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: "16px", fontWeight: "600", color: colors.textMain, margin: "0 0 8px 0" }}>
                                    Upload New Photo
                                </h3>
                                <p style={{ fontSize: "14px", color: colors.textLight, margin: "0 0 16px 0" }}>
                                    JPG, PNG or GIF. Max size 5MB
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                    <button
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            padding: "10px 18px",
                                            background: COLORS.primary,
                                            color: "white",
                                            borderRadius: "8px",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            border: "none",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        <Upload size={16} />
                                        Upload
                                    </button>
                                    <button
                                        style={{
                                            padding: "10px 18px",
                                            border: `1px solid ${colors.border}`,
                                            color: colors.textMain,
                                            borderRadius: "8px",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            background: colors.background,
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ✅ Personal Information */}
                    <div
                        style={{
                            borderRadius: "16px",
                            background: colors.cardBg,
                            border: `1px solid ${colors.border}`,
                            padding: "24px",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <h2 style={{ fontSize: "18px", fontWeight: "700", color: colors.textMain, margin: "0 0 24px 0" }}>
                            Personal Information
                        </h2>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                                gap: "24px",
                            }}
                        >
                            {[
                                { label: "Full Name", icon: User, field: "name", type: "text" },
                                { label: "Email Address", icon: Mail, field: "email", type: "email" },
                                { label: "Phone Number", icon: Smartphone, field: "phone", type: "tel" },
                                { label: "Location", icon: Globe, field: "location", type: "text" },
                            ].map(({ label, icon: Icon, field, type }) => (
                                <div key={field}>
                                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "600", color: colors.textMain, marginBottom: "8px" }}>
                                        <Icon size={16} />
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        value={formData[field]}
                                        onChange={(e) => handleInputChange(field, e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "12px 16px",
                                            borderRadius: "10px",
                                            border: `2px solid ${colors.border}`,
                                            outline: "none",
                                            transition: "all 0.2s ease",
                                            color: colors.textMain,
                                            background: colors.background,
                                            fontSize: "14px",
                                            fontFamily: "inherit",
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = COLORS.primary;
                                            e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}20`;
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = colors.border;
                                            e.target.style.boxShadow = "none";
                                        }}
                                    />
                                </div>
                            ))}

                            <div>
                                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "600", color: colors.textMain, marginBottom: "8px" }}>
                                    <Clock size={16} />
                                    Timezone
                                </label>
                                <select
                                    value={formData.timezone}
                                    onChange={(e) => handleInputChange("timezone", e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "12px 16px",
                                        borderRadius: "10px",
                                        border: `2px solid ${colors.border}`,
                                        outline: "none",
                                        transition: "all 0.2s ease",
                                        color: colors.textMain,
                                        background: colors.background,
                                        fontSize: "14px",
                                        fontFamily: "inherit",
                                        cursor: "pointer",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = COLORS.primary;
                                        e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}20`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = colors.border;
                                        e.target.style.boxShadow = "none";
                                    }}
                                >
                                    <option>Asia/Kolkata</option>
                                    <option>America/New_York</option>
                                    <option>Europe/London</option>
                                    <option>Asia/Tokyo</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "600", color: colors.textMain, marginBottom: "8px" }}>
                                    <Globe size={16} />
                                    Language
                                </label>
                                <select
                                    value={formData.language}
                                    onChange={(e) => handleInputChange("language", e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "12px 16px",
                                        borderRadius: "10px",
                                        border: `2px solid ${colors.border}`,
                                        outline: "none",
                                        transition: "all 0.2s ease",
                                        color: colors.textMain,
                                        background: colors.background,
                                        fontSize: "14px",
                                        fontFamily: "inherit",
                                        cursor: "pointer",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = COLORS.primary;
                                        e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}20`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = colors.border;
                                        e.target.style.boxShadow = "none";
                                    }}
                                >
                                    <option>English</option>
                                    <option>Hindi</option>
                                    <option>Bengali</option>
                                    <option>Spanish</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ paddingTop: "24px" }}>
                            <button
                                onClick={handleSave}
                                style={{
                                    padding: "12px 32px",
                                    background: COLORS.primary,
                                    color: "white",
                                    borderRadius: "10px",
                                    fontWeight: "600",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.4)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}