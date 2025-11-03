import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    Headphones,
    FileText,
    HelpCircle,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const contactMethods = [
        {
            icon: Mail,
            title: 'Email Us',
            description: 'Get a response within 24 hours',
            contact: 'hello@habitarchitect.com',
            link: 'mailto:hello@habitarchitect.com',
            color: '#4F46E5'
        },
        {
            icon: Phone,
            title: 'Call Us',
            description: 'Mon-Fri from 9am to 6pm PST',
            contact: '+1 (234) 567-890',
            link: 'tel:+1234567890',
            color: '#10B981'
        },
        {
            icon: MessageSquare,
            title: 'Live Chat',
            description: 'Chat with our support team',
            contact: 'Start Conversation',
            link: '#chat',
            color: '#6366F1'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            description: 'Our office location',
            contact: '123 Innovation St, San Francisco',
            link: '#map',
            color: '#F59E0B'
        }
    ];

    const supportOptions = [
        {
            icon: Headphones,
            title: 'Customer Support',
            description: 'Get help with your account and features',
            link: '#support'
        },
        {
            icon: FileText,
            title: 'Documentation',
            description: 'Browse our comprehensive guides',
            link: '#docs'
        },
        {
            icon: HelpCircle,
            title: 'FAQ',
            description: 'Find answers to common questions',
            link: '#faq'
        }
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook', color: '#4F46E5' },
        { icon: Twitter, href: '#', label: 'Twitter', color: '#6366F1' },
        { icon: Instagram, href: '#', label: 'Instagram', color: '#10B981' },
        { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#4F46E5' },
        { icon: Youtube, href: '#', label: 'YouTube', color: '#EF4444' }
    ];

    const categories = [
        { value: 'general', label: 'General Inquiry' },
        { value: 'support', label: 'Technical Support' },
        { value: 'billing', label: 'Billing & Payments' },
        { value: 'feature', label: 'Feature Request' },
        { value: 'partnership', label: 'Partnership' },
        { value: 'press', label: 'Press & Media' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setSubmitted(true);
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    category: 'general',
                    message: ''
                });
                setSubmitted(false);
            }, 3000);
        } else {
            setErrors(newErrors);
        }
    };

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
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                            Get In Touch
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Contact Methods */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={index}
                                href={method.link}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-[#E2E8F0] hover:shadow-2xl transition-all group"
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                            >
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform"
                                    style={{
                                        background: `linear-gradient(135deg, ${method.color}, ${method.color}dd)`,
                                        boxShadow: `0 10px 30px ${method.color}30`
                                    }}
                                >
                                    <method.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1E293B] mb-2">
                                    {method.title}
                                </h3>
                                <p className="text-sm text-[#475569] mb-3">
                                    {method.description}
                                </p>
                                <p className="text-[#4F46E5] font-semibold">
                                    {method.contact}
                                </p>
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            className="lg:col-span-2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-[#E2E8F0]">
                                <h2 className="text-3xl font-bold text-[#1E293B] mb-2">
                                    Send Us a Message
                                </h2>
                                <p className="text-[#475569] mb-8">
                                    Fill out the form below and we'll get back to you shortly
                                </p>

                                {submitted && (
                                    <motion.div
                                        className="mb-6 p-4 bg-[#10B981]/10 border border-[#10B981] rounded-lg flex items-center gap-3"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
                                        <p className="text-[#10B981] font-semibold">
                                            Message sent successfully! We'll be in touch soon.
                                        </p>
                                    </motion.div>
                                )}

                                <div className="space-y-6">
                                    {/* Name Field */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1E293B] mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-[#EF4444]' : 'border-[#E2E8F0]'
                                                } focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all`}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-[#EF4444] flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1E293B] mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-[#EF4444]' : 'border-[#E2E8F0]'
                                                } focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-[#EF4444] flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Category Dropdown */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1E293B] mb-2">
                                            Category
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all"
                                        >
                                            {categories.map((cat) => (
                                                <option key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Subject Field */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1E293B] mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-[#EF4444]' : 'border-[#E2E8F0]'
                                                } focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all`}
                                            placeholder="How can we help you?"
                                        />
                                        {errors.subject && (
                                            <p className="mt-1 text-sm text-[#EF4444] flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.subject}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message Field */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1E293B] mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="6"
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-[#EF4444]' : 'border-[#E2E8F0]'
                                                } focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all resize-none`}
                                            placeholder="Tell us more about your inquiry..."
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-[#EF4444] flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        onClick={handleSubmit}
                                        className="w-full px-8 py-4 rounded-lg bg-[#4F46E5] text-white font-semibold hover:bg-[#6366F1] transition-all shadow-lg shadow-[#4F46E5]/30 flex items-center justify-center gap-3"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            {/* Office Hours */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E2E8F0]">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#6366F1] rounded-xl flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1E293B]">
                                        Office Hours
                                    </h3>
                                </div>
                                <div className="space-y-3 text-[#475569]">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span className="font-semibold">9am - 6pm PST</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span className="font-semibold">10am - 4pm PST</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span className="font-semibold">Closed</span>
                                    </div>
                                </div>
                            </div>

                            {/* Support Options */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E2E8F0]">
                                <h3 className="text-xl font-bold text-[#1E293B] mb-4">
                                    Other Ways to Get Help
                                </h3>
                                <div className="space-y-3">
                                    {supportOptions.map((option, index) => (
                                        <motion.a
                                            key={index}
                                            href={option.link}
                                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#EEF2FF] transition-all group"
                                            whileHover={{ x: 5 }}
                                        >
                                            <option.icon className="w-5 h-5 text-[#4F46E5] mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="font-semibold text-[#1E293B] group-hover:text-[#4F46E5]">
                                                    {option.title}
                                                </p>
                                                <p className="text-sm text-[#475569]">
                                                    {option.description}
                                                </p>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="bg-gradient-to-br from-[#4F46E5] to-[#6366F1] rounded-2xl p-6 text-white">
                                <h3 className="text-xl font-bold mb-4">
                                    Follow Us
                                </h3>
                                <p className="text-white/90 mb-4">
                                    Stay connected on social media for updates and tips
                                </p>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            aria-label={social.label}
                                            className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="rounded-3xl overflow-hidden shadow-2xl border border-[#E2E8F0]"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-[#E2E8F0] h-96 flex items-center justify-center">
                            <div className="text-center">
                                <MapPin className="w-16 h-16 text-[#4F46E5] mx-auto mb-4" />
                                <p className="text-xl font-bold text-[#1E293B] mb-2">
                                    123 Innovation Street
                                </p>
                                <p className="text-[#475569]">
                                    San Francisco, CA 94102, USA
                                </p>
                                <motion.button
                                    className="mt-4 px-6 py-3 rounded-lg bg-[#4F46E5] text-white font-semibold hover:bg-[#6366F1] transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Get Directions
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;