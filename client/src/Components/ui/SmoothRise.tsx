import { motion } from "framer-motion";

interface SmoothRiseProps {
    text: string;
    delay?: number;
}

export const SmoothRise: React.FC<SmoothRiseProps> = ({ text, delay = 0.15 }) => {
    const words = text.split(" ");

    return (
        <p className="text-2xl text-[#475569] mb-12 leading-relaxed max-w-3xl mx-auto text-center">
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className="inline-block mr-1"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.35,
                        delay: i * 0.05 + delay,
                        ease: "easeOut",
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </p>
    );
};
