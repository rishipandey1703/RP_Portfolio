"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface TextRotatorProps {
  titles: string[];
  interval?: number;
  className?: string;
}

export function TextRotator({ titles, interval = 2500, className }: TextRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, interval);
    return () => clearInterval(timer);
  }, [titles.length, interval]);

  return (
    <div className={cn("relative overflow-hidden h-8 flex items-center", className)}>
      <AnimatePresence mode="popLayout">
        <motion.p
          key={index}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute"
        >
          {titles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
