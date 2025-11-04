import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Activity, TrendingUp, Award, Zap, Target, Calendar, BarChart3, Brain, Dumbbell, Apple, Sparkles, ArrowRight, CheckCircle, Timer, Users, Star } from 'lucide-react';
import { Highlighter } from "@/Components/ui/highlighter"
import { TextGenerateEffect } from "../ui/text-generate-effect";

const HealthMotionPage = () => {
    const { scrollYProgress } = useScroll();
    const yCircleLeft = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const yCircleRight = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    };

    const features = [
        {
            icon: Heart,
            title: "Health Tracking",
            description: "Monitor your vitals, sleep, and overall wellness in real-time",
            color: "from-red-500 to-pink-500"
        },
        {
            icon: Activity,
            title: "Workout Plans",
            description: "AI-powered personalized workout routines that adapt to your progress",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Apple,
            title: "Nutrition Guide",
            description: "Smart meal planning with calorie tracking and macro balancing",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Brain,
            title: "Mental Wellness",
            description: "Mindfulness exercises, meditation, and stress management tools",
            color: "from-purple-500 to-indigo-500"
        },
        {
            icon: BarChart3,
            title: "Progress Analytics",
            description: "Detailed insights and visualizations of your health journey",
            color: "from-orange-500 to-amber-500"
        },
        {
            icon: Users,
            title: "Community Support",
            description: "Connect with others, share goals, and stay motivated together",
            color: "from-teal-500 to-cyan-500"
        }
    ];

    const stats = [
        { number: "50K+", label: "Active Users", icon: Users },
        { number: "1M+", label: "Workouts Completed", icon: Dumbbell },
        { number: "95%", label: "Goal Success Rate", icon: Target },
        { number: "4.9", label: "App Rating", icon: Star }
    ];

    const benefits = [
        "AI-powered personalized recommendations",
        "Track all health metrics in one place",
        "Sync with your favorite devices",
        "Expert-designed workout programs",
        "24/7 support and guidance"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-3xl"
                    style={{ y: yCircleLeft }}
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-pink-200/30 to-orange-200/30 blur-3xl"
                    style={{ y: yCircleRight }}
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, -90, 0]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                            left: `${10 + i * 12}%`,
                            top: `${20 + i * 8}%`,
                            background: `hsl(${i * 45}, 70%, 60%)`
                        }}
                        animate={{
                            y: [-30, 30, -30],
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 4 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2
                        }}
                    />
                ))}
            </div>

            {/* Hero Section */}
            <motion.div
                className="relative z-10 pt-20 pb-20 px-4"
                style={{ opacity }}
            >
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-6xl mx-auto text-center"
                >
                    {/* Floating Badge */}
                    <motion.div
                        variants={scaleIn}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-semibold text-slate-700">Transform Your Health Journey</span>
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-center"
                    >
                        <Highlighter
                            action="underline"
                            color="#7C3AED"
                            strokeWidth={3}
                            animationDuration={800}
                            isView
                        >
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Why Is Your Health
                            </span>
                        </Highlighter>

                        <br />

                        <div className="mt-5 inline-block">
                            <Highlighter
                                action="highlight"
                                color="#FFE27A"
                                strokeWidth={2}
                                animationDuration={1200}
                                isView
                            >
                                <span className="text-slate-900">
                                    the Most Valuable Wealth?
                                </span>
                            </Highlighter>
                        </div>
                    </motion.h1>

                    {/* Animated Subtitle */}
                    <div className="max-w-3xl mx-auto text-center mt-6">
                        <TextGenerateEffect
                            words="Because without good health, we cannot work, dream, or enjoy life. Your body and mind are the engines of your success — protecting them means protecting your future. Build strong habits today, and your future self will thank you."
                            className="text-center"
                            duration={1}
                        />
                    </div>

                </motion.div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 py-16 px-4"
            >
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-lg">
                                <stat.icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
                            <div className="text-slate-600 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Features Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative z-10 py-24 px-4"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Everything You Need to Thrive
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Comprehensive tools designed to support every aspect of your health journey
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-slate-200"
                            >
                                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 shadow-lg`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 py-24 px-4"
            >
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                        <motion.div
                            className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        <div className="relative z-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, type: "spring" }}
                            >
                                <Award className="w-20 h-20 text-white mx-auto mb-6" />
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Ready to Transform Your Life?
                            </h2>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                Join thousands of people who have already started their journey to better health
                            </p>
                            <motion.button
                                className="px-10 py-5 bg-white text-purple-600 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Sparkles className="w-6 h-6" />
                                Get Started Now - It's Free
                                <ArrowRight className="w-6 h-6" />
                            </motion.button>
                            <p className="text-white/80 text-sm mt-4">No credit card required • 14-day free trial</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Floating Decorative Elements */}
            <motion.div
                className="fixed top-1/4 right-10 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-slate-200 hidden lg:block"
                animate={{
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Heart className="w-8 h-8 text-red-500" />
            </motion.div>

            <motion.div
                className="fixed bottom-1/3 left-10 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-slate-200 hidden lg:block"
                animate={{
                    y: [0, 20, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Dumbbell className="w-8 h-8 text-blue-500" />
            </motion.div>

            <motion.div
                className="fixed top-1/2 right-20 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-slate-200 hidden lg:block"
                animate={{
                    y: [0, 15, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Activity className="w-8 h-8 text-green-500" />
            </motion.div>
        </div>
    );
};

export default HealthMotionPage;