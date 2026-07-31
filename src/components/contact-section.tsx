"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Copy, Code, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Mock submission delay
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 1500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("tripathiramkrishna16@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative w-full py-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
      <div className="flex-1 flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Let&apos;s Connect</h2>
          <div className="w-20 h-1 bg-white/20 rounded-full mb-8"></div>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-lg">
            Whether you have a question, a project in mind, or just want to say hi, my inbox is always open. I&apos;ll try my best to get back to you!
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={copyEmail}
              className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="p-2 bg-white/10 rounded-full text-white">
                {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </div>
              <span className="text-neutral-300 font-medium tracking-wide">
                tripathiramkrishna16@gmail.com
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          <a href="https://github.com/Ramkrishna45" target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all text-neutral-400 hover:text-white">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all text-neutral-400 hover:text-[#0a66c2]">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="https://leetcode.com/u/jarvis45/" target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all text-neutral-400 hover:text-[#ffa116]">
            <Code className="w-5 h-5" />
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all text-neutral-400 hover:text-green-400">
            <FileText className="w-5 h-5" />
          </a>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 relative overflow-hidden">
          {formStatus === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] z-10"
            >
              <CheckCircle2 className="w-16 h-16 text-green-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-neutral-400 text-center px-6">Thank you for reaching out. I will get back to you as soon as possible.</p>
            </motion.div>
          ) : null}

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-neutral-400">Name</label>
            <input 
              type="text" 
              id="name"
              required
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
              placeholder="John Doe"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-neutral-400">Email</label>
            <input 
              type="email" 
              id="email"
              required
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
              placeholder="john@example.com"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-neutral-400">Message</label>
            <textarea 
              id="message"
              required
              rows={4}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors resize-none custom-scrollbar"
              placeholder="Hi Ram, I'd like to discuss..."
            ></textarea>
          </div>
          
          <button 
            type="submit"
            disabled={formStatus !== "idle"}
            className="group mt-4 px-6 py-4 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formStatus === "submitting" ? (
              <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                Send Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
