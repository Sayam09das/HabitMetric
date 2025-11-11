"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
  intervalMs = 5000,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
  intervalMs?: number;
}) => {
  const [cards, setCards] = useState<Card[]>(items);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // start
    timerRef.current = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        next.unshift(next.pop()!);
        return next;
      });
    }, intervalMs);

    // cleanup
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [intervalMs]);

  

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute bg-white dark:bg-black h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/10 shadow-black/10 dark:shadow-white/5 flex flex-col justify-between"
          style={{ transformOrigin: "top center" }}
          animate={{
            top: index * -offset,
            scale: 1 - index * scaleFactor,
            zIndex: cards.length - index,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
        >
          <div className="font-normal text-neutral-700 dark:text-neutral-200">
            {card.content}
          </div>
          <div>
            <p className="text-neutral-600 dark:text-white font-medium">
              {card.name}
            </p>
            <p className="text-neutral-400 dark:text-neutral-300">
              {card.designation}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
