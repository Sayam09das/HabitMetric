import React from 'react';
import { motion } from 'framer-motion';
import {
    Brain,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Send,
    Heart
} from 'lucide-react';

const Footer = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    const footerLinks = {
        product: [
            { label: 'Features', href: '#features' },
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Testimonials', href: '#testimonials' },
            { label: 'FAQ', href: '#faq' }
        ],
        company: [
            { label: 'About Us', href: '#about' },
            { label: 'Careers', href: '#careers' },
            { label: 'Blog', href: '#blog' },
            { label: 'Press Kit', href: '#press' },
            { label: 'Contact', href: '#contact' }
        ],
        resources: [
            { label: 'Help Center', href: '#help' },
            { label: 'Community', href: '#community' },
            { label: 'Guides', href: '#guides' },
            { label: 'API Documentation', href: '#api' },
            { label: 'Status', href: '#status' }
        ],
        legal: [
            { label: 'Privacy Policy', href: '#privacy' },
            { label: 'Terms of Service', href: '#terms' },
            { label: 'Cookie Policy', href: '#cookies' },
            { label: 'GDPR', href: '#gdpr' },
            { label: 'Licenses', href: '#licenses' }
        ]
    };

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook', color: '#4F46E5' },
        { icon: Twitter, href: '#', label: 'Twitter', color: '#6366F1' },
        { icon: Instagram, href: '#', label: 'Instagram', color: '#10B981' },
        { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#4F46E5' },
        { icon: Youtube, href: '#', label: 'YouTube', color: '#EF4444' }
    ];

    return (
        <footer className="bg-[#1E293B] text-white">
            {/* Newsletter Section */}
            <motion.div
                className="border-b border-white/10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
            >
                <div className="container mx-auto px-6 py-12 md:py-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-3">
                                Stay Updated with Our Newsletter
                            </h3>
                            <p className="text-white/70 text-lg">
                                Get the latest tips, insights, and updates delivered to your inbox.
                            </p>
                        </div>
                        <div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-5 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all"
                                />
                                <motion.button
                                    className="px-6 py-3 rounded-lg bg-[#4F46E5] hover:bg-[#6366F1] transition-all font-semibold flex items-center justify-center gap-2 shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Send className="w-5 h-5" />
                                    Subscribe
                                </motion.button>
                            </div>
                            <p className="text-sm text-white/50 mt-3">
                                No spam, unsubscribe anytime. We respect your privacy.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12">
                    {/* Brand Column */}
                    <motion.div
                        className="col-span-2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="bg-gradient-to-br from-[#4F46E5] to-[#6366F1] p-2 rounded-xl shadow-lg">
                                <Brain className="w-7 h-7 text-white" />
                            </div>
                            <span className="text-2xl font-bold">AI Habit Architect</span>
                        </div>
                        <p className="text-white/70 mb-6 leading-relaxed">
                            Transform your life with AI-powered habit tracking. Build better habits, achieve your goals.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            <a href="mailto:hello@habitarchitect.com" className="flex items-center gap-3 text-white/70 hover:text-[#10B981] transition-all group">
                                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>hello@habitarchitect.com</span>
                            </a>
                            <a href="tel:+1234567890" className="flex items-center gap-3 text-white/70 hover:text-[#10B981] transition-all group">
                                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>+1 (234) 567-890</span>
                            </a>
                            <div className="flex items-start gap-3 text-white/70">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span>123 Innovation Street<br />San Francisco, CA 94102</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#4F46E5] flex items-center justify-center transition-all"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Links */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h4 className="font-bold text-lg mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-white/70 hover:text-[#10B981] transition-all hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4 className="font-bold text-lg mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-white/70 hover:text-[#10B981] transition-all hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Resources Links */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h4 className="font-bold text-lg mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-white/70 hover:text-[#10B981] transition-all hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal Links */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h4 className="font-bold text-lg mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-white/70 hover:text-[#10B981] transition-all hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/70 text-sm text-center md:text-left">
                            © 2025 AI Habit Architect. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                            <span>Made with</span>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <Heart className="w-4 h-4 text-[#EF4444] fill-[#EF4444]" />
                            </motion.div>
                            <span>by the AI Habit Architect Team</span>
                        </div>
                        <div className="flex gap-4 text-sm">
                            <a href="#privacy" className="text-white/70 hover:text-[#10B981] transition-all">
                                Privacy
                            </a>
                            <span className="text-white/30">|</span>
                            <a href="#terms" className="text-white/70 hover:text-[#10B981] transition-all">
                                Terms
                            </a>
                            <span className="text-white/30">|</span>
                            <a href="#cookies" className="text-white/70 hover:text-[#10B981] transition-all">
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <motion.button
                className="fixed bottom-8 right-8 w-12 h-12 bg-[#4F46E5] hover:bg-[#6366F1] rounded-full flex items-center justify-center shadow-2xl shadow-[#4F46E5]/50 z-50"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </motion.button>
        </footer>
    );
};

export default Footer;