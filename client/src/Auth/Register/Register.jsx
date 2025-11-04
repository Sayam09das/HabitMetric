import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle2, XCircle, AlertCircle, Sparkles, UserPlus } from 'lucide-react';
import { gsap } from 'gsap';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false
    });
    const [emailValid, setEmailValid] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [nameValid, setNameValid] = useState(false);
    const [touched, setTouched] = useState({
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false
    });

    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const titleRef = useRef(null);
    const sparklesRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(cardRef.current, {
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
                ease: 'back.out(1.7)'
            });

            gsap.from(titleRef.current, {
                y: -30,
                opacity: 0,
                duration: 0.6,
                delay: 0.3,
                ease: 'power3.out'
            });

            sparklesRef.current.forEach((sparkle, i) => {
                if (sparkle) {
                    gsap.to(sparkle, {
                        y: '+=15',
                        x: '+=10',
                        rotation: 360,
                        duration: 3 + i * 0.4,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                        delay: i * 0.3
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

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
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
        });
    }, [formData.password]);

    useEffect(() => {
        setPasswordsMatch(
            formData.password === formData.confirmPassword &&
            formData.confirmPassword.length > 0
        );
    }, [formData.password, formData.confirmPassword]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid =
            nameValid &&
            emailValid &&
            Object.values(passwordValidation).every(v => v) &&
            passwordsMatch;

        if (isValid) {
            gsap.to(cardRef.current, {
                scale: 1.05,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    alert('Registration successful! 🎉 Welcome aboard!');
                }
            });
        } else {
            gsap.to(cardRef.current, {
                x: [0, -10, 10, -10, 10, 0],
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    };

    const ValidationItem = ({ isValid, text }) => (
        <div className="flex items-center gap-2 text-sm">
            {isValid ? (
                <CheckCircle2 className="w-4 h-4" style={{ color: '#10B981' }} />
            ) : (
                <XCircle className="w-4 h-4" style={{ color: '#EF4444' }} />
            )}
            <span style={{ color: isValid ? '#10B981' : '#475569' }}>{text}</span>
        </div>
    );

    return (
        <div
            ref={containerRef}
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F9FAFB 50%, #ECFDF5 100%)' }}
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div ref={el => sparklesRef.current[0] = el} className="absolute top-20 left-20">
                    <Sparkles size={28} style={{ color: '#4F46E5', opacity: 0.4 }} />
                </div>
                <div ref={el => sparklesRef.current[1] = el} className="absolute top-32 right-24">
                    <Sparkles size={36} style={{ color: '#10B981', opacity: 0.3 }} />
                </div>
                <div ref={el => sparklesRef.current[2] = el} className="absolute bottom-40 left-32">
                    <Sparkles size={32} style={{ color: '#6366F1', opacity: 0.35 }} />
                </div>
                <div ref={el => sparklesRef.current[3] = el} className="absolute bottom-24 right-28">
                    <Sparkles size={24} style={{ color: '#F59E0B', opacity: 0.4 }} />
                </div>
                <div ref={el => sparklesRef.current[4] = el} className="absolute top-1/2 left-16">
                    <Sparkles size={20} style={{ color: '#EF4444', opacity: 0.25 }} />
                </div>
            </div>

            {/* Register Card */}
            <div
                ref={cardRef}
                className="w-full max-w-md rounded-2xl shadow-2xl p-8 relative z-10"
                style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0'
                }}
            >
                {/* Header */}
                <div ref={titleRef} className="text-center mb-6">
                    <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                        style={{
                            background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)'
                        }}
                    >
                        <UserPlus size={32} style={{ color: '#FFFFFF' }} />
                    </div>
                    <h1
                        className="text-3xl font-bold mb-2"
                        style={{ color: '#1E293B' }}
                    >
                        Create Account
                    </h1>
                    <p style={{ color: '#475569' }}>
                        Join us and start your journey today
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-5">
                    {/* Full Name Field */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: '#1E293B' }}
                        >
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <User size={20} style={{ color: '#475569' }} />
                            </div>
                            <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                onBlur={() => setTouched({ ...touched, fullName: true })}
                                placeholder="John Doe"
                                className="w-full pl-11 pr-4 py-3 rounded-lg border-2 outline-none transition-all duration-300"
                                style={{
                                    borderColor: touched.fullName ? (nameValid ? '#10B981' : '#EF4444') : '#E2E8F0',
                                    backgroundColor: '#F9FAFB',
                                    color: '#1E293B'
                                }}
                            />
                            {touched.fullName && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {nameValid ? (
                                        <CheckCircle2 size={20} style={{ color: '#10B981' }} />
                                    ) : (
                                        <AlertCircle size={20} style={{ color: '#EF4444' }} />
                                    )}
                                </div>
                            )}
                        </div>
                        {touched.fullName && !nameValid && (
                            <p className="text-xs mt-1" style={{ color: '#EF4444' }}>
                                Name must be at least 3 characters
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: '#1E293B' }}
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <Mail size={20} style={{ color: '#475569' }} />
                            </div>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                onBlur={() => setTouched({ ...touched, email: true })}
                                placeholder="you@example.com"
                                className="w-full pl-11 pr-4 py-3 rounded-lg border-2 outline-none transition-all duration-300"
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

                    {/* Password Field */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: '#1E293B' }}
                        >
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <Lock size={20} style={{ color: '#475569' }} />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                onBlur={() => setTouched({ ...touched, password: true })}
                                placeholder="Create a strong password"
                                className="w-full pl-11 pr-12 py-3 rounded-lg border-2 outline-none transition-all duration-300"
                                style={{
                                    borderColor: touched.password ? (Object.values(passwordValidation).every(v => v) ? '#10B981' : '#F59E0B') : '#E2E8F0',
                                    backgroundColor: '#F9FAFB',
                                    color: '#1E293B'
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-300"
                                style={{
                                    backgroundColor: showPassword ? '#EEF2FF' : 'transparent'
                                }}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} style={{ color: '#4F46E5' }} />
                                ) : (
                                    <Eye size={20} style={{ color: '#475569' }} />
                                )}
                            </button>
                        </div>

                        {touched.password && formData.password && (
                            <div
                                className="mt-3 p-3 rounded-lg space-y-1"
                                style={{ backgroundColor: '#F9FAFB' }}
                            >
                                <ValidationItem isValid={passwordValidation.minLength} text="At least 8 characters" />
                                <ValidationItem isValid={passwordValidation.hasUpperCase} text="One uppercase letter" />
                                <ValidationItem isValid={passwordValidation.hasLowerCase} text="One lowercase letter" />
                                <ValidationItem isValid={passwordValidation.hasNumber} text="One number" />
                                <ValidationItem isValid={passwordValidation.hasSpecialChar} text="One special character" />
                            </div>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: '#1E293B' }}
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <Lock size={20} style={{ color: '#475569' }} />
                            </div>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                onBlur={() => setTouched({ ...touched, confirmPassword: true })}
                                placeholder="Confirm your password"
                                className="w-full pl-11 pr-12 py-3 rounded-lg border-2 outline-none transition-all duration-300"
                                style={{
                                    borderColor: touched.confirmPassword ? (passwordsMatch ? '#10B981' : '#EF4444') : '#E2E8F0',
                                    backgroundColor: '#F9FAFB',
                                    color: '#1E293B'
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-300"
                                style={{
                                    backgroundColor: showConfirmPassword ? '#EEF2FF' : 'transparent'
                                }}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={20} style={{ color: '#4F46E5' }} />
                                ) : (
                                    <Eye size={20} style={{ color: '#475569' }} />
                                )}
                            </button>
                            {touched.confirmPassword && formData.confirmPassword && (
                                <div className="absolute right-12 top-1/2 -translate-y-1/2">
                                    {passwordsMatch ? (
                                        <CheckCircle2 size={20} style={{ color: '#10B981' }} />
                                    ) : (
                                        <XCircle size={20} style={{ color: '#EF4444' }} />
                                    )}
                                </div>
                            )}
                        </div>
                        {touched.confirmPassword && !passwordsMatch && formData.confirmPassword && (
                            <p className="text-xs mt-1" style={{ color: '#EF4444' }}>
                                Passwords don't match
                            </p>
                        )}
                    </div>

                    {/* Terms Agreement */}
                    <div className="flex items-start gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="terms"
                            className="w-4 h-4 mt-0.5 rounded cursor-pointer"
                            style={{ accentColor: '#4F46E5' }}
                        />
                        <label htmlFor="terms" className="text-sm cursor-pointer" style={{ color: '#475569' }}>
                            I agree to the{' '}
                            <a href="#" className="font-medium hover:underline" style={{ color: '#4F46E5' }}>
                                Terms of Service
                            </a>
                            {' '}and{' '}
                            <a href="#" className="font-medium hover:underline" style={{ color: '#4F46E5' }}>
                                Privacy Policy
                            </a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg cursor-pointer"
                        style={{
                            background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
                            color: '#FFFFFF'
                        }}
                    >
                        Create Account
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 py-4">
                        <div className="flex-1 h-px" style={{ backgroundColor: '#E2E8F0' }}></div>
                        <span className="text-sm font-medium" style={{ color: '#475569' }}>Or continue with</span>
                        <div className="flex-1 h-px" style={{ backgroundColor: '#E2E8F0' }}></div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            type="button"
                            className="flex items-center justify-center py-3 rounded-lg border-2 transition-all duration-300 hover:shadow-md "
                            style={{
                                borderColor: '#E2E8F0',
                                backgroundColor: '#FFFFFF'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#4F46E5';
                                e.currentTarget.style.backgroundColor = '#EEF2FF';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#E2E8F0';
                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                            }}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            className="flex items-center justify-center py-3 rounded-lg border-2 transition-all duration-300 hover:shadow-md "
                            style={{
                                borderColor: '#E2E8F0',
                                backgroundColor: '#FFFFFF'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#4F46E5';
                                e.currentTarget.style.backgroundColor = '#EEF2FF';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#E2E8F0';
                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                            }}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            className="flex items-center justify-center py-3 rounded-lg border-2 transition-all duration-300 hover:shadow-md cursor-pointer"
                            style={{
                                borderColor: '#E2E8F0',
                                backgroundColor: '#FFFFFF'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#4F46E5';
                                e.currentTarget.style.backgroundColor = '#EEF2FF';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#E2E8F0';
                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                            }}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1DA1F2">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-sm" style={{ color: '#475569' }}>
                        Already have an account?{' '}
                        <a
                            href="/login"
                            className="font-medium hover:underline "
                            style={{ color: '#4F46E5' }}
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;