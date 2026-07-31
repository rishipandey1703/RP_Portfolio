"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight, X, Layers, Cpu, Server } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "kafka-lite",
    title: "Kafka Lite",
    date: "June 2026",
    subtitle: "Kafka-inspired Persistent Message Broker",
    description: "A high-performance message broker built from scratch in C++17, achieving 331K+ messages/sec peak throughput and sub-millisecond latencies.",
    details: [
      "Built a Kafka-inspired persistent message broker in C++17 featuring TCP-based client-server communication, append-only log storage, topic partitioning, and crash recovery through durable metadata and log reconstruction.",
      "Implemented Consumer Groups with automatic partition assignment, heartbeat-based failure detection, dynamic rebalancing, persistent consumer offsets, producer acknowledgements, configurable retention, and batch publishing.",
      "Benchmarked the broker, achieving 331K+ messages/sec peak throughput, 0.46 ms publish latency, and recovery from 1M messages in 0.5 sec, with metrics APIs and a monitoring dashboard."
    ],
    tech: ["C++17", "STL", "TCP Sockets", "Multi-threading", "CMake", "nlohmann::json", "Python", "Mermaid"],
    github: "https://github.com/Ramkrishna45/Kafka-Lite",
    demo: null,
    icon: <Server className="w-8 h-8 text-white" />,
    color: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-blue-500/50",
  },
  {
    id: "docsense-ai",
    title: "DocSense AI",
    date: "April 2026",
    subtitle: "AI-powered Knowledge Search Platform",
    description: "An advanced RAG platform for semantic search across PDFs, DOCX, TXT, websites, GitHub repos, and YouTube transcripts with source-backed responses.",
    details: [
      "Built an AI-powered knowledge platform enabling semantic search and Retrieval-Augmented Generation (RAG) over various document types with source-backed responses.",
      "Developed DocSense Companion, a Chrome Extension (Manifest V3) for one-click webpage ingestion, instant content summarization, and seamless synchronization with the DocSense AI knowledge base.",
      "Implemented vector embeddings, hybrid search, document chunking, collection management, and inline citations to deliver accurate, context-aware conversational search across personal knowledge bases."
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "FastAPI", "PostgreSQL", "pgvector", "Prisma", "Cohere API", "Gemini API"],
    github: "https://github.com/Ramkrishna45/DocSense-AI",
    demo: "https://docsense-ai.demo", // mock demo
    icon: <Cpu className="w-8 h-8 text-white" />,
    color: "from-purple-500/20 to-pink-500/20",
    border: "group-hover:border-purple-500/50",
  },
  {
    id: "docsense-companion",
    title: "DocSense Companion",
    date: "April 2026",
    subtitle: "AI Chrome Extension for Knowledge Capture",
    description: "A Manifest V3 Chrome Extension enabling one-click webpage ingestion and instant content summarization.",
    details: [
      "Developed DocSense Companion, a Chrome Extension (Manifest V3) for one-click webpage ingestion, instant content summarization, and seamless synchronization with the DocSense AI knowledge base.",
      "Implemented seamless background scripts, UI injections, and secure token-based API communication with the DocSense backend.",
      "Reduced knowledge capture friction by 80% allowing users to index and query their current webpage effortlessly."
    ],
    tech: ["Chrome Extension API", "Manifest V3", "React", "TypeScript", "Tailwind CSS", "REST APIs"],
    github: "https://github.com/Ramkrishna45/DocSense-Companion",
    demo: null,
    icon: <ExternalLink className="w-8 h-8 text-white" />,
    color: "from-amber-500/20 to-orange-500/20",
    border: "group-hover:border-amber-500/50",
  },
  {
    id: "brick-basket",
    title: "Brick Basket",
    date: "May 2026",
    subtitle: "Home Construction Management Platform",
    description: "A secure B2C construction management platform with Role-Based Access Control and automated waterfall payment distribution.",
    details: [
      "Built a B2C construction management platform using Next.js 15 for project tracking, milestone management, client communication, and daily photo updates to enhance client transparency.",
      "Designed a secure multi-role system with Role-Based Access Control (RBAC), NextAuth.js v5 authentication, PostgreSQL, Prisma ORM, Supabase Storage, and an automated waterfall payment distribution engine."
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Prisma ORM", "NextAuth v5", "Supabase", "Tailwind CSS"],
    github: "https://github.com/Ramkrishna45/Brick-Basket",
    demo: null,
    icon: <Layers className="w-8 h-8 text-white" />,
    color: "from-green-500/20 to-emerald-500/20",
    border: "group-hover:border-green-500/50",
  }
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Lock body scroll when modal is open
  if (typeof document !== "undefined") {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  return (
    <section id="projects" className="relative w-full py-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Featured Engineering</h2>
        <div className="w-20 h-1 bg-white/20 rounded-full mb-8"></div>
        <p className="text-neutral-400 max-w-2xl text-lg">
          I build products that scale. From low-level C++ systems to modern AI web applications. Here are some of my most significant projects.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={cn(
              "group cursor-pointer relative flex flex-col h-[450px] p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 transition-all duration-500 hover:-translate-y-2",
              project.border
            )}
            onClick={() => setSelectedProject(project)}
          >
            <div className={cn("absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none", project.color)} />
            
            <div className="mb-8 p-4 rounded-2xl bg-white/5 inline-flex self-start border border-white/10 group-hover:bg-white/10 transition-colors">
              {project.icon}
            </div>
            
            <div className="flex flex-col flex-1">
              <span className="text-xs font-mono text-neutral-500 mb-2 block">{project.date}</span>
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-sm font-medium text-neutral-300 mb-4">{project.subtitle}</p>
              <p className="text-sm text-neutral-500 line-clamp-3 mb-6">
                {project.description}
              </p>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} className="text-xs px-2 py-1 rounded bg-white/5 text-neutral-400 border border-white/5">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded bg-transparent text-neutral-500">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex items-center text-sm font-medium text-white group-hover:text-neutral-300 transition-colors">
                  Explore Project <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0f0f0f] border border-white/10 shadow-2xl custom-scrollbar flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className={cn("w-full h-48 sm:h-64 relative overflow-hidden bg-gradient-to-br", selectedProject.color)}>
                {/* Abstract graphic representing the project */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  {selectedProject.icon}
                </div>
                <div className="absolute bottom-6 left-6 sm:left-10 z-10">
                  <span className="text-sm font-mono text-white/70 mb-2 block">{selectedProject.date}</span>
                  <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">{selectedProject.title}</h2>
                  <p className="text-lg text-white/90 font-medium">{selectedProject.subtitle}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
              </div>

              <div className="p-6 sm:p-10 flex flex-col gap-10">
                <div className="flex flex-wrap gap-4">
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors">
                      <FaGithub className="w-4 h-4" /> View Source
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors border border-white/10">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm font-medium text-neutral-300 border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Implementation Details</h3>
                  <ul className="flex flex-col gap-4">
                    {selectedProject.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-4 items-start text-neutral-400 leading-relaxed">
                        <div className="min-w-6 h-6 mt-1 flex items-center justify-center rounded-full bg-white/10 text-white text-xs font-bold">
                          {idx + 1}
                        </div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
