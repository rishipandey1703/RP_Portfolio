"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
const titles = [
  "Software Engineer",
  "Full Stack Developer",
  "Backend Developer",
  "AI Engineer",
  "Machine Learning Enthusiast",
  "Systems Programmer"
];

export function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 max-w-7xl mx-auto pt-20">
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="flex-1 flex flex-col z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-neutral-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for Internships
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          Hi, I&apos;m <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
            Ram Krishna
          </span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-10 sm:h-12 flex items-center mb-6 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={titleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-xl sm:text-2xl font-medium text-neutral-400"
            >
              {titles[titleIndex]}
            </motion.h2>
          </AnimatePresence>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-neutral-400 max-w-lg mb-8 leading-relaxed"
        >
          I am a passionate software engineer currently pursuing my Integrated B.Tech + M.Tech in Information Technology at IIIT Gwalior. I love building scalable systems, AI integrations, and beautifully crafted products.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center gap-4"
        >
          <a 
            href="#projects" 
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-colors"
          >
            View Projects <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
          >
            Resume <Download className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-4 mt-8"
        >
          <a href="https://github.com/Ramkrishna45" target="_blank" rel="noreferrer" className="p-2 text-neutral-400 hover:text-white bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 text-neutral-400 hover:text-white bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="mailto:tripathiramkrishna16@gmail.com" className="p-2 text-neutral-400 hover:text-white bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>
      </div>



      {/* Empty right side to let the Spline keyboard shine */}
      <div className="hidden lg:block flex-1 w-full h-[500px] lg:h-[700px]"></div>
    </section>
  );
}
