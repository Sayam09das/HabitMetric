import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Features', href: '/features' },
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' }
    ];

    return (
        <>
            {/* Desktop & Mobile Navbar */}
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-[#E2E8F0]'
                    : 'bg-white/80 backdrop-blur-sm'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/"
                                className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
                            >
                                <div className="p-2 rounded-lg sm:rounded-xl">
                                    <img
                                        src="/logo.png"
                                        alt="Logo"
                                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                                    />
                                </div>

                                <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#1E293B]">
                                    AI Habit Architect
                                </span>
                            </Link>
                        </motion.div>



                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.href}
                                    className="px-4 py-2 rounded-lg text-[#475569] hover:text-[#4F46E5] hover:bg-[#EEF2FF] transition-all font-medium"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>

                        {/* Desktop Auth Buttons */}
                        <div className="hidden lg:flex items-center space-x-3">
                            <Link to="/login">
                                <motion.button
                                    className="px-6 py-2.5 rounded-lg border-2 border-[#E2E8F0] text-[#1E293B] hover:bg-[#EEF2FF] transition-all font-medium cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Login
                                </motion.button>
                            </Link>

                            <Link to="/signup">
                                <motion.button
                                    className="px-6 py-2.5 rounded-lg bg-[#4F46E5] text-white hover:bg-[#6366F1] transition-all shadow-lg shadow-[#4F46E5]/20 font-medium cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Sign Up
                                </motion.button>
                            </Link>
                        </div>


                        {/* Mobile Menu Button */}
                        <motion.button
                            className="lg:hidden p-2 rounded-lg hover:bg-[#EEF2FF] text-[#1E293B]"
                            onClick={() => setIsOpen(!isOpen)}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-[#1E293B]/50 backdrop-blur-sm z-40 lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            className="fixed top-16 md:top-20 right-0 w-full sm:w-80 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] bg-white z-50 shadow-2xl overflow-y-auto lg:hidden"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                        >
                            {/* Mobile Header */}
                            <div className="p-6 bg-gradient-to-br from-[#4F46E5] to-[#6366F1] text-white">
                                <div className="flex items-center space-x-3">
                                    <Brain className="w-10 h-10" />
                                    <div>
                                        <p className="font-bold text-xl">AI Habit Architect</p>
                                        <p className="text-sm text-white/80">Build Better Habits</p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <div className="p-4">
                                <div className="space-y-1 mb-6">
                                    <p className="px-4 py-2 text-xs font-semibold text-[#475569] uppercase tracking-wider">
                                        Navigation
                                    </p>
                                    {navLinks.map((link, index) => (
                                        <motion.a
                                            key={index}
                                            href={link.href}
                                            className="block px-4 py-3 rounded-lg text-[#475569] hover:text-[#4F46E5] hover:bg-[#EEF2FF] transition-all font-medium"
                                            onClick={() => setIsOpen(false)}
                                            whileHover={{ x: 5 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {link.label}
                                        </motion.a>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="border-t border-[#E2E8F0] my-4" />

                                {/* Mobile Auth Buttons */}
                                <div className="space-y-3">
                                    <Link to="/login">
                                        <motion.button
                                            className="w-full px-6 py-3 rounded-lg border-2 border-[#E2E8F0] text-[#1E293B] hover:bg-[#EEF2FF] transition-all font-medium cursor-pointer"
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Login
                                        </motion.button>
                                    </Link>

                                    <Link to="/signup">
                                        <motion.button
                                            className="w-full px-6 py-3 rounded-lg bg-[#4F46E5] text-white hover:bg-[#6366F1] transition-all shadow-lg shadow-[#4F46E5]/20 font-medium cursor-pointer"
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Sign Up
                                        </motion.button>
                                    </Link>
                                </div>


                                {/* Extra Info */}
                                <div className="mt-8 p-4 bg-[#EEF2FF] rounded-xl">
                                    <p className="text-sm text-[#475569] text-center">
                                        Join thousands building better habits with AI
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Spacer to prevent content from going under fixed navbar */}
            <div className="h-16 md:h-20" />
        </>
    );
};

export default Navbar;