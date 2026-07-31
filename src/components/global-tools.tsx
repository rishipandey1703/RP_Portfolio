"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Terminal as TerminalIcon, Search, FileText, Code, Briefcase, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useTheme } from "next-themes";

const commands = [
  { id: "projects", title: "Projects", icon: <Code className="w-4 h-4" />, action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "skills", title: "Skills", icon: <Command className="w-4 h-4" />, action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "experience", title: "Experience", icon: <Briefcase className="w-4 h-4" />, action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "resume", title: "Download Resume", icon: <FileText className="w-4 h-4" />, action: () => window.open("/resume.pdf", "_blank") },
  { id: "github", title: "GitHub Profile", icon: <FaGithub className="w-4 h-4" />, action: () => window.open("https://github.com/Ramkrishna45", "_blank") },
  { id: "linkedin", title: "LinkedIn Profile", icon: <FaLinkedin className="w-4 h-4" />, action: () => window.open("https://linkedin.com", "_blank") },
  { id: "leetcode", title: "LeetCode Stats", icon: <Code className="w-4 h-4" />, action: () => document.getElementById("coding")?.scrollIntoView({ behavior: "smooth" }) },
  { id: "contact", title: "Contact Me", icon: <Mail className="w-4 h-4" />, action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
];

export function GlobalTools() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [termOpen, setTermOpen] = useState(false);
  const [query, setQuery] = useState("");
  
  const [termHistory, setTermHistory] = useState<{ text: string, type: "in" | "out" }[]>([
    { text: 'Type "help" for a list of commands.', type: "out" }
  ]);
  const termInputRef = useRef<HTMLInputElement>(null);
  const { setTheme } = useTheme();

  // Handle Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setTermOpen(prev => {
          if (!prev) setTimeout(() => termInputRef.current?.focus(), 100);
          return !prev;
        });
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
        setTermOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredCommands = commands.filter(c => c.title.toLowerCase().includes(query.toLowerCase()));

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termInputRef.current) return;
    
    const input = termInputRef.current.value.trim().toLowerCase();
    termInputRef.current.value = "";
    
    if (!input) return;
    
    const newHistory = [...termHistory, { text: `> ${input}`, type: "in" as const }];
    
    switch (input) {
      case "help":
        newHistory.push({ text: "Available commands: help, about, projects, skills, resume, github, leetcode, contact, clear, theme", type: "out" });
        break;
      case "about":
        newHistory.push({ text: "Software Engineer at IIIT Gwalior. Building scalable systems and AI integrations.", type: "out" });
        break;
      case "projects":
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        newHistory.push({ text: "Navigating to Projects...", type: "out" });
        break;
      case "skills":
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        newHistory.push({ text: "Navigating to Skills...", type: "out" });
        break;
      case "resume":
        window.open("/resume.pdf", "_blank");
        newHistory.push({ text: "Opening Resume...", type: "out" });
        break;
      case "github":
        window.open("https://github.com/Ramkrishna45", "_blank");
        newHistory.push({ text: "Opening GitHub...", type: "out" });
        break;
      case "leetcode":
        window.open("https://leetcode.com/u/jarvis45/", "_blank");
        newHistory.push({ text: "Opening LeetCode...", type: "out" });
        break;
      case "contact":
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        newHistory.push({ text: "Navigating to Contact...", type: "out" });
        break;
      case "clear":
        setTermHistory([]);
        return;
      case "theme":
        newHistory.push({ text: "Theme toggled. (Note: Portfolio optimized for dark mode)", type: "out" });
        setTheme(prev => prev === "dark" ? "light" : "dark");
        break;
      default:
        newHistory.push({ text: `Command not found: ${input}. Type "help" for available commands.`, type: "out" });
    }
    
    setTermHistory(newHistory);
  };

  return (
    <>
      {/* Command Palette */}
      <AnimatePresence>
        {cmdOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setCmdOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-xl rounded-2xl bg-[#111] border border-white/10 shadow-2xl overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center px-4 border-b border-white/10">
                <Search className="w-5 h-5 text-neutral-500" />
                <input 
                  type="text" 
                  autoFocus
                  className="w-full px-4 py-4 bg-transparent text-white placeholder-neutral-500 focus:outline-none"
                  placeholder="Search commands, projects, skills..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredCommands.length === 0 ? (
                  <div className="p-8 text-center text-neutral-500">No results found.</div>
                ) : (
                  filteredCommands.map(cmd => (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        setCmdOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                    >
                      {cmd.icon}
                      <span className="font-medium">{cmd.title}</span>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Terminal */}
      <AnimatePresence>
        {termOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 w-[400px] h-[300px] z-[90] rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-2 text-sm font-mono text-neutral-400">
                <TerminalIcon className="w-4 h-4" />
                developer_terminal
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => setTermOpen(false)} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto font-mono text-sm flex flex-col gap-1 custom-scrollbar">
              {termHistory.map((item, i) => (
                <div key={i} className={item.type === "in" ? "text-white" : "text-neutral-400"}>
                  {item.text}
                </div>
              ))}
            </div>
            
            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-black/20">
              <span className="text-green-400 font-mono">~$</span>
              <input 
                ref={termInputRef}
                type="text" 
                className="flex-1 bg-transparent text-white font-mono focus:outline-none"
                placeholder="type a command..."
                autoFocus
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
