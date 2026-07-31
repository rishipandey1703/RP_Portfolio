"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code2, BrainCircuit, Rocket } from "lucide-react";

const education = [
  {
    institution: "ABES Engineering College, Ghaziabad",
    degree: "B.Tech in Computer Science & Engineering (Artificial Intelligence & Machine Learning)",
    period: "2023 – 2027",
    score: "Current CGPA: 7.6+",
    coursework:
      "Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Artificial Intelligence, Machine Learning",
  },
  {
    institution: "Senior Secondary School",
    degree: "Class XII (CBSE)",
    period: "2022",
    score: "Completed Senior Secondary Education",
    coursework: "",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full py-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col gap-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
          About Me
        </h2>
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
            I am a fourth-year B.Tech student specializing in Artificial
            Intelligence and Machine Learning at ABES Engineering College. I
            enjoy building intelligent applications, scalable backend systems,
            and modern full-stack web solutions that solve real-world problems.
          </p>

          <p>
            My experience includes working as an AI Trainer at Outlier AI,
            evaluating Large Language Models (LLMs), designing prompts, and
            improving AI response quality. Alongside this, I actively build
            full-stack projects using React, Next.js, Node.js, Python, and
            modern web technologies.
          </p>

          <p>
            I am passionate about continuous learning, problem-solving, and
            software engineering. Whether developing AI-powered applications,
            creating responsive user interfaces, or optimizing backend logic, I
            always strive to write clean, efficient, and maintainable code.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <BrainCircuit className="w-6 h-6 text-purple-400" />
              <span className="font-medium text-white">Artificial Intelligence</span>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <Code2 className="w-6 h-6 text-blue-400" />
              <span className="font-medium text-white">Full Stack Development</span>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <Rocket className="w-6 h-6 text-red-400" />
              <span className="font-medium text-white">Problem Solving</span>
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
          <h3 className="text-2xl font-semibold text-white mb-2">
            Education
          </h3>

          <div className="flex flex-col gap-8 border-l-2 border-white/10 pl-6 relative">
            {education.map((edu, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-black border-2 border-white/30" />

                <span className="text-sm text-neutral-500 font-mono mb-1 block">
                  {edu.period}
                </span>

                <h4 className="text-xl font-medium text-white">
                  {edu.degree}
                </h4>

                <h5 className="text-lg text-neutral-400 mb-2">
                  {edu.institution}
                </h5>

                <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-3">
                  {edu.score}
                </span>

                {edu.coursework && (
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    <strong className="text-neutral-300">Relevant Coursework:</strong>{" "}
                    {edu.coursework}
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