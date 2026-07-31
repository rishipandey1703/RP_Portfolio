"use client";

import { motion } from "framer-motion";
import { 
  Code2, Terminal, Database, Cloud, 
  Cpu, Boxes, BrainCircuit, Wrench, 
  Layers
} from "lucide-react";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <Code2 className="w-5 h-5" />,
    skills: [
      { name: "C/C++", desc: "High-performance systems programming", projects: "Kafka Lite", related: "STL, CMake" },
      { name: "Python", desc: "Data processing & ML scripts", projects: "DocSense AI, Kafka Lite", related: "FastAPI, LangChain" },
      { name: "JavaScript / TypeScript", desc: "Full-stack development", projects: "Brick Basket, DocSense AI", related: "Node.js, React" },
      { name: "SQL", desc: "Relational database querying", projects: "DocSense AI, Brick Basket", related: "PostgreSQL" },
    ]
  },
  {
    title: "Frontend Development",
    icon: <Layers className="w-5 h-5" />,
    skills: [
      { name: "Next.js & React", desc: "Modern UI frameworks", projects: "Brick Basket, DocSense AI", related: "Framer Motion, Tailwind" },
      { name: "Tailwind CSS", desc: "Utility-first styling", projects: "Portfolio, Brick Basket", related: "Shadcn UI" },
      { name: "Framer Motion", desc: "Complex web animations", projects: "Portfolio, Brick Basket", related: "React" },
    ]
  },
  {
    title: "Backend Development",
    icon: <Terminal className="w-5 h-5" />,
    skills: [
      { name: "Node.js & Express", desc: "Scalable JS backends", projects: "Various", related: "TypeScript" },
      { name: "FastAPI", desc: "High-perf Python APIs", projects: "DocSense AI", related: "Python, Pydantic" },
      { name: "Prisma ORM", desc: "Type-safe database access", projects: "Brick Basket, DocSense AI", related: "PostgreSQL" },
    ]
  },
  {
    title: "AI & ML",
    icon: <BrainCircuit className="w-5 h-5" />,
    skills: [
      { name: "RAG & Vector Search", desc: "Retrieval-Augmented Generation", projects: "DocSense AI", related: "pgvector, LangChain" },
      { name: "LLM APIs", desc: "Integration of intelligence", projects: "DocSense AI, Outlier AI tasks", related: "Gemini API, Cohere" },
    ]
  },
  {
    title: "Distributed Systems",
    icon: <Boxes className="w-5 h-5" />,
    skills: [
      { name: "TCP Sockets & Multi-threading", desc: "Low-level networking", projects: "Kafka Lite", related: "C++17, Networking" },
      { name: "Message Brokers", desc: "Event-driven architecture", projects: "Kafka Lite", related: "Kafka concepts" },
    ]
  },
  {
    title: "Databases",
    icon: <Database className="w-5 h-5" />,
    skills: [
      { name: "PostgreSQL", desc: "Advanced relational DB", projects: "Brick Basket, DocSense AI", related: "pgvector" },
      { name: "MongoDB & MySQL", desc: "NoSQL and standard SQL", projects: "Various", related: "Mongoose" },
    ]
  },
  {
    title: "Cloud & Developer Tools",
    icon: <Wrench className="w-5 h-5" />,
    skills: [
      { name: "Git & GitHub", desc: "Version control", projects: "All Projects", related: "CI/CD" },
      { name: "Supabase", desc: "Backend as a Service", projects: "Brick Basket", related: "Auth, Storage" },
      { name: "Chrome Extensions", desc: "Browser integrations", projects: "DocSense Companion", related: "Manifest V3" },
    ]
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative w-full py-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Technical Arsenal</h2>
        <div className="w-20 h-1 bg-white/20 rounded-full mb-8"></div>
        <p className="text-neutral-400 max-w-2xl text-lg">
          I leverage a diverse set of technologies across the stack to build scalable systems, from low-level C++ network programming to modern Next.js interfaces.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors overflow-hidden"
          >
            {/* Subtle Lighting Effect */}
            <div className="absolute -inset-px bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/10 rounded-xl text-white">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-white">{category.title}</h3>
            </div>

            <div className="flex flex-col gap-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-1">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-neutral-200 font-medium">{skill.name}</h4>
                  </div>
                  <p className="text-sm text-neutral-400">{skill.desc}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                      {skill.projects}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-transparent border border-white/10 text-neutral-500">
                      {skill.related}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
