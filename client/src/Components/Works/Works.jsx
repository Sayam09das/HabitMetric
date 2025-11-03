import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    UserPlus,
    Target,
    Calendar,
    Bell,
    TrendingUp,
    Award,
    Brain,
    Zap,
    BarChart3,
    CheckCircle2,
    ArrowRight,
    Play,
    Sparkles,
    Clock,
    Users,
    Trophy
} from 'lucide-react';

const HowItWorks = () => {
    const [activeStep, setActiveStep] = useState(0);

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

    const mainSteps = [
        {
            number: '01',
            icon: UserPlus,
            title: 'Create Your Account',
            description: 'Sign up in seconds with email or social login. Set up your profile and tell us about your goals.',
            details: [
                'Quick 30-second registration',
                'Secure authentication',
                'Personalized onboarding',
                'Privacy-first approach'
            ],
            color: '#4F46E5',
            image: '🚀'
        },
        {
            number: '02',
            icon: Target,
            title: 'Define Your Habits',
            description: 'Choose from templates or create custom habits. Our AI helps you set realistic, achievable goals.',
            details: [
                'Pre-built habit templates',
                'Custom habit creation',
                'AI-powered goal suggestions',
                'SMART goal framework'
            ],
            color: '#10B981',
            image: '🎯'
        },
        {
            number: '03',
            icon: Calendar,
            title: 'Set Your Schedule',
            description: 'Pick when and how often you want to practice each habit. Flexible scheduling fits your lifestyle.',
            details: [
                'Daily, weekly, or custom frequencies',
                'Time-based reminders',
                'Flexible scheduling options',
                'Multiple habits at once'
            ],
            color: '#6366F1',
            image: '📅'
        },
        {
            number: '04',
            icon: Bell,
            title: 'Get Smart Reminders',
            description: 'Receive timely notifications that adapt to your routine. Never miss a habit again.',
            details: [
                'Intelligent timing',
                'Multi-channel notifications',
                'Adaptive reminders',
                'Snooze and reschedule'
            ],
            color: '#F59E0B',
            image: '🔔'
        },
        {
            number: '05',
            icon: CheckCircle2,
            title: 'Track Your Progress',
            description: 'Log completions with a single tap. Build streaks and watch your consistency grow.',
            details: [
                'One-tap logging',
                'Streak tracking',
                'Completion history',
                'Notes and reflections'
            ],
            color: '#10B981',
            image: '✅'
        },
        {
            number: '06',
            icon: TrendingUp,
            title: 'Analyze & Improve',
            description: 'View detailed analytics and AI insights. Understand patterns and optimize your habits.',
            details: [
                'Visual progress charts',
                'Pattern recognition',
                'AI-powered insights',
                'Performance trends'
            ],
            color: '#4F46E5',
            image: '📊'
        }
    ];

    const keyFeatures = [
        {
            icon: Brain,
            title: 'AI-Powered Intelligence',
            description: 'Machine learning algorithms analyze your behavior and provide personalized recommendations'
        },
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: 'Log habits in seconds with our streamlined interface and quick-action buttons'
        },
        {
            icon: BarChart3,
            title: 'Beautiful Analytics',
            description: 'Visualize your journey with stunning charts, graphs, and progress indicators'
        },
        {
            icon: Users,
            title: 'Community Driven',
            description: 'Join challenges, share progress, and get motivated by a supportive community'
        }
    ];

    const benefits = [
        { icon: Clock, title: 'Save Time', description: 'Automated tracking and smart suggestions', color: '#4F46E5' },
        { icon: Trophy, title: 'Stay Motivated', description: 'Gamification and achievement system', color: '#10B981' },
        { icon: TrendingUp, title: 'See Results', description: 'Data-driven insights show real progress', color: '#6366F1' },
        { icon: Award, title: 'Build Consistency', description: 'Streak tracking keeps you accountable', color: '#F59E0B' }
    ];

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            {/* Hero Section */}
            <motion.section
                className="relative bg-gradient-to-br from-[#4F46E5] to-[#6366F1] text-white py-20 md:py-32 overflow-hidden"
                initial="hidden"
                animate="visible"
            >
                {/* Animated Background */}
                <motion.div
                    className="absolute top-20 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                    animate={{
                        y: [0, 30, 0],
                        x: [0, 20, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
                    animate={{
                        y: [0, -40, 0],
                        x: [0, -30, 0]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        variants={fadeInUp}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="inline-block mb-6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                        >
                            <div className="bg-white/20 backdrop-blur-xl px-6 py-3 rounded-full border border-white/30">
                                <p className="font-semibold flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    Simple, Effective, AI-Powered
                                </p>
                            </div>
                        </motion.div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                            How It Works
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
                            Building better habits has never been easier. Follow these simple steps to transform your life.
                        </p>
                        <motion.button
                            className="px-8 py-4 rounded-xl bg-white text-[#4F46E5] font-bold text-lg hover:bg-[#EEF2FF] transition-all shadow-2xl flex items-center gap-3 mx-auto"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Play className="w-6 h-6" />
                            Watch Video Tutorial
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Main Steps Section */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-4">
                            Six Simple Steps to Success
                        </h2>
                        <p className="text-xl text-[#475569] max-w-2xl mx-auto">
                            From signup to success, we guide you every step of the way
                        </p>
                    </motion.div>

                    <div className="space-y-20">
                        {mainSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                    }`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {/* Content */}
                                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                    <div className="flex items-center gap-4 mb-6">
                                        <motion.div
                                            className="text-6xl font-bold text-transparent bg-clip-text"
                                            style={{
                                                backgroundImage: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {step.number}
                                        </motion.div>
                                        <div
                                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
                                            style={{
                                                background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                                                boxShadow: `0 10px 30px ${step.color}40`
                                            }}
                                        >
                                            <step.icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-lg text-[#475569] mb-6 leading-relaxed">
                                        {step.description}
                                    </p>

                                    <div className="space-y-3">
                                        {step.details.map((detail, i) => (
                                            <motion.div
                                                key={i}
                                                className="flex items-center gap-3"
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                viewport={{ once: true }}
                                            >
                                                <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                                                <span className="text-[#475569]">{detail}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Visual */}
                                <motion.div
                                    className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="bg-white rounded-3xl p-12 shadow-2xl border border-[#E2E8F0] relative overflow-hidden">
                                        <motion.div
                                            className="absolute inset-0 opacity-5"
                                            style={{
                                                background: `linear-gradient(135deg, ${step.color}, transparent)`
                                            }}
                                        />
                                        <div className="text-9xl text-center relative z-10">
                                            {step.image}
                                        </div>
                                        <motion.div
                                            className="absolute bottom-4 right-4 w-24 h-24 rounded-full opacity-20"
                                            style={{ backgroundColor: step.color }}
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Flow */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-4">
                            The Complete Journey
                        </h2>
                        <p className="text-xl text-[#475569] max-w-2xl mx-auto">
                            See how everything connects from start to finish
                        </p>
                    </motion.div>

                    <div className="max-w-6xl mx-auto">
                        <div className="hidden md:flex items-center justify-between mb-12">
                            {mainSteps.map((step, index) => (
                                <React.Fragment key={index}>
                                    <motion.div
                                        className="flex flex-col items-center"
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <motion.div
                                            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-3 cursor-pointer"
                                            style={{
                                                background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                                                boxShadow: `0 10px 30px ${step.color}30`
                                            }}
                                            whileHover={{ scale: 1.2, rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <step.icon className="w-7 h-7 text-white" />
                                        </motion.div>
                                        <p className="text-sm font-semibold text-[#475569] text-center max-w-[100px]">
                                            {step.title}
                                        </p>
                                    </motion.div>
                                    {index < mainSteps.length - 1 && (
                                        <motion.div
                                            className="flex-1 h-1 mx-2"
                                            style={{
                                                background: `linear-gradient(90deg, ${step.color}, ${mainSteps[index + 1].color})`
                                            }}
                                            initial={{ scaleX: 0 }}
                                            whileInView={{ scaleX: 1 }}
                                            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                                            viewport={{ once: true }}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-20 md:py-28 bg-gradient-to-br from-[#EEF2FF] to-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-4">
                            What Makes Us Different
                        </h2>
                        <p className="text-xl text-[#475569] max-w-2xl mx-auto">
                            Powerful features that set AI Habit Architect apart
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {keyFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg border border-[#E2E8F0] hover:shadow-2xl transition-all text-center"
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#6366F1] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#4F46E5]/30">
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1E293B] mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-[#475569]">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-4">
                            The Benefits You'll Experience
                        </h2>
                        <p className="text-xl text-[#475569] max-w-2xl mx-auto">
                            Real results from using AI Habit Architect
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl p-6 border border-[#E2E8F0] hover:shadow-xl transition-all"
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                                    style={{
                                        background: `linear-gradient(135deg, ${benefit.color}20, ${benefit.color}10)`
                                    }}
                                >
                                    <benefit.icon className="w-6 h-6" style={{ color: benefit.color }} />
                                </div>
                                <h4 className="font-bold text-[#1E293B] mb-2">{benefit.title}</h4>
                                <p className="text-sm text-[#475569]">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="bg-gradient-to-br from-[#4F46E5] to-[#6366F1] rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl relative overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                            transition={{ duration: 10, repeat: Infinity }}
                        />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Ready to Get Started?
                            </h2>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                Join thousands of users transforming their lives one habit at a time
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <motion.button
                                    className="px-10 py-4 rounded-xl bg-white text-[#4F46E5] font-bold text-lg hover:bg-[#EEF2FF] transition-all shadow-2xl flex items-center gap-3 justify-center"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Start Free Today
                                    <ArrowRight className="w-6 h-6" />
                                </motion.button>
                                <motion.button
                                    className="px-10 py-4 rounded-xl border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Schedule Demo
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;