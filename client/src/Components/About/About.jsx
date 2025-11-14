import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Users, Zap, Heart, Award, TrendingUp, Shield } from 'lucide-react';
import { PinContainer } from "../ui/3d-pin";
const About = () => {
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

  const values = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Leverage cutting-edge artificial intelligence to understand your behavior patterns and get personalized recommendations.",
      color: '#4F46E5'
    },
    {
      icon: Heart,
      title: "User-Centric Design",
      description: "Every feature is designed with you in mind, making habit tracking intuitive, enjoyable, and effective.",
      color: '#10B981'
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is yours. We use end-to-end encryption and never share your personal information.",
      color: '#6366F1'
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth",
      description: "We're constantly evolving, adding new features and improvements based on user feedback and research.",
      color: '#F59E0B'
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "1M+", label: "Habits Tracked" },
    { number: "85%", label: "Success Rate" },
    { number: "4.9", label: "User Rating" }
  ];

  const team = [
    {
      image: "SD",
      name: "Sayam Das",
      role: "Founder & CEO",
      bio: "Product thinker. Habit systems nerd.",
      linkedin: "https://www.linkedin.com/in/sayam-das", // <-- update
    },
    {
      image: "AK",
      name: "Anika Kapoor",
      role: "Design Lead",
      bio: "Crafts calm, intuitive UI.",
      linkedin: "https://www.linkedin.com/in/anika-kapoor", // <-- update
    },
    {
      image: "RV",
      name: "Ravi Verma",
      role: "ML Engineer",
      bio: "Models that nudge, not nag.",
      linkedin: "https://www.linkedin.com/in/ravi-verma", // <-- update
    },
    {
      image: "JT",
      name: "Jatin",
      role: "Frontend Dev",
      bio: "Framer Motion enjoyer.",
      linkedin: "https://www.linkedin.com/in/jatin", // <-- update
    },
  ];


  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-[#4F46E5] to-[#6366F1] text-white py-20 md:py-32 overflow-hidden"
        initial="hidden"
        animate="visible"
      >
        {/* Animated Background Elements */}
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
              <div className="bg-white/20 backdrop-blur-xl p-4 rounded-2xl border border-white/30">
                <Brain className="w-16 h-16 mx-auto" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              About AI Habit Architect
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              We're on a mission to help millions of people build better habits through the power of artificial intelligence and behavioral science.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Additional Features Section */}
      <section className="bg-white py-20 mt-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="p-8 rounded-2xl border border-[#E2E8F0] bg-white hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#6366F1] flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-3">AI-Powered Insights</h3>
              <p className="text-[#475569]">
                Get personalized recommendations and insights based on your unique habits and goals.
              </p>
            </motion.div>

            <motion.div
              className="p-8 rounded-2xl border border-[#E2E8F0] bg-white hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-3">Track Progress</h3>
              <p className="text-[#475569]">
                Monitor your daily streaks and celebrate milestones with beautiful visualizations.
              </p>
            </motion.div>

            <motion.div
              className="p-8 rounded-2xl border border-[#E2E8F0] bg-white hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#4F46E5] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-3">Smart Reminders</h3>
              <p className="text-[#475569]">
                Never miss a habit with intelligent notifications that adapt to your routine.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#E2E8F0]">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-[#475569] leading-relaxed mb-6">
                At AI Habit Architect, we believe that small, consistent actions lead to extraordinary transformations. Our mission is to make habit formation accessible, effective, and enjoyable for everyone.
              </p>
              <p className="text-lg text-[#475569] leading-relaxed">
                By combining cutting-edge AI technology with proven behavioral science, we provide personalized insights and recommendations that help you understand your patterns, stay motivated, and achieve your goals.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#EEF2FF] to-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#E2E8F0]">
                  <div className="text-4xl md:text-5xl font-bold text-[#4F46E5] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-[#475569] font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Core Values
            </h2>
            <p className="text-xl text-[#475569] max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-[#E2E8F0] hover:shadow-xl transition-all"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${value.color}, ${value.color}dd)`,
                    boxShadow: `0 10px 30px ${value.color}30`
                  }}
                >
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1E293B] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#475569] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-4">Meet Our Team</h2>
            <p className="text-xl text-[#475569] max-w-2xl mx-auto">Passionate experts dedicated to your success</p>
          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <PinContainer key={i} title={member.name} href={member.href} containerClassName="aspect-[4/5]">
                <div className="w-[15rem] max-w-full">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#6366F1] grid place-items-center text-white text-2xl font-bold shadow-lg">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-emerald-300 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-zinc-300/80">{member.bio}</p>
                </div>
              </PinContainer>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div
            className="bg-gradient-to-br from-[#4F46E5] to-[#6366F1] rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are transforming their lives one habit at a time
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-10 py-4 rounded-xl bg-white text-[#4F46E5] font-bold text-lg hover:bg-[#EEF2FF] transition-all shadow-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
              </motion.button>
              <motion.button
                className="px-10 py-4 rounded-xl border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;