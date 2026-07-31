"use client";

import { motion } from "framer-motion";
import { Briefcase, Trophy, Star } from "lucide-react";

const experiences = [
  {
    role: "AI Trainer",
    company: "Outlier AI",
    type: "Remote",
    period: "Oct 2024 – Oct 2025",
    description: [
      "Evaluated Large Language Models (LLMs) across 20+ AI evaluation projects, designing prompts to identify reasoning and instruction-following failures under project-specific guidelines.",
      "Completed 370+ evaluation tasks, documenting model failure cases and submitting detailed analyses with corrected reference solutions for quality assessment."
    ]
  }
];

const achievements = [
  {
    title: "National Semi-Finalist",
    issuer: "Flipkart Grid 7.0",
    description: "Selected as a National Semi-Finalist in one of India's premier Engineering competitions.",
    icon: <Trophy className="w-6 h-6 text-yellow-500" />
  },
  {
    title: "500+ DSA Problems Solved",
    issuer: "LeetCode, CodeChef, Codeforces",
    description: "Consistently solving complex algorithmic challenges across various platforms.",
    icon: <Star className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Global Rank 848",
    issuer: "LeetCode Biweekly Contest 481",
    description: "Achieved a 1750+ rating on LeetCode and secured a top rank among 30,290 participants.",
    icon: <Trophy className="w-6 h-6 text-purple-500" />
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full py-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
      
      {/* Experience Timeline */}
      <div className="flex-1 flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Experience</h2>
          <div className="w-20 h-1 bg-white/20 rounded-full mb-8"></div>
        </motion.div>

        <div className="flex flex-col gap-8 border-l-2 border-white/10 pl-8 relative">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative"
            >
              <div className="absolute -left-[43px] top-0 p-2 rounded-full bg-black border border-white/20 text-white">
                <Briefcase className="w-4 h-4" />
              </div>
              
              <span className="text-sm text-neutral-500 font-mono mb-2 block">{exp.period}</span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                {exp.role} 
                <span className="text-neutral-500 font-normal">at</span> 
                <span className="text-neutral-200">{exp.company}</span>
              </h3>
              <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-neutral-400 rounded-full text-xs font-medium mt-3 mb-4">
                {exp.type}
              </span>
              
              <ul className="flex flex-col gap-3">
                {exp.description.map((desc, i) => (
                  <li key={i} className="text-neutral-400 leading-relaxed relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-neutral-600 before:rounded-full">
                    {desc}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="flex-1 flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Achievements</h2>
          <div className="w-20 h-1 bg-white/20 rounded-full mb-8"></div>
        </motion.div>

        <div className="flex flex-col gap-6">
          {achievements.map((ach, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className="flex items-start gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors"
            >
              <div className="p-3 bg-white/10 rounded-2xl shrink-0">
                {ach.icon}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-xl font-bold text-white">{ach.title}</h4>
                <h5 className="text-sm font-medium text-neutral-400 mb-2">{ach.issuer}</h5>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
