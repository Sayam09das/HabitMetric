import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Zap, 
  Bell,
  Calendar,
  BarChart3,
  Trophy,
  Users,
  Lock,
  Smartphone,
  Cloud,
  Lightbulb,
  Heart,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Features = () => {
  const [activeTab, setActiveTab] = useState('all');

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

  const categories = [
    { id: 'all', label: 'All Features' },
    { id: 'ai', label: 'AI-Powered' },
    { id: 'tracking', label: 'Tracking' },
    { id: 'social', label: 'Social' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const mainFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get personalized recommendations based on your behavior patterns and goals. Our AI learns from your habits and suggests optimal times and strategies.',
      color: '#4F46E5',
      category: 'ai',
      benefits: ['Smart pattern recognition', 'Personalized tips', 'Predictive analytics']
    },
    {
      icon: Target,
      title: 'Smart Goal Setting',
      description: 'Set SMART goals with AI assistance. Break down large goals into manageable daily habits with intelligent milestone tracking.',
      color: '#10B981',
      category: 'tracking',
      benefits: ['Goal breakdown', 'Milestone tracking', 'Progress visualization']
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Visualize your progress with beautiful charts and detailed insights. Track streaks, completion rates, and identify patterns over time.',
      color: '#6366F1',
      category: 'analytics',
      benefits: ['Beautiful dashboards', 'Trend analysis', 'Custom reports']
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Never miss a habit with intelligent reminders that adapt to your schedule and preferences. Get notified at the perfect time.',
      color: '#F59E0B',
      category: 'tracking',
      benefits: ['Adaptive scheduling', 'Multi-channel notifications', 'Snooze options']
    },
    {
      icon: Trophy,
      title: 'Gamification & Rewards',
      description: 'Stay motivated with achievements, badges, and streak counters. Compete with yourself and celebrate every milestone.',
      color: '#EF4444',
      category: 'social',
      benefits: ['Achievement badges', 'Streak tracking', 'Level system']
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Join habit groups, share progress, and get inspired by others. Build accountability with friends and community challenges.',
      color: '#10B981',
      category: 'social',
      benefits: ['Group challenges', 'Progress sharing', 'Peer motivation']
    }
  ];

  const additionalFeatures = [
    { icon: Calendar, title: 'Flexible Scheduling', description: 'Custom frequencies and schedules', category: 'tracking' },
    { icon: Smartphone, title: 'Mobile App', description: 'Track on the go with our mobile app', category: 'tracking' },
    { icon: Cloud, title: 'Cloud Sync', description: 'Access your data anywhere, anytime', category: 'tracking' },
    { icon: Lock, title: 'Privacy First', description: 'End-to-end encryption for your data', category: 'tracking' },
    { icon: Lightbulb, title: 'Smart Suggestions', description: 'AI-powered habit recommendations', category: 'ai' },
    { icon: Heart, title: 'Mood Tracking', description: 'Correlate habits with your wellbeing', category: 'analytics' },
    { icon: Award, title: 'Custom Rewards', description: 'Set personal rewards for achievements', category: 'social' },
    { icon: BarChart3, title: 'Data Export', description: 'Export your data anytime', category: 'analytics' },
    { icon: Zap, title: 'Quick Add', description: 'Log habits in seconds', category: 'tracking' },
    { icon: Sparkles, title: 'Habit Templates', description: 'Pre-built habit templates to start fast', category: 'ai' }
  ];

  const filteredMainFeatures = activeTab === 'all' 
    ? mainFeatures 
    : mainFeatures.filter(f => f.category === activeTab);

  const filteredAdditionalFeatures = activeTab === 'all'
    ? additionalFeatures
    : additionalFeatures.filter(f => f.category === activeTab);

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
                  Powered by Advanced AI
                </p>
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Features That Transform Habits
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Everything you need to build lasting habits, track progress, and achieve your goals with intelligent automation.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Category Tabs */}
      <motion.section 
        className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-lg border-b border-[#E2E8F0] shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-6 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === category.id
                    ? 'bg-[#4F46E5] text-white shadow-lg shadow-[#4F46E5]/30'
                    : 'bg-[#F9FAFB] text-[#475569] hover:bg-[#EEF2FF]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Features Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredMainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-[#E2E8F0] hover:shadow-2xl transition-all group"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                    boxShadow: `0 10px 30px ${feature.color}30`
                  }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#1E293B] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#475569] leading-relaxed mb-6">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-[#475569]">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <motion.button
                  className="mt-6 flex items-center gap-2 text-[#4F46E5] font-semibold group-hover:gap-3 transition-all"
                  whileHover={{ x: 5 }}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Features */}
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
              Even More Features
            </h2>
            <p className="text-xl text-[#475569] max-w-2xl mx-auto">
              Discover all the tools and capabilities that make habit building effortless
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredAdditionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#F9FAFB] rounded-xl p-6 hover:shadow-lg hover:bg-white transition-all border border-[#E2E8F0] group"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <feature.icon className="w-8 h-8 text-[#4F46E5] mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-[#1E293B] mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-[#475569]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison */}
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
              Why Choose AI Habit Architect?
            </h2>
            <p className="text-xl text-[#475569] max-w-2xl mx-auto">
              See how we compare to traditional habit trackers
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-3 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white font-bold p-6">
              <div>Feature</div>
              <div className="text-center">Traditional Apps</div>
              <div className="text-center">AI Habit Architect</div>
            </div>
            {[
              { feature: 'AI Recommendations', traditional: false, us: true },
              { feature: 'Predictive Analytics', traditional: false, us: true },
              { feature: 'Smart Reminders', traditional: true, us: true },
              { feature: 'Progress Tracking', traditional: true, us: true },
              { feature: 'Community Features', traditional: false, us: true },
              { feature: 'Data Privacy', traditional: true, us: true },
              { feature: 'Custom Templates', traditional: false, us: true },
              { feature: 'Mood Correlation', traditional: false, us: true }
            ].map((row, index) => (
              <motion.div
                key={index}
                className="grid grid-cols-3 p-6 border-t border-[#E2E8F0] items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="font-medium text-[#1E293B]">{row.feature}</div>
                <div className="text-center">
                  {row.traditional ? (
                    <CheckCircle2 className="w-6 h-6 text-[#10B981] mx-auto" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#E2E8F0] mx-auto" />
                  )}
                </div>
                <div className="text-center">
                  {row.us && (
                    <CheckCircle2 className="w-6 h-6 text-[#4F46E5] mx-auto" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
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
                Ready to Transform Your Habits?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are building better habits with AI-powered insights
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-10 py-4 rounded-xl bg-white text-[#4F46E5] font-bold text-lg hover:bg-[#EEF2FF] transition-all shadow-2xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  className="px-10 py-4 rounded-xl border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;