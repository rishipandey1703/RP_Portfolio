"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code2, BrainCircuit, Rocket } from "lucide-react";

const education = [
  {
    institution: "Indian Institute of Information Technology, Gwalior",
    degree: "Integrated Bachelors and Masters in Information Technology",
    period: "Aug 2023 – Jun 2028",
    score: "CGPA: 8.77",
    coursework: "Data Structures & Algorithms, OOP, DBMS, OS, Computer Networks, Computer Architecture",
  },
  {
    institution: "Aatmdeep Vidyalaya, Gorakhpur",
    degree: "All India Senior School Certificate Examination",
    period: "June 2022",
    score: "Percentage: 94.4%",
    coursework: "",
  }
];

export function AboutSection() {
  return (
    <section id="about" className="relative w-full py-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">About Me</h2>
        <div className="w-20 h-1 bg-white/20 rounded-full mb-8"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-6 text-neutral-300 leading-relaxed text-lg"
        >
          <p>
            I am a software engineer focused on building robust backend architectures, AI-integrated platforms, and high-performance full-stack applications. Rather than just writing code, I enjoy designing systems that solve complex engineering problems and scale effectively.
          </p>
          <p>
            My recent work involves benchmarking a C++17 persistent message broker to achieve 331K+ msgs/sec, and building DocSense AI, a RAG-powered knowledge search platform. I am constantly exploring the intersection of distributed systems and artificial intelligence.
          </p>
          <p>
            When I am not optimizing algorithms or debugging distributed systems, I am competing in algorithmic programming contests—having solved over 500+ problems and reaching a 1750+ rating on LeetCode.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <BrainCircuit className="w-6 h-6 text-purple-400" />
              <span className="font-medium text-white">AI/ML Engineering</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <Code2 className="w-6 h-6 text-blue-400" />
              <span className="font-medium text-white">Distributed Systems</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <Rocket className="w-6 h-6 text-red-400" />
              <span className="font-medium text-white">Full Stack Dev</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <GraduationCap className="w-6 h-6 text-green-400" />
              <span className="font-medium text-white">Continuous Learning</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col gap-8"
        >
          <h3 className="text-2xl font-semibold text-white mb-2">Education Journey</h3>
          <div className="flex flex-col gap-8 border-l-2 border-white/10 pl-6 relative">
            {education.map((edu, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-black border-2 border-white/30" />
                <span className="text-sm text-neutral-500 font-mono mb-1 block">{edu.period}</span>
                <h4 className="text-xl font-medium text-white">{edu.degree}</h4>
                <h5 className="text-lg text-neutral-400 mb-2">{edu.institution}</h5>
                <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-3">
                  {edu.score}
                </span>
                {edu.coursework && (
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    <strong className="text-neutral-300">Coursework:</strong> {edu.coursework}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
