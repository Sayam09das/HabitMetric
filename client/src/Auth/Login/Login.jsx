import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Sparkles,
} from "lucide-react";
import { gsap } from "gsap";

const API_ORIGIN =
    import.meta.env.VITE_PRIVATE_API_URL || "http://localhost:3000";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    const [emailValid, setEmailValid] = useState(false);
    const [touched, setTouched] = useState({ email: false, password: false });

    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const titleRef = useRef(null);
    const sparklesRef = useRef([]);

    // Toast function
    const showToast = (message, type = "info") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    };

    // GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(cardRef.current, {
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
            });

            gsap.from(titleRef.current, {
                y: -30,
                opacity: 0,
                duration: 0.6,
                delay: 0.3,
                ease: "power3.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Email validate
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(email));
    }, [email]);

    // Password validate
    useEffect(() => {
        setPasswordValidation({
            minLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        });
    }, [password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setTouched({ email: true, password: true });

        const isValid =
            emailValid && Object.values(passwordValidation).every((v) => v);

        if (!isValid) {
            gsap.to(cardRef.current, {
                x: [0, -10, 10, -10, 10, 0],
                duration: 0.5,
                ease: "power2.out",
            });
            showToast("Please correct the fields!", "error");
            return;
        }

        setLoading(true);
        showToast("Logging in...", "info");

        try {
            const payload = { email, password };
            const res = await axios.post(`${API_ORIGIN}/auth/login`, payload, {
                headers: { "Content-Type": "application/json" },
                timeout: 15000,
            });

            showToast("Login successful!", "success");

            gsap.to(cardRef.current, {
                scale: 1.05,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    // ⭐ Redirect to dashboard here
                    window.location.href = "/dashboard";
                }
            });

            console.log("Login Response:", res.data);

        } catch (err) {
            const message =
                err?.response?.data?.message ||
                "Login failed. Try again.";

            showToast(message, "error");

            gsap.to(cardRef.current, {
                x: [0, -10, 10, -10, 10, 0],
                duration: 0.5,
                ease: "power2.out",
            });
        } finally {
            setLoading(false);
        }
    };


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

    return (
        <div
            ref={containerRef}
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F9FAFB 100%)' }}
        >

            {/* 🌟 TOAST NOTIFICATION */}
            {toast.show && (
                <div
                    className="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in"
                    style={{
                        backgroundColor:
                            toast.type === "error" ? "#FEE2E2" :
                                toast.type === "success" ? "#D1FAE5" :
                                    "#DBEAFE",
                        color:
                            toast.type === "error" ? "#991B1B" :
                                toast.type === "success" ? "#065F46" :
                                    "#1E40AF",
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
                <div ref={el => sparklesRef.current[0] = el} className="absolute top-20 left-20">
                    <Sparkles size={24} style={{ color: '#4F46E5', opacity: 0.3 }} />
                </div>
                <div ref={el => sparklesRef.current[1] = el} className="absolute top-40 right-32">
                    <Sparkles size={32} style={{ color: '#10B981', opacity: 0.2 }} />
                </div>
                <div ref={el => sparklesRef.current[2] = el} className="absolute bottom-32 left-40">
                    <Sparkles size={28} style={{ color: '#6366F1', opacity: 0.25 }} />
                </div>
                <div ref={el => sparklesRef.current[3] = el} className="absolute bottom-20 right-20">
                    <Sparkles size={20} style={{ color: '#F59E0B', opacity: 0.3 }} />
                </div>
            </div>

            {/* Login Card */}
            <div
                ref={cardRef}
                className="w-full max-w-md rounded-2xl shadow-2xl p-8 relative z-10"
                style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0'
                }}
            >
                {/* Header */}
                <div ref={titleRef} className="text-center mb-8">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                        style={{ backgroundColor: '#EEF2FF' }}
                    >
                        <Lock size={32} style={{ color: '#4F46E5' }} />
                    </div>
                    <h1 className="text-3xl font-bold mb-2" style={{ color: '#1E293B' }}>
                        Welcome Back
                    </h1>
                    <p style={{ color: '#475569' }}>
                        Sign in to continue your journey
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#1E293B' }}>
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => setTouched({ ...touched, email: true })}
                                placeholder="you@example.com"
                                className="w-full pl-11 pr-4 py-3 rounded-lg border-2"
                                style={{
                                    borderColor: touched.email ? (emailValid ? '#10B981' : '#EF4444') : '#E2E8F0',
                                    backgroundColor: '#F9FAFB',
                                    color: '#1E293B'
                                }}
                            />

                            {touched.email && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {emailValid ? (
                                        <CheckCircle2 size={20} style={{ color: '#10B981' }} />
                                    ) : (
                                        <AlertCircle size={20} style={{ color: '#EF4444' }} />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#1E293B' }}>
                            Password
                        </label>
                        <div className="relative">
                            <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => setTouched({ ...touched, password: true })}
                                placeholder="Enter your password"
                                className="w-full pl-11 pr-12 py-3 rounded-lg border-2"
                                style={{
                                    borderColor: touched.password
                                        ? (Object.values(passwordValidation).every(v => v) ? '#10B981' : '#F59E0B')
                                        : '#E2E8F0',
                                    backgroundColor: '#F9FAFB',
                                    color: '#1E293B'
                                }}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full"
                                style={{ backgroundColor: showPassword ? '#EEF2FF' : 'transparent' }}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} style={{ color: '#4F46E5' }} />
                                ) : (
                                    <Eye size={20} style={{ color: '#475569' }} />
                                )}
                            </button>
                        </div>

                        {/* Password validation */}
                        {touched.password && password && (
                            <div className="mt-3 p-3 rounded-lg space-y-1" style={{ backgroundColor: '#F9FAFB' }}>
                                <ValidationItem isValid={passwordValidation.minLength} text="At least 8 characters" />
                                <ValidationItem isValid={passwordValidation.hasUpperCase} text="One uppercase letter" />
                                <ValidationItem isValid={passwordValidation.hasLowerCase} text="One lowercase letter" />
                                <ValidationItem isValid={passwordValidation.hasNumber} text="One number" />
                                <ValidationItem isValid={passwordValidation.hasSpecialChar} text="One special character" />
                            </div>
                        )}
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" style={{ accentColor: '#4F46E5' }} />
                            <span className="text-sm" style={{ color: '#475569' }}>Remember me</span>
                        </label>

                        <a href="#" className="text-sm font-medium hover:underline" style={{ color: '#4F46E5' }}>
                            Forgot password?
                        </a>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                        style={{ backgroundColor: '#4F46E5', color: '#FFFFFF' }}
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm" style={{ color: '#475569' }}>
                        Don't have an account?{" "}
                        <a href="/register" className="font-medium hover:underline" style={{ color: '#4F46E5' }}>
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );

};

export default Login;