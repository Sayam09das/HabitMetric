import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, TrendingUp, Zap, BarChart3, Trophy } from 'lucide-react';

const Welcome = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] overflow-hidden">
            {/* Hero Section */}
            <motion.div
                className="container mx-auto px-6 py-8"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
            >

                {/* Hero Content */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1
                            className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-[#1E293B]"
                            variants={fadeInUp}
                            transition={{ duration: 0.8 }}
                        >
                            Build Better
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#6366F1]">
                                Habits with Data
                            </span>
                        </motion.h1>
                        <motion.p
                            className="text-xl text-[#475569] mb-8 leading-relaxed"
                            variants={fadeInUp}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Transform your life with AI-powered habit tracking. Get personalized insights, smart recommendations, and data-driven strategies to build lasting habits.
                        </motion.p>
                        <motion.div
                            className="flex gap-4"
                            variants={fadeInUp}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <motion.button
                                className="px-8 py-4 rounded-xl bg-[#4F46E5] text-white font-semibold hover:bg-[#6366F1] transition-all shadow-xl shadow-[#4F46E5]/30"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get Started Free
                            </motion.button>
                            <motion.button
                                className="px-8 py-4 rounded-xl border-2 border-[#E2E8F0] text-[#1E293B] hover:bg-[#EEF2FF] transition-all font-semibold"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Learn More
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Illustration */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <div className="relative w-full h-96 flex items-center justify-center">
                            <motion.div
                                className="absolute w-72 h-72 bg-gradient-to-br from-[#EEF2FF] to-[#4F46E5]/20 rounded-full blur-3xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 90, 0]
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                            <div className="relative grid grid-cols-2 gap-4">
                                {[
                                    { Icon: Target, color: '#4F46E5' },
                                    { Icon: TrendingUp, color: '#10B981' },
                                    { Icon: Zap, color: '#F59E0B' },
                                    { Icon: Trophy, color: '#6366F1' }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-lg"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        <item.Icon className="w-12 h-12" style={{ color: item.color }} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* How It Works Section */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[#1E293B]">
                        How It Works
                    </h2>
                    <p className="text-center text-[#475569] text-lg mb-16 max-w-2xl mx-auto">
                        Three simple steps to transform your habits and achieve your goals
                    </p>
                    <motion.div
                        className="grid md:grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[
                            { icon: Target, title: "Set Your Goals", desc: "Define the habits you want to build with AI-guided goal setting", color: '#4F46E5' },
                            { icon: BarChart3, title: "Track Progress", desc: "Monitor your daily activities with smart tracking and analytics", color: '#10B981' },
                            { icon: Brain, title: "Get Insights", desc: "Receive personalized recommendations powered by AI algorithms", color: '#6366F1' }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                className="bg-white p-8 rounded-2xl border border-[#E2E8F0] hover:shadow-xl transition-all"
                                variants={scaleIn}
                                transition={{ duration: 0.5 }}
                                whileHover={{ y: -10 }}
                            >
                                <motion.div
                                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                                    style={{
                                        background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                                        boxShadow: `0 10px 30px ${step.color}30`
                                    }}
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <step.icon className="w-8 h-8 text-white" />
                                </motion.div>
                                <h3 className="text-2xl font-bold mb-4 text-[#1E293B]">{step.title}</h3>
                                <p className="text-[#475569] leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { icon: Target, title: "Smart Goal Setting", desc: "AI-powered recommendations for achievable habit goals", color: '#4F46E5' },
                            { icon: TrendingUp, title: "Progress Analytics", desc: "Visualize your journey with detailed charts and insights", color: '#10B981' },
                            { icon: Zap, title: "Streak Tracking", desc: "Stay motivated with gamified streak counters", color: '#F59E0B' },
                            { icon: Trophy, title: "Achievement System", desc: "Unlock rewards as you reach important milestones", color: '#6366F1' }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                className="bg-white p-6 rounded-xl border border-[#E2E8F0] flex gap-4 hover:shadow-lg transition-all"
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{
                                        background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                                    }}
                                >
                                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1E293B] mb-2">{feature.title}</h4>
                                    <p className="text-[#475569] text-sm">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    className="text-center bg-gradient-to-br from-[#4F46E5] to-[#6366F1] rounded-3xl p-12 shadow-2xl shadow-[#4F46E5]/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold mb-4 text-white">Ready to Transform Your Life?</h2>
                    <p className="text-xl text-white/90 mb-8">Join thousands of users building better habits every day</p>
                    <motion.button
                        className="px-12 py-5 rounded-xl bg-white text-[#4F46E5] font-bold text-lg hover:bg-[#EEF2FF] transition-all shadow-2xl"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Your Journey
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
                className="fixed top-20 left-10 w-20 h-20 bg-[#4F46E5]/10 rounded-full blur-xl"
                animate={{
                    y: [0, 30, 0],
                    x: [0, 15, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="fixed bottom-20 right-10 w-32 h-32 bg-[#10B981]/10 rounded-full blur-xl"
                animate={{
                    y: [0, -40, 0],
                    x: [0, -20, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
};

export default Welcome;