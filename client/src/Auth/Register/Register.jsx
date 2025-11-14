"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    User,
    UserPlus,
    Mail,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Sparkles,
} from "lucide-react";

const API_ORIGIN = import.meta.env.VITE_PRIVATE_API_URL;

export default function Register() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });
    const [emailValid, setEmailValid] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [nameValid, setNameValid] = useState(false);
    const [touched, setTouched] = useState({
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false,
        terms: false,
    });

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [successEmail, setSuccessEmail] = useState("");
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    const containerRef = useRef(null);
    const cardRef = useRef(null);

    // Toast notification function
    const showToast = (message, type = "info") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    };

    useEffect(() => {
        setNameValid(formData.fullName.trim().length >= 3);
    }, [formData.fullName]);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(formData.email));
    }, [formData.email]);

    useEffect(() => {
        setPasswordValidation({
            minLength: formData.password.length >= 8,
            hasUpperCase: /[A-Z]/.test(formData.password),
            hasLowerCase: /[a-z]/.test(formData.password),
            hasNumber: /[0-9]/.test(formData.password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
        });
    }, [formData.password]);

    useEffect(() => {
        setPasswordsMatch(
            formData.password === formData.confirmPassword &&
            formData.confirmPassword.length > 0
        );
    }, [formData.password, formData.confirmPassword]);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const markTouched = (field) =>
        setTouched((prev) => ({ ...prev, [field]: true }));

    const ValidationItem = ({ isValid, text }) => (
        <div className="flex items-center gap-2 text-sm">
            {isValid ? (
                <CheckCircle2 className="w-4 h-4" style={{ color: "#10B981" }} />
            ) : (
                <XCircle className="w-4 h-4" style={{ color: "#EF4444" }} />
            )}
            <span style={{ color: isValid ? "#10B981" : "#475569" }}>{text}</span>
        </div>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({
            fullName: true,
            email: true,
            password: true,
            confirmPassword: true,
            terms: true,
        });
        setServerError("");
        setSuccessMessage("");
        setSuccessEmail("");

        const isValid =
            nameValid &&
            emailValid &&
            Object.values(passwordValidation).every((v) => v) &&
            passwordsMatch &&
            termsAccepted;

        if (!isValid) {
            if (!termsAccepted) {
                setServerError("You must accept the Terms of Service and Privacy Policy.");
                showToast("You must accept the Terms of Service and Privacy Policy.", "error");
            } else {
                showToast("Please fix the highlighted fields.", "error");
            }
            return;
        }

        setLoading(true);
        showToast("Creating account...", "info");

        try {
            const payload = {
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
            };

            const res = await fetch(`${API_ORIGIN}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => ({ message: "No JSON response" }));

            if (!res.ok) {
                const message =
                    data?.message || data?.error || `Request failed with status ${res.status}`;
                setServerError(message);
                showToast(message, "error");
            } else {
                setSuccessMessage("Registration successful!");
                setSuccessEmail(formData.email);
                showToast("Registration successful — check your email!", "success");

                // Reset form after a short delay
                setTimeout(() => {
                    setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
                    setTouched({
                        fullName: false,
                        email: false,
                        password: false,
                        confirmPassword: false,
                        terms: false,
                    });
                    setTermsAccepted(false);
                }, 500);
            }
        } catch (err) {
            setServerError("Network error — please try again.");
            showToast("Network error — please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            ref={containerRef}
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F9FAFB 50%, #ECFDF5 100%)' }}
        >
            {/* Toast Notification */}
            {toast.show && (
                <div
                    className="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in"
                    style={{
                        backgroundColor: toast.type === "error" ? "#FEE2E2" : toast.type === "success" ? "#D1FAE5" : "#DBEAFE",
                        color: toast.type === "error" ? "#991B1B" : toast.type === "success" ? "#065F46" : "#1E40AF",
                        maxWidth: "400px"
                    }}
                >
                    {toast.type === "error" && <XCircle size={20} />}
                    {toast.type === "success" && <CheckCircle2 size={20} />}
                    {toast.type === "info" && <AlertCircle size={20} />}
                    <span className="text-sm font-medium">{toast.message}</span>
                </div>
            )}

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20">
                    <Sparkles size={28} style={{ color: '#4F46E5', opacity: 0.4 }} />
                </div>
                <div className="absolute top-32 right-24">
                    <Sparkles size={36} style={{ color: '#10B981', opacity: 0.3 }} />
                </div>
                <div className="absolute bottom-40 left-32">
                    <Sparkles size={32} style={{ color: '#6366F1', opacity: 0.35 }} />
                </div>
                <div className="absolute bottom-24 right-28">
                    <Sparkles size={24} style={{ color: '#F59E0B', opacity: 0.4 }} />
                </div>
                <div className="absolute top-1/2 left-16">
                    <Sparkles size={20} style={{ color: '#EF4444', opacity: 0.25 }} />
                </div>
            </div>

            {/* Register Card */}
            <div
                ref={cardRef}
                className="w-full max-w-md rounded-2xl shadow-2xl p-8 relative z-10"
                style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                }}
            >
                <div className="max-w-md mx-auto" aria-live="polite">
                    <div className="text-center mb-6">
                        <div
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                            style={{
                                background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
                            }}
                        >
                            <UserPlus size={32} style={{ color: "#FFFFFF" }} />
                        </div>
                        <h1 className="text-3xl font-bold mb-2" style={{ color: "#1E293B" }}>
                            Create Account
                        </h1>
                        <p style={{ color: "#475569" }}>Join us and start your journey today</p>
                    </div>

                    {/* Error Message */}
                    {serverError && (
                        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: "#FEE2E2", color: "#991B1B" }}>
                            <div className="flex items-start gap-2">
                                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{serverError}</span>
                            </div>
                        </div>
                    )}

                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: "#D1FAE5", color: "#065F46" }}>
                            <div className="flex items-start gap-2 mb-2">
                                <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" />
                                <span className="text-sm font-medium">{successMessage}</span>
                            </div>
                            {successEmail && (
                                <p className="text-xs mt-2 ml-6" style={{ color: "#047857" }}>
                                    We've sent a verification email to <strong>{successEmail}</strong>.
                                    <br />
                                    Please check your inbox and spam folder.
                                </p>
                            )}
                        </div>
                    )}

                    <div className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "#1E293B" }}>
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <User size={20} style={{ color: "#475569" }} />
                                </div>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                                    onBlur={() => markTouched("fullName")}
                                    placeholder="John Doe"
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border-2 outline-none transition-all duration-300"
                                    aria-invalid={touched.fullName && !nameValid}
                                    style={{
                                        borderColor: touched.fullName ? (nameValid ? "#10B981" : "#EF4444") : "#E2E8F0",
                                        backgroundColor: "#F9FAFB",
                                        color: "#1E293B",
                                    }}
                                />
                                {touched.fullName && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        {nameValid ? <CheckCircle2 size={20} style={{ color: "#10B981" }} /> : <AlertCircle size={20} style={{ color: "#EF4444" }} />}
                                    </div>
                                )}
                            </div>
                            {touched.fullName && !nameValid && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>Name must be at least 3 characters</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "#1E293B" }}>Email Address</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <Mail size={20} style={{ color: "#475569" }} />
                                </div>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    onBlur={() => markTouched("email")}
                                    placeholder="you@example.com"
                                    className="w-full pl-11 pr-4 py-3 rounded-lg border-2 outline-none transition-all duration-300"
                                    aria-invalid={touched.email && !emailValid}
                                    style={{
                                        borderColor: touched.email ? (emailValid ? "#10B981" : "#EF4444") : "#E2E8F0",
                                        backgroundColor: "#F9FAFB",
                                        color: "#1E293B",
                                    }}
                                />
                                {touched.email && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        {emailValid ? <CheckCircle2 size={20} style={{ color: "#10B981" }} /> : <AlertCircle size={20} style={{ color: "#EF4444" }} />}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "#1E293B" }}>Password</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <Lock size={20} style={{ color: "#475569" }} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                    onBlur={() => markTouched("password")}
                                    placeholder="Create a strong password"
                                    className="w-full pl-11 pr-12 py-3 rounded-lg border-2 outline-none transition-all duration-300"
                                    aria-invalid={touched.password && !Object.values(passwordValidation).every(Boolean)}
                                    style={{
                                        borderColor: touched.password
                                            ? Object.values(passwordValidation).every((v) => v)
                                                ? "#10B981"
                                                : "#F59E0B"
                                            : "#E2E8F0",
                                        backgroundColor: "#F9FAFB",
                                        color: "#1E293B",
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-300"
                                    style={{ backgroundColor: showPassword ? "#EEF2FF" : "transparent" }}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={20} style={{ color: "#4F46E5" }} /> : <Eye size={20} style={{ color: "#475569" }} />}
                                </button>
                            </div>

                            {touched.password && formData.password && (
                                <div className="mt-3 p-3 rounded-lg space-y-1" style={{ backgroundColor: "#F9FAFB" }}>
                                    <ValidationItem isValid={passwordValidation.minLength} text="At least 8 characters" />
                                    <ValidationItem isValid={passwordValidation.hasUpperCase} text="One uppercase letter" />
                                    <ValidationItem isValid={passwordValidation.hasLowerCase} text="One lowercase letter" />
                                    <ValidationItem isValid={passwordValidation.hasNumber} text="One number" />
                                    <ValidationItem isValid={passwordValidation.hasSpecialChar} text="One special character" />
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "#1E293B" }}>Confirm Password</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <Lock size={20} style={{ color: "#475569" }} />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                    onBlur={() => markTouched("confirmPassword")}
                                    placeholder="Confirm your password"
                                    className="w-full pl-11 pr-12 py-3 rounded-lg border-2 outline-none transition-all duration-300"
                                    aria-invalid={touched.confirmPassword && !passwordsMatch}
                                    style={{
                                        borderColor: touched.confirmPassword ? (passwordsMatch ? "#10B981" : "#EF4444") : "#E2E8F0",
                                        backgroundColor: "#F9FAFB",
                                        color: "#1E293B",
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-300"
                                    style={{ backgroundColor: showConfirmPassword ? "#EEF2FF" : "transparent" }}
                                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                >
                                    {showConfirmPassword ? <EyeOff size={20} style={{ color: "#4F46E5" }} /> : <Eye size={20} style={{ color: "#475569" }} />}
                                </button>

                                {touched.confirmPassword && formData.confirmPassword && (
                                    <div className="absolute right-12 top-1/2 -translate-y-1/2">
                                        {passwordsMatch ? (
                                            <CheckCircle2 size={20} style={{ color: "#10B981" }} />
                                        ) : (
                                            <XCircle size={20} style={{ color: "#EF4444" }} />
                                        )}
                                    </div>
                                )}
                            </div>
                            {touched.confirmPassword && !passwordsMatch && formData.confirmPassword && (
                                <p className="text-xs mt-1" style={{ color: "#EF4444" }}>Passwords don't match</p>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2 pt-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="w-4 h-4 mt-0.5 rounded cursor-pointer"
                                style={{ accentColor: "#4F46E5" }}
                                checked={termsAccepted}
                                onChange={(e) => {
                                    setTermsAccepted(e.target.checked);
                                    markTouched("terms");
                                }}
                            />
                            <label htmlFor="terms" className="text-sm cursor-pointer" style={{ color: "#475569" }}>
                                I agree to the{" "}
                                <a href="#" className="font-medium hover:underline" style={{ color: "#4F46E5" }}>Terms of Service</a>{" "}
                                and{" "}
                                <a href="#" className="font-medium hover:underline" style={{ color: "#4F46E5" }}>Privacy Policy</a>
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg cursor-pointer"
                            style={{
                                background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
                                color: "#FFFFFF",
                            }}
                            disabled={loading}
                            aria-disabled={loading}
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm" style={{ color: "#475569" }}>
                        Already have an account?{" "}
                        <a href="/login" className="font-medium hover:underline" style={{ color: "#4F46E5" }}>Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
}