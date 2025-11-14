"use client";

import React from "react";
import { MotionConfig, motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export type TeamMember = {
    image: React.ReactNode;
    name: string;
    role: string;
    bio: string;
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 220, damping: 22 },
    },
};

export function TeamCard({ member }: { member: TeamMember }) {
    const rx = useSpring(0, { stiffness: 120, damping: 14 });
    const ry = useSpring(0, { stiffness: 120, damping: 14 });
    const scale = useSpring(1, { stiffness: 170, damping: 18 });

    const mx = useMotionValue(50);
    const my = useMotionValue(50);
    const bgPos = useTransform([mx, my], ([x, y]) => `${x}% ${y}%`);

    function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotX = (py - 0.5) * -10;
        const rotY = (px - 0.5) * 10;
        rx.set(rotX);
        ry.set(rotY);
        mx.set(px * 100);
        my.set(py * 100);
        scale.set(1.02);
    }

    function onMouseLeave() {
        rx.set(0);
        ry.set(0);
        scale.set(1);
    }

    return (
        <motion.div variants={itemVariants}>
            <motion.div
                style={{
                    rotateX: rx,
                    rotateY: ry,
                    scale,
                    background: `radial-gradient(120px 120px at ${bgPos.get()}, rgba(99,102,241,0.12), transparent 60%)`,
                    transformStyle: "preserve-3d",
                }}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                whileTap={{ scale: 0.99 }}
                className="relative rounded-2xl p-6 text-center border border-[#E2E8F0] bg-[#F9FAFB] hover:shadow-2xl shadow-xl transition-all will-change-transform"
            >
                <div className="relative w-24 h-24 mx-auto mb-5" style={{ transform: "translateZ(30px)" }}>
                    <motion.div
                        aria-hidden
                        className="absolute inset-0 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                        style={{
                            background: "conic-gradient(from 0deg, #4F46E5, #22D3EE, #A78BFA, #4F46E5)",
                            filter: "blur(8px)",
                            opacity: 0.55,
                        }}
                    />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#4F46E5] to-[#6366F1] grid place-items-center text-white text-2xl font-bold shadow-lg">
                        {member.image}
                    </div>
                </div>

                <div style={{ transform: "translateZ(18px)" }}>
                    <h3 className="text-xl font-bold text-[#1E293B] mb-1">{member.name}</h3>
                    <motion.p
                        className="text-[#4F46E5] font-medium mb-3"
                        initial={{ y: 8, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 250, damping: 18, delay: 0.05 }}
                    >
                        {member.role}
                    </motion.p>
                    <motion.p
                        className="text-sm text-[#475569]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        {member.bio}
                    </motion.p>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function TeamGrid({ team }: { team: TeamMember[] }) {
    return (
        <MotionConfig reducedMotion="user">
            <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
            >
                {team.map((member, i) => (
                    <TeamCard key={i} member={member} />
                ))}
            </motion.div>
        </MotionConfig>
    );
}

