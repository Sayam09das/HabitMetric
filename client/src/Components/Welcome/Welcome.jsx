import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WordRotate } from "@/components/ui/word-rotate"
import { SmoothRise } from "@/components/ui/SmoothRise.tsx"
import HealthMotionPage from './HealthMotionPage';
import About from '../About/About';
import Contact from '../Contact/Contact';
import HowItWorks from '../Works/Works';

const Welcome = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();
    const yCircleLeft = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const yCircleRight = useTransform(scrollYProgress, [0, 1], [0, -300]);

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
        <div className="min-h-screen bg-[#F9FAFB] overflow-hidden relative">
            {/* Animated Geometric Background */}
            <div className="absolute inset-0">
                {/* Large Circle - Top Left */}
                <motion.div
                    className="absolute -top-20 -left-20 sm:-top-32 sm:-left-32 lg:-top-40 lg:-left-40 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full border-2 border-[#F3EFDA]"
                    style={{ y: yCircleLeft }}
                    animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Large Circle - Bottom Right */}
                <motion.div
                    className="absolute -bottom-20 -right-20 sm:-bottom-32 sm:-right-32 lg:-bottom-40 lg:-right-40 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] rounded-full border-2 border-[#F3EFDA]"
                    style={{ y: yCircleRight }}
                    animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, -5, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                />

                {/* Floating particles */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-[#F3EFDA]/20"
                        style={{
                            left: `${20 + i * 20}%`,
                            top: `${30 + i * 10}%`
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3
                        }}
                    />
                ))}
            </div>

            {/* Hero Content */}
            <div className="flex items-center justify-center min-h-[80vh] relative z-10">

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="text-center max-w-4xl"
                >
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[#0F172A] text-center"
                        variants={fadeInUp}
                        transition={{ duration: 0.8 }}
                    >
                        Build Your Future{" "}
                        <span className="relative">
                            <WordRotate
                                words={["Mentally", "Physically", "Daily", "For Life"]}
                                duration={2000}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#6366F1]"
                            />
                        </span>
                    </motion.h1>


                    <SmoothRise text="Build disciplined habits with AI guidance, clear insights, and a system designed for real, lasting progress." />

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center w-full px-4"
                        variants={fadeInUp}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.button
                            className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-5 rounded-xl bg-[#4F46E5] text-white text-base sm:text-lg font-semibold hover:bg-[#6366F1] transition-all shadow-xl shadow-[#4F46E5]/30  cursor-pointer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started Free
                        </motion.button>

                        <motion.button
                            className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-5 rounded-xl border-2 border-[#E2E8F0] text-[#1E293B] text-base sm:text-lg hover:bg-[#EEF2FF] transition-all font-semibold  cursor-pointer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Learn More
                        </motion.button>
                    </motion.div>

                </motion.div>

            </div>

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

            <HealthMotionPage />
            <About />
            <HowItWorks />
            <Contact />
        </div>
    );
};

export default Welcome;